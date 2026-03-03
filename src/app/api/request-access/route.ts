import { createHash } from 'node:crypto'

import { NextResponse } from 'next/server'
import { Resend } from 'resend'

import {
  REQUEST_ACCESS_LIMITS,
  type RequestAccessValidationErrors,
  normalizeTextForHash,
  validateAndNormalizeRequestAccessPayload,
} from '@/lib/request-access'

export const runtime = 'nodejs'

const IP_WINDOW_MS = 10 * 60 * 1000
const IP_MAX_REQUESTS = 5
const EMAIL_WINDOW_MS = 24 * 60 * 60 * 1000
const EMAIL_MAX_REQUESTS = 20
const DEDUPE_WINDOW_MS = 60 * 60 * 1000
const REQUEST_ACCESS_DESTINATION = 'hello@protos.fi'

type TimestampBuckets = Map<string, number[]>
type DedupeBuckets = Map<string, number>

type RequestAccessStore = {
  byIp: TimestampBuckets
  byEmail: TimestampBuckets
  dedupe: DedupeBuckets
}

const globalStore = globalThis as typeof globalThis & {
  __requestAccessStore?: RequestAccessStore
  __requestAccessResend?: Resend
}

const store: RequestAccessStore = globalStore.__requestAccessStore ?? {
  byIp: new Map(),
  byEmail: new Map(),
  dedupe: new Map(),
}

globalStore.__requestAccessStore = store

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown'
  }

  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp.trim()
  }

  return 'unknown'
}

function getHostFromRequest(request: Request): string {
  return request.headers.get('x-forwarded-host')?.split(',')[0]?.trim() ?? request.headers.get('host') ?? ''
}

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('origin')
  if (!origin) {
    return true
  }

  let originHost = ''
  try {
    originHost = new URL(origin).host.toLowerCase()
  } catch {
    return false
  }

  const allowedHosts = new Set<string>(['localhost:3000', '127.0.0.1:3000'])

  const requestHost = getHostFromRequest(request).toLowerCase()
  if (requestHost) {
    allowedHosts.add(requestHost)
  }

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    try {
      allowedHosts.add(new URL(process.env.NEXT_PUBLIC_SITE_URL).host.toLowerCase())
    } catch {
      // Ignore invalid env value and continue with known hosts.
    }
  }

  return allowedHosts.has(originHost)
}

function isRateLimited(buckets: TimestampBuckets, key: string, now: number, windowMs: number, maxHits: number): boolean {
  const existing = buckets.get(key) ?? []
  const recent = existing.filter((stamp) => now - stamp < windowMs)

  if (recent.length >= maxHits) {
    buckets.set(key, recent)
    return true
  }

  recent.push(now)
  buckets.set(key, recent)
  return false
}

function cleanupExpiredDedupeEntries(now: number): void {
  for (const [key, expiresAt] of store.dedupe.entries()) {
    if (expiresAt <= now) {
      store.dedupe.delete(key)
    }
  }
}

function hasRecentDuplicate(hash: string, now: number): boolean {
  cleanupExpiredDedupeEntries(now)

  const existingExpiry = store.dedupe.get(hash)
  if (existingExpiry && existingExpiry > now) {
    return true
  }

  store.dedupe.set(hash, now + DEDUPE_WINDOW_MS)
  return false
}

function getDayBucket(now: number): string {
  return new Date(now).toISOString().slice(0, 10)
}

function buildDedupeHash(email: string, useCase: string, now: number): string {
  const source = `${normalizeTextForHash(email)}|${normalizeTextForHash(useCase)}|${getDayBucket(now)}`
  return createHash('sha256').update(source).digest('hex')
}

function hasAbuseSignals(userAgent: string, content: string, timeToSubmitMs: number): boolean {
  let score = 0

  if (!userAgent) {
    score += 2
  }

  if (/bot|spider|crawler|python|curl|wget|httpclient|scrapy|go-http-client/i.test(userAgent)) {
    score += 2
  }

  const urlCount = content.match(/https?:\/\/|www\./gi)?.length ?? 0
  if (urlCount >= 3) {
    score += 1
  }

  if (timeToSubmitMs < 5000) {
    score += 1
  }

  return score >= 3
}

function validationResponse(message: string, errors?: RequestAccessValidationErrors) {
  return NextResponse.json(
    {
      ok: false,
      code: 'validation_error',
      message,
      ...(errors ? { errors } : {}),
    },
    { status: 400 },
  )
}

function rateLimitedResponse() {
  return NextResponse.json(
    {
      ok: false,
      code: 'rate_limited',
      message: 'Too many requests. Try again later.',
    },
    { status: 429 },
  )
}

function internalErrorResponse() {
  return NextResponse.json(
    {
      ok: false,
      code: 'internal_error',
      message: 'Something went wrong.',
    },
    { status: 500 },
  )
}

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return null
  }

  if (!globalStore.__requestAccessResend) {
    globalStore.__requestAccessResend = new Resend(apiKey)
  }

  return globalStore.__requestAccessResend
}

function getFromAddress(): string | null {
  return (
    process.env.SMTP_FROM ??
    process.env.RESEND_FROM ??
    process.env.RESEND_FROM_EMAIL ??
    process.env.EMAIL_FROM ??
    process.env.REQUEST_ACCESS_FROM_EMAIL ??
    null
  )
}

function getNotificationAddress(): string {
  const configured = process.env.CONTACT_EMAIL ?? process.env.REQUEST_ACCESS_NOTIFICATION_EMAIL

  if (configured?.trim().toLowerCase() === REQUEST_ACCESS_DESTINATION) {
    return configured.trim()
  }

  return REQUEST_ACCESS_DESTINATION
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return validationResponse('Invalid submission origin.')
  }

  let rawPayload: unknown
  try {
    rawPayload = await request.json()
  } catch {
    return validationResponse('Invalid request payload.')
  }

  const { data: payload, errors } = validateAndNormalizeRequestAccessPayload(rawPayload)
  if (!payload) {
    return validationResponse('Please review your submission and try again.', errors)
  }

  if (payload.website) {
    return validationResponse('Please review your submission and try again.')
  }

  const now = Date.now()
  const timeToSubmitMs = now - payload.startedAt
  if (timeToSubmitMs < REQUEST_ACCESS_LIMITS.minFormFillMs) {
    return validationResponse('Please take a moment before submitting.')
  }

  const clientIp = getClientIp(request)

  if (isRateLimited(store.byIp, clientIp, now, IP_WINDOW_MS, IP_MAX_REQUESTS)) {
    return rateLimitedResponse()
  }

  if (isRateLimited(store.byEmail, payload.email, now, EMAIL_WINDOW_MS, EMAIL_MAX_REQUESTS)) {
    return rateLimitedResponse()
  }

  const userAgent = request.headers.get('user-agent') ?? ''
  const contentForSignals = `${payload.useCase}\n${payload.volumeOrTimeline}`
  if (hasAbuseSignals(userAgent, contentForSignals, timeToSubmitMs)) {
    return validationResponse('Please review your submission and try again.')
  }

  const dedupeHash = buildDedupeHash(payload.email, payload.useCase, now)
  if (hasRecentDuplicate(dedupeHash, now)) {
    return validationResponse('Duplicate request detected. Please try again later.')
  }

  const resend = getResendClient()
  const from = getFromAddress()

  if (!resend || !from) {
    console.error('request_access_email_config_missing', {
      hasResendApiKey: Boolean(process.env.RESEND_API_KEY),
      hasFromAddress: Boolean(from),
    })
    return internalErrorResponse()
  }

  const submittedAt = new Date(now).toISOString()
  const referrer = request.headers.get('referer') ?? 'N/A'
  const origin = request.headers.get('origin') ?? 'N/A'

  const subjectEntity = payload.company || payload.fullName
  const subject = `[Arche] Request access — ${subjectEntity}`
  const textBody = [
    'Request access submission',
    '',
    `Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company || 'N/A'}`,
    `Role: ${payload.role || 'N/A'}`,
    '',
    'Use case:',
    payload.useCase,
    '',
    'Volume / timeline:',
    payload.volumeOrTimeline || 'N/A',
    '',
    'Metadata:',
    `IP: ${clientIp}`,
    `User-Agent: ${userAgent || 'N/A'}`,
    `Submitted at (UTC): ${submittedAt}`,
    `Time to submit (ms): ${timeToSubmitMs}`,
    `Timezone offset: ${payload.timezoneOffset}`,
    `Origin: ${origin}`,
    `Referrer: ${referrer}`,
    `Dedupe hash: ${dedupeHash}`,
  ].join('\n')

  try {
    const sendResult = await resend.emails.send({
      from,
      to: getNotificationAddress(),
      subject,
      replyTo: payload.email,
      text: textBody,
    })

    if (sendResult.error) {
      console.error('request_access_email_send_failed', {
        dedupeHash,
        clientIp,
        emailDomain: payload.email.split('@')[1] ?? 'unknown',
        error: {
          name: sendResult.error.name,
          message: sendResult.error.message,
        },
      })
      return internalErrorResponse()
    }

    console.info('request_access_email_sent', {
      dedupeHash,
      clientIp,
      messageId: sendResult.data?.id ?? null,
      from,
      to: getNotificationAddress(),
      replyTo: payload.email,
    })
  } catch (error) {
    console.error('request_access_email_send_failed', {
      dedupeHash,
      clientIp,
      emailDomain: payload.email.split('@')[1] ?? 'unknown',
      error: error instanceof Error ? error.message : 'unknown_error',
    })
    return internalErrorResponse()
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}

import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

const MIN_FILL_MS = 1500
const IP_WINDOW_MS = 60 * 60 * 1000
const IP_MAX = 10
const EMAIL_WINDOW_MS = 24 * 60 * 60 * 1000
const EMAIL_MAX = 5

type NewsletterPayload = {
  email: string
  website?: string
  startedAt: number
  timezoneOffset: number
  sourcePath?: string
}

type RateStore = {
  byIp: Map<string, number[]>
  byEmail: Map<string, number[]>
}

const globalStore = globalThis as typeof globalThis & {
  __newsletterRateStore?: RateStore
  __newsletterResend?: Resend
}

const rateStore: RateStore = globalStore.__newsletterRateStore ?? {
  byIp: new Map(),
  byEmail: new Map(),
}

globalStore.__newsletterRateStore = rateStore

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown'
  }

  return request.headers.get('x-real-ip')?.trim() || 'unknown'
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

  const allowedHosts = new Set<string>(['localhost:3000', 'localhost:3001', '127.0.0.1:3000', '127.0.0.1:3001'])

  const requestHost = getHostFromRequest(request).toLowerCase()
  if (requestHost) {
    allowedHosts.add(requestHost)
  }

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    try {
      allowedHosts.add(new URL(process.env.NEXT_PUBLIC_SITE_URL).host.toLowerCase())
    } catch {
      // Ignore invalid env and continue with known hosts.
    }
  }

  return allowedHosts.has(originHost)
}

function rateLimited(store: Map<string, number[]>, key: string, now: number, windowMs: number, max: number): boolean {
  const entries = store.get(key) ?? []
  const recent = entries.filter((ts) => now - ts < windowMs)

  if (recent.length >= max) {
    store.set(key, recent)
    return true
  }

  recent.push(now)
  store.set(key, recent)
  return false
}

function validation(message: string) {
  return NextResponse.json(
    {
      ok: false,
      code: 'validation_error',
      message,
    },
    { status: 400 },
  )
}

function tooMany() {
  return NextResponse.json(
    {
      ok: false,
      code: 'rate_limited',
      message: 'Too many requests. Try again later.',
    },
    { status: 429 },
  )
}

function internalError() {
  return NextResponse.json(
    {
      ok: false,
      code: 'internal_error',
      message: 'Something went wrong.',
    },
    { status: 500 },
  )
}

function parseAndValidate(input: unknown): NewsletterPayload | null {
  if (!input || typeof input !== 'object') {
    return null
  }

  const source = input as Partial<NewsletterPayload>
  const email = typeof source.email === 'string' ? source.email.trim().toLowerCase() : ''
  const website = typeof source.website === 'string' ? source.website.trim() : ''
  const sourcePath = typeof source.sourcePath === 'string' ? source.sourcePath.trim() : '/'

  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return null
  }

  if (typeof source.startedAt !== 'number' || !Number.isFinite(source.startedAt) || source.startedAt <= 0) {
    return null
  }

  if (typeof source.timezoneOffset !== 'number' || !Number.isFinite(source.timezoneOffset)) {
    return null
  }

  return {
    email,
    website,
    sourcePath,
    startedAt: source.startedAt,
    timezoneOffset: source.timezoneOffset,
  }
}

function isDuplicateContactError(name: string | undefined, message: string | undefined): boolean {
  if (!message) {
    return false
  }

  const normalized = message.toLowerCase()
  if (!normalized.includes('already')) {
    return false
  }

  return name === 'validation_error' || normalized.includes('contact') || normalized.includes('exists')
}

function getAudienceId(): string | null {
  const value =
    process.env.RESEND_NEWSLETTER_AUDIENCE_ID ??
    process.env.RESEND_AUDIENCE_ID ??
    process.env.RESEND_CONTACT_AUDIENCE_ID ??
    null

  return value?.trim() || null
}

function getSegmentId(): string | null {
  const value = process.env.RESEND_NEWSLETTER_SEGMENT_ID ?? process.env.RESEND_SEGMENT_ID ?? null
  return value?.trim() || null
}

function getNewsletterPropertyValue(): string {
  return process.env.RESEND_NEWSLETTER_PROPERTY ?? 'Arche_Newsletter'
}

function buildCreateContactPayload(payload: NewsletterPayload, audienceId: string | null, segmentId: string | null) {
  const base = {
    email: payload.email,
    unsubscribed: false,
    properties: {
      signup_source: getNewsletterPropertyValue(),
    },
  }

  // Segments are the current model in Resend; only use legacy audience mode when no segment is configured.
  if (segmentId) {
    return {
      ...base,
      segments: [{ id: segmentId }],
    }
  }

  return {
    ...base,
    audienceId: audienceId as string,
  }
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return validation('Invalid submission origin.')
  }

  let raw: unknown

  try {
    raw = await request.json()
  } catch {
    return validation('Invalid request payload.')
  }

  const payload = parseAndValidate(raw)
  if (!payload) {
    return validation('Please enter a valid email address.')
  }

  if (payload.website) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const now = Date.now()
  if (now - payload.startedAt < MIN_FILL_MS) {
    return validation('Please wait a moment before submitting.')
  }

  const ip = getClientIp(request)

  if (rateLimited(rateStore.byIp, ip, now, IP_WINDOW_MS, IP_MAX)) {
    return tooMany()
  }

  if (rateLimited(rateStore.byEmail, payload.email, now, EMAIL_WINDOW_MS, EMAIL_MAX)) {
    return tooMany()
  }

  const resendApiKey = process.env.RESEND_API_KEY
  const audienceId = getAudienceId()
  const segmentId = getSegmentId()

  if (!resendApiKey || (!audienceId && !segmentId)) {
    console.error('newsletter_subscription_config_missing', {
      hasResendApiKey: Boolean(resendApiKey),
      hasAudienceId: Boolean(audienceId),
      hasSegmentId: Boolean(segmentId),
    })
    return internalError()
  }

  const resend = globalStore.__newsletterResend ?? new Resend(resendApiKey)
  globalStore.__newsletterResend = resend

  try {
    const contactResult = await resend.contacts.create(buildCreateContactPayload(payload, audienceId, segmentId))

    if (contactResult.error) {
      if (isDuplicateContactError(contactResult.error.name, contactResult.error.message)) {
        return NextResponse.json({ ok: true }, { status: 200 })
      }

      console.error('newsletter_audience_subscribe_failed', {
        ip,
        emailDomain: payload.email.split('@')[1] ?? 'unknown',
        sourcePath: payload.sourcePath || '/',
        error: {
          name: contactResult.error.name,
          message: contactResult.error.message,
        },
      })
      return internalError()
    }
  } catch (error) {
    console.error('newsletter_audience_subscribe_failed', {
      ip,
      emailDomain: payload.email.split('@')[1] ?? 'unknown',
      sourcePath: payload.sourcePath || '/',
      error: error instanceof Error ? error.message : 'unknown_error',
    })
    return internalError()
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}

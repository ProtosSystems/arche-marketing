export const REQUEST_ACCESS_LIMITS = {
  fullName: { min: 2, max: 80 },
  email: { max: 254 },
  company: { max: 120 },
  role: { max: 120 },
  useCase: { min: 20, max: 2000 },
  volumeOrTimeline: { max: 800 },
  minFormFillMs: 2500,
} as const

export type RequestAccessPayload = {
  fullName: string
  email: string
  company: string
  role: string
  useCase: string
  volumeOrTimeline: string
  website: string
  startedAt: number
  timezoneOffset: number
}

export type RequestAccessValidationErrors = Partial<Record<keyof RequestAccessPayload, string>>

export type NormalizedRequestAccessPayload = RequestAccessPayload

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function cleanText(value: string): string {
  return value.trim()
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function asNumber(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : Number.NaN
}

export function validateAndNormalizeRequestAccessPayload(input: unknown): {
  data: NormalizedRequestAccessPayload | null
  errors: RequestAccessValidationErrors
} {
  const source = (typeof input === 'object' && input !== null ? input : {}) as Partial<RequestAccessPayload>

  const data: NormalizedRequestAccessPayload = {
    fullName: cleanText(asString(source.fullName)),
    email: cleanText(asString(source.email)).toLowerCase(),
    company: cleanText(asString(source.company)),
    role: cleanText(asString(source.role)),
    useCase: cleanText(asString(source.useCase)),
    volumeOrTimeline: cleanText(asString(source.volumeOrTimeline)),
    website: cleanText(asString(source.website)),
    startedAt: asNumber(source.startedAt),
    timezoneOffset: asNumber(source.timezoneOffset),
  }

  const errors: RequestAccessValidationErrors = {}

  if (data.fullName.length < REQUEST_ACCESS_LIMITS.fullName.min || data.fullName.length > REQUEST_ACCESS_LIMITS.fullName.max) {
    errors.fullName = `Full name must be ${REQUEST_ACCESS_LIMITS.fullName.min}-${REQUEST_ACCESS_LIMITS.fullName.max} characters.`
  }

  if (!data.email) {
    errors.email = 'Email is required.'
  } else if (data.email.length > REQUEST_ACCESS_LIMITS.email.max || !EMAIL_PATTERN.test(data.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (data.company.length > REQUEST_ACCESS_LIMITS.company.max) {
    errors.company = `Company must be ${REQUEST_ACCESS_LIMITS.company.max} characters or fewer.`
  }

  if (data.role.length > REQUEST_ACCESS_LIMITS.role.max) {
    errors.role = `Role must be ${REQUEST_ACCESS_LIMITS.role.max} characters or fewer.`
  }

  if (data.useCase.length < REQUEST_ACCESS_LIMITS.useCase.min || data.useCase.length > REQUEST_ACCESS_LIMITS.useCase.max) {
    errors.useCase = `Use case must be ${REQUEST_ACCESS_LIMITS.useCase.min}-${REQUEST_ACCESS_LIMITS.useCase.max} characters.`
  }

  if (data.volumeOrTimeline.length > REQUEST_ACCESS_LIMITS.volumeOrTimeline.max) {
    errors.volumeOrTimeline = `Volume/timeline must be ${REQUEST_ACCESS_LIMITS.volumeOrTimeline.max} characters or fewer.`
  }

  if (!Number.isFinite(data.startedAt) || data.startedAt <= 0) {
    errors.startedAt = 'Invalid submission metadata.'
  }

  if (!Number.isFinite(data.timezoneOffset) || data.timezoneOffset < -840 || data.timezoneOffset > 840) {
    errors.timezoneOffset = 'Invalid timezone metadata.'
  }

  if (Object.keys(errors).length > 0) {
    return { data: null, errors }
  }

  return { data, errors: {} }
}

export function normalizeTextForHash(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ')
}

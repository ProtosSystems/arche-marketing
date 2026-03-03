'use client'

import { Button } from '@/components/elements/button'
import {
  type RequestAccessPayload,
  type RequestAccessValidationErrors,
  validateAndNormalizeRequestAccessPayload,
} from '@/lib/request-access'
import { type FormEvent, useMemo, useState } from 'react'

type FormErrors = RequestAccessValidationErrors & {
  form?: string
}

const INPUT_CLASSNAME =
  'block w-full rounded-md bg-white px-3.5 py-2 text-base text-slate-900 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary dark:bg-white/5 dark:text-slate-100 dark:outline-white/10 dark:placeholder:text-slate-500 dark:focus:outline-mist-300'

function createInitialValues(): RequestAccessPayload {
  return {
    fullName: '',
    email: '',
    company: '',
    role: '',
    useCase: '',
    volumeOrTimeline: '',
    website: '',
    startedAt: Date.now(),
    timezoneOffset: new Date().getTimezoneOffset(),
  }
}

export function RequestAccessForm() {
  const [values, setValues] = useState<RequestAccessPayload>(() => createInitialValues())
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const isDisabled = useMemo(() => isSubmitting || isSuccess, [isSubmitting, isSuccess])

  const handleChange = <K extends keyof RequestAccessPayload>(key: K, value: RequestAccessPayload[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      if (!prev[key] && !prev.form) {
        return prev
      }
      return { ...prev, [key]: undefined, form: undefined }
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { errors: clientErrors } = validateAndNormalizeRequestAccessPayload(values)
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      const response = await fetch('/api/request-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const payload = (await response.json().catch(() => null)) as
        | {
            ok?: boolean
            code?: 'validation_error' | 'rate_limited' | 'internal_error'
            message?: string
            errors?: RequestAccessValidationErrors
          }
        | null

      if (response.ok && payload?.ok) {
        setIsSuccess(true)
        return
      }

      if (response.status === 400 && payload?.code === 'validation_error') {
        setErrors({
          ...payload.errors,
          form: payload.message ?? 'Please review your submission and try again.',
        })
        return
      }

      if (response.status === 429 && payload?.code === 'rate_limited') {
        setErrors({ form: payload.message ?? 'Too many requests. Try again later.' })
        return
      }

      setErrors({ form: payload?.message ?? 'Something went wrong.' })
    } catch {
      setErrors({ form: 'Network error. Please check your connection and try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-transparent">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl tracking-tight text-balance text-primary sm:text-5xl dark:text-slate-100">Request access</h1>
          <p className="mt-6 rounded-md border border-green-600/30 bg-green-600/10 p-4 text-sm font-medium text-green-900 dark:text-green-200">
            Thanks. We received your request and will follow up soon.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-transparent">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl tracking-tight text-balance text-primary sm:text-5xl dark:text-slate-100">Request access</h1>
        <p className="mt-6 text-lg/8 text-slate-700 dark:text-slate-300">
          Tell us how you plan to use Arche. We review every request manually.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20">
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm/6 font-semibold text-slate-900 dark:text-slate-100">
                Full name
              </label>
              <div className="mt-2.5">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  maxLength={80}
                  value={values.fullName}
                  onChange={(event) => handleChange('fullName', event.target.value)}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  className={INPUT_CLASSNAME}
                  disabled={isDisabled}
                />
              </div>
              {errors.fullName ? (
                <p id="fullName-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.fullName}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm/6 font-semibold text-slate-900 dark:text-slate-100">
                Work email
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  value={values.email}
                  onChange={(event) => handleChange('email', event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={INPUT_CLASSNAME}
                  disabled={isDisabled}
                />
              </div>
              {errors.email ? (
                <p id="email-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="company" className="block text-sm/6 font-semibold text-slate-900 dark:text-slate-100">
                Company
              </label>
              <div className="mt-2.5">
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  maxLength={120}
                  value={values.company}
                  onChange={(event) => handleChange('company', event.target.value)}
                  aria-invalid={Boolean(errors.company)}
                  aria-describedby={errors.company ? 'company-error' : undefined}
                  className={INPUT_CLASSNAME}
                  disabled={isDisabled}
                />
              </div>
              {errors.company ? (
                <p id="company-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.company}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="role" className="block text-sm/6 font-semibold text-slate-900 dark:text-slate-100">
                Role
              </label>
              <div className="mt-2.5">
                <input
                  id="role"
                  name="role"
                  type="text"
                  autoComplete="organization-title"
                  maxLength={120}
                  value={values.role}
                  onChange={(event) => handleChange('role', event.target.value)}
                  aria-invalid={Boolean(errors.role)}
                  aria-describedby={errors.role ? 'role-error' : undefined}
                  className={INPUT_CLASSNAME}
                  disabled={isDisabled}
                />
              </div>
              {errors.role ? (
                <p id="role-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.role}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="useCase" className="block text-sm/6 font-semibold text-slate-900 dark:text-slate-100">
                Use case
              </label>
              <div className="mt-2.5">
                <textarea
                  id="useCase"
                  name="useCase"
                  rows={5}
                  maxLength={2000}
                  value={values.useCase}
                  onChange={(event) => handleChange('useCase', event.target.value)}
                  aria-invalid={Boolean(errors.useCase)}
                  aria-describedby={errors.useCase ? 'useCase-error' : undefined}
                  className={INPUT_CLASSNAME}
                  disabled={isDisabled}
                />
              </div>
              {errors.useCase ? (
                <p id="useCase-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.useCase}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="volumeOrTimeline"
                className="block text-sm/6 font-semibold text-slate-900 dark:text-slate-100"
              >
                Volume or timeline (optional)
              </label>
              <div className="mt-2.5">
                <textarea
                  id="volumeOrTimeline"
                  name="volumeOrTimeline"
                  rows={3}
                  maxLength={800}
                  value={values.volumeOrTimeline}
                  onChange={(event) => handleChange('volumeOrTimeline', event.target.value)}
                  aria-invalid={Boolean(errors.volumeOrTimeline)}
                  aria-describedby={errors.volumeOrTimeline ? 'volumeOrTimeline-error' : undefined}
                  className={INPUT_CLASSNAME}
                  disabled={isDisabled}
                />
              </div>
              {errors.volumeOrTimeline ? (
                <p id="volumeOrTimeline-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.volumeOrTimeline}
                </p>
              ) : null}
            </div>

            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                autoComplete="off"
                tabIndex={-1}
                value={values.website}
                onChange={(event) => handleChange('website', event.target.value)}
              />
            </div>
          </div>

          {errors.form ? <p className="mt-6 text-sm text-red-600 dark:text-red-400">{errors.form}</p> : null}

          <div className="mt-10">
            <Button type="submit" size="lg" className="w-full" disabled={isDisabled}>
              {isSubmitting ? 'Submitting...' : 'Request access'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

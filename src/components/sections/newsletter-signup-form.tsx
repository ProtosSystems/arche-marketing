'use client'

import { useState } from 'react'

import { ArrowNarrowRightIcon } from '../icons/arrow-narrow-right-icon'

type NewsletterResponse = {
  ok?: boolean
  code?: 'validation_error' | 'rate_limited' | 'internal_error'
  message?: string
}

const MIN_SUBMIT_MS = 1500

export function NewsletterSignupForm() {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [startedAt] = useState(() => Date.now())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setSuccessMessage('')
    setErrorMessage('')

    if (!email.trim()) {
      setErrorMessage('Please enter an email address.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          website,
          startedAt,
          timezoneOffset: new Date().getTimezoneOffset(),
          sourcePath: typeof window !== 'undefined' ? window.location.pathname : '/',
        }),
      })

      const payload = (await response.json().catch(() => null)) as NewsletterResponse | null

      if (response.ok && payload?.ok) {
        setEmail('')
        setWebsite('')
        setSuccessMessage('Thanks. You are subscribed.')
        return
      }

      if (response.status === 429 && payload?.code === 'rate_limited') {
        setErrorMessage(payload.message ?? 'Too many requests. Try again later.')
        return
      }

      setErrorMessage(payload?.message ?? 'Something went wrong.')
    } catch {
      setErrorMessage('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="flex max-w-sm flex-col gap-2" onSubmit={handleSubmit} noValidate>
      <p>Stay in the loop</p>
      <div className="flex flex-col gap-4 text-slate-700 dark:text-slate-300">
        <p>Get customer support tips, product updates and customer stories that you can archive as soon as they arrive.</p>
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="newsletter-website">Website</label>
        <input
          id="newsletter-website"
          name="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>

      <div className="flex items-center border-b border-mist-950/20 py-2 has-[input:focus]:border-mist-950 dark:border-white/20 dark:has-[input:focus]:border-white">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          placeholder="Email"
          aria-label="Email"
          autoComplete="email"
          maxLength={254}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="flex-1 text-mist-950 focus:outline-hidden dark:text-white"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          aria-label="Subscribe"
          disabled={isSubmitting}
          className="relative inline-flex size-7 items-center justify-center rounded-full after:pointer-fine:hidden after:absolute after:-inset-2 hover:bg-mist-950/10 disabled:opacity-70 dark:hover:bg-white/10"
        >
          <ArrowNarrowRightIcon />
        </button>
      </div>

      {successMessage ? <p className="text-sm text-green-700 dark:text-green-300">{successMessage}</p> : null}
      {errorMessage ? <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p> : null}

      {Date.now() - startedAt < MIN_SUBMIT_MS ? <span className="sr-only">Preparing form</span> : null}
    </form>
  )
}

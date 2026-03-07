"use client"

import { clsx } from 'clsx/lite'
import { useEffect, useId, useRef, useState, type ComponentProps, type ReactNode } from 'react'
import { ThemeToggle } from '@/components/theme-toggle'

export function NavbarLink({
  children,
  href,
  className,
  ...props
}: { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <a
      href={href}
      className={clsx(
        'group inline-flex items-center justify-between gap-2 text-3xl/10 font-medium text-primary lg:text-sm/7 dark:text-white',
        className,
      )}
      {...props}
    >
      {children}
      <span className="inline-flex p-1.5 opacity-0 group-hover:opacity-100 lg:hidden">
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
          role="presentation"
          focusable="false"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </span>
    </a>
  )
}

export function NavbarLogo({ className, href, ...props }: { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
  return <a href={href} {...props} className={clsx('inline-flex items-stretch', className)} />
}

export function NavbarWithLinksActionsAndCenteredLogo({
  links,
  logo,
  actions,
  className,
  ...props
}: {
  links: ReactNode
  logo: ReactNode
  actions: ReactNode
} & ComponentProps<'header'>) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mobileMenuId = useId()
  const mobileMenuButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!mobileMenuOpen) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
        mobileMenuButtonRef.current?.focus()
      }
    }

    const previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousBodyOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [mobileMenuOpen])

  return (
    <header
      className={clsx('sticky top-0 z-10 bg-[var(--header-bg)] text-primary dark:text-white', className)}
      {...props}
    >
      <div className="mx-auto flex h-[5.25rem] max-w-7xl items-center gap-4 px-6 lg:px-10">
        <nav aria-label="Primary links" className="flex flex-1 gap-8 max-lg:hidden">
          {links}
        </nav>
        <div className="flex items-center">{logo}</div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="flex shrink-0 items-center gap-4">
            <ThemeToggle />
            {actions}
          </div>

          <button
            ref={mobileMenuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls={mobileMenuId}
            className="inline-flex rounded-full p-1.5 text-primary hover:bg-mist-950/10 lg:hidden dark:text-white dark:hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" role="presentation" focusable="false">
              <path
                fillRule="evenodd"
                d="M3.748 8.248a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75ZM3.748 15.75a.75.75 0 0 1 .75-.751h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div id={mobileMenuId} className="fixed inset-0 z-50 bg-[var(--header-bg)] px-6 py-6 lg:hidden lg:px-10">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="inline-flex rounded-full p-1.5 text-primary hover:bg-mist-950/10 dark:text-white dark:hover:bg-white/10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
                role="presentation"
                focusable="false"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav
            aria-label="Mobile primary links"
            className="mt-6 flex flex-col gap-6 pl-4"
            onClick={(event) => {
              if ((event.target as HTMLElement).closest('a')) {
                setMobileMenuOpen(false)
              }
            }}
          >
            {links}
          </nav>
          <div className="mt-8 flex items-center justify-between rounded-2xl border border-mist-200 px-4 py-3 dark:border-mist-800">
            <span className="text-sm font-medium text-primary dark:text-slate-300">Theme</span>
            <ThemeToggle />
          </div>
          <div className="mt-6">{actions}</div>
        </div>
      ) : null}
    </header>
  )
}

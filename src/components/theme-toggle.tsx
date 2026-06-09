'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/20/solid'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="inline-flex items-center justify-center rounded-full p-2 transition bg-transparent text-[var(--header-fg)] hover:bg-white/10"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
    >
      {isDark ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
    </button>
  )
}

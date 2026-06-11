'use client'

import { ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/20/solid'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

// Cycle: system → dark → light → system
const nextTheme = (current: string | undefined): string => {
  if (current === 'dark') return 'light'
  if (current === 'light') return 'system'
  return 'dark'
}

const ariaLabels: Record<string, string> = {
  system: 'Theme: auto (follows system). Click to force dark.',
  dark: 'Theme: dark. Click to force light.',
  light: 'Theme: light. Click to return to auto.',
}

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  if (!mounted) {
    return (
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-full p-2 transition bg-transparent text-[var(--header-fg)] hover:bg-white/10"
        aria-label="Toggle theme"
      >
        <MoonIcon className="size-4" />
      </button>
    )
  }

  const current = theme ?? 'system'
  const Icon = current === 'dark' ? SunIcon : current === 'light' ? MoonIcon : ComputerDesktopIcon

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme(current))}
      className="inline-flex items-center justify-center rounded-full p-2 transition bg-transparent text-[var(--header-fg)] hover:bg-white/10"
      aria-label={ariaLabels[current] ?? 'Toggle theme'}
      aria-pressed={current !== 'system'}
    >
      <Icon className="size-4" />
    </button>
  )
}

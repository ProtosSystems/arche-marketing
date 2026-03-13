"use client"

import { MoonIcon, SunIcon } from "@heroicons/react/20/solid"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center justify-center rounded-full bg-mist-100 p-2 text-zinc-700 transition hover:bg-mist-200 hover:text-zinc-900 dark:bg-primary dark:text-zinc-100 dark:hover:bg-[#243454] dark:hover:text-white"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
    >
      {isDark ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
    </button>
  )
}

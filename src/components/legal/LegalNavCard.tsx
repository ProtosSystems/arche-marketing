'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type LegalNavCardProps = {
  lastUpdated: string
}

const LEGAL_LINKS = [
  { href: '/legal/privacy', label: 'Privacy Policy' },
  { href: '/legal/terms', label: 'Terms of Service' },
  { href: '/legal/security', label: 'Security' },
]

export function LegalNavCard({ lastUpdated }: LegalNavCardProps) {
  const pathname = usePathname()

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50/80 p-8 shadow-sm dark:border-white/10 dark:bg-white/5">
      <p className="text-base/7 font-semibold text-[#3A4F7A] dark:text-mist-300">Legal</p>
      <h2 className="mt-2 text-3xl tracking-tight text-[#0F172A] sm:text-4xl dark:text-white">Arche API Legal</h2>
      <p className="mt-6 text-base/7 text-slate-700 dark:text-slate-300">
        Review the policies that govern how Arche API handles data, service use, and security practices for customers
        and developers.
      </p>

      <nav aria-label="Legal pages" className="mt-8">
        <ul role="list" className="space-y-2">
          {LEGAL_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    isActive
                      ? 'block rounded-md bg-[#3A4F7A]/15 px-3 py-2 text-sm font-semibold text-[#0F172A] dark:bg-[#3A4F7A]/30 dark:text-mist-300'
                      : 'block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-[#0F172A] dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
                  }
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <p className="mt-6 border-t border-slate-200 pt-4 text-sm text-slate-600 dark:border-white/10 dark:text-slate-400">
        Last updated: {lastUpdated}
      </p>
    </div>
  )
}

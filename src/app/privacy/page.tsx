import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Legacy Arche privacy policy route that permanently redirects to the current legal privacy page.',
  alternates: {
    canonical: '/legal/privacy',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function LegacyPrivacyPage() {
  redirect('/legal/privacy')
}

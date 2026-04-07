import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Legacy Arche refund policy route that permanently redirects to the current legal refund policy page.',
  alternates: {
    canonical: '/legal/refund-policy',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function LegacyRefundPolicyPage() {
  redirect('/legal/refund-policy')
}

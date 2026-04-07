import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Use Cases',
  description: 'Legacy Arche use case route that permanently redirects to the current case study page.',
  alternates: {
    canonical: '/case_study',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function Page() {
  redirect('/case_study')
}

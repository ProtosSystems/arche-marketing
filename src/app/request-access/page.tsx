import type { Metadata } from 'next'

import { Main } from '@/components/elements/main'
import { SiteFooter, SiteHeader } from '@/components/layout/site-chrome'
import { RequestAccessForm } from '@/components/sections/request-access-form'

export const metadata: Metadata = {
  title: 'Request Access',
  description:
    'Request access to Arche API and share your use case for versioned, auditable financial fundamentals infrastructure.',
  alternates: {
    canonical: '/request-access',
  },
}

export default function Page() {
  return (
    <>
      <SiteHeader />

      <Main>
        <RequestAccessForm />
      </Main>

      <SiteFooter />
    </>
  )
}

import type { Metadata } from 'next'

import { Main } from '@/components/elements/main'
import { SiteFooter, SiteHeader } from '@/components/layout/site-chrome'
import UseCaseFinancialTruthOverTime from '@/components/sections/financial-truth'

export const metadata: Metadata = {
  title: 'Use Cases',
  description:
    'Explore Arche use cases for deterministic financial statement history, explicit restatement modeling, and provenance-driven analytics.',
  alternates: {
    canonical: '/usecases',
  },
}

export default function Page() {
  return (
    <>
      <SiteHeader />

      <Main>
        <UseCaseFinancialTruthOverTime />
      </Main>

      <SiteFooter />
    </>
  )
}

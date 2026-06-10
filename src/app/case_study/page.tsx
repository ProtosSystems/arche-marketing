import type { Metadata } from 'next'

import { Main } from '@/components/elements/main'
import { SiteFooter, SiteHeader } from '@/components/layout/site-chrome'
import UseCaseFinancialTruthOverTime from '@/components/sections/financial-truth'

export const metadata: Metadata = {
  title: 'Case Study: When Financial History Changes',
  description:
    'A demo-centered case study showing how Arche preserves original financial disclosures, amendments and point-in-time truth.',
  alternates: {
    canonical: '/case_study',
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

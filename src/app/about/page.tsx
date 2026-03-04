import type { Metadata } from 'next'

import { Main } from '@/components/elements/main'
import { SiteFooter, SiteHeader } from '@/components/layout/site-chrome'
import AboutSection from '@/components/sections/about-section'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Arche API and Protos Systems, and why deterministic, versioned financial fundamentals infrastructure was built.',
  alternates: {
    canonical: '/about',
  },
}

export default function Page() {
  return (
    <>
      <SiteHeader />

      <Main>
        <AboutSection />
      </Main>

      <SiteFooter />
    </>
  )
}

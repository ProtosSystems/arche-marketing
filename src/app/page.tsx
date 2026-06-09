import type { Metadata } from 'next'

import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Main } from '@/components/elements/main'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { SiteFooter, SiteHeader } from '@/components/layout/site-chrome'
import ArcheCapabilities from '@/components/sections/arche-capabilities'
import { ArcheComparisonTable } from '@/components/sections/arche-comparison-table'
import ArcheFeatures from '@/components/sections/arche-features'
import { HeroTwoColumnWithPhoto } from '@/components/sections/hero-two-column-with-photo'
import { HeroVersionedTimelineCard } from '@/components/sections/hero-versioned-timeline-card'
import InvestmentWorkflows from '@/components/sections/investment-workflows'
import WhyArcheExists from '@/components/sections/why-arche-exists'

export const metadata: Metadata = {
  title: 'Arche API',
  description:
    'Versioned, auditable financial fundamentals infrastructure for deterministic as-of queries, explicit restatement deltas, and provenance-first workflows.',
  alternates: {
    canonical: '/',
  },
}

export default function Page() {
  return (
    <>
      <SiteHeader />

      <Main>
        <HeroTwoColumnWithPhoto
          id="hero"
          eyebrow={
            <a
              href="https://www.protos.fi/blog/introducing-arche-deterministic-edgar-intelligence-for-developers"
              className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-0.5 text-sm/6 font-normal text-white hover:bg-white/25"
            >
              Introducing Arche
              <svg viewBox="0 0 20 20" fill="currentColor" className="size-4" aria-hidden="true"><path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" /></svg>
            </a>
          }
          headline="Normalized.  Point-in-time.  Fully auditable."
          subheadline={
            <div className="space-y-4">
              <p>
                Arche transforms SEC EDGAR filings into versioned financial statements with restatement lineage, per-fact provenance, and hash-verified integrity. Investment teams and AI agents get data they can build on and defend.
              </p>
            </div>
          }
          cta={
            <div className="flex items-center gap-4">
              <ButtonLink href="/request-access" size="lg" color="light">
                Request Early Access
              </ButtonLink>

              <PlainButtonLink href="https://docs.arche.fi" size="lg" color="light">
                View the API documentation <ArrowNarrowRightIcon />
              </PlainButtonLink>
            </div>
          }
          photo={
            <div className="flex w-full items-center justify-center p-8">
              <HeroVersionedTimelineCard />
            </div>
          }
        />

        <InvestmentWorkflows />

        <WhyArcheExists />

        <ArcheFeatures />
        <ArcheComparisonTable />
        <ArcheCapabilities />
      </Main>

      <SiteFooter />
    </>
  )
}

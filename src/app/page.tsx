import type { Metadata } from 'next'

import { AnnouncementBadge } from '@/components/elements/announcement-badge'
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
            <AnnouncementBadge
              href="https://www.protos.fi/blog/introducing-arche-deterministic-edgar-intelligence-for-developers"
              text="Introducing Arche"
              cta="Learn more"
              className="[&>span:first-child]:font-normal [&>span:last-child]:font-normal"
            />
          }
          headline="Accurate data, competitive edge"
          subheadline={
            <div className="space-y-4">
              <p>
                Arche gives investment teams point-in-time, versioned financial data with a full audit trail. Clean data means tighter
                models, reproducible results and numbers that check out.
              </p>
            </div>
          }
          cta={
            <div className="flex items-center gap-4">
              <ButtonLink href="/request-access" size="lg">
                Request Early Access
              </ButtonLink>

              <PlainButtonLink href="https://docs.arche.fi" size="lg">
                View the API documentation <ArrowNarrowRightIcon />
              </PlainButtonLink>
            </div>
          }
          photo={
            <div className="flex w-full items-center justify-center bg-[var(--header-bg)] p-8">
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

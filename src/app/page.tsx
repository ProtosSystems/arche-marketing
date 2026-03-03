import { AnnouncementBadge } from '@/components/elements/announcement-badge'
import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { Main } from '@/components/elements/main'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { SiteFooter, SiteHeader } from '@/components/layout/site-chrome'
import {HeroTwoColumnWithPhoto} from "@/components/sections/hero-two-column-with-photo";
import {HeroVersionedTimelineCard} from "@/components/sections/hero-versioned-timeline-card";
import WhyArcheExists from "@/components/sections/why-arche-exists";
import ArcheFeatures from "@/components/sections/arche-features";
import ArcheCapabilities from "@/components/sections/arche-capabilities";
import { ArcheComparisonTable } from "@/components/sections/arche-comparison-table";


export default function Page() {
  return (
    <>
      <SiteHeader />

      <Main>
        {/* Hero */}
        <HeroTwoColumnWithPhoto
          id="hero"
          eyebrow={<AnnouncementBadge href="#" text="Introducing Arche" cta="Learn more" />}
          headline="Financial fundamentals you can defend."
          subheadline={
            <div className="space-y-4">
              <p>
                  Arche is built for teams whose numbers must hold up under scrutiny across models,
                  audits, disclosures and internal review. No silent changes.
                  No unverifiable results.

              </p>
            </div>
          }
          cta={
            <div className="flex items-center gap-4">
              <ButtonLink href="/request-access" size="lg">
                Request access
              </ButtonLink>

              <PlainButtonLink href="#" size="lg">
                View the API documentation <ArrowNarrowRightIcon />
              </PlainButtonLink>
            </div>
          }
          photo={
              <div
                  className="
      flex w-full items-center justify-center p-8
      bg-[var(--header-bg)]
    "
              >
                  <HeroVersionedTimelineCard/>
              </div>
          }
        />

          <WhyArcheExists/>

          <ArcheFeatures />
          <ArcheComparisonTable />
          <ArcheCapabilities />

      </Main>

      <SiteFooter />
    </>
  )
}

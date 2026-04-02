import type { Metadata } from 'next'

import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { Main } from '@/components/elements/main'
import { Eyebrow } from '@/components/elements/eyebrow'
import { SiteFooter, SiteHeader } from '@/components/layout/site-chrome'
import { CheckIcon } from '@heroicons/react/20/solid'
import { CircleStackIcon, ClockIcon, CpuChipIcon, DocumentDuplicateIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Contract-first pricing for Arche API with deterministic fundamentals infrastructure, coverage-based licensing, and no usage-based overages.',
  alternates: {
    canonical: '/pricing',
  },
}

const licenseFeatures = [
  {
    name: 'Deterministic API behavior',
    description: 'Stable schemas, ordering and error semantics.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Point-in-time retrieval',
    description: 'Query fundamentals exactly as they were known at a specific moment in time.',
    icon: ClockIcon,
  },
  {
    name: 'Built for AI and research workflows',
    description: 'Designed for model pipelines and systems requiring reproducible financial data.',
    icon: CpuChipIcon,
  },
  {
    name: 'Preserved statement history',
    description: 'Restatements create new records, not overwrites.',
    icon: DocumentDuplicateIcon,
  },
]

const features = [
  {
    name: 'Deterministic “as-of” resolution',
    description:
      'The same query always returns the same result for a given point in time.',
  },
  {
    name: 'Preserved restatement history',
    description:
      'Historical values are never overwritten-only versioned.',
  },
  {
    name: 'Contract-first API surface',
    description:
      'Stable, documented behavior with explicit guarantees.',
  },
  {
    name: 'Built as infrastructure',
    description:
      'Arche is not a terminal. It is a financial data layer for systems that require correctness.',
  },
]

export default function Page() {
  return (
    <>
      <SiteHeader />

      <Main>
        <div className="bg-white py-24 dark:bg-transparent sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl">
              <h1 className="text-4xl font-normal tracking-tight text-pretty text-primary sm:text-5xl sm:text-balance dark:text-slate-100">
                Pricing for audit-grade financial data infrastructure
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-pretty text-slate-700 sm:text-xl/8 dark:text-slate-300">
                Arche is licensed as financial data infrastructure. Pricing is based on coverage and historical depth, not usage.
              </p>
              <p className="mt-4 max-w-2xl text-base/7 text-slate-700 dark:text-slate-300">
                Currently onboarding early customers. Access is granted based on use case and dataset scope.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <ButtonLink href="/request-access" size="lg">
                  Request Early Access
                </ButtonLink>
                <PlainButtonLink href="https://docs.arche.fi" size="lg">
                  View the API documentation <ArrowNarrowRightIcon />
                </PlainButtonLink>
              </div>
            </div>
            <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mx-0 lg:max-w-none">
              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-16 px-8 py-10 sm:gap-y-20 sm:px-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                <div className="col-span-2">
                  <Eyebrow>Arche Research License</Eyebrow>
                  <p className="mt-2 text-4xl font-normal tracking-tight text-pretty text-primary sm:text-5xl dark:text-slate-100">
                    Flat, coverage-based licensing
                  </p>
                  <p className="mt-6 text-base/7 text-slate-700 dark:text-slate-300">
                    A license for users that require point-in-time fundamentals with preserved history. Arche is designed for
                    reproducibility, defensibility and long-lived integration.
                  </p>
                </div>
                <dl className="col-span-3 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
                  {licenseFeatures.map((feature) => (
                    <div key={feature.name}>
                      <dt className="text-base/7 font-semibold text-slate-900 dark:text-white">
                        <div className="mb-6 flex size-10 items-center justify-center rounded-lg bg-white dark:bg-[#0F172A]">
                          <feature.icon aria-hidden="true" className="size-6 text-[#0F172A] dark:text-white" />
                        </div>
                        {feature.name}
                      </dt>
                      <dd className="mt-1 text-base/7 text-slate-700 dark:text-slate-300">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white pt-6 pb-28 dark:bg-transparent sm:pt-8 sm:pb-36">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              <div className="col-span-2">
                <Eyebrow>Why Arche is licensed this way</Eyebrow>
                <p className="mt-2 text-4xl font-normal tracking-tight text-pretty text-primary sm:text-5xl dark:text-slate-100">
                  Reproducibility by design
                </p>
                <p className="mt-6 text-base/7 text-slate-700 dark:text-slate-300">
                  Financial data should not drift. Arche ensures consistent outputs across time and systems.
                </p>
              </div>
              <dl className="col-span-3 grid grid-cols-1 gap-x-8 gap-y-10 text-base/7 text-slate-700 dark:text-slate-300 sm:grid-cols-2 lg:gap-y-16">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="font-semibold text-slate-900 dark:text-slate-100">
                      <CheckIcon role="presentation" focusable="false" className="absolute top-1 left-0 size-5 text-[#0F172A] dark:text-mist-300" />
                      {feature.name}
                    </dt>
                    <dd className="mt-2">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

      </Main>

      <SiteFooter cta={null} />
    </>
  )
}

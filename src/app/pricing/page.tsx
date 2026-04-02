import type { Metadata } from 'next'

import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { Main } from '@/components/elements/main'
import { Eyebrow } from '@/components/elements/eyebrow'
import { SiteFooter, SiteHeader } from '@/components/layout/site-chrome'
import { CheckIcon } from '@heroicons/react/20/solid'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Contract-first pricing for Arche API with deterministic fundamentals infrastructure, coverage-based licensing, and no usage-based overages.',
  alternates: {
    canonical: '/pricing',
  },
}

const features = [
  {
    name: 'Point-in-time retrieval',
    description: 'Query fundamentals exactly as they were known at a specific moment in time.',
  },
  {
    name: 'Deterministic behavior',
    description: 'Stable schemas, ordering and error semantics. The same query returns the same result.',
  },
  {
    name: 'Preserved statement history',
    description: 'Historical values are never overwritten. Restatements create new versions.',
  },
  {
    name: 'Reproducible systems',
    description: 'Designed for research workflows, model pipelines and systems that require consistent outputs.',
  },
  {
    name: 'Contract-first API',
    description: 'Explicit, documented behavior with stable guarantees.',
  },
  {
    name: 'Built as infrastructure',
    description: 'Arche is not a terminal. It is a financial data layer for systems that require correctness.',
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
              <div className="mx-auto max-w-2xl lg:mx-0">
                <Eyebrow>Arche Research License</Eyebrow>
                <p className="mt-2 text-4xl font-normal tracking-tight text-pretty text-primary sm:text-5xl dark:text-slate-100">
                  Flat, coverage-based licensing
                </p>
                <p className="mt-6 text-lg/8 text-slate-700 dark:text-slate-300">
                  A license for teams that require point-in-time fundamentals with preserved history, deterministic retrieval, and
                  long-lived integration.
                </p>
                <p className="mt-6 text-base/7 text-slate-700 dark:text-slate-300">
                  Licensing is scoped by company universe and historical depth, not API usage.
                </p>
                <p className="mt-10 text-sm/7 font-semibold text-accent dark:text-mist-300">
                  What this enables:
                </p>
              </div>
              <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base/7 text-slate-700 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-16 dark:text-slate-300">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-slate-900 dark:text-white">
                      <CheckIcon role="presentation" focusable="false" className="absolute top-1 left-0 size-5 text-[#0F172A] dark:text-mist-300" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

      </Main>

      <SiteFooter />
    </>
  )
}

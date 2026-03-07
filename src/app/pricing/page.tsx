import type { Metadata } from 'next'

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

const includedFeatures = [
  'Point-in-time queries (“as-of” dates) designed to eliminate look-ahead bias',
  'Full statement version and restatement history (no overwriting)',
  'Deterministic API behavior: stable schemas, ordering, and error semantics',
  'Provenance-first outputs suitable for research and audit workflows',
]

const features = [
  {
    name: 'Deterministic “as-of” resolution',
    description:
      'Query fundamentals exactly as they were known at a specific point in time. The same inputs resolve to the same output.',
  },
  {
    name: 'Restatement and version preservation',
    description:
      'Every statement version is retained. Restatements create new records; historical values are not replaced.',
  },
  {
    name: 'Contract-first API surface',
    description:
      'Stable, documented behavior with explicit error semantics. If it is not documented, it is not promised.',
  },
  {
    name: 'Reproducible research workflows',
    description:
      'Built for backtests and model evaluation where reproducibility matters more than convenience shortcuts.',
  },
  {
    name: 'Defined coverage, not usage pricing',
    description:
      'Licenses are scoped by coverage (universe and historical depth), not by API calls, credits, or overages.',
  },
  {
    name: 'Integration-ready by default',
    description:
      'Designed to be embedded into internal systems and pipelines with predictable behavior and long-lived contracts.',
  },
  {
    name: 'Operational clarity',
    description:
      'Clear failure modes and predictable semantics so you can build dependable systems on top of the API.',
  },
  {
    name: 'Built as infrastructure',
    description:
      'Arche is not a terminal. It is a data layer for teams that need defensible historical fundamentals.',
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
              <h1 className="text-4xl tracking-tight text-pretty text-primary sm:text-5xl sm:text-balance dark:text-slate-100">
                Simple, contract-first pricing
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-pretty text-slate-700 sm:text-xl/8 dark:text-slate-300">
                Arche is licensed as financial data infrastructure: flat, predictable, and scoped by coverage not usage. No credits,
                overages or pricing tricks.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 dark:bg-gray-800/50 dark:ring-white/10 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
              <div className="p-8 sm:p-10 lg:flex-auto">
                <h2 className="text-2xl tracking-tight text-primary sm:text-3xl dark:text-slate-100">Arche Research License</h2>
                <p className="mt-6 text-base/7 text-slate-700 dark:text-slate-300">
                  A single license for teams that require point-in-time fundamentals with preserved history. Arche is designed for
                  reproducibility, defensibility and long-lived integration.
                </p>
                <div className="mt-10 flex items-center gap-x-4">
                  <h3 className="flex-none text-sm/6 font-semibold text-[#3A4F7A] dark:text-mist-300">What’s included</h3>
                  <div className="h-px flex-auto bg-slate-200/70 dark:bg-white/10" />
                </div>
                <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm/6 text-slate-700 dark:text-slate-300 sm:grid-cols-2 sm:gap-6">
                  {includedFeatures.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon role="presentation" focusable="false" className="h-6 w-5 flex-none text-[#3A4F7A] dark:text-mist-300" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:shrink-0">
                <div className="rounded-2xl bg-gray-50 py-10 text-center inset-ring inset-ring-gray-900/5 dark:bg-gray-900 dark:inset-ring-white/10 lg:flex lg:flex-col lg:justify-center lg:py-16">
                  <div className="mx-auto max-w-xs px-8">
                    <p className="text-base font-semibold text-slate-600 dark:text-slate-400">Flat monthly license</p>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                      <span className="text-5xl font-semibold tracking-tight text-primary dark:text-slate-100">$1,200</span>
                      <span className="text-sm/6 font-semibold tracking-wide text-slate-600 dark:text-slate-400">USD</span>
                    </p>
                    <p className="mt-2 text-sm/6 text-slate-600 dark:text-slate-400">$14,400 annually</p>
                    <a
                      href="/request-access"
                      className="mt-10 block w-full rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/30 dark:bg-[#3A4F7A] dark:text-white dark:hover:bg-[#4D6391] dark:focus-visible:outline-[#3A4F7A]"
                    >
                      {' '}
                      Request access{' '}
                    </a>
                    <p className="mt-6 text-xs/5 text-slate-600 dark:text-slate-400">
                      Coverage is defined at onboarding (universe and historical depth). Invoices and receipts available for company
                      reimbursement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-6 dark:bg-transparent sm:py-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              <div className="col-span-2">
                <Eyebrow>What you get</Eyebrow>
                <p className="mt-2 text-4xl tracking-tight text-pretty text-primary sm:text-5xl dark:text-slate-100">
                  Built for reproducibility
                </p>
                <p className="mt-6 text-base/7 text-slate-700 dark:text-slate-300">
                  Arche is designed from first principles around determinism and provenance. The goal is simple: historical
                  fundamentals that do not drift, so research and systems remain defensible over time.
                </p>
              </div>
              <dl className="col-span-3 grid grid-cols-1 gap-x-8 gap-y-10 text-base/7 text-slate-700 dark:text-slate-300 sm:grid-cols-2 lg:gap-y-16">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="font-semibold text-slate-900 dark:text-slate-100">
                      <CheckIcon role="presentation" focusable="false" className="absolute top-1 left-0 size-5 text-[#3A4F7A] dark:text-mist-300" />
                      {feature.name}
                    </dt>
                    <dd className="mt-2">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-transparent">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
            <h2 className="max-w-2xl text-4xl tracking-tight text-primary sm:text-5xl dark:text-slate-100">
              Ready to dive in?
              <br />
              Evaluate Arche today.
            </h2>
            <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:shrink-0">
              <a
                href="/request-access"
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/30 dark:bg-[#3A4F7A] dark:text-white dark:hover:bg-[#4D6391] dark:focus-visible:outline-[#3A4F7A]"
              >
                {' '}
                Request access{' '}
              </a>
              <a href="https://docs.arche.fi" className="text-sm/6 font-semibold text-slate-900 hover:opacity-80 dark:text-slate-100">
                Read API documentation
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </Main>

      <SiteFooter />
    </>
  )
}

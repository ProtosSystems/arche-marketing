import { CheckCircleIcon, CloudArrowUpIcon, LockClosedIcon, ServerIcon, XMarkIcon } from '@heroicons/react/20/solid'

import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'
import AxonRestatementDemo from '@/components/sections/axon-restatement-demo'

const capabilities = [
  {
    name: 'Deterministic as-of snapshots',
    description:
      'Rebuild a historical view from the versions that were actually available at that moment, even after later amendments arrive.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Explicit restatement deltas',
    description:
      'Compare original and amended statements directly to see which line items changed, by how much, and what that does to the model.',
    icon: LockClosedIcon,
  },
  {
    name: 'Traceable provenance',
    description:
      'Carry the lineage from filing to extracted fact to versioned assertion so analytical outputs remain explainable and reviewable.',
    icon: ServerIcon,
  },
]

const latestOnlyFailures = [
  {
    name: 'Backtests drift',
    description:
      'Run the same model months apart and the results change, not because the model changed, but because the historical inputs did.',
  },
  {
    name: 'Risk models cannot be reproduced',
    description: 'You cannot reconstruct what your system concluded on a specific date.',
  },
  {
    name: 'Audit trails disappear',
    description: 'When the underlying data changes, the reasoning behind decisions becomes impossible to explain.',
  },
]

export default function UseCaseFinancialTruthOverTime() {
  return (
    <div className="bg-white dark:bg-transparent">
      <section
        id="hero"
        aria-labelledby="case-study-title"
        className="bg-[var(--header-bg)] pt-24 pb-16 border-b border-[var(--header-border)] sm:pt-32 sm:pb-24"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-4xl">
            <Eyebrow className="!text-mist-300">CASE STUDY</Eyebrow>
            <Heading id="case-study-title" color="header" className="mt-3 max-w-5xl">
              Restatements&nbsp;shouldn&apos;t rewrite history
            </Heading>
            <p className="mt-6 max-w-3xl text-xl/8 text-[var(--header-fg-muted)]">
              Most financial APIs overwrite earlier filings when amendments arrive. Arche preserves each disclosure as
              it originally existed, then stores amendments as new versions.
            </p>
            <p className="mt-6 max-w-3xl text-xl/8 text-[var(--header-fg-muted)]">
              That means you can reconstruct exactly what a model could have known at any point in time.
            </p>
            <p className="mt-6 max-w-3xl text-xl/8 text-[var(--header-fg-muted)]">
              Let&apos;s examine the model impact when data systems overwrite history instead.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pt-0 pb-12 lg:px-8 sm:pb-16">
        <section
          aria-labelledby="real-world-incident-title"
          className="relative isolate overflow-hidden bg-white px-6 py-20 sm:py-24 lg:px-0 dark:bg-gray-900"
        >
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="lg:max-w-lg">
                  <Eyebrow>The real-world incident</Eyebrow>
                  <h2
                    id="real-world-incident-title"
                    className="mt-2 text-4xl font-normal tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white"
                  >
                    Axon Enterprise&apos;s 2025 Amendment
                  </h2>
                  <p className="mt-6 text-xl/8 text-gray-700 dark:text-gray-300">
                    Axon&apos;s 2025 amendment shows the failure mode clearly: the same company and the same reporting
                    period can produce different model inputs depending on whether your system preserves what was known
                    at the time.
                  </p>
                </div>
              </div>
            </div>
            <div className="-mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-2xl font-semibold tracking-tight text-primary dark:text-slate-100">
                      Original state of record
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      The market view immediately after the original 10-K was filed on February 28, 2025.
                    </p>
                  </div>
                  <span className="rounded-full border border-slate-200 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 dark:border-gray-600 dark:text-slate-300">
                    Before restatement
                  </span>
                </div>

                <div className="mt-6 grid gap-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">
                        Principal amount
                      </p>
                      <p className="mt-2 text-3xl tracking-tight text-slate-900 dark:text-slate-100">
                        $690.0M
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">
                        Carrying value
                      </p>
                      <p className="mt-2 text-3xl tracking-tight text-slate-900 dark:text-slate-100">
                        $680.289M
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">
                      Debt classification
                    </p>
                    <p className="mt-2 text-base text-slate-900 dark:text-slate-100">
                      Long-term convertible notes: $680.289M
                    </p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      Balance-sheet carrying value tied to the $690.0M principal amount.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">
                        Current liabilities
                      </p>
                      <p className="mt-2 text-2xl tracking-tight text-slate-900 dark:text-slate-100">
                        $997.586M
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">
                        Working capital
                      </p>
                      <p className="mt-2 text-2xl tracking-tight text-slate-900 dark:text-slate-100">
                        $1.300B
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">
                        Current ratio
                      </p>
                      <p className="mt-2 text-2xl tracking-tight text-slate-900 dark:text-slate-100">
                        2.30x
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="max-w-xl text-base/7 text-gray-600 lg:max-w-lg dark:text-gray-300">
                  <p>
                    In February 2025, Axon Enterprise filed its annual report showing roughly $690 million of
                    convertible notes classified as long-term debt.
                  </p>
                  <ul role="list" className="mt-8 space-y-6 text-gray-600 dark:text-gray-300">
                    <li className="flex gap-x-3">
                      <CheckCircleIcon
                        aria-hidden="true"
                        focusable="false"
                        className="mt-1 size-5 flex-none text-[#0F172A] dark:text-mist-300"
                      />
                      <span>Liquidity ratios looked strong.</span>
                    </li>
                    <li className="flex gap-x-3">
                      <CheckCircleIcon
                        aria-hidden="true"
                        focusable="false"
                        className="mt-1 size-5 flex-none text-[#0F172A] dark:text-mist-300"
                      />
                      <span>Working capital appeared comfortable.</span>
                    </li>
                  </ul>
                  <div className="mt-8 space-y-6">
                    <p>
                      <strong className="font-semibold text-gray-900 dark:text-white">
                        Two months later, the company filed an amendment.
                      </strong>{' '}
                      The same $690 million was reclassified as current liabilities. Nothing about the company changed,
                      only the accounting classification.
                    </p>
                    <p>
                      <strong className="font-semibold text-gray-900 dark:text-white">
                        But that single change materially altered the balance sheet.
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AxonRestatementDemo />

        <section
          aria-labelledby="latest-only-systems-title"
          className="border-t border-slate-200 px-6 py-20 lg:px-0 sm:py-24 dark:border-slate-800"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              <div className="col-span-2">
              <p className="text-sm/7 font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-mist-300">
                WHAT LATEST-ONLY SYSTEMS GET WRONG
              </p>
              <h2
                id="latest-only-systems-title"
                className="mt-2 text-4xl font-normal tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white"
              >
                Latest-only systems leak amended data backward
              </h2>
              <p className="mt-6 text-lg/8 text-gray-600 dark:text-gray-300">
                If the original filing is overwritten, a model rerun against March 2025 will silently use information
                that was not public until the May 2025 amendment. That is look-ahead bias.
              </p>
              </div>
              <dl className="col-span-3 grid grid-cols-1 gap-x-8 gap-y-10 text-base/7 text-gray-600 sm:grid-cols-2 lg:gap-y-16 dark:text-gray-300">
                {latestOnlyFailures.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="text-gray-900 dark:text-white">
                      <XMarkIcon
                        aria-hidden="true"
                        focusable="false"
                        className="absolute top-1 left-0 size-5 text-red-600 dark:text-red-400"
                      />
                      {feature.name}
                    </dt>
                    <dd className="mt-2">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="financial-truth-model-title"
          className="border-t border-slate-200 py-20 sm:py-24 dark:border-slate-800"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
            <Eyebrow>How Arche models financial truth</Eyebrow>
            <h2
              id="financial-truth-model-title"
              className="mt-2 text-4xl font-normal tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white"
            >
              Arche treats every financial statement as a versioned assertion
            </h2>
            <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
              When a filing arrives, its facts are stored exactly as disclosed. When an amendment appears, the updated
              version is stored alongside it, not instead of it. This allows financial data to be queried exactly as
              it existed at any point in time, while still making change explicit.
            </p>
            </div>
            <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base/7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-16 dark:text-gray-300">
              {capabilities.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900 dark:text-white">
                    <feature.icon
                      aria-hidden="true"
                      focusable="false"
                      className="absolute top-1 left-1 size-5 text-[#0F172A] dark:text-mist-300"
                    />
                    {feature.name}.
                  </dt>{' '}
                  <dd className="inline">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </div>
    </div>
  )
}

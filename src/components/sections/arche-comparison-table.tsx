"use client"

import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'
import { Container } from '../elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'

const tiers = [
  {
    name: 'Fancy Terminals',
    description: '',
    featured: false,
  },
  {
    name: 'Arche',
    description: '',
    featured: true,
  },
  {
    name: 'Consumer APIs',
    description: '',
    featured: false,
  },
] as const

type TierName = (typeof tiers)[number]['name']
type TierValue = boolean | string
type ComparisonSection = {
  name: string
  features: Array<{
    name: string
    tiers: Record<TierName, TierValue>
  }>
}

const sections: ComparisonSection[] = [
  {
    name: 'Capabilities',
    features: [
      { name: 'Point-in-time queries', tiers: { 'Fancy Terminals': true, 'Consumer APIs': false, Arche: true } },
      { name: 'Restatement lineage', tiers: { 'Fancy Terminals': true, 'Consumer APIs': 'Partial', Arche: true } },
      { name: 'Accounting reconciliation', tiers: { 'Fancy Terminals': 'Manual', 'Consumer APIs': false, Arche: 'Automatic' } },
      { name: 'MCP/AI-native interface', tiers: { 'Fancy Terminals': false, 'Consumer APIs': false, Arche: true } },
      { name: 'Full audit trail', tiers: { 'Fancy Terminals': true, 'Consumer APIs': false, Arche: true } },
      {
        name: 'Valuation-grade precision',
        tiers: { 'Fancy Terminals': true, 'Consumer APIs': 'Varies', Arche: 'Yes (Decimal 38,6)' },
      },
    ],
  },
]

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function ArcheComparisonTable({ className, ...props }: ComponentProps<'section'>) {
  return (
    <section className={clsx('relative bg-white pt-12 pb-16 sm:pt-16 sm:pb-20 dark:bg-transparent', className)} {...props}>
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <Eyebrow>The Arche difference</Eyebrow>
          <h2 className="mt-2 text-4xl font-normal tracking-tight text-primary sm:text-5xl dark:text-white">
            What makes Arche different
          </h2>
          <p className="mt-4 text-lg/8 text-slate-700 dark:text-slate-300">
            Built for quant teams, valuation workflows and AI research systems that need data they can trust.
          </p>
        </div>

        <div className="mt-10">
          {/* Feature comparison (up to lg) */}
          <section aria-labelledby="mobile-comparison-heading" className="lg:hidden">
            <h3 id="mobile-comparison-heading" className="sr-only">
              Feature comparison
            </h3>

            <div className="mx-auto max-w-2xl space-y-16">
              {tiers.map((tier) => (
                <div key={tier.name} className="border-t border-gray-900/10 dark:border-white/10">
                  <div
                    className={classNames(
                      tier.featured ? 'border-[#3A4F7A] dark:border-mist-300' : 'border-transparent',
                      '-mt-px w-72 border-t-2 pt-10 md:w-80',
                    )}
                  >
                    <h4
                      className={classNames(
                        tier.featured ? 'text-[#3A4F7A] dark:text-mist-300' : 'text-gray-900 dark:text-white',
                        'text-sm/6 font-semibold',
                      )}
                    >
                      {tier.name}
                    </h4>
                    {tier.description ? (
                      <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">{tier.description}</p>
                    ) : null}
                  </div>

                  <div className="mt-10 space-y-10">
                    {sections.map((section) => (
                      <div key={section.name}>
                        <h5 className="text-sm/6 font-semibold text-gray-900 dark:text-white">{section.name}</h5>
                        <div className="relative mt-6">
                          {/* Fake card background */}
                          <div
                            aria-hidden="true"
                            className="absolute inset-y-0 right-0 hidden w-1/2 rounded-lg bg-white shadow-xs sm:block dark:bg-gray-800/50 dark:shadow-none"
                          />

                          <div
                            className={classNames(
                              tier.featured
                                ? 'ring-2 ring-[#3A4F7A] dark:ring-mist-300'
                                : 'ring-1 ring-mist-950/10 dark:ring-white/10',
                              'relative rounded-lg bg-white shadow-xs sm:rounded-none sm:bg-transparent sm:shadow-none sm:ring-0 dark:bg-mist-950/40 dark:shadow-none dark:sm:bg-transparent',
                            )}
                          >
                            <dl className="divide-y divide-gray-200 text-sm/6 dark:divide-white/10">
                              {section.features.map((feature) => (
                                <div
                                  key={feature.name}
                                  className="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0"
                                >
                                  <dt className="pr-4 text-gray-600 dark:text-gray-400">{feature.name}</dt>
                                  <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                                    {typeof feature.tiers[tier.name] === 'string' ? (
                                      <span
                                        className={
                                          tier.featured
                                            ? 'font-semibold text-[#3A4F7A] dark:text-mist-300'
                                            : 'text-gray-900 dark:text-white'
                                        }
                                      >
                                        {feature.tiers[tier.name]}
                                      </span>
                                    ) : (
                                      <>
                                        {feature.tiers[tier.name] === true ? (
                                          <CheckIcon
                                            aria-hidden="true"
                                            className="mx-auto size-5 text-[#3A4F7A] dark:text-mist-300"
                                          />
                                        ) : (
                                          <XMarkIcon
                                            aria-hidden="true"
                                            className="mx-auto size-5 text-gray-400 dark:text-slate-500"
                                          />
                                        )}

                                        <span className="sr-only">
                                          {feature.tiers[tier.name] === true ? 'Yes' : 'No'}
                                        </span>
                                      </>
                                    )}
                                  </dd>
                                </div>
                              ))}
                            </dl>
                          </div>

                          {/* Fake card border */}
                          <div
                            aria-hidden="true"
                            className={classNames(
                              tier.featured
                                ? 'ring-2 ring-[#3A4F7A] dark:ring-mist-300'
                                : 'ring-1 ring-mist-950/10 dark:ring-white/10',
                              'pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 rounded-lg sm:block',
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Feature comparison (lg+) */}
          <section aria-labelledby="comparison-heading" className="hidden lg:block">
            <h3 id="comparison-heading" className="sr-only">
              Feature comparison
            </h3>

            <div className="grid grid-cols-4 gap-x-8 border-t border-gray-900/10 before:block dark:border-white/10">
              {tiers.map((tier) => (
                <div key={tier.name} aria-hidden="true" className="-mt-px">
                  <div
                    className={classNames(
                      tier.featured ? 'border-[#3A4F7A] dark:border-mist-300' : 'border-transparent',
                      'border-t-2 pt-10',
                    )}
                  >
                    <p
                      className={classNames(
                        tier.featured ? 'text-[#3A4F7A] dark:text-mist-300' : 'text-gray-900 dark:text-white',
                        'text-sm/6 font-semibold',
                      )}
                    >
                      {tier.name}
                    </p>
                    {tier.description ? (
                      <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">{tier.description}</p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            <div className="-mt-6 space-y-16">
              {sections.map((section) => (
                <div key={section.name}>
                  <h4 className="text-sm/6 font-semibold text-gray-900 dark:text-white">{section.name}</h4>
                  <div className="relative -mx-8 mt-10">
                    {/* Fake card backgrounds */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-8 inset-y-0 grid grid-cols-4 gap-x-8 before:block"
                    >
                      <div className="size-full rounded-lg bg-white shadow-xs dark:bg-mist-950/40 dark:shadow-none" />
                      <div className="size-full rounded-lg bg-white shadow-xs dark:bg-mist-950/40 dark:shadow-none" />
                      <div className="size-full rounded-lg bg-white shadow-xs dark:bg-mist-950/40 dark:shadow-none" />
                    </div>

                    <table className="relative w-full border-separate border-spacing-x-8">
                      <thead>
                        <tr className="text-left">
                          <th scope="col">
                            <span className="sr-only">Capability</span>
                          </th>
                          {tiers.map((tier) => (
                            <th key={tier.name} scope="col">
                              <span className="sr-only">{tier.name}</span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.features.map((feature, featureIdx) => (
                          <tr key={feature.name}>
                            <th
                              scope="row"
                              className="w-1/4 py-3 pr-4 text-left text-sm/6 font-normal text-gray-900 dark:text-white"
                            >
                              {feature.name}
                              {featureIdx !== section.features.length - 1 ? (
                                <div className="absolute inset-x-8 mt-3 h-px bg-gray-200 dark:bg-white/10" />
                              ) : null}
                            </th>
                            {tiers.map((tier) => (
                              <td key={tier.name} className="relative w-1/4 px-4 py-0 text-center">
                                <span className="relative size-full py-3">
                                  {typeof feature.tiers[tier.name] === 'string' ? (
                                    <span
                                      className={classNames(
                                        tier.featured
                                          ? 'font-semibold text-[#3A4F7A] dark:text-mist-300'
                                          : 'text-gray-900 dark:text-white',
                                        'text-sm/6',
                                      )}
                                    >
                                      {feature.tiers[tier.name]}
                                    </span>
                                  ) : (
                                    <>
                                      {feature.tiers[tier.name] === true ? (
                                        <CheckIcon
                                          aria-hidden="true"
                                          className="mx-auto size-5 text-[#3A4F7A] dark:text-mist-300"
                                        />
                                      ) : (
                                        <XMarkIcon
                                          aria-hidden="true"
                                          className="mx-auto size-5 text-gray-400 dark:text-slate-500"
                                        />
                                      )}

                                      <span className="sr-only">
                                        {feature.tiers[tier.name] === true ? 'Yes' : 'No'}
                                      </span>
                                    </>
                                  )}
                                </span>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Fake card borders */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-8 inset-y-0 grid grid-cols-4 gap-x-8 before:block"
                    >
                      {tiers.map((tier) => (
                        <div
                          key={tier.name}
                          className={classNames(
                            tier.featured
                              ? 'ring-2 ring-[#3A4F7A] dark:ring-mist-300'
                              : 'ring-1 ring-mist-950/10 dark:ring-white/10',
                            'rounded-lg',
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </section>
  )
}

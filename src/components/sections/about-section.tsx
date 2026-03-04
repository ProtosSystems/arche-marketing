import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { Eyebrow } from '@/components/elements/eyebrow'

export default function AboutSection() {
    return (
        <div className="relative isolate overflow-hidden bg-white py-24 sm:py-32 dark:bg-transparent">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <Eyebrow>About Arche</Eyebrow>
                    <h1 className="mt-2 text-4xl tracking-tight text-pretty text-primary sm:text-5xl dark:text-slate-100">
                        Financial truth, preserved over time.
                    </h1>
                    <p className="mt-6 text-xl/8 text-slate-700 dark:text-slate-300">
                        Arche is infrastructure for querying corporate fundamentals exactly as they were known at a point in time.
                        Built from first principles around determinism, immutability and provenance, it produces historical outputs
                        you can reproduce and defend.
                    </p>
                </div>

                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12">
                    <div className="relative lg:order-last lg:col-span-5">

                        <figure className="border-l border-[#0B1B3A] pl-8 dark:border-slate-700">
                            <blockquote
                                className="text-xl/8 font-medium tracking-tight text-slate-900 dark:text-slate-100">
                                <p>
                                    If historical data changes, the research built on it cannot be trusted. Arche makes
                                    past financial states observable, stable and auditable.
                                </p>
                            </blockquote>
                            <figcaption className="mt-8 flex items-center gap-x-4">
                                <Image
                                    alt="Arche API - Infrastructure for financial truth, preserved over time."
                                    src="/primary-logo-on-dark-bg.png"
                                    width={40}
                                    height={40}
                                    className="mt-1 size-10 flex-none rounded-full bg-gray-50 dark:bg-gray-800"
                                />
                                <div className="text-sm/6">
                                    <div className="font-medium text-slate-900 dark:text-slate-100">Arche API</div>
                                    <div className="text-slate-600 dark:text-slate-400">Design principle</div>
                                </div>
                            </figcaption>
                        </figure>
                    </div>

                    <div className="max-w-xl text-base/7 text-slate-700 lg:col-span-7 dark:text-slate-300">
                        <p>
                            Most financial datasets are not truly historical. Filings are amended, restated and
                            reclassified, while prior values are silently overwritten. Arche rejects that model. Time is treated as a first-class
                            dimension, not a filter applied after the fact.
                        </p>

                        <ul role="list" className="mt-8 max-w-xl space-y-8 text-slate-700 dark:text-slate-300">
                            <li className="flex gap-x-3">
                                <CloudArrowUpIcon
                                    aria-hidden="true"
                                    className="mt-1 size-5 flex-none text-[#0B1B3A] dark:text-mist-300"
                                />
                                <span>
                  <strong className="font-semibold text-slate-900 dark:text-slate-100">Point-in-time resolution.</strong>{' '}
                                    Every request is resolved against an explicit “as-of” date, producing deterministic results without
                  look-ahead bias.
                </span>
                            </li>

                            <li className="flex gap-x-3">
                                <LockClosedIcon
                                    aria-hidden="true"
                                    className="mt-1 size-5 flex-none text-[#0B1B3A] dark:text-mist-300"
                                />
                                <span>
                  <strong className="font-semibold text-slate-900 dark:text-slate-100">Immutable history.</strong> All
                  statement versions are preserved. Restatements create new records; historical facts are never erased
                  or revised.
                </span>
                            </li>

                            <li className="flex gap-x-3">
                                <ServerIcon
                                    aria-hidden="true"
                                    className="mt-1 size-5 flex-none text-[#0B1B3A] dark:text-mist-300"
                                />
                                <span>
                  <strong className="font-semibold text-slate-900 dark:text-slate-100">Contract-first API.</strong> Stable
                  schemas, deterministic ordering and explicit error semantics form a surface designed for long-lived
                  integration, not interpretation.
                </span>
                            </li>
                        </ul>

                        <p className="mt-8">
                            Arche is built for researchers, analysts, and engineers who need financial data they can reproduce months
                            or years later in research, audits and production systems.
                        </p>

                        <h2 className="mt-16 text-3xl tracking-tight text-primary dark:text-slate-100">
                            Built from first principles.
                        </h2>
                        <p className="mt-6">
                            Arche is not a dashboard or a terminal. It is a foundational data layer. By modeling time, versioning and
                            provenance explicitly, it provides a reliable answer to a simple but critical question: what did we know
                            then?
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

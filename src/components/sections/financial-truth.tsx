import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { Eyebrow } from '@/components/elements/eyebrow'

function FinancialTruthDiagram() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 675"
            role="img"
            aria-label="Financial truth over time: as-of snapshot, restatement delta, and provenance trace"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="xMidYMid meet"
        >
            <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="10" stdDeviation="16" floodColor="var(--shadow-color)" floodOpacity="0.16" />
                </filter>

                <style>{`
          .title { font: 700 22px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; fill:var(--text); }
          .subtitle { font: 500 14px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; fill:var(--text-muted); }

          .label { font: 600 13px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; fill:var(--text); }
          .meta { font: 500 12px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; fill:var(--text-muted); }

          .mono { font: 600 12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; fill:var(--text); }
          .chip { font: 700 11px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; fill:var(--text); letter-spacing:0.02em; }

          .stroke { stroke:var(--border); stroke-width:1.5; }
          .stroke2 { stroke:color-mix(in srgb, var(--text-muted) 65%, var(--border)); stroke-width:1.5; }
          .navy { stroke:var(--color-accent); stroke-width:2.5; }

          .ok { fill:#16A34A; }
          .warn { fill:#F59E0B; }

          .bg { fill:var(--surface); }
          .panel { fill:var(--surface-2); stroke:var(--border); stroke-width:2; }
          .card { fill:var(--surface); stroke:var(--border); stroke-width:2; }
          .muted-card { fill:color-mix(in srgb, var(--surface-2) 70%, var(--surface)); stroke:var(--border); stroke-width:2; }
          .chip-bg { fill:color-mix(in srgb, var(--color-accent) 18%, transparent); }
          .chip-bg-soft { fill:color-mix(in srgb, var(--border) 40%, transparent); }
          .pill-bg { fill:color-mix(in srgb, var(--border) 55%, transparent); }

          :root { --shadow-color: #0F172A; }
          html.dark { --shadow-color: #000000; }
        `}</style>
            </defs>

            {/* Background */}
            <rect className="bg" x="0" y="0" width="1200" height="675" rx="16" />

            {/* Header */}
            <g transform="translate(70 70)">
                <text className="title" x="0" y="0">
                    Financial truth over time
                </text>
                <text className="subtitle" x="0" y="26">
                    Deterministic as-of snapshots. Explicit restatement diffs. Traceable provenance
                </text>
            </g>

            {/* Panels */}
            <g filter="url(#shadow)">
                {/* Panel 1 */}
                <rect className="panel" x="70" y="140" width="530" height="460" rx="20" />
                {/* Panel 2 */}
                <rect className="panel" x="630" y="140" width="500" height="225" rx="20" />
                {/* Panel 3 */}
                <rect className="panel" x="630" y="392" width="500" height="225" rx="20" />
            </g>

            {/* Flow rail */}
            <g opacity="0.9">
                <line x1="615" y1="190" x2="615" y2="585" className="stroke" strokeLinecap="round" />
                <circle cx="615" cy="253" r="6" fill="var(--color-accent)" />
                <line x1="615" y1="253" x2="630" y2="253" className="stroke" strokeLinecap="round" />
                <circle cx="615" cy="505" r="6" fill="var(--color-accent)" />
                <line x1="615" y1="505" x2="630" y2="505" className="stroke" strokeLinecap="round" />
            </g>

            {/* Panel 1 content */}
            <g transform="translate(100 180)">
                <g transform="translate(0 -6)">
                    <rect className="chip-bg" x="0" y="0" width="26" height="18" rx="9" />
                    <text className="mono" x="9" y="13">
                        1
                    </text>
                </g>

                <text className="label" x="0" y="26">
                    As-of snapshot
                </text>
                <text className="meta" x="0" y="48">
                    Query a point in time. Preserve versions. Reproduce results.
                </text>

                <g transform="translate(0 66)">
                    <rect className="chip-bg" x="0" y="0" width="150" height="28" rx="14" />
                    <text className="chip" x="14" y="19">
                        AS OF 2024-12-31
                    </text>
                </g>

                <g transform="translate(0 121)">
                    <text className="meta" x="0" y="0">
                        Timeline
                    </text>
                    <line x1="0" y1="30" x2="470" y2="30" className="stroke2" />
                    <circle cx="60" cy="30" r="7" fill="var(--surface)" stroke="var(--color-accent)" strokeWidth="2.5" />
                    <circle cx="230" cy="30" r="7" fill="var(--surface)" stroke="var(--color-accent)" strokeWidth="2.5" />
                    <circle cx="410" cy="30" r="7" fill="var(--surface)" stroke="var(--color-accent)" strokeWidth="2.5" />

                    <text className="meta" x="40" y="58">
                        Filed
                    </text>
                    <text className="meta" x="200" y="58">
                        Accepted
                    </text>
                    <text className="meta" x="386" y="58">
                        Restated
                    </text>

                    <line x1="320" y1="12" x2="320" y2="72" className="navy" opacity="0.35" />
                    <rect className="chip-bg" x="284" y="-6" width="72" height="22" rx="11" />
                    <text className="mono" x="296" y="10">
                        as-of
                    </text>
                </g>

                <g transform="translate(0 216)">
                    <text className="meta" x="0" y="0">
                        Included statement versions
                    </text>

                    <g transform="translate(0 18)">
                        <rect className="card" x="0" y="0" width="470" height="70" rx="16" />
                        <rect className="pill-bg" x="16" y="18" width="86" height="28" rx="14" />
                        <text className="mono" x="30" y="37">
                            v1
                        </text>

                        <text className="label" x="120" y="30">
                            Income statement
                        </text>
                        <text className="meta" x="120" y="52">
                            Original • effective 2024-11-01
                        </text>

                        <circle cx="440" cy="35" r="8" className="ok" />
                    </g>

                    <g transform="translate(0 100)">
                        <rect className="card" x="0" y="0" width="470" height="70" rx="16" />
                        <rect className="chip-bg" x="16" y="18" width="86" height="28" rx="14" />
                        <text className="mono" x="30" y="37">
                            v2
                        </text>

                        <text className="label" x="120" y="30">
                            Income statement
                        </text>
                        <text className="meta" x="120" y="52">
                            Restated • reason: reclassification
                        </text>

                        <circle cx="440" cy="35" r="8" className="warn" />
                    </g>

                    <g transform="translate(0 188)">
                        <rect className="muted-card" x="0" y="0" width="470" height="52" rx="16" />
                        <text className="meta" x="16" y="22">
                            Deterministic snapshot
                        </text>
                        <text className="mono" x="16" y="40">
                            hash: 07055c7e…f018
                        </text>
                    </g>
                </g>
            </g>

            {/* Panel 2 content */}
            <g transform="translate(660 180)">
                <g transform="translate(0 -6)">
                    <rect className="chip-bg" x="0" y="0" width="26" height="18" rx="9" />
                    <text className="mono" x="9" y="13">
                        2
                    </text>
                </g>

                <text className="label" x="0" y="26">
                    Restatement delta
                </text>
                <text className="meta" x="0" y="48">
                    Compute exactly what changed between versions.
                </text>

                <g transform="translate(0 60)">
                    <rect className="chip-bg" x="0" y="0" width="150" height="28" rx="14" />
                    <text className="chip" x="14" y="19">
                        FROM v1 → TO v2
                    </text>

                    <rect className="pill-bg" x="165" y="0" width="150" height="28" rx="14" />
                    <text className="mono" x="179" y="19">
                        material: true
                    </text>
                </g>

                <g transform="translate(0 98)">
                    <rect className="card" x="0" y="0" width="440" height="96" rx="16" />
                    <line x1="0" y1="36" x2="440" y2="36" className="stroke" />

                    <text className="meta" x="18" y="24">
                        Metric
                    </text>
                    <text className="meta" x="210" y="24">
                        Old
                    </text>
                    <text className="meta" x="300" y="24">
                        New
                    </text>
                    <text className="meta" x="392" y="24">
                        Diff
                    </text>

                    <text className="mono" x="18" y="66">
                        TOTAL_ASSETS
                    </text>
                    <text className="mono" x="210" y="66">
                        100.00
                    </text>
                    <text className="mono" x="300" y="66">
                        105.00
                    </text>

                    <rect className="chip-bg" x="368" y="50" width="58" height="28" rx="14" />
                    <text className="mono" x="385" y="68">
                        +5.00
                    </text>
                </g>

                <g transform="translate(0 200)">
                    <rect className="muted-card" x="0" y="0" width="440" height="36" rx="16" />
                    <text className="meta" x="16" y="23">
                        Timeline hops: 1
                    </text>

                    <text className="mono" x="316" y="23">
                        severity:
                    </text>
                    <rect x="384" y="5" width="40" height="26" rx="13" fill="#F59E0B" opacity="0.28" />
                    <text className="mono" x="395" y="23">
                        LOW
                    </text>
                </g>
            </g>

            {/* Panel 3 content */}
            <g transform="translate(660 432)">
                <g transform="translate(0 -6)">
                    <rect className="chip-bg" x="0" y="0" width="26" height="18" rx="9" />
                    <text className="mono" x="9" y="13">
                        3
                    </text>
                </g>

                <text className="label" x="0" y="26">
                    Provenance trace
                </text>
                <text className="meta" x="0" y="48">
                    Inspect lineage from filing → facts → rules → assertion.
                </text>

                <g transform="translate(0 74)">
                    <rect className="card" x="0" y="0" width="105" height="56" rx="16" />
                    <text className="mono" x="16" y="24">
                        Filing
                    </text>
                    <text className="meta" x="16" y="42">
                        10-K
                    </text>

                    <rect className="card" x="113" y="0" width="105" height="56" rx="16" />
                    <text className="mono" x="129" y="24">
                        Fact
                    </text>
                    <text className="meta" x="129" y="42">
                        extracted
                    </text>

                    <rect className="card" x="226" y="0" width="105" height="56" rx="16" />
                    <text className="mono" x="242" y="24">
                        Rules
                    </text>
                    <text className="meta" x="242" y="42">
                        applied
                    </text>

                    <rect className="card" x="339" y="0" width="105" height="56" rx="16" />
                    <text className="mono" x="355" y="24">
                        Assertion
                    </text>
                    <text className="meta" x="355" y="42">
                        versioned
                    </text>

                    <line x1="105" y1="28" x2="113" y2="28" className="navy" />
                    <line x1="218" y1="28" x2="226" y2="28" className="navy" />
                    <line x1="331" y1="28" x2="339" y2="28" className="navy" />
                </g>

                <g transform="translate(0 150)">
                    <rect className="muted-card" x="0" y="0" width="440" height="78" rx="16" />
                    <text className="meta" x="16" y="28">
                        Trace summary
                    </text>

                    <g transform="translate(16 40)">
                        <rect className="pill-bg" x="0" y="0" width="120" height="26" rx="13" />
                        <text className="mono" x="12" y="18">
                            evaluated: 0
                        </text>

                        <rect className="pill-bg" x="140" y="0" width="132" height="26" rx="13" />
                        <text className="mono" x="152" y="18">
                            remapped: 0
                        </text>

                        <rect className="pill-bg" x="292" y="0" width="132" height="26" rx="13" />
                        <text className="mono" x="304" y="18">
                            suppressed: 0
                        </text>
                    </g>
                </g>
            </g>
        </svg>
    )
}

export default function UseCaseFinancialTruthOverTime() {
    return (
        <div className="relative isolate overflow-hidden bg-white py-24 sm:py-32 dark:bg-transparent">

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <Eyebrow>Use case</Eyebrow>
                    <h1 className="mt-2 text-4xl tracking-tight text-pretty text-primary sm:text-5xl dark:text-slate-100">
                        Financial statements over time
                    </h1>

                    <p className="mt-6 text-xl/8 text-slate-700 dark:text-slate-300">
                        Financial statements change. Companies amend filings, restate prior periods, and reclassify
                        historical
                        results. Most data systems overwrite history and silently drift.
                    </p>

                    <p className="mt-6 text-xl/8 text-slate-700 dark:text-slate-300">
                        Arche models financial truth differently: every statement is treated as a versioned
                        assertion, preserving what was known at the time while making change explicit.
                    </p>
                </div>

                <div
                    className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12">
                    {/* Full-width diagram */}
                    <div className="lg:col-span-12">
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-[#7D93BF]/30 dark:bg-slate-950 dark:shadow-none">
                            <div className="relative w-full pt-[56.25%]">
                                <FinancialTruthDiagram/>
                            </div>
                        </div>
                    </div>
                    {/* Left column: Narrative + bullets + CTA */}
                    <div className="max-w-xl text-base/7 text-slate-700 lg:col-span-7 lg:col-start-1 dark:text-slate-300">
                        <p>
                            Traditional pipelines assume there is a single “correct” statement. When restatements
                            arrive, prior values are overwritten. Downstream systems lose the ability to reproduce analyses, explain
                            discrepancies or answer audit questions.
                        </p>

                        <ul role="list" className="mt-8 max-w-xl space-y-8 text-slate-700 dark:text-slate-300">
                            <li className="flex gap-x-3">
                                <CloudArrowUpIcon
                                    aria-hidden="true"
                                    className="mt-1 size-5 flex-none text-[#3A4F7A] dark:text-mist-300"
                                />
                                <span>
                                    <strong
                      className="font-semibold text-slate-900 dark:text-slate-100">Deterministic as-of snapshots.</strong>{' '}
                                    Query financials as of a moment in time. Preserve versions. Reproduce results even after later filings
                  modify prior periods.
                </span>
                            </li>

                            <li className="flex gap-x-3">
                                <LockClosedIcon
                                    aria-hidden="true"
                                    className="mt-1 size-5 flex-none text-[#3A4F7A] dark:text-mist-300"
                                />
                                <span>
                                    <strong
                      className="font-semibold text-slate-900 dark:text-slate-100">Explicit restatement deltas.</strong>{' '}
                                    Compare versions directly: what changed, by how much and whether the impact is material, without
                  inference or manual diffing.
                </span>
                            </li>

                            <li className="flex gap-x-3">
                                <ServerIcon
                                    aria-hidden="true"
                                    className="mt-1 size-5 flex-none text-[#3A4F7A] dark:text-mist-300"
                                />
                                <span>
                  <strong className="font-semibold text-slate-900 dark:text-slate-100">Traceable provenance.</strong>{' '}
                                    Inspect lineage from filing → facts → rules → versioned assertions, so discrepancies are explainable
                  under scrutiny.
                </span>
                            </li>
                        </ul>

                        <p className="mt-8">
                            The failure mode isn’t “dirty data.” It’s a data model that treats time and provenance as an
                            afterthought. Arche makes both first-class, so change is modeled not erased.
                        </p>
                    </div>

                    {/* Right column: Golden Path CTA */}
                    <div className="relative lg:col-span-5 lg:col-start-8">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-700 dark:bg-transparent">
                            <h2 className="text-2xl font-semibold text-primary dark:text-slate-100">
                                See the full golden path
                            </h2>
                            <p className="mt-4 text-slate-700 dark:text-slate-300">
                                This model is exercised end-to-end with real restatement scenarios and deterministic guarantees.
                            </p>
                            <a
                                href="/docs/golden-path"
                                className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary/30 dark:bg-[#3A4F7A] dark:text-white dark:hover:bg-[#4D6391] dark:focus:ring-[#3A4F7A]"
                            >
                                Read the golden path
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-12">
                        <figure className="border-l border-[#3A4F7A] pl-8 dark:border-slate-700">
                            <blockquote className="text-xl/8 font-medium tracking-tight text-slate-900 dark:text-slate-100">
                                <p>
                                    If the past can change without being modeled, your system is storing a
                                    moving target.
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
                                    <div className="font-medium text-slate-900 dark:text-slate-100">Temporal truth must be explicit</div>
                                    <div className="text-slate-600 dark:text-slate-400">Design principle</div>
                                </div>
                            </figcaption>
                        </figure>
                    </div>

                </div>
            </div>
        </div>
    )
}

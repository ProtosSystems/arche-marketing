import { CheckIcon } from '@heroicons/react/20/solid'
import { Eyebrow } from '@/components/elements/eyebrow'

const features = [
    {
        name: 'Point-in-time truth',
        question: 'What did we know on Dec. 15, 2024?',
        description:
            'Arche resolves immutable, point-in-time snapshots using accepted filing dates. No look-ahead bias or retroactive changes. Every result is reproducible.',
    },
    {
        name: 'Restatement impact',
        question: 'What changed, and how material was it?',
        description:
            'Every restatement is preserved and comparable. Arche computes per-metric deltas and classifies materiality so you know exactly what changed and whether it mattered.',
    },
    {
        name: 'Accounting correctness',
        question: 'Do these statements actually reconcile?',
        description:
            'Arche verifies balance sheet equations, cash-flow rollforwards and segment totals. Each check produces PASS / WARNING / FAIL with exact expected vs. actual values.',
    },
    {
        name: 'Model-ready metrics',
        question: 'Can this be used directly in models?',
        description:
            'Arche exposes pre-computed valuation and performance metrics with Decimal precision. When a metric can’t be computed, the reason is explicit, never a silent null.',
    },
    {
        name: 'Data quality overlay',
        question: 'Is this number plausible?',
        description:
            'Every normalized fact is checked for presence, sign validity and historical outliers. Anomalies include severity and explainable baselines — not opaque flags.',
    },
    {
        name: 'Agent-safe interface',
        question: 'Can agents reason over this safely?',
        description:
            'Arche exposes deterministic, schema-validated tools via the Model Context Protocol (MCP), allowing AI agents to query, reconcile and analyze financials without scraping or inference.',
    },
]


export default function ArcheCapabilities() {
    return (
        <div className="bg-white pt-12 pb-24 sm:pt-16 sm:pb-32 dark:bg-transparent">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    <div className="col-span-2">
                        <Eyebrow>Capabilities</Eyebrow>
                        <p className="mt-2 text-4xl tracking-tight text-pretty text-primary sm:text-5xl dark:text-slate-100">
                            Questions you can answer precisely
                        </p>
                        <p className="mt-6 text-base/7 text-slate-700 dark:text-slate-300">
                            Arche is designed around the questions financial systems actually need to answer, without inference,
                            reconstruction or guesswork.
                        </p>
                    </div>

                    <dl className="col-span-3 grid grid-cols-1 gap-x-8 gap-y-10 text-base/7 text-slate-700 sm:grid-cols-2 lg:gap-y-16 dark:text-slate-300">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-9">
                                <dt className="font-semibold text-accent dark:text-mist-300">
                                    <CheckIcon
                                        aria-hidden="true"
                                        className="absolute top-1 left-0 size-5 text-[#3A4F7A] dark:text-mist-300"
                                    />
                                    {feature.name}
                                </dt>
                                <dd className="mt-2">
                                    <strong className="font-semibold text-slate-900 dark:text-white">
                                        {feature.question}{' '}
                                    </strong>
                                    {feature.description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}

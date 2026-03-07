import {
    ArrowPathIcon,
    CloudArrowUpIcon,
    Cog6ToothIcon,
    FingerPrintIcon,
    LockClosedIcon,
    ServerIcon,
} from '@heroicons/react/20/solid'
import { Eyebrow } from '@/components/elements/eyebrow'

const features = [
    {
        name: 'AI- and agent-compatible.',
        description:
            'Arche exposes machine-readable, deterministic tools designed for direct use by AI agents via the Model Context Protocol (MCP), without scraping or inference.',
        icon: ServerIcon,
    },
    {
        name: 'Versioned financial history.',
        description:
            'Corporate fundamentals evolve. Arche stores statements as immutable versions, so you can reproduce what was known at any point in time—without reconstructing the past.',
        icon: ArrowPathIcon,
    },
    {
        name: 'No silent overwrites.',
        description:
            'Corrections and restatements never replace historical data. Changes are explicit, traceable and additive—preserving reproducibility across research and models.',
        icon: LockClosedIcon,
    },
    {
        name: 'Provenance by default.',
        description:
            'Every value is traceable to its source filing and ingestion event. That makes results explainable, reviewable and defensible when scrutiny matters.',
        icon: FingerPrintIcon,
    },
    {
        name: 'Deterministic retrieval.',
        description:
            'Identical queries return identical results. Stable ordering, explicit pagination and predictable semantics are enforced by design—not convention.',
        icon: CloudArrowUpIcon,
    },
    {
        name: 'Contract-first API.',
        description:
            'A versioned HTTP API with explicit schemas and clear error semantics. Built to integrate cleanly into internal systems, pipelines and analytical workflows.',
        icon: Cog6ToothIcon,
    },
]

export default function ArcheFeatures() {
    return (
        <div className="bg-white py-12 sm:py-16 dark:bg-transparent">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <Eyebrow>Trust, by design</Eyebrow>
                    <p className="mt-2 text-4xl tracking-tight text-pretty text-primary sm:text-5xl dark:text-slate-100">
                        Built to be consumed by systems.
                    </p>
                    <p className="mt-6 text-lg/8 text-slate-700 dark:text-slate-300">
                        Arche exposes financial data through stable, versioned contracts designed for direct consumption by software, not interpretation.
                        The same guarantees that preserve historical truth make integration predictable and safe.
                    </p>
                </div>
                <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base/7 text-slate-700 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-16 dark:text-slate-300">
                    {features.map((feature) => (
                        <div key={feature.name} className="relative pl-9">
                            <dt className="inline font-semibold text-gray-900 dark:text-white">
                                <feature.icon
                                    role="presentation"
                                    focusable="false"
                                    className="absolute top-1 left-1 size-5 text-[#3A4F7A] dark:text-mist-300"
                                />
                                {feature.name}
                            </dt>{' '}
                            <dd className="inline">{feature.description}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    )
}

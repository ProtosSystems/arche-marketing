import { CircleStackIcon, ClockIcon, CommandLineIcon } from '@heroicons/react/24/outline'
import { Eyebrow } from '@/components/elements/eyebrow'

const features = [
    {
        name: 'Normalized EDGAR statements',
        description:
            'Income statements, balance sheets and cash flow data from 15 years of SEC filings, normalized for direct use.',
        icon: CircleStackIcon,
    },
    {
        name: 'Versioned point-in-time history',
        description:
            'Restatement tracking and accepted-date snapshots help remove look-ahead bias from research and review.',
        icon: ClockIcon,
    },
    {
        name: 'API, UI and agent access',
        description:
            'Query through the API or AI-agent integrations without maintaining XBRL parsing infrastructure.',
        icon: CommandLineIcon,
    },
]

export default function InvestmentWorkflows() {
    return (
        <section className="bg-white pt-14 pb-12 sm:pt-20 sm:pb-16 dark:bg-transparent">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <Eyebrow>Data access</Eyebrow>
                    <h2 className="mt-2 text-4xl font-normal tracking-tight text-pretty text-primary sm:text-5xl dark:text-slate-100">
                        Financial statements, ready for investment workflows
                    </h2>
                    <p className="mt-6 text-lg/8 text-slate-700 dark:text-slate-300">
                        Access 15 years of SEC EDGAR income statements, balance sheets and cash flow data: normalized, versioned
                        and point-in-time. No XBRL parsing, no restatement tracking, no look-ahead bias. Query via API or plug
                        directly into your AI agent.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3 lg:gap-x-16">
                        {features.map((feature) => (
                            <div
                                key={feature.name}
                                className="relative flex flex-col pl-9 text-base/7 text-slate-700 dark:text-slate-300"
                            >
                                <dt className="font-semibold text-gray-900 dark:text-white">
                                    <feature.icon
                                        role="presentation"
                                        focusable="false"
                                        className="absolute top-1 left-1 size-5 text-[#0F172A] dark:text-mist-300"
                                    />
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 flex flex-auto flex-col">
                                    <p className="flex-auto">{feature.description}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    )
}

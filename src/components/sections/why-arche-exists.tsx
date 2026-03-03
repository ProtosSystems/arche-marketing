import WhyArcheExistsDiagram from "@/components/icons/why-arche-exists-diagram";
import { Eyebrow } from '@/components/elements/eyebrow'

export default function WhyArcheExists() {
    return (
        <div className="bg-white pt-24 pb-12 sm:pt-32 sm:pb-16 dark:bg-transparent">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="max-w-2xl">
                    {/* Accent: Slate Blue in light; lighter slate in dark for readability */}
                    <Eyebrow>Why Arche exists</Eyebrow>

                    <p className="mt-2 text-4xl tracking-tight text-pretty text-primary sm:text-5xl sm:text-balance dark:text-slate-100">
                        Because financial systems erase accountability.
                    </p>

                    <p className="mt-6 text-lg/8 text-slate-700 dark:text-slate-300">
                        When filings change, most data platforms overwrite history. You can’t prove what changed,
                        when it changed or what decisions relied on the prior numbers. Arche fixes this by treating
                        change as auditable data.
                    </p>
                </div>
            </div>

            {/* Visual anchor */}
            <div className="relative pt-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div
                        className="
              overflow-hidden rounded-xl border bg-white ring-1 ring-inset
              border-slate-200 ring-slate-900/5
              dark:border-white/10 dark:bg-white/5 dark:ring-white/10
            "
                    >
                        <WhyArcheExistsDiagram />
                    </div>
                </div>
            </div>
        </div>
    )
}

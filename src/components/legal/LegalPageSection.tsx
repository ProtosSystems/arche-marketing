import { ComponentType, ReactNode, SVGProps } from 'react'
import { LegalNavCard } from '@/components/legal/LegalNavCard'

type LegalFeature = {
  name: string
  description: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

type LegalPageSectionProps = {
  label: string
  title: string
  subtitle: string
  lastUpdated: string
  features: LegalFeature[]
  children: ReactNode
}

export function LegalPageSection({
  label,
  title,
  subtitle,
  lastUpdated,
  features,
  children,
}: LegalPageSectionProps) {
  return (
    <div className="relative isolate overflow-hidden bg-white py-24 sm:py-32 dark:bg-transparent">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-12">
          <div className="relative lg:order-last lg:col-span-5">
            <LegalNavCard lastUpdated={lastUpdated} />
          </div>

          <div className="max-w-xl text-base/7 text-slate-700 lg:col-span-7 dark:text-slate-300">
            <p className="text-base/7 font-semibold text-[#3A4F7A] dark:text-mist-300">{label}</p>
            <h1 className="mt-2 text-4xl tracking-tight text-pretty text-[#0F172A] sm:text-5xl dark:text-white">
              {title}
            </h1>
            <p className="mt-6 text-xl/8">{subtitle}</p>

            <ul role="list" className="mt-8 max-w-xl space-y-8 text-slate-700 dark:text-slate-300">
              {features.map((feature) => (
                <li key={feature.name} className="flex gap-x-3">
                  <feature.icon role="presentation" focusable="false" className="mt-1 size-5 flex-none text-[#3A4F7A] dark:text-mist-300" />
                  <span>
                    <strong className="font-semibold text-[#0F172A] dark:text-white">{feature.name}.</strong>{' '}
                    {feature.description}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

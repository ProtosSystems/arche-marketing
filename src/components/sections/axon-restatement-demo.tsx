'use client'

import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

export const axonDemoData = {
  company_name: 'Axon Enterprise, Inc.',
  ticker: 'AXON',
  original_filing_label: 'Original 2024 10-K',
  original_filing_href:
    'https://www.sec.gov/Archives/edgar/data/1069183/000106918325000019/0001069183-25-000019-index.html',
  original_filing_date: 'February 28, 2025',
  amended_filing_label: 'Amended 2024 10-K/A',
  amended_filing_href:
    'https://www.sec.gov/Archives/edgar/data/1069183/0001069183-25-000075/0001069183-25-000075-index.htm',
  amended_filing_date: 'May 7, 2025',
  principal_notes: '$690.0M',
  carrying_value: '$680.289M',
  current_assets: '$2.297B',
  current_liabilities_original: '$997.586M',
  current_liabilities_restated: '$1.678B',
  long_term_convertible_notes_original: '$680.289M',
  current_convertible_notes_restated: '$680.289M',
  working_capital_original: '$1.300B',
  working_capital_restated: '$619.606M',
  current_ratio_original: '2.30x',
  current_ratio_restated: '1.37x',
} as const

type StatementState = {
  debtClassificationLabel: string
  debtClassificationValue: string
  currentLiabilities: string
  workingCapital: string
  currentRatio: string
}

type ModelOutput = {
  liquidityStatus: 'Strong' | 'Watch' | 'Pressure'
  riskScoreLabel: 'Comfortable' | 'Moderate' | 'Elevated'
  modelConclusion: string
}

type StepId = 'original' | 'evaluation' | 'amendment' | 'historicalQuery'

type WalkthroughStep = {
  id: StepId
  day: number
  label: string
  title: string
  explanation: string
}

const timelineStart = new Date('2025-02-28T00:00:00Z')
const amendmentDay = 68

const steps: WalkthroughStep[] = [
  {
    id: 'original',
    day: 0,
    label: 'Feb 28, 2025',
    title: 'Original 10-K filed',
    explanation: 'The company files its annual report. This is the original balance-sheet state before any amendment exists.',
  },
  {
    id: 'evaluation',
    day: 15,
    label: 'Mar 15, 2025',
    title: 'Model run before amendment',
    explanation:
      'A model evaluated on this date should only use information known by this date. Arche returns the original filing state. A latest-only system may return the later amended version instead.',
  },
  {
    id: 'amendment',
    day: 68,
    label: 'May 7, 2025',
    title: '10-K/A filed',
    explanation:
      'The company files an amendment that reclassifies the convertible notes from long-term debt to current liabilities. From this point forward, the restated version is legitimately knowable.',
  },
  {
    id: 'historicalQuery',
    day: 93,
    label: 'Jun 1, 2025',
    title: 'Historical query after amendment',
    explanation:
      'Now query what a model run on March 15, 2025 would have used. A latest-only system returns the amended balance sheet. Arche reconstructs the balance sheet exactly as it was known on March 15.',
  },
] as const

const originalState: StatementState = {
  debtClassificationLabel: 'Long-term convertible notes',
  debtClassificationValue: axonDemoData.long_term_convertible_notes_original,
  currentLiabilities: axonDemoData.current_liabilities_original,
  workingCapital: axonDemoData.working_capital_original,
  currentRatio: axonDemoData.current_ratio_original,
}

const restatedState: StatementState = {
  debtClassificationLabel: 'Current portion of convertible notes',
  debtClassificationValue: axonDemoData.current_convertible_notes_restated,
  currentLiabilities: axonDemoData.current_liabilities_restated,
  workingCapital: axonDemoData.working_capital_restated,
  currentRatio: axonDemoData.current_ratio_restated,
}

const deltaRows = [
  {
    label: 'Debt classification',
    original: `Long-term convertible notes: ${axonDemoData.long_term_convertible_notes_original}`,
    restated: `Current portion of convertible notes: ${axonDemoData.current_convertible_notes_restated}`,
    impact: 'Near-term leverage and rollover risk jump immediately.',
  },
  {
    label: 'Current liabilities',
    original: axonDemoData.current_liabilities_original,
    restated: axonDemoData.current_liabilities_restated,
    impact: 'Short-term obligations increase by about $680M.',
  },
  {
    label: 'Working capital',
    original: axonDemoData.working_capital_original,
    restated: axonDemoData.working_capital_restated,
    impact: 'Liquidity cushion is cut by more than half.',
  },
  {
    label: 'Current ratio',
    original: axonDemoData.current_ratio_original,
    restated: axonDemoData.current_ratio_restated,
    impact: 'A healthy ratio drops materially.',
  },
] as const

function parseRatio(value: string) {
  return Number(value.replace('x', ''))
}

function evaluateLiquidityModel(statement: StatementState): ModelOutput {
  const currentRatio = parseRatio(statement.currentRatio)

  if (currentRatio >= 2 && statement.debtClassificationLabel === 'Long-term convertible notes') {
    return {
      liquidityStatus: 'Strong',
      riskScoreLabel: 'Comfortable',
      modelConclusion: 'Comfortable near-term liquidity position',
    }
  }

  if (currentRatio >= 1.5) {
    return {
      liquidityStatus: 'Watch',
      riskScoreLabel: 'Moderate',
      modelConclusion: 'Manageable liquidity position with monitoring required',
    }
  }

  return {
    liquidityStatus: 'Pressure',
    riskScoreLabel: 'Elevated',
    modelConclusion: 'Elevated near-term liquidity pressure',
  }
}

function formatDateForUi(day: number) {
  const date = new Date(timelineStart)
  date.setUTCDate(timelineStart.getUTCDate() + day)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

function MetricValue({ value, emphasize }: { value: string; emphasize: boolean }) {
  return (
    <p
      className={`mt-2 text-2xl tracking-tight transition-all duration-200 ${
        emphasize ? 'font-semibold text-slate-950 dark:text-white' : 'font-medium text-slate-900 dark:text-slate-100'
      }`}
    >
      {value}
    </p>
  )
}

function MetricTile({
  label,
  value,
  emphasize,
}: {
  label: string
  value: string
  emphasize: boolean
}) {
  return (
    <div
      className={`rounded-2xl border px-4 py-4 ${
        emphasize
          ? 'border-[#3A4F7A]/30 bg-[#3A4F7A]/6 dark:border-[#7D93BF]/35 dark:bg-[#111c30]'
          : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">{label}</p>
      <MetricValue value={value} emphasize={emphasize} />
    </div>
  )
}

function ComparisonCard({
  title,
  badge,
  explanation,
  statement,
  model,
  changed,
  tone,
}: {
  title: string
  badge: string
  explanation: string
  statement: StatementState
  model: ModelOutput
  changed: boolean
  tone: 'vendor' | 'arche'
}) {
  const cardTone =
    tone === 'vendor'
      ? changed
        ? 'border-amber-300 bg-amber-50/80 shadow-[0_20px_60px_rgba(180,83,9,0.12)] dark:border-amber-500/40 dark:bg-amber-950/20'
        : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950'
      : 'border-[#3A4F7A]/25 bg-slate-50 dark:border-[#7D93BF]/35 dark:bg-[#101827]'

  const badgeTone =
    tone === 'vendor'
      ? changed
        ? 'border-amber-300 bg-amber-100 text-amber-900 dark:border-amber-500/40 dark:bg-amber-950/50 dark:text-amber-100'
        : 'border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
      : 'border-[#3A4F7A]/20 bg-[#3A4F7A]/8 text-[#243454] dark:border-[#7D93BF]/30 dark:bg-[#111c30] dark:text-slate-200'

  const conclusionTone =
    model.riskScoreLabel === 'Comfortable'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-950/20 dark:text-emerald-100'
      : model.riskScoreLabel === 'Moderate'
        ? 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-500/30 dark:bg-amber-950/20 dark:text-amber-100'
        : 'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-500/30 dark:bg-rose-950/20 dark:text-rose-100'

  return (
    <div className={`rounded-[2rem] border p-6 ${cardTone}`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">{title}</h3>
          <div className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.12em] uppercase ${badgeTone}`}>
            {badge}
          </div>
        </div>
        <div className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${conclusionTone}`}>
          {model.riskScoreLabel}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/80">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">Debt classification</p>
        <div className="min-h-[4.5rem]">
          <MetricValue value={`${statement.debtClassificationLabel}: ${statement.debtClassificationValue}`} emphasize={changed} />
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <MetricTile label="Current liabilities" value={statement.currentLiabilities} emphasize={changed} />
        <MetricTile label="Working capital" value={statement.workingCapital} emphasize={changed} />
        <MetricTile label="Current ratio" value={statement.currentRatio} emphasize={changed} />
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white/85 p-5 dark:border-slate-800 dark:bg-slate-950/85">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">Model output</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-300">
            Liquidity status: {model.liquidityStatus}
          </span>
          <span className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-300">
            Risk score: {model.riskScoreLabel}
          </span>
        </div>
        <p className={`mt-4 text-2xl tracking-tight ${changed ? 'font-semibold text-slate-950 dark:text-white' : 'font-medium text-slate-900 dark:text-slate-100'}`}>
          {model.modelConclusion}
        </p>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{explanation}</p>
    </div>
  )
}

function TimelineStepper({
  selectedIndex,
  onSelect,
}: {
  selectedIndex: number
  onSelect: (index: number) => void
}) {
  return (
    <nav aria-label="Model run timeline" className="px-5 pb-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">Run the model as of</p>
      <p className="mt-2 text-2xl tracking-tight text-white">{steps[selectedIndex].label}</p>
      <p className="mt-2 text-sm leading-6 text-slate-200">
        This determines what financial information the model is allowed to know.
      </p>

      <div className="mt-8 px-4 pb-0">
        <div className="relative">
          <div className="absolute top-2 left-8 right-8 h-2 rounded-full bg-white/18" />
          <div className="grid grid-cols-4 gap-4 pb-0">
            {steps.map((step, index) => {
              const isSelected = index === selectedIndex
              const isAmendment = step.id === 'amendment'

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => onSelect(index)}
                  aria-label={`Select ${step.label}, ${step.title}`}
                  aria-pressed={isSelected}
                  aria-current={isSelected ? 'step' : undefined}
                  className="relative flex cursor-pointer flex-col items-center text-center"
                >
                  <span
                    className={`relative z-10 block h-6 w-6 rounded-full border-4 border-primary transition-all ${
                      isSelected
                        ? 'animate-pulse bg-white shadow-[0_0_0_10px_rgba(255,255,255,0.16),0_0_24px_rgba(255,255,255,0.28)]'
                        : 'bg-white/85'
                    } ring-2 ring-white/30 ${isAmendment ? 'ring-white/45' : ''}`}
                  />
                  <span className="mt-6 block w-full">
                    <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-slate-200">
                      {step.label}
                    </span>
                    <span
                      className={`mt-1 block text-sm leading-5 ${isAmendment ? 'font-semibold text-white' : 'text-slate-100'}`}
                    >
                      {step.title}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

type SnapshotCardProps = {
  title: string
  subtitle: string
  debtLocationLabel: string
  debtLocationValue: string
  currentLiabilities: string
  workingCapital: string
  currentRatio: string
  tone: 'original' | 'restated'
}

export function SnapshotCard({
  title,
  subtitle,
  debtLocationLabel,
  debtLocationValue,
  currentLiabilities,
  workingCapital,
  currentRatio,
  tone,
}: SnapshotCardProps) {
  const toneClasses =
    tone === 'original'
      ? 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950'
      : 'border-[#3A4F7A]/25 bg-slate-50 dark:border-[#7D93BF]/35 dark:bg-[#101827]'

  return (
    <div className={`rounded-[2rem] border p-6 shadow-sm ${toneClasses}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-2xl font-semibold tracking-tight text-primary dark:text-slate-100">{title}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{subtitle}</p>
        </div>
        <span className="rounded-full border border-slate-200 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 dark:border-slate-700 dark:text-slate-300">
          {tone === 'original' ? 'Before restatement' : 'After restatement'}
        </span>
      </div>

      <div className="mt-6 grid gap-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">
              Principal amount
            </p>
            <p className="mt-2 text-3xl tracking-tight text-slate-900 dark:text-slate-100">{axonDemoData.principal_notes}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">
              Carrying value
            </p>
            <p className="mt-2 text-3xl tracking-tight text-slate-900 dark:text-slate-100">{axonDemoData.carrying_value}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">Debt classification</p>
          <p className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">
            {debtLocationLabel}: {debtLocationValue}
          </p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Balance-sheet carrying value tied to the {axonDemoData.principal_notes} principal amount.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">
              Current liabilities
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {currentLiabilities}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">
              Working capital
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {workingCapital}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-300">
              Current ratio
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {currentRatio}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AxonRestatementDemo() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedStep = steps[selectedIndex]
  const historicalQueryAfterAmendment = selectedStep.id === 'historicalQuery'
  const beforeAmendment = selectedStep.day < amendmentDay
  const baseline = selectedStep.id === 'original'

  const archeState = beforeAmendment || historicalQueryAfterAmendment ? originalState : restatedState
  const vendorState = baseline ? originalState : selectedStep.id === 'amendment' ? restatedState : restatedState
  const archeModel = evaluateLiquidityModel(archeState)
  const vendorModel = evaluateLiquidityModel(vendorState)
  const diverged = !baseline && (beforeAmendment || historicalQueryAfterAmendment)

  const comparisonDateLabel = historicalQueryAfterAmendment ? 'Mar 15, 2025' : formatDateForUi(selectedStep.day)

  function previousStep() {
    setSelectedIndex((current) => Math.max(0, current - 1))
  }

  function nextStep() {
    setSelectedIndex((current) => Math.min(steps.length - 1, current + 1))
  }

  return (
    <section
      id="demo"
      aria-labelledby="interactive-demo-title"
      className="scroll-mt-28 border-t border-slate-200 py-20 sm:py-24 dark:border-slate-800"
    >
      <div className="px-8 sm:px-12">
        <div className="max-w-3xl">
          <p className="text-sm/7 font-semibold uppercase tracking-[0.12em] text-[#3A4F7A] dark:text-mist-300">
            Interactive demo
          </p>
          <h2 id="interactive-demo-title" className="mt-4 text-4xl tracking-tight text-pretty text-primary sm:text-5xl dark:text-slate-100">
            What your model knew on that date
          </h2>
          <p className="mt-6 max-w-2xl text-lg/8 text-slate-700 dark:text-slate-300">
            Step through the historical dates below and compare the output from a &quot;latest-only&quot; data source to
            Arche&apos;s point-in-time record. Scroll down after each step for a recap of what changes and why.
          </p>
        </div>

        <div className="mt-10 rounded-[2rem] border border-primary bg-primary shadow-sm dark:border-primary dark:bg-primary">
          <div className="px-5 py-5">
            <div>
              <p className="text-2xl font-semibold uppercase tracking-[0.18em] text-slate-200">
                Step {selectedIndex + 1} of 4
              </p>
              <h3 className="mt-2 text-lg tracking-tight text-white">{selectedStep.title}</h3>
              <p className="mt-2 min-h-[3rem] max-w-3xl whitespace-pre-line text-sm leading-6 text-slate-100">
                {selectedStep.explanation}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <TimelineStepper selectedIndex={selectedIndex} onSelect={setSelectedIndex} />
          </div>

          <div className="mt-4 px-5">
            <div className="border-t border-white/20" />
          </div>

          <div className="px-5 pb-3 pt-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={previousStep}
                disabled={selectedIndex === 0}
                className="cursor-pointer rounded-full border border-white px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={nextStep}
                disabled={selectedIndex === steps.length - 1}
                className="cursor-pointer rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <ComparisonCard
            title="Latest-only vendor"
            badge={diverged ? 'Overwritten by later amendment' : 'Latest version returned'}
            explanation={
              historicalQueryAfterAmendment
                ? 'Returns the amended/latest state for a historical query run after the amendment exists.'
                : beforeAmendment && !baseline
                  ? 'Uses information introduced after the selected date.'
                  : 'Returns the latest available filing state.'
            }
            statement={vendorState}
            model={vendorModel}
            changed={diverged}
            tone="vendor"
          />
          <ComparisonCard
            title="Arche point-in-time"
            badge={`Known on ${comparisonDateLabel}`}
            explanation="Uses only information available on the selected date."
            statement={archeState}
            model={archeModel}
            changed={false}
            tone="arche"
          />
        </div>

        <section aria-labelledby="data-changed-title" className="mt-10 rounded-[2rem] bg-white p-6 dark:bg-slate-950">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-300">
            What changed in the data
          </p>
          <h3 id="data-changed-title" className="mt-3 max-w-[30rem] text-3xl tracking-tight text-primary dark:text-slate-100">
            The same company. The same date. Different model inputs.
          </h3>
          <p className="mt-6 max-w-[30rem] text-lg/8 text-slate-700 dark:text-slate-300">
            If the original filing is overwritten, a model rerun against March 2025 will silently use information
            that was not public until the May 2025 amendment. That is look-ahead bias.
          </p>

          <div className="mt-6">
            <div className="w-full">
              <div className="grid grid-cols-4 gap-x-8 border-t border-gray-900/10 dark:border-white/10">
                <div aria-hidden="true" />
                {[
                  { name: 'Original', featured: false },
                  { name: 'Restated / latest', featured: true },
                  { name: 'Model impact', featured: false },
                ].map((column) => (
                  <div key={column.name} className="-mt-px">
                    <div
                      className={`${column.featured ? 'border-[#3A4F7A] dark:border-mist-300' : 'border-transparent'} border-t-2 pt-10`}
                    >
                      <p
                        className={`text-left text-sm/6 font-semibold ${
                          column.featured ? 'text-[#3A4F7A] dark:text-mist-300' : 'text-gray-900 dark:text-white'
                        }`}
                      >
                        {column.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="-mt-6 space-y-16">
                <div>
                  <div className="relative -mx-8 mt-10">
                    <div className="absolute inset-x-8 inset-y-0 grid grid-cols-4 gap-x-8 before:block">
                      <div className="size-full rounded-lg bg-white shadow-xs dark:bg-mist-950/40 dark:shadow-none" />
                      <div className="size-full rounded-lg bg-white shadow-xs dark:bg-mist-950/40 dark:shadow-none" />
                      <div className="size-full rounded-lg bg-white shadow-xs dark:bg-mist-950/40 dark:shadow-none" />
                    </div>
                    <div className="pointer-events-none absolute inset-x-8 inset-y-0 grid grid-cols-4 gap-x-8">
                      <div />
                      <div className="rounded-lg ring-1 ring-mist-950/10 dark:ring-white/10" />
                      <div className="rounded-lg ring-2 ring-[#3A4F7A] dark:ring-mist-300" />
                      <div className="rounded-lg ring-1 ring-mist-950/10 dark:ring-white/10" />
                    </div>

                    <table className="relative w-full table-fixed border-separate border-spacing-x-8">
                      <caption className="sr-only">
                        Comparison of original values, restated latest values, and model impact across key balance-sheet metrics.
                      </caption>
                      <thead className="sr-only">
                        <tr>
                          <th scope="col">Metric</th>
                          <th scope="col">Original</th>
                          <th scope="col">Restated / latest</th>
                          <th scope="col">Model impact</th>
                        </tr>
                      </thead>
                      <tbody>
                        {deltaRows.map((row, rowIndex) => (
                          <tr key={row.label}>
                            <th
                              scope="row"
                              className="w-1/4 py-5 pr-4 text-left text-sm/6 font-normal text-gray-900 dark:text-white"
                            >
                              {row.label}
                              {rowIndex !== deltaRows.length - 1 ? (
                                <div className="absolute inset-x-8 mt-5 h-px bg-gray-200 dark:bg-white/10" />
                              ) : null}
                            </th>
                            <td className="relative w-1/4 px-4 py-0 text-left">
                              <span className="relative size-full py-5">
                                <span className="text-sm/6 text-gray-900 dark:text-white">{row.original}</span>
                              </span>
                            </td>
                            <td className="relative w-1/4 px-4 py-0 text-left">
                              <span className="relative size-full py-5">
                                <span
                                  className={`text-sm/6 ${
                                    diverged ? 'font-semibold text-[#3A4F7A] dark:text-mist-300' : 'text-gray-900 dark:text-white'
                                  }`}
                                >
                                  {row.restated}
                                </span>
                              </span>
                            </td>
                            <td className="relative w-1/4 px-4 py-0 text-left">
                              <span className="relative size-full py-5">
                                <span className="text-sm/6 text-gray-900 dark:text-white">{row.impact}</span>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 px-6 py-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
          <div className="flex items-start gap-3">
            <CheckCircleIcon aria-hidden="true" focusable="false" className="mt-0.5 size-5 shrink-0 text-[#3A4F7A] dark:text-mist-300" />
            <p>
              Original 2024 10-K filed Feb 28, 2025. Amended 2024 10-K/A filed May 7, 2025. The model impact column
              represents a common historical-query failure mode where later amendments overwrite earlier states.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

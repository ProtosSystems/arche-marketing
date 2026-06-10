import { CheckCircleIcon } from '@heroicons/react/20/solid'
import type { ReactNode } from 'react'

const deltaRows = [
  {
    label: 'Debt classification',
    original: 'Long-term convertible notes: $680.289M',
    restated: 'Current portion of convertible notes: $680.289M',
    impact: 'Near-term leverage and rollover risk jump immediately.',
  },
  {
    label: 'Current liabilities',
    original: '$997.586M',
    restated: '$1.678B',
    impact: 'Short-term obligations increase by about $680M.',
  },
  {
    label: 'Working capital',
    original: '$1.300B',
    restated: '$619.606M',
    impact: 'Liquidity cushion is cut by more than half.',
  },
  {
    label: 'Current ratio',
    original: '2.30x',
    restated: '1.37x',
    impact: 'A healthy ratio drops materially.',
  },
] as const

function TerminalWindow({
  title,
  subtitle,
  footer,
  children,
}: {
  title: string
  subtitle: string
  footer: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900">
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{title}</p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden rounded-xl bg-slate-950 ring-1 ring-white/10">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          <span className="size-3 rounded-full bg-red-500/60" />
          <span className="size-3 rounded-full bg-yellow-500/60" />
          <span className="size-3 rounded-full bg-green-500/60" />
        </div>
        <pre className="flex-1 overflow-x-auto p-5 text-xs/6 font-mono">{children}</pre>
      </div>
      <p className="mt-auto pt-6 text-sm/7 text-slate-600 dark:text-mist-300">{footer}</p>
    </div>
  )
}

// Token helpers for JSON syntax highlighting
const K = ({ c }: { c: string }) => <span className="text-blue-300">&quot;{c}&quot;</span>
const S = ({ c }: { c: string }) => <span className="text-emerald-300">&quot;{c}&quot;</span>
const N = ({ c }: { c: string }) => <span className="text-amber-300">{c}</span>
const Null = () => <span className="text-rose-400">null</span>
const P = ({ c }: { c: string }) => <span className="text-slate-400">{c}</span>

export default function ArcheRestatementComparison() {
  return (
    <section className="border-t border-slate-200 px-8 py-20 sm:px-12 sm:py-24 dark:border-slate-800">

      {/* What changed in the data */}
      <div className="rounded-[2rem] bg-white p-6 dark:bg-slate-950">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-mist-300">
          What changed in the data
        </p>
        <h3 className="mt-3 max-w-[30rem] text-3xl tracking-tight text-primary dark:text-white">
          The same company. The same date. Different model inputs.
        </h3>
        <p className="mt-6 max-w-[30rem] text-lg/8 text-slate-700 dark:text-mist-300">
          If the original filing is overwritten, a model rerun against March 2025 will silently use
          information that was not public until the May 2025 amendment. That is look-ahead bias.
        </p>

        <div className="mt-6 w-full">
          <div className="grid grid-cols-4 gap-x-8 border-t border-gray-900/10 dark:border-white/10">
            <div aria-hidden="true" />
            {[
              { name: 'Original', featured: false },
              { name: 'Restated / latest', featured: true },
              { name: 'Model impact', featured: false },
            ].map((column) => (
              <div key={column.name} className="-mt-px">
                <div className={`${column.featured ? 'border-gray-500 dark:border-mist-300' : 'border-transparent'} border-t-2 pt-10`}>
                  <p className={`text-left text-sm/6 font-semibold ${column.featured ? 'text-gray-500 dark:text-mist-300' : 'text-gray-900 dark:text-white'}`}>
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
                  <div className="rounded-lg ring-2 ring-gray-500 dark:ring-mist-300" />
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
                        <th scope="row" className="w-1/4 py-5 pr-4 text-left text-sm/6 font-normal text-gray-900 dark:text-white">
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
                            <span className="text-sm/6 font-semibold text-gray-500 dark:text-mist-300">{row.restated}</span>
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

      {/* Footnote */}
      <div className="mt-8 px-6 py-5 text-sm leading-6 text-slate-600 dark:text-mist-300">
        <div className="flex items-start gap-3">
          <CheckCircleIcon aria-hidden="true" focusable="false" className="mt-0.5 size-5 shrink-0 text-gray-500 dark:text-mist-300" />
          <p>
            Original 2024 10-K filed Feb 28, 2025. Amended 2024 10-K/A filed May 7, 2025. The model impact
            column represents a common historical-query failure mode where later amendments overwrite earlier
            states.
          </p>
        </div>
      </div>

      {/* API terminal comparison */}
      <div className="mt-10 grid gap-8 lg:grid-cols-2">

        <TerminalWindow
          title="Latest-only API"
          subtitle="Returns only the amended state:"
          footer="A latest-only API gives you one overwritten answer. That creates look-ahead bias in backtesting and models."
        >
          <P c="{" />{'\n'}
          {'  '}<K c="data_policy" /><P c=": " /><S c="latest_available" /><P c="," />{'\n'}
          {'  '}<K c="filing_state_returned" /><P c=": " /><S c="amended" /><P c="," />{'\n'}
          {'  '}<K c="metrics" /><P c=": {" />{'\n'}
          {'    '}<K c="current_liabilities" /><P c=": " /><N c="1678039000" /><P c="," />{'\n'}
          {'    '}<K c="working_capital" /><P c=": " /><N c="619606000" /><P c="," />{'\n'}
          {'    '}<K c="current_ratio" /><P c=": " /><N c="1.37" />{'\n'}
          {'  '}<P c="}," />{'\n'}
          {'  '}<K c="restatement_delta" /><P c=": " /><Null /><P c="," />{'\n'}
          {'  '}<K c="point_in_time_provenance" /><P c=": " /><Null />{'\n'}
          <P c="}" />
        </TerminalWindow>

        <TerminalWindow
          title="Arche"
          subtitle="Returns the historical state plus the delta:"
          footer="Arche gives you the answer that was knowable then, the answer known now and the bridge between them."
        >
          <P c="{" />{'\n'}
          {'  '}<K c="data_policy" /><P c=": " /><S c="point_in_time" /><P c="," />{'\n'}
          {'  '}<K c="filing_state_returned" /><P c=": " /><S c="original" /><P c="," />{'\n'}
          {'  '}<K c="metrics" /><P c=": {" />{'\n'}
          {'    '}<K c="current_liabilities" /><P c=": " /><N c="997586000" /><P c="," />{'\n'}
          {'    '}<K c="working_capital" /><P c=": " /><N c="1300059000" /><P c="," />{'\n'}
          {'    '}<K c="current_ratio" /><P c=": " /><N c="2.3" />{'\n'}
          {'  '}<P c="}," />{'\n'}
          {'  '}<K c="restatement_delta" /><P c=": {" />{'\n'}
          {'    '}<K c="current_liabilities" /><P c=": " /><N c="680453000" /><P c="," />{'\n'}
          {'    '}<K c="working_capital" /><P c=": " /><N c="-680453000" /><P c="," />{'\n'}
          {'    '}<K c="current_ratio" /><P c=": " /><N c="-0.93" />{'\n'}
          {'  '}<P c="}" />{'\n'}
          <P c="}" />
        </TerminalWindow>

      </div>


    </section>
  )
}

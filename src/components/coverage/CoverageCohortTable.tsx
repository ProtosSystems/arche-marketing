import type { CSSProperties } from 'react'
import { asOf, periods, rows, type CohortRow } from '@/content/coverage-cohort.illustrative'
import {Eyebrow} from "@/components/elements/eyebrow";

type ValidationResult = { ok: true } | { ok: false; message: string }

type CellStyle = CSSProperties & {
  ['--cell-bg-light']?: string
  ['--cell-bg-dark']?: string
}

function validateCohorts(input: CohortRow[], expectedPeriods: number): ValidationResult {
  for (const row of input) {
    if (row.cohortSize <= 0) {
      return { ok: false, message: `Row ${row.cohort} has invalid cohort size.` }
    }
    if (row.cells.length !== expectedPeriods) {
      return {
        ok: false,
        message: `Row ${row.cohort} has ${row.cells.length} cells; expected ${expectedPeriods}.`,
      }
    }
    for (const cell of row.cells) {
      if (!cell) continue
      if (Number.isNaN(cell.pct) || cell.pct < 0 || cell.pct > 1) {
        return { ok: false, message: `Row ${row.cohort} has pct out of range.` }
      }
    }
  }
  return { ok: true }
}

function formatPct(pct: number): string {
  return `${(pct * 100).toFixed(1)}%`
}

function formatCount(count: number): string {
  return count.toLocaleString('en-US')
}

function alphaFor(pct: number): number {
  if (pct >= 1) return 1
  const scaled = Math.pow(pct, 3.5)
  return 0.01 + 0.95 * scaled
}

export function CoverageCohortTable() {
  const validation = validateCohorts(rows, periods.length)
  if (!validation.ok) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
        Cohort data error: {validation.message}
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="max-w-2xl">
        <Eyebrow>Capabilities</Eyebrow>
        <p className="mt-2 text-4xl tracking-tight text-pretty text-primary sm:text-5xl sm:text-balance dark:text-slate-100">
          Coverage maturity by cohort
        </p>
        <p className="mt-6 text-lg/8 text-slate-700 dark:text-slate-300">
          <strong>Illustrative:</strong> Completeness of published Income, Balance Sheet and Cash Flow statements over time.
          Completeness means published normalized payload exists for statements.{' '}
          Not a live coverage report.
        </p>
      </div>

      <div className="relative pt-10">
        <div className="w-full rounded-2xl border border-mist-200/70 bg-white/70 p-6 shadow-[0_10px_30px_-25px_rgba(15,23,42,0.35)] dark:border-white/15 dark:bg-white/5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-mist-200/70 bg-white px-2 py-0.5 text-xs font-medium text-slate-700 dark:border-white/20 dark:bg-white/10 dark:text-slate-200">
                Illustrative
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">As of {asOf}</span>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[860px] table-fixed border-separate border-spacing-0 text-sm">
              <colgroup>
                <col style={{width: '9.5rem'}}/>
                <col style={{width: '11rem'}}/>
                {periods.map((period) => (
                  <col key={period}/>
                ))}
              </colgroup>
              <thead className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/90">
                <tr>
                  <th
                    className="sticky z-20 bg-white/95 px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-900/90 dark:text-slate-400"
                    style={{ left: 0 }}
                  >
                    Cohort
                  </th>
                  <th
                    className="sticky z-20 bg-white/95 px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-900/90 dark:text-slate-400"
                    style={{ left: '9.5rem' }}
                  >
                    Cohort size
                  </th>
                  {periods.map((period) => (
                    <th
                      key={period}
                      className="px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
                    >
                      {period}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.cohort} className="border-b border-mist-200/60 dark:border-white/10">
                    <td
                      className="sticky z-10 bg-white/95 px-3 py-3 text-left text-[13px] font-medium text-slate-700 dark:bg-slate-900/90 dark:text-slate-200"
                      style={{ left: 0 }}
                    >
                      {row.cohort}
                    </td>
                    <td
                      className="sticky z-10 bg-white/95 px-3 py-3 text-left text-[13px] text-slate-700 dark:bg-slate-900/90 dark:text-slate-200"
                      style={{ left: '9.5rem' }}
                    >
                      <div className="tabular-nums font-semibold">{formatCount(row.cohortSize)}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{row.cohortSizeLabel}</div>
                    </td>
                    {row.cells.map((cell, idx) => {
                      if (!cell) {
                        return (
                          <td key={`${row.cohort}-${idx}`} className="px-2 py-2 text-center text-[11px] text-slate-400">
                            <div className="min-w-[70px] rounded-md border border-mist-200/60 bg-mist-100/80 px-2.5 py-2 dark:border-white/15 dark:bg-white/5 dark:text-slate-500">
                              —
                            </div>
                          </td>
                        )
                      }

                      const alpha = alphaFor(cell.pct)
                      const alphaDark = Math.max(0.04, alpha * 0.85)
                      const fillLight = `rgba(11,31,59,${alpha})`
                      const fillDark = `rgba(11,31,59,${alphaDark})`
                      const style: CellStyle = {
                        '--cell-bg-light': fillLight,
                        '--cell-bg-dark': fillDark,
                      }

                      return (
                        <td key={`${row.cohort}-${idx}`} className="px-2 py-2 text-center">
                          <div
                            className="min-w-[70px] rounded-md border border-mist-200/70 bg-[var(--cell-bg-light)] px-2.5 py-2 text-[12px] font-semibold text-white dark:border-white/25 dark:bg-[var(--cell-bg-dark)]"
                            style={style}
                            title={`${row.cohort} ${periods[idx]}: ${formatPct(cell.pct)} (${formatCount(cell.count)})`}
                          >
                            <div className="tabular-nums leading-4">{formatPct(cell.pct)}</div>
                            <div className="tabular-nums text-[11px] font-normal text-white/80">
                              {formatCount(cell.count)}
                            </div>
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            Darker = higher completeness. Coverage may improve retroactively as late amendments and reclassifications are
            ingested.
          </div>
        </div>
      </div>
    </div>
  )
}

import heatmap from '@/content/coverage-heatmap.illustrative.json'

type HeatmapMetric = 'completeness' | 'revision_density'

type HeatmapCell = {
  cohort: string
  offset: number
  value: number
}

type HeatmapData = {
  as_of: string
  illustrative: true
  metric: HeatmapMetric
  cohorts: string[]
  offsets: number[]
  cells: HeatmapCell[]
}

const data = heatmap as HeatmapData

type ValidationResult = { ok: true } | { ok: false; message: string }

function validateHeatmap(input: HeatmapData): ValidationResult {
  const cohortSet = new Set(input.cohorts)
  const offsetSet = new Set(input.offsets)

  if (cohortSet.size !== input.cohorts.length) {
    return { ok: false, message: 'Duplicate cohort labels in dataset.' }
  }
  if (offsetSet.size !== input.offsets.length) {
    return { ok: false, message: 'Duplicate offsets in dataset.' }
  }

  for (const cell of input.cells) {
    if (!cohortSet.has(cell.cohort)) {
      return { ok: false, message: `Unknown cohort in cell: ${cell.cohort}` }
    }
    if (!offsetSet.has(cell.offset)) {
      return { ok: false, message: `Unknown offset in cell: ${cell.offset}` }
    }
    if (Number.isNaN(cell.value) || cell.value < 0 || cell.value > 1) {
      return { ok: false, message: `Cell value out of range for ${cell.cohort} +${cell.offset}q.` }
    }
  }

  return { ok: true }
}

function alphaFor(value: number): number {
  return 0.08 + 0.75 * value
}

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}`
}

export function CoverageHeatmap() {
  const validation = validateHeatmap(data)
  if (!validation.ok) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
        Heatmap data error: {validation.message}
      </div>
    )
  }

  const headerOffsets = data.offsets
  const rows = data.cohorts.map((cohort) => {
    const rowCells = new Map<number, HeatmapCell>()
    for (const cell of data.cells) {
      if (cell.cohort === cohort) {
        rowCells.set(cell.offset, cell)
      }
    }
    return { cohort, rowCells }
  })

  return (
    <div className="w-full rounded-2xl border border-mist-200/70 bg-white/70 p-6 shadow-[0_10px_30px_-25px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-white/5">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <div className="space-y-4">
          <div className="text-sm/6 text-slate-600 dark:text-slate-300">
            Coverage density by cohort
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-mist-200/70 bg-white px-2 py-0.5 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
              Illustrative
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">As of {data.as_of}</span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Cohorts are grouped by first coverage quarter. Values reflect illustrative completeness density over
            subsequent quarters.
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span>Low</span>
            <div className="flex items-center gap-1">
              {[0.15, 0.35, 0.55, 0.75, 0.95].map((value) => (
                <span
                  key={value}
                  className="h-3 w-3 rounded-[4px] border border-mist-200/70 dark:border-white/10"
                  style={{ backgroundColor: `rgba(11,31,59,${alphaFor(value)})` }}
                />
              ))}
            </div>
            <span>High</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="grid grid-cols-[140px_repeat(16,minmax(0,1fr))] gap-1 text-xs text-slate-500 dark:text-slate-400">
            <div className="font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Cohort</div>
            {headerOffsets.map((offset) => (
              <div key={offset} className="text-center">
                {offset % 4 === 0 ? `+${offset}q` : ''}
              </div>
            ))}
          </div>

          {rows.map((row) => (
            <div key={row.cohort} className="grid grid-cols-[140px_repeat(16,minmax(0,1fr))] gap-1">
              <div className="h-6 text-xs text-slate-600 dark:text-slate-300">{row.cohort}</div>
              {headerOffsets.map((offset) => {
                const cell = row.rowCells.get(offset)
                const value = cell?.value ?? 0
                const alpha = cell ? alphaFor(value) : 0
                const fill = `rgba(11,31,59,${alpha})`
                return (
                  <div
                    key={`${row.cohort}-${offset}`}
                    title={
                      cell
                        ? `${row.cohort} • +${offset}q: ${formatPercent(value)}%`
                        : `${row.cohort} • +${offset}q: —`
                    }
                    className="h-5 w-5 rounded-[6px] border border-mist-200/70 dark:border-white/10"
                    style={{
                      backgroundColor: cell ? `var(--color-primary, ${fill})` : 'transparent',
                      opacity: cell ? alpha : 0,
                    }}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

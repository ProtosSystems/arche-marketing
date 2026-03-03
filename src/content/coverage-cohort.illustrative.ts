export const asOf = '2025-12-31'

export const periods = ["+0q","+1q","+2q","+3q","+4q","+5q","+6q","+7q"]

export type CohortCell = { pct: number; count: number } | null

export type CohortRow = {
  cohort: string
  cohortSizeLabel: 'companies'
  cohortSize: number
  cells: CohortCell[]
}

export const rows: CohortRow[] = [
  {
    cohort: '2019 Q3',
    cohortSizeLabel: 'companies',
    cohortSize: 2325,
    cells: [
    { pct: 0.90, count: 2093 },
    { pct: 0.89, count: 2069 },
    { pct: 0.91, count: 2116 },
    { pct: 0.92, count: 2139 },
    { pct: 0.91, count: 2116 },
    { pct: 0.94, count: 2186 },
    { pct: 0.93, count: 2162 },
    { pct: 0.96, count: 2232 }
    ]
  },
  {
    cohort: '2019 Q4',
    cohortSizeLabel: 'companies',
    cohortSize: 2355,
    cells: [
    { pct: 0.89, count: 2096 },
    { pct: 0.88, count: 2072 },
    { pct: 0.90, count: 2120 },
    { pct: 0.91, count: 2143 },
    { pct: 0.90, count: 2120 },
    { pct: 0.92, count: 2167 },
    { pct: 0.94, count: 2214 },
    { pct: 0.95, count: 2237 }
    ]
  },
  {
    cohort: '2020 Q2',
    cohortSizeLabel: 'companies',
    cohortSize: 2405,
    cells: [
    { pct: 0.88, count: 2116 },
    { pct: 0.87, count: 2092 },
    { pct: 0.89, count: 2140 },
    { pct: 0.90, count: 2165 },
    { pct: 0.89, count: 2140 },
    { pct: 0.92, count: 2213 },
    { pct: 0.93, count: 2237 },
    { pct: 0.95, count: 2285 }
    ]
  },
  {
    cohort: '2021 Q1',
    cohortSizeLabel: 'companies',
    cohortSize: 2450,
    cells: [
    { pct: 0.88, count: 2156 },
    { pct: 0.89, count: 2181 },
    { pct: 0.87, count: 2132 },
    { pct: 0.90, count: 2205 },
    { pct: 0.92, count: 2254 },
    { pct: 0.91, count: 2230 },
    { pct: 0.94, count: 2303 },
    { pct: 0.96, count: 2352 }
    ]
  },
  {
    cohort: '2021 Q4',
    cohortSizeLabel: 'companies',
    cohortSize: 2510,
    cells: [
    { pct: 0.87, count: 2184 },
    { pct: 0.86, count: 2159 },
    { pct: 0.88, count: 2209 },
    { pct: 0.90, count: 2259 },
    { pct: 0.89, count: 2234 },
    { pct: 0.92, count: 2309 },
    { pct: 0.91, count: 2284 },
    { pct: 0.95, count: 2385 }
    ]
  },
  {
    cohort: '2022 Q3',
    cohortSizeLabel: 'companies',
    cohortSize: 2585,
    cells: [
    { pct: 0.83, count: 2146 },
    { pct: 0.82, count: 2120 },
    { pct: 0.84, count: 2171 },
    { pct: 0.85, count: 2197 },
    { pct: 0.86, count: 2223 },
    { pct: 0.85, count: 2197 },
    { pct: 0.88, count: 2275 },
    { pct: 0.90, count: 2327 }
    ]
  },
  {
    cohort: '2023 Q1',
    cohortSizeLabel: 'companies',
    cohortSize: 2645,
    cells: [
    { pct: 0.81, count: 2142 },
    { pct: 0.80, count: 2116 },
    { pct: 0.82, count: 2169 },
    { pct: 0.84, count: 2222 },
    { pct: 0.83, count: 2195 },
    { pct: 0.86, count: 2275 },
    { pct: 0.88, count: 2328 },
    { pct: 0.90, count: 2381 }
    ]
  },
  {
    cohort: '2023 Q4',
    cohortSizeLabel: 'companies',
    cohortSize: 2715,
    cells: [
    { pct: 0.79, count: 2145 },
    { pct: 0.78, count: 2118 },
    { pct: 0.80, count: 2172 },
    { pct: 0.81, count: 2199 },
    { pct: 0.83, count: 2253 },
    { pct: 0.82, count: 2226 },
    { pct: 0.85, count: 2308 },
    { pct: 0.88, count: 2389 }
    ]
  },
  {
    cohort: '2024 Q3',
    cohortSizeLabel: 'companies',
    cohortSize: 2785,
    cells: [
    { pct: 0.74, count: 2061 },
    { pct: 0.75, count: 2089 },
    { pct: 0.77, count: 2144 },
    { pct: 0.76, count: 2117 },
    { pct: 0.80, count: 2228 },
    { pct: 0.82, count: 2284 },
    { pct: 0.81, count: 2256 },
    null
    ]
  },
  {
    cohort: '2025 Q1',
    cohortSizeLabel: 'companies',
    cohortSize: 2845,
    cells: [
    { pct: 0.72, count: 2048 },
    { pct: 0.74, count: 2105 },
    { pct: 0.76, count: 2162 },
    { pct: 0.79, count: 2248 },
    null,
    null,
    null,
    null
    ]
  }
]

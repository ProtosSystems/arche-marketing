import * as React from "react";

type TimelineNode = {
    label: string;
    date: string;
    active?: boolean;
};

type DiffRow = {
    field: string;
    from: string;
    to: string;
    note: string; // e.g. "10-K/A"
};

type HeroVersionedTimelineCardProps = {
    company?: string;
    statement?: string;
    asOf?: string;
    nodes?: TimelineNode[];
    diff?: DiffRow;

    /**
     * Optional: if your hero background already includes the diagonal SVG pattern,
     * keep this false. If you want this component to include a subtle local pattern
     * behind the card, set true.
     */
    includeLocalPattern?: boolean;
};

export function HeroVersionedTimelineCard({
                                              company = "AAPL",
                                              statement = "Income Statement",
                                              asOf = "2023-12-31",
                                              nodes = [
                                                  { label: "Filed", date: "2022-02-10" },
                                                  { label: "Amended", date: "2022-04-03", active: true },
                                                  { label: "Reclassified", date: "2023-01-15" },
                                              ],
                                              diff = {
                                                  field: "Revenue",
                                                  from: "382.47B",
                                                  to: "383.28B",
                                                  note: "10-K/A",
                                              },
                                              includeLocalPattern = false,
                                          }: HeroVersionedTimelineCardProps) {
    const activeIndex = Math.max(0, nodes.findIndex((n) => n.active));
    const safeActiveIndex = activeIndex === -1 ? 0 : activeIndex;

    return (
        <div className="relative">
            {/* Optional local pattern (only if you want it inside this component) */}
            {includeLocalPattern ? (
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-3xl"
                >
                    <svg
                        className="absolute inset-0 h-full w-full opacity-60 [mask-image:linear-gradient(transparent,white_8rem)] dark:opacity-50"
                        viewBox="0 0 800 400"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <pattern
                                id="hero-diagonal-feature-pattern"
                                patternUnits="userSpaceOnUse"
                                width="64"
                                height="64"
                            >
                                {Array.from({ length: 17 }).map((_, i) => {
                                    const x = -106 + i * 8;
                                    return (
                                        <path
                                            key={i}
                                            d={`M${x} 110L${x + 128} -18`}
                                            className="stroke-slate-200/70 dark:stroke-white/10"
                                            strokeWidth="1"
                                            fill="none"
                                        />
                                    );
                                })}
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#hero-diagonal-feature-pattern)" />
                    </svg>
                </div>
            ) : null}

            {/* Card */}
            <div
                className="
          relative mx-auto max-w-2xl rounded-3xl border p-6 backdrop-blur md:p-8
          border-slate-200/70 bg-white/85
          shadow-[0_20px_60px_-35px_rgba(15,23,42,0.45)]
          dark:border-white/10 dark:bg-[#0F172A]/80
          dark:shadow-[0_20px_60px_-35px_rgba(0,0,0,0.55)]
        "
            >
                {/* Subtle gradient edge */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-slate-900/5 dark:ring-white/10"
                />

                {/* Header */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#3A4F7A]/70 dark:bg-[#3A4F7A]" />
                            <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-100">
                                {company} <span className="text-slate-400 dark:text-white/30">·</span>{" "}
                                <span className="text-slate-600 dark:text-slate-400">{statement}</span>
                            </p>
                        </div>
                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-300">
                            Conceptual view of versioned statements (illustrative)
                        </p>
                    </div>

                    <div
                        className="
              flex shrink-0 items-center gap-2 self-start rounded-full border px-3 py-1.5 text-xs
              border-slate-200 bg-white/70 text-slate-700
              dark:border-white/10 dark:bg-white/5 dark:text-slate-100
            "
                    >
                        <span className="font-mono text-slate-600 dark:text-slate-400">as_of</span>
                        <span className="text-slate-400 dark:text-white/30">=</span>
                        <span className="font-mono font-semibold text-slate-800 dark:text-white">{asOf}</span>
                    </div>
                </div>

                {/* Timeline */}
                <div className="mt-6">
                    <Timeline nodes={nodes} activeIndex={safeActiveIndex} />
                </div>

                {/* Diff row */}
                <div
                    className="
            mt-6 rounded-2xl border px-4 py-4
            border-slate-200 bg-white/70
            dark:border-white/10 dark:bg-white/5
          "
                >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">{diff.field}</p>
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">
                                Change captured as a first-class event (not an overwrite)
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <ValuePill label="from" value={diff.from} />
                            <ArrowMark />
                            <ValuePill label="to" value={diff.to} emphasis />
                            <span
                                className="
                  ml-0 inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium sm:ml-2
                  border-slate-200 bg-white text-slate-700
                  dark:border-white/10 dark:bg-white/5 dark:text-slate-100
                "
                            >
                {diff.note}
              </span>
                        </div>
                    </div>
                </div>

                {/* Footer micro-metadata */}
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-300">
                    <MetaChip>Provenance attached</MetaChip>
                    <MetaChip>Temporal truth explicit</MetaChip>
                    <MetaChip>As-of queries supported</MetaChip>
                </div>
            </div>
        </div>
    );
}

function Timeline({
                      nodes,
                      activeIndex,
                  }: {
    nodes: TimelineNode[];
    activeIndex: number;
}) {
    // Layout
    const W = 720;
    const H = 110;
    const padX = 56;
    const y = 36;
    const n = Math.max(2, nodes.length);
    const step = (W - padX * 2) / (n - 1);
    const r = 7;

    return (
        <div
            className="
        rounded-2xl border px-4 py-4
        border-slate-200 bg-white/70
        dark:border-white/10 dark:bg-white/5

        /* Timeline theme tokens (light + dark) */
        [--tl-accent:#0F172A]             dark:[--tl-accent:#3A4F7A]          /* Navy → Slate Blue */
        [--tl-ring:rgba(27,58,100,0.18)]  dark:[--tl-ring:rgba(58,79,122,0.28)]
        [--tl-baseline:rgba(148,163,184,0.55)] dark:[--tl-baseline:rgba(255,255,255,0.18)]
        [--tl-inactive-stroke:rgba(148,163,184,0.55)] dark:[--tl-inactive-stroke:rgba(255,255,255,0.18)]
        [--tl-inactive-fill:rgba(241,245,249,1)]      dark:[--tl-inactive-fill:rgba(255,255,255,0.06)]
      "
        >
            <svg
                className="h-[110px] w-full"
                viewBox={`0 0 ${W} ${H}`}
                role="img"
                aria-label="Version timeline showing filed, amended, and reclassified events."
            >
                {/* Baseline */}
                <line
                    x1={padX}
                    y1={y}
                    x2={W - padX}
                    y2={y}
                    stroke="var(--tl-baseline)"
                    strokeWidth={2}
                    strokeLinecap="round"
                />

                {/* Active segment */}
                {activeIndex > 0 ? (
                    <line
                        x1={padX}
                        y1={y}
                        x2={padX + step * activeIndex}
                        y2={y}
                        stroke="var(--tl-accent)"
                        strokeOpacity={0.95}
                        strokeWidth={2.5}
                        strokeLinecap="round"
                    />
                ) : null}

                {/* Nodes */}
                {nodes.map((node, i) => {
                    const cx = padX + step * i;
                    const isActive = i === activeIndex;

                    return (
                        <g key={`${node.label}-${i}`}>
                            {/* outer ring */}
                            <circle
                                cx={cx}
                                cy={y}
                                r={r + 7}
                                fill={isActive ? "var(--tl-ring)" : "transparent"}
                            />

                            {/* node */}
                            <circle
                                cx={cx}
                                cy={y}
                                r={r}
                                fill={isActive ? "var(--tl-accent)" : "var(--tl-inactive-fill)"}
                                stroke={isActive ? "var(--tl-accent)" : "var(--tl-inactive-stroke)"}
                                strokeWidth={2}
                            />

                            {/* label */}
                            <text
                                x={cx}
                                y={y + 34}
                                textAnchor="middle"
                                className="fill-slate-700 dark:fill-slate-200"
                                style={{ fontSize: 12, fontWeight: isActive ? 700 : 600 }}
                            >
                                {node.label}
                            </text>

                            {/* date */}
                            <text
                                x={cx}
                                y={y + 54}
                                textAnchor="middle"
                                className="fill-slate-500 dark:fill-slate-400"
                                style={{
                                    fontSize: 11,
                                    fontFamily:
                                        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                                }}
                            >
                                {node.date}
                            </text>
                        </g>
                    );
                })}
            </svg>

            {/* Legend */}
            <div className="mt-1 flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-300">
        <span className="inline-flex items-center gap-2">
          <span
              className="inline-block h-2 w-2 rounded-full bg-[#0F172A] dark:bg-[#3A4F7A]"
              aria-hidden="true"
          />
          Active revision
        </span>
                <span className="font-mono text-slate-500 dark:text-slate-400">
          statement_version_id: v_7f2a…
        </span>
            </div>
        </div>
    );
}

function ValuePill({
                       label,
                       value,
                       emphasis = false,
                   }: {
    label: string;
    value: string;
    emphasis?: boolean;
}) {
    return (
        <span
            className={[
                "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs",
                emphasis
                    ? // Emphasis pill: Navy surface (brand anchor) + white text, consistent in both modes.
                    "border-[#0F172A] bg-[#0F172A] text-white dark:border-white/10 dark:bg-[#0F172A] dark:text-white"
                    : // Standard pill: subtle surface, readable in both modes.
                    "border-slate-200 bg-white text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-slate-100",
            ].join(" ")}
        >
      <span className={emphasis ? "text-white/70" : "text-slate-500 dark:text-slate-300"}>
        {label}
      </span>
      <span className="font-mono font-semibold">{value}</span>
    </span>
    );
}

function ArrowMark() {
    return (
        <span
            aria-hidden="true"
            className="inline-flex items-center text-slate-400 dark:text-white/30"
        >
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
        <path
            d="M4 10h10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
        />
        <path
            d="M11.5 6.5L15 10l-3.5 3.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
      </svg>
    </span>
    );
}

function MetaChip({ children }: { children: React.ReactNode }) {
    return (
        <span
            className="
        inline-flex items-center rounded-full border px-2.5 py-1 text-xs
        border-slate-200 bg-white/70 text-slate-600
        dark:border-white/10 dark:bg-white/5 dark:text-slate-200
      "
        >
      {children}
    </span>
    );
}

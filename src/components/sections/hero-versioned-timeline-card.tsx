"use client";
import * as React from "react";
import { useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

// ─── Theme-aware palettes ─────────────────────────────────────────────────────

const DARK = {
    cardBg:          "bg-[#0F172A]/80",
    cardBorder:      "border-white/10",
    cardRing:        "ring-white/10",
    tabBorder:       "border-white/10",
    innerBorder:     "border-white/10",
    innerBg:         "bg-white/5",
    fg:              "#ffffff",
    mist:            "#cbd5e1",
    dim:             "rgba(255,255,255,0.28)",
    valueHighlight:  "#ffffff",
    tlAccent:        "#ffffff",
    tlRing:          "rgba(255,255,255,0.18)",
    tlBaseline:      "rgba(203,213,225,0.35)",
    tlInactiveStroke:"rgba(203,213,225,0.35)",
    tlInactiveFill:  "rgba(255,255,255,0.06)",
    pulseOuter:      "rgba(255,255,255,0.08)",
    pulseInner:      "rgba(255,255,255,0.10)",
    dotLegend:       "bg-white",
    tabIndicator:    "bg-white",
    terminalDot:     "bg-white/20",
    shadow:          "shadow-[0_20px_60px_-35px_rgba(0,0,0,0.55)]",
};

const LIGHT = {
    cardBg:          "bg-white",
    cardBorder:      "border-black/10",
    cardRing:        "ring-black/5",
    tabBorder:       "border-black/8",
    innerBorder:     "border-black/8",
    innerBg:         "bg-black/[0.03]",
    fg:              "#111827",
    mist:            "#6B7280",
    dim:             "rgba(17,24,39,0.35)",
    valueHighlight:  "#111827",
    tlAccent:        "#0F172A",
    tlRing:          "rgba(15,23,42,0.12)",
    tlBaseline:      "rgba(15,23,42,0.18)",
    tlInactiveStroke:"rgba(15,23,42,0.18)",
    tlInactiveFill:  "rgba(15,23,42,0.05)",
    pulseOuter:      "rgba(15,23,42,0.06)",
    pulseInner:      "rgba(15,23,42,0.08)",
    dotLegend:       "bg-gray-800",
    tabIndicator:    "bg-gray-900",
    terminalDot:     "bg-black/15",
    shadow:          "shadow-[0_20px_60px_-35px_rgba(0,0,0,0.12)]",
};

// ─── Types ────────────────────────────────────────────────────────────────────

type TimelineNode = {
    label: string;
    date: string;
    active?: boolean;
};

type DiffRow = {
    field: string;
    from: string;
    to: string;
    note: string;
};

type HeroVersionedTimelineCardProps = {
    company?: string;
    statement?: string;
    asOf?: string;
    nodes?: TimelineNode[];
    diff?: DiffRow;
    includeLocalPattern?: boolean;
};

// ─── Card ─────────────────────────────────────────────────────────────────────

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
    const [tab, setTab] = useState<0 | 1>(0);

    const { resolvedTheme } = useTheme();
    const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
    const c = (mounted && resolvedTheme === "dark") ? DARK : LIGHT;

    return (
        <div className="relative w-full">
            {includeLocalPattern ? (
                <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-3xl">
                    <svg className="absolute inset-0 h-full w-full opacity-50" viewBox="0 0 800 400" preserveAspectRatio="none">
                        <defs>
                            <pattern id="hero-diagonal-feature-pattern" patternUnits="userSpaceOnUse" width="64" height="64">
                                {Array.from({ length: 17 }).map((_, i) => (
                                    <path key={i} d={`M${-106 + i * 8} 110L${-106 + i * 8 + 128} -18`} className="stroke-white/10" strokeWidth="1" fill="none" />
                                ))}
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#hero-diagonal-feature-pattern)" />
                    </svg>
                </div>
            ) : null}

            {/* Card */}
            <div className={`relative mx-auto w-full max-w-2xl rounded-3xl border backdrop-blur overflow-hidden ${c.cardBorder} ${c.cardBg} ${c.shadow}`}>
                <div className={`pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ${c.cardRing}`} />

                {/* Tab bar */}
                <div className={`flex items-center border-b ${c.tabBorder}`}>
                    <button
                        type="button"
                        onClick={() => setTab(0)}
                        className="relative px-5 py-3.5 text-xs font-semibold tracking-wide transition-colors"
                        style={{ color: tab === 0 ? c.fg : c.mist }}
                    >
                        Timeline View
                        {tab === 0 && <span className={`absolute inset-x-0 bottom-0 h-0.5 ${c.tabIndicator}`} />}
                    </button>
                    <button
                        type="button"
                        onClick={() => setTab(1)}
                        className="relative px-5 py-3.5 text-xs font-semibold tracking-wide transition-colors"
                        style={{ color: tab === 1 ? c.fg : c.mist }}
                    >
                        API Response
                        {tab === 1 && <span className={`absolute inset-x-0 bottom-0 h-0.5 ${c.tabIndicator}`} />}
                    </button>
                </div>

                {/* Card content */}
                <div className="p-6 md:p-8">
                    {/* Header */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <span className={`inline-flex h-2.5 w-2.5 rounded-full ${c.dotLegend}`} />
                                <p className="truncate text-sm font-medium" style={{ color: c.fg }}>
                                    {company} <span style={{ color: c.mist }}>·</span>{" "}
                                    <span style={{ color: c.mist }}>{statement}</span>
                                </p>
                            </div>
                            <p className="mt-2 text-xs" style={{ color: c.mist }}>
                                Conceptual view of versioned statements (illustrative)
                            </p>
                        </div>
                        <div className={`flex shrink-0 items-center gap-2 self-start rounded-full border px-3 py-1.5 text-xs ${c.innerBorder} ${c.innerBg}`}>
                            <span className="font-mono" style={{ color: c.mist }}>as_of</span>
                            <span style={{ color: c.mist }}>=</span>
                            <span className="font-mono font-semibold" style={{ color: c.fg }}>{asOf}</span>
                        </div>
                    </div>

                    {/* Tab content */}
                    <div className="mt-5" style={{ height: 360, overflow: "hidden" }}>
                        {tab === 0 ? (
                            <>
                                <Timeline nodes={nodes} activeIndex={safeActiveIndex} c={c} />
                                <div className={`mt-4 rounded-2xl border px-4 py-4 ${c.innerBorder} ${c.innerBg}`}>
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold" style={{ color: c.fg }}>{diff.field}</p>
                                            <p className="mt-1 text-xs" style={{ color: c.mist }}>
                                                Change captured as a first-class event (not an overwrite)
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <ValuePill label="from" value={diff.from} c={c} />
                                            <ArrowMark c={c} />
                                            <ValuePill label="to" value={diff.to} emphasis c={c} />
                                            <span className={`ml-0 inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium sm:ml-2 ${c.innerBorder} ${c.innerBg}`} style={{ color: c.fg }}>
                                                {diff.note}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-2 text-xs" style={{ color: c.mist }}>
                                    <MetaChip c={c}>Provenance attached</MetaChip>
                                    <MetaChip c={c}>Temporal truth explicit</MetaChip>
                                    <MetaChip c={c}>As-of queries supported</MetaChip>
                                </div>
                            </>
                        ) : (
                            <JsonTerminal c={c} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Timeline ────────────────────────────────────────────────────────────────

function Timeline({ nodes, activeIndex, c }: { nodes: TimelineNode[]; activeIndex: number; c: typeof DARK }) {
    const W = 720, H = 110, padX = 56, y = 36, r = 7;
    const n = Math.max(2, nodes.length);
    const step = (W - padX * 2) / (n - 1);

    return (
        <div
            className={`rounded-2xl border px-4 py-4 ${c.innerBorder} ${c.innerBg}`}
            style={{
                "--tl-accent":          c.tlAccent,
                "--tl-ring":            c.tlRing,
                "--tl-baseline":        c.tlBaseline,
                "--tl-inactive-stroke": c.tlInactiveStroke,
                "--tl-inactive-fill":   c.tlInactiveFill,
            } as React.CSSProperties}
        >
            <svg className="h-[110px] w-full" viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
                <line x1={padX} y1={y} x2={W - padX} y2={y} stroke="var(--tl-baseline)" strokeWidth={2} strokeLinecap="round" />
                {activeIndex > 0 && (
                    <line x1={padX} y1={y} x2={padX + step * activeIndex} y2={y} stroke="var(--tl-accent)" strokeOpacity={0.9} strokeWidth={2.5} strokeLinecap="round" />
                )}
                {nodes.map((node, i) => {
                    const cx = padX + step * i;
                    const isActive = i === activeIndex;
                    const isAmendedActive = isActive && node.label === "Amended";
                    return (
                        <g key={`${node.label}-${i}`}>
                            {isAmendedActive && (
                                <>
                                    <circle cx={cx} cy={y} r={r + 12} fill={c.pulseOuter}>
                                        <animate attributeName="r" values={`${r + 9};${r + 16};${r + 9}`} dur="1.8s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" values="0.6;0.18;0.6" dur="1.8s" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx={cx} cy={y} r={r + 8} fill={c.pulseInner}>
                                        <animate attributeName="r" values={`${r + 7};${r + 11};${r + 7}`} dur="1.8s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" values="0.5;0.12;0.5" dur="1.8s" repeatCount="indefinite" />
                                    </circle>
                                </>
                            )}
                            <circle cx={cx} cy={y} r={r + 7} fill={isActive ? "var(--tl-ring)" : "transparent"} />
                            <circle cx={cx} cy={y} r={r}
                                fill={isActive ? "var(--tl-accent)" : "var(--tl-inactive-fill)"}
                                stroke={isActive ? "var(--tl-accent)" : "var(--tl-inactive-stroke)"}
                                strokeWidth={2}
                            />
                            <text x={cx} y={y + 34} textAnchor="middle" fill={isActive ? c.fg : c.mist} style={{ fontSize: 12, fontWeight: isActive ? 700 : 600 }}>
                                {node.label}
                            </text>
                            <text x={cx} y={y + 54} textAnchor="middle" fill={c.mist} style={{ fontSize: 11, fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" }}>
                                {node.date}
                            </text>
                        </g>
                    );
                })}
            </svg>
            <div className="mt-1 flex items-center justify-between gap-2 text-xs" style={{ color: c.mist }}>
                <span className="inline-flex items-center gap-2">
                    <span className={`inline-block h-2 w-2 rounded-full ${c.dotLegend}`} />
                    Active revision
                </span>
                <span className="font-mono">statement_version_id: v_7f2a…</span>
            </div>
        </div>
    );
}

// ─── JSON Terminal ────────────────────────────────────────────────────────────

const S = ({ c, children }: { c: string; children: React.ReactNode }) => (
    <span style={{ color: c }}>{children}</span>
);

function Line({ i, children }: { i: number; children: React.ReactNode }) {
    return <div style={{ paddingLeft: i * 14 }} className="leading-[1.65]">{children}</div>;
}

function JsonTerminal({ c }: { c: typeof DARK }) {
    const DIM = c.dim;
    const MIST = c.mist;
    const VAL = c.valueHighlight;

    return (
        <div className={`rounded-2xl border overflow-hidden ${c.innerBorder} ${c.innerBg}`}>
            {/* Terminal chrome */}
            <div className={`flex items-center gap-1.5 border-b px-4 py-2.5 ${c.innerBorder}`}>
                <span className={`h-2 w-2 rounded-full ${c.terminalDot}`} />
                <span className={`h-2 w-2 rounded-full ${c.terminalDot}`} />
                <span className={`h-2 w-2 rounded-full ${c.terminalDot}`} />
                <span className="ml-3 font-mono text-[11px] truncate min-w-0" style={{ color: MIST }}>
                    GET /v1/edgar/statements/restatements/delta?cik=0000320193&fiscal_year=2022&fiscal_period=FY
                </span>
            </div>
            <div className="overflow-auto px-4 py-4 font-mono text-[11px]" style={{ maxHeight: 310, color: MIST }}>
                <Line i={0}><S c={DIM}>{"{"}</S></Line>
                <Line i={1}><S c={MIST}>"data"</S><S c={DIM}>: {"{"}</S></Line>
                <Line i={2}><S c={MIST}>"cik"</S><S c={DIM}>: </S><S c={VAL}>"0000320193"</S><S c={DIM}>,</S></Line>
                <Line i={2}><S c={MIST}>"statement_type"</S><S c={DIM}>: </S><S c={VAL}>"INCOME_STATEMENT"</S><S c={DIM}>,</S></Line>
                <Line i={2}><S c={MIST}>"fiscal_year"</S><S c={DIM}>: </S><S c={VAL}>2022</S><S c={DIM}>,</S></Line>
                <Line i={2}><S c={MIST}>"fiscal_period"</S><S c={DIM}>: </S><S c={VAL}>"FY"</S><S c={DIM}>,</S></Line>
                <Line i={2}><S c={MIST}>"from_version_sequence"</S><S c={DIM}>: </S><S c={VAL}>1</S><S c={DIM}>,</S></Line>
                <Line i={2}><S c={MIST}>"to_version_sequence"</S><S c={DIM}>: </S><S c={VAL}>2</S><S c={DIM}>,</S></Line>
                <Line i={2}><S c={MIST}>"summary"</S><S c={DIM}>: {"{"}</S></Line>
                <Line i={3}><S c={MIST}>"total_metrics_compared"</S><S c={DIM}>: </S><S c={VAL}>18</S><S c={DIM}>,</S></Line>
                <Line i={3}><S c={MIST}>"total_metrics_changed"</S><S c={DIM}>: </S><S c={VAL}>1</S><S c={DIM}>,</S></Line>
                <Line i={3}><S c={MIST}>"has_material_change"</S><S c={DIM}>: </S><S c={VAL}>true</S></Line>
                <Line i={2}><S c={DIM}>{"}, "}</S></Line>
                <Line i={2}><S c={MIST}>"deltas"</S><S c={DIM}>: [{"{"}</S></Line>
                <Line i={3}><S c={MIST}>"metric"</S><S c={DIM}>: </S><S c={VAL}>"REVENUE"</S><S c={DIM}>,</S></Line>
                <Line i={3}><S c={MIST}>"old_value"</S><S c={DIM}>: </S><S c={VAL}>"382470000000"</S><S c={DIM}>,</S></Line>
                <Line i={3}><S c={MIST}>"new_value"</S><S c={DIM}>: </S><S c={VAL}>"383280000000"</S><S c={DIM}>,</S></Line>
                <Line i={3}><S c={MIST}>"diff"</S><S c={DIM}>: </S><S c={VAL}>"810000000"</S></Line>
                <Line i={2}><S c={DIM}>{"}]"}</S></Line>
                <Line i={1}><S c={DIM}>{"}"}</S></Line>
                <Line i={0}><S c={DIM}>{"}"}</S></Line>
            </div>
        </div>
    );
}

// ─── Atoms ────────────────────────────────────────────────────────────────────

function ValuePill({ label, value, emphasis = false, c }: { label: string; value: string; emphasis?: boolean; c: typeof DARK }) {
    return (
        <span className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs ${c.innerBorder} ${c.innerBg}`} style={{ color: c.fg }}>
            <span style={{ color: c.mist }}>{label}</span>
            <span className="font-mono font-semibold">{value}</span>
        </span>
    );
}

function ArrowMark({ c }: { c: typeof DARK }) {
    return (
        <span className="inline-flex items-center" style={{ color: c.mist }}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" role="presentation" focusable="false">
                <path d="M4 10h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M11.5 6.5L15 10l-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </span>
    );
}

function MetaChip({ children, c }: { children: React.ReactNode; c: typeof DARK }) {
    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs ${c.innerBorder} ${c.innerBg}`} style={{ color: c.mist }}>
            {children}
        </span>
    );
}

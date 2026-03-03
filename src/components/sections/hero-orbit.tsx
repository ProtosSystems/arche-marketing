import * as React from "react"
import { clsx } from "clsx/lite"

type OrbitItem = {
  key: string
  delaySec: number
  icon: React.ReactNode
  label?: string
  badge?: string
  pingDelaySec?: number
}

type HeroOrbitProps = {
  className?: string
}

const ACCENT = "#0B1F3B"

export function HeroOrbit({ className }: HeroOrbitProps) {
  const items: OrbitItem[] = [
    { key: "versioned", delaySec: 0, icon: <IconLayers />, label: "Versioned", badge: "V", pingDelaySec: 1 },
    { key: "reconciled", delaySec: -8, icon: <IconMerge />, label: "Reconciled", badge: "R", pingDelaySec: 4 },
    { key: "provenance", delaySec: -16, icon: <IconLink />, pingDelaySec: 2 },
    { key: "auditable", delaySec: -24, icon: <IconCheckCircle />, label: "Auditable", badge: "A", pingDelaySec: 6 },
    { key: "sdk", delaySec: -32, icon: <IconBrackets />, pingDelaySec: 3 },
  ]

  return (
    <div
      className={clsx("relative flex items-center justify-center", className)}
      style={{ width: 312, height: 312, ["--accent" as any]: ACCENT } as React.CSSProperties}
      aria-hidden="true"
    >
      {/* Outer pulse ring */}
      <div
        className="absolute animate-pulse rounded-full border border-slate-300 bg-slate-500/5 dark:border-slate-700/80 dark:bg-slate-900/40"
        style={{ width: 280, height: 280, boxShadow: "0 0 40px -26px rgba(11, 31, 59, 0.6)" }}
      />

      {/* Orbiting nodes */}
      {items.map((item) => (
        <OrbitingNode key={item.key} item={item} />
      ))}

      {/* Center coin */}
      <CenterAlpha />
    </div>
  )
}

function OrbitingNode({ item }: { item: OrbitItem }) {
  const spin = {
    animationName: "spin",
    animationDuration: "40s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationDelay: `${item.delaySec}s`,
  } as const

  const reverseSpin = {
    ...spin,
    animationDirection: "reverse" as const,
  }

  return (
    <div
      className="absolute flex items-center justify-center"
      style={{
        ...spin,
        transformOrigin: "calc(50% + 140px) 50%",
        left: "calc(50% - 156px)",
        top: "calc(50% - 16px)",
        width: 32,
        height: 32,
      }}
    >
      <div className="flex h-full w-full items-center justify-center" style={reverseSpin}>
        <div className="relative flex items-center justify-center">
          {/* Icon */}
          <div className="z-10 size-5 text-[color:var(--accent)]">{item.icon}</div>

          {/* Bubble */}
          <div className="absolute size-10 rounded-full bg-white/60 ring-1 shadow-lg ring-black/5 dark:bg-slate-950/70 dark:ring-white/10" />

          {/* Label chip */}
          {item.label ? (
            <div className="absolute -top-5 left-4">
              <div className="flex gap-1">
                <div
                  className="flex items-center justify-center rounded-l-full p-1 text-xs ring-1 ring-slate-200/80"
                  style={{ background: "var(--accent)", color: "#fff" }}
                >
                  <span className="text-[11px] font-semibold leading-none">{item.badge}</span>
                </div>
                <div className="rounded-r-full bg-white/60 py-0.5 pr-1.5 pl-1 text-xs whitespace-nowrap ring-1 ring-slate-200/80 text-slate-800 dark:bg-slate-950/70 dark:text-slate-100 dark:ring-white/10">
                  {item.label}
                </div>
              </div>
            </div>
          ) : null}

          {/* Ping ring */}
          {typeof item.pingDelaySec === "number" ? (
            <div
              className="absolute size-10 animate-[ping_7s_ease_infinite] rounded-full ring-1"
              style={{
                animationDelay: `${item.pingDelaySec}s`,
                boxShadow: "0 0 0 1px rgba(11, 31, 59, 0.3)",
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}

function CenterAlpha() {
  return (
    <div className="relative flex h-48 w-48 items-center justify-center">
      <div className="rounded-full p-1 ring-1 ring-black/10 dark:ring-white/10">
        <div
          className={clsx(
            "relative z-10 flex size-20 items-center justify-center rounded-full bg-white ring-1",
            "shadow-[inset_0px_-15px_20px_rgba(0,0,0,0.1),0_7px_10px_0_rgba(0,0,0,0.15)]",
            "ring-black/20 dark:bg-slate-950 dark:ring-white/10",
          )}
        >
          <span
            className="select-none leading-none"
            style={{
              color: "var(--accent)",
              fontSize: 52,
              fontWeight: 700,
              transform: "translateY(-1px)",
            }}
          >
            ⍺
          </span>
        </div>
        <div
          className="absolute inset-12 animate-[spin_8s_linear_infinite] rounded-full blur-lg"
          style={{ background: "linear-gradient(to top, transparent, rgba(11, 31, 59, 0.55), transparent)" }}
        />
      </div>
    </div>
  )
}

/* Inline SVG icons (currentColor) */
function IconLayers() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 3 3 8l9 5 9-5-9-5Zm0 7L3 5v3l9 5 9-5V5l-9 5Zm0 6-9-5v3l9 5 9-5v-3l-9 5Z" />
    </svg>
  )
}

function IconMerge() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M7 4a1 1 0 0 1 1 1v4.6l3.2 3.2a3 3 0 0 0 2.1.9H17l-1.3-1.3a1 1 0 1 1 1.4-1.4l3 3a1 1 0 0 1 0 1.4l-3 3a1 1 0 1 1-1.4-1.4L17 16h-3.7a5 5 0 0 1-3.5-1.5L7 11.7V5a1 1 0 0 1 1-1Z" />
    </svg>
  )
}

function IconCheckCircle() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm-1.1 13.3-3.2-3.2 1.4-1.4 1.8 1.8 4.7-4.7 1.4 1.4Z" />
    </svg>
  )
}

function IconLink() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M9.5 14.5a3 3 0 0 1 0-4.2l2.8-2.8a3 3 0 0 1 4.2 4.2l-1.3 1.3a1 1 0 1 1-1.4-1.4l1.3-1.3a1 1 0 0 0-1.4-1.4l-2.8 2.8a1 1 0 0 0 1.4 1.4 1 1 0 0 1 1.4 1.4 3 3 0 0 1-4.2 0Zm-2 2 1.3-1.3a1 1 0 1 1 1.4 1.4l-1.3 1.3a3 3 0 0 0 4.2 4.2l2.8-2.8a3 3 0 0 0 0-4.2 1 1 0 1 1 1.4-1.4 5 5 0 0 1 0 7l-2.8 2.8a5 5 0 0 1-7-7Z" />
    </svg>
  )
}

function IconBrackets() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M8 5H6v14h2v-2H8V7h0V5Zm10 0h-2v2h0v10h0v2h2V5Z" />
    </svg>
  )
}

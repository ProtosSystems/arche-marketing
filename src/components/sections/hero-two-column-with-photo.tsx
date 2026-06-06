import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { Heading } from '../elements/heading'
import { Text } from '../elements/text'

const TOPO_PATHS: string[] = (() => {
  const W = 1200, H = 520
  const LINES = 40
  const PTS = 120

  const wave = (x: number) => {
    // Gaussian peaks — contour lines of a data distribution surface
    const g = (mu: number, sigma: number, amp: number) =>
        amp * Math.exp(-((x - mu) ** 2) / (2 * sigma ** 2))

    const peaks =
        g(210,  210, 210) +   // left cluster
        g(680,  170, 255) +   // dominant central peak
        g(460,  100, 115) +   // smaller saddle peak between left and centre
        g(960,  190, 185) +   // right cluster
        g(1130, 120,  90)     // far-right shoulder

    // Slight roughness so contours aren't perfectly elliptical
    const texture =
        6 * Math.sin(x * 0.0437 + 1.3) +
        3 * Math.sin(x * 0.0821 + 2.6)

    return peaks + texture
}

  let wMin = Infinity, wMax = -Infinity
  for (let i = 0; i <= 300; i++) {
    const v = wave((i / 300) * W)
    if (v < wMin) wMin = v
    if (v > wMax) wMax = v
  }

  const lo = 0 + wMin
  const hi = H + wMax

  return Array.from({ length: LINES }, (_, l) => {
    const C = lo + (l / (LINES - 1)) * (hi - lo)
    const pts = Array.from({ length: PTS + 1 }, (_, j) => {
      const x = (j / PTS) * W
      const y = C - wave(x)
      return [x, y] as [number, number]
    })
    let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)]
      const p1 = pts[i]
      const p2 = pts[i + 1]
      const p3 = pts[Math.min(pts.length - 1, i + 2)]
      const cp1x = p1[0] + (p2[0] - p0[0]) / 6
      const cp1y = p1[1] + (p2[1] - p0[1]) / 6
      const cp2x = p2[0] - (p3[0] - p1[0]) / 6
      const cp2y = p2[1] - (p3[1] - p1[1]) / 6
      d += `C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`
    }
    return d
  })
})()

export function HeroTwoColumnWithPhoto({
  eyebrow,
  headline,
  subheadline,
  cta,
  photo,
  footer,
  className,
  ...props
}: {
  eyebrow?: ReactNode
  headline: ReactNode
  subheadline: ReactNode
  cta?: ReactNode
  photo?: ReactNode
  footer?: ReactNode
} & ComponentProps<'section'>) {
  return (
    <section
      className={clsx(
        'relative isolate overflow-hidden bg-[var(--header-bg)] pt-24 pb-16 sm:pt-32 sm:pb-24 border-b border-[var(--header-border)]',
        className,
      )}
      {...props}
    >
      <style>{`
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.12; transform: scale(1); }
          50% { opacity: 0.22; transform: scale(1.15); }
        }
        .hero-glow { animation: glow-pulse 4s ease-in-out infinite; }
      `}</style>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 flex items-start justify-center transform-gpu"
      >
        <div className="hero-glow h-[28rem] w-[28rem] rounded-full bg-[#a0a0a0] dark:bg-white blur-3xl" />
      </div>
      {/* Topographic contour lines */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        viewBox="0 0 1200 500"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(255,255,255,1) 20%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(255,255,255,0.15) 25%, rgba(255,255,255,0.6) 42%, rgba(255,255,255,1) 55%, rgba(255,255,255,1) 88%, rgba(0,0,0,0) 100%)',
          WebkitMaskComposite: 'destination-in',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(255,255,255,1) 20%, rgba(255,255,255,0.4) 65%, rgba(255,255,255,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(255,255,255,0.15) 25%, rgba(255,255,255,0.6) 42%, rgba(255,255,255,1) 55%, rgba(255,255,255,1) 88%, rgba(0,0,0,0) 100%)',
          maskComposite: 'intersect',
          opacity: 0.14,
        }}
      >
        <path d={TOPO_PATHS.join(' ')} stroke="#374151" strokeWidth="0.7" fill="none" className="dark:stroke-white" />
      </svg>
      <Container className="relative flex gap-16 max-xl:flex-col">
        <div className="flex flex-1 min-w-0 flex-col items-start justify-center gap-6">
          {eyebrow}
          <Heading color="header" className="max-w-5xl">{headline}</Heading>
          <Text size="lg" className="flex max-w-3xl flex-col gap-4 !text-[var(--header-fg-muted)]">
            {subheadline}
          </Text>
          {cta}
        </div>
        <div className="flex flex-1 min-w-0 *:object-cover">
          {photo}
        </div>
      </Container>
      {footer && <div className="mt-8">{footer}</div>}
    </section>
  )
}

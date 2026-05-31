import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { Heading } from '../elements/heading'
import { Text } from '../elements/text'

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
        'relative overflow-hidden bg-[var(--header-bg)] pt-24 pb-16 sm:pt-32 sm:pb-24 border-b border-[var(--header-border)] dark:border-white/10',
        className,
      )}
      {...props}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1200 500"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, white 15%, white 85%, transparent 100%)',
          opacity: 0.52,
        }}
      >
        <defs>
          <filter id="topo-warp" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves={3} seed={8} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={28} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <g filter="url(#topo-warp)" transform="rotate(-12, 820, -60)">
          {Array.from({ length: 70 }, (_, i) => (
            <ellipse
              key={i}
              cx={820}
              cy={-60}
              rx={60 + i * 22}
              ry={44 + i * 16}
              stroke="white"
              strokeWidth="0.8"
              fill="none"
            />
          ))}
        </g>
      </svg>
      <Container className="flex gap-16 max-xl:flex-col">
        <div className="flex flex-1 flex-col items-start justify-center gap-6">
          {eyebrow}
          <Heading className="max-w-5xl">{headline}</Heading>
          <Text size="lg" className="flex max-w-3xl flex-col gap-4">
            {subheadline}
          </Text>
          {cta}
        </div>
        <div className="flex flex-1 overflow-hidden rounded-xl bg-[var(--header-bg)] *:object-cover">
          {photo}
        </div>
      </Container>
      {footer && <div className="mt-8">{footer}</div>}
    </section>
  )
}

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
        'bg-[var(--header-bg)] pt-24 pb-16 sm:pt-32 sm:pb-24 border-b border-[var(--header-border)] dark:border-white/10',
        className,
      )}
      {...props}
    >
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

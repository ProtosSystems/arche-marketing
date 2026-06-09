import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Eyebrow({ children, className, light: _light, ...props }: ComponentProps<'div'> & { light?: boolean }) {
  return (
    <div
      className={clsx(
        'text-sm/7 font-semibold uppercase tracking-[0.12em] text-slate-700 dark:text-mist-300',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

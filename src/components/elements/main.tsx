import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Main({ children, className, id = 'main', ...props }: ComponentProps<'main'>) {
  return (
    <main id={id} className={clsx('isolate overflow-clip', className)} {...props}>
      {children}
    </main>
  )
}

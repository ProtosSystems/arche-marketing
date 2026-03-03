import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function LinkedInIcon({ className, ...props }: ComponentProps<'svg'>) {
    return (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="currentColor"
            role="image"
            className={clsx('inline-block', className)}
            {...props}
        >
            <path
                fillRule="evenodd"
                d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.85-3.037-1.85 0-2.134 1.445-2.134 2.939v5.667H9.99V9h3.112v1.561h.043c.434-.823 1.494-1.69 3.073-1.69 3.286 0 3.894 2.164 3.894 4.977v6.604zM5.337 7.433a1.804 1.804 0 110-3.608 1.804 1.804 0 010 3.608zM6.956 20.452H3.717V9h3.239v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.222 0z"
                clipRule="evenodd"
            />
        </svg>
    )
}

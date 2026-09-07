import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
}

export function Button({
    children,
    className = '',
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            className={[
                'inline-flex min-h-12 items-center justify-center',
                'rounded-xl px-6 py-3',
                'bg-zinc-950 text-sm font-semibold text-white',
                'transition-all duration-200',
                'hover:-translate-y-0.5 hover:bg-zinc-800',
                'focus-visible:outline-2 focus-visible:outline-offset-4',
                'focus-visible:outline-zinc-950',
                'active:translate-y-0',
                'disabled:pointer-events-none disabled:opacity-50',
                className,
            ].join(' ')}
        >
            {children}
        </button>
    )
}
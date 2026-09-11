import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'inverse'
    | 'ghost'

type ButtonSize =
    | 'sm'
    | 'md'
    | 'lg'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
    variant?: ButtonVariant
    size?: ButtonSize
}

const variantClasses: Record<ButtonVariant, string> = {
    primary: [
        'bg-action-primary',
        'text-content-inverse',
        'hover:bg-action-primary-hover',
    ].join(' '),

    secondary: [
        'border',
        'border-border-default',
        'bg-surface',
        'text-content-primary',
        'hover:bg-surface-muted',
    ].join(' '),

    inverse: [
        'bg-action-inverse',
        'text-content-primary',
        'hover:bg-action-inverse-hover',
    ].join(' '),

    ghost: [
        'bg-transparent',
        'text-content-primary',
        'hover:bg-surface-muted',
    ].join(' '),
}

const sizeClasses: Record<ButtonSize, string> = {
    sm: [
        'min-h-10',
        'px-4',
        'text-sm',
    ].join(' '),

    md: [
        'min-h-12',
        'px-6',
        'text-sm',
    ].join(' '),

    lg: [
        'min-h-14',
        'px-7',
        'text-base',
    ].join(' '),
}

export function Button({
    children,
    className = '',
    variant = 'primary',
    size = 'md',
    type = 'button',
    disabled = false,
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            type={type}
            disabled={disabled}
            className={[
                'inline-flex items-center justify-center',
                'gap-2',
                'rounded-(--radius-md)',
                'font-semibold',
                'transition-colors',
                'duration-(--duration-normal)',
                'ease(--ease-standard)',
                'focus-visible:outline-2',
                'focus-visible:outline-offset-4',
                'focus-visible:outline-content-primary',
                'disabled:pointer-events-none',
                'disabled:opacity-50',
                sizeClasses[size],
                variantClasses[variant],
                className,
            ].join(' ')}
        >
            {children}
        </button>
    )
}
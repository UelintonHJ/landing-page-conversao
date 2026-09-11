import type {
    ElementType,
    HTMLAttributes,
    ReactNode,
} from 'react'

type TypographyVariant =
    | 'display'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'lead'
    | 'body'
    | 'body-lg'
    | 'small'
    | 'eyebrow'
    | 'muted'

type TypographyProps<T extends ElementType> = {
    as?: T
    variant?: TypographyVariant
    children: ReactNode
    className?: string
} & Omit<HTMLAttributes<HTMLElement>, 'color'>

const variantClasses: Record<TypographyVariant, string> = {
    display: [
        'text-5xl sm:text-6xl lg:text-[4.5rem',
        'font-semibold',
        'leading-(--line-height-tight)',
        'tracking-[-0.04em]',
        'text-content-primary',
    ].join(' '),

    h1: [
        'text-4xl sm:text-5xl',
        'font-semibold',
        'leading-(--line-height-snug)',
        'tracking-[-0.03em]',
        'text-content-primary',
    ].join(' '),

    h2: [
        'text-3xl sm:text-4xl',
        'font-semibold',
        'leading-(--line-height-snug)',
        'tracking-[-0.025em]',
        'text-content-primary',
    ].join(' '),

    h3: [
        'text-xl',
        'font-semibold',
        'leading-(--line-height-snug)',
        'tracking-[-0.015em]',
        'text-content-primary',
    ].join(' '),

    lead: [
        'text-lg sm:text-xl',
        'leading-(--line-height-relaxed)',
        'text-content-secondary',
    ].join(' '),

    'body-lg': [
        'text-lg',
        'leading-(--line-height-relaxed',
        'text-content-secondary',
    ].join(' '),

    body: [
        'text-base',
        'leading-(--line-height-normal)',
        'text-content-secondary',
    ].join(' '),

    small: [
        'text-sm',
        'leading-(--line-height-normal)',
        'text-content-secondary',
    ].join(' '),

    eyebrow: [
        'text-xs',
        'font-semibold',
        'uppercase',
        'tracking-[0.18em]',
        'text-content-muted',
    ].join(' '),

    muted: [
        'text-sm',
        'leading-(--line-height-normal)',
        'text-content-muted',
    ].join(' '),
}

const defaultElements: Record<TypographyVariant, ElementType> = {
    display: 'h1',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    lead: 'p',
    'body-lg': 'p',
    body: 'p',
    small: 'p',
    eyebrow: 'p',
    muted: 'p',
}

export function Typography<T extends ElementType = 'p'>({
    as,
    variant = 'body',
    children,
    className = '',
    ...props
}: TypographyProps<T>) {
    const Component = as ?? defaultElements[variant]

    return (
        <Component
            {...props}
            className={[
                variantClasses[variant],
                className,
            ].join(' ')}
        >
            {children}
        </Component>
    )
}
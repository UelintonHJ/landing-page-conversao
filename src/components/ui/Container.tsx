import type { HTMLAttributes, ReactNode } from 'react'

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode
}

export function Container({
    children,
    className = '',
    ...props
}: ContainerProps) {
    return (
        <div
            {...props}
            className={[
                'mx-auto w-full',
                'max-w-(--container-max-width)',
                'px-(--container-padding-mobile)',
                'sm:px-(--container-padding-tablet)', 
                'lg:px-(--container-padding-desktop)',
                className,
            ].join(' ')}
        >
            {children}
        </div>
    )
}
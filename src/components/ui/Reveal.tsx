import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
    children: ReactNode
    className?: string
}

export function Reveal({
    children,
    className = '',
}: RevealProps) {
    const elementRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [isObserverActive, setIsObserverActive] = useState(false)

    useEffect(() => {
        const element = elementRef.current

        if (!element) {
            return
        }

        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            setIsVisible(true)
            return
        }

        setIsObserverActive(true)

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    return
                }

                setIsVisible(true)
                observer.disconnect()
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -8% 0px',
            },
        )

        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [])

    const revealState = isObserverActive
        ? isVisible
            ? 'reveal-visible'
            : 'reveal-hidden'
            : 'reveal-visible'

    return (
        <div
            ref={elementRef}
            className={[
                'reveal',
                revealState,
                className,
            ]
                .filter(Boolean)
                .join(' ')}
        >
            {children}
        </div>
    )
}
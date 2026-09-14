import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
    children: ReactNode
    className?: string
}

function shouldRevealImmediately() {
    if (typeof window === 'undefined') {
        return true
    }

    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
    ).matches

    return prefersReducedMotion || !('IntersectionObserver' in window)
}

export function Reveal({
    children,
    className = '',
}: RevealProps) {
    const elementRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(shouldRevealImmediately)

    useEffect(() => {
        const element = elementRef.current

        if (!element || shouldRevealImmediately()) {
            return
        }

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

    return (
        <div
            ref={elementRef}
            className={[
                'reveal',
                isVisible ? 'reveal-visible' : 'reveal-hidden',
                className,
            ]
                .filter(Boolean)
                .join(' ')}
        >
            {children}
        </div>
    )
}
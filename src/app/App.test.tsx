import { fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { App } from './App'

describe('App', () => {
    let prefersReducedMotion = false

    beforeEach(() => {
        prefersReducedMotion = false

        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation((query: string) => ({
                matches: 
                    query === '(prefers-reduced-motion: reduce)' &&
                    prefersReducedMotion,
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })),
        })

        HTMLElement.prototype.scrollIntoView = vi.fn()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('renders the primary navigation and skip link', () => {
        render(<App />)

        const primaryNavigation = screen.getByRole('navigation', {
            name: /navegação principal/i,
        })

        expect(
            within(primaryNavigation).getByRole('link', {
                name: /acelera/i,
            }),
        ).toHaveAttribute('href', '#inicio')

        expect(
            screen.getByRole('link', { name: /pular para o conteúdo/i }),
        ).toHaveAttribute('href', '#main-content')
    })

    it('renders the landing page primary heading', () => {
        render(<App />)

        expect(
            screen.getByRole('heading', {
                level: 1,
                name: /acelere suas vendas no digital/i,
            }),
        ).toBeInTheDocument()
    })

    it('renders all conversion-focused sections', () => {
        render(<App />)

        expect(
            screen.getByRole('heading', {
                level: 2,
                name: /menos teoria\. mais aplicação\./i,
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                level: 2,
                name: /transforme presença digital em oportunidades/i,
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                level: 2,
                name: /quem estará com você/i,
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                level: 2,
                name: /uma noite para sair da teoria e partir para a prática/i,
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                level: 2,
                name: /pronto para acelerar suas vendas/i,
            }),
        ).toBeInTheDocument()
    })

    it('renders all three benefit cards', () => {
        render(<App />)

        expect(
            screen.getByRole('heading', {
                name: /estratégias práticas/i,
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                name: /foco em resultados/i,
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                name: /insights acionáveis/i,
            }),
        ).toBeInTheDocument()
    })

    it('renders all schedule activities', () => {
        render(<App />)

        expect(screen.getByText('19:00')).toBeInTheDocument()
        expect(screen.getByText('19:20')).toBeInTheDocument()
        expect(screen.getByText('20:00')).toBeInTheDocument()
        expect(screen.getByText('20:40')).toBeInTheDocument()
    })

    it('renders all speakers from the data source', () => {
        render(<App />)

        expect(screen.getByText('Ana Martins')).toBeInTheDocument()
        expect(screen.getByText('Carlos Mendes')).toBeInTheDocument()
        expect(screen.getByText('Marina Costa')).toBeInTheDocument()
    })

    it('scrolls to the registration section from the hero CTA', () => {
        render(<App />)

        fireEvent.click(
            screen.getByRole('button', {
                name: /quero participar gratuitamente/i,
            }),
        )

        expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({
            behavior: 'smooth',
        })
    })

    it('uses auto scrolling when reduced motion is preferred', () => {
        prefersReducedMotion = true

        render(<App />)

        fireEvent.click(
            screen.getByRole('button', {
                name: /quero participar gratuitamente/i,
            }),
        )

        expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({
            behavior: 'auto',
        })
    })

    it('provides a semantic main landmark for the skip link target', () => {
        render(<App />)

        expect(screen.getByRole('main')).toHaveAttribute(
            'id',
            'main-content',
        )
    })

    it('keeps the primary registration CTA available to assistive technology', () => {
        render(<App />)

        expect(
            screen.getByRole('button', {
                name: /garantir minha vaga/i,
            }),
        ).toBeEnabled()
    })
})
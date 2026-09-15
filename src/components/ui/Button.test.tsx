import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button } from './Button'

describe('Button', () => {
    it('renders a native button with the default type', () => {
        render(<Button>Continuar</Button>)

        expect(
            screen.getByRole('button', { name: 'Continuar' }),
        ).toHaveAttribute('type', 'button')
    })

    it('renders the requested variant and size classes', () => {
        render(
            <Button variant='secondary' size='lg'>
                Continuar
            </Button>,
        )

        const button = screen.getByRole('button', {
            name: 'Continuar',
        })

        expect(button).toHaveClass('border')
        expect(button).toHaveClass('min-h-14')
        expect(button).toHaveClass('px-7')
    })

    it('forwards disabled state', () => {
        render(<Button disabled>Continuar</Button>)

        expect(
            screen.getByRole('button', {
                name: 'Continuar',
            }),
        ).toBeDisabled()
    })
})
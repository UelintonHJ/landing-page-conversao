import { ArrowUpRight } from 'lucide-react'

import { Container, Typography } from '../ui'

export function Header() {
    return (
        <header className='border-b border-border-default bg-surface'>
            <Container>
                <nav
                    aria-label='Navegação principal'
                    className='flex h-18 items-center justify-between'
                >
                    <a
                        href='#inicio'
                        className='text-lg font-bold tracking-tight text-content-primary'
                    >
                        acelera<span className='text-content-muted'>.</span>
                    </a>

                    <a
                        href="#inscricao"
                        className='inline-flex items-center gap-2 text-sm font-semibold text-content-primary transition-colors duration-(--duration-fast) hover:text-content-muted'
                    >
                        <Typography
                            as='span'
                            variant='small'
                            className='font-semibold text-current'
                        >
                            Inscreva-se
                        </Typography>

                        <ArrowUpRight
                            aria-hidden='true'
                            size={16}
                        />
                    </a>
                </nav>
            </Container>
        </header>
    )
}
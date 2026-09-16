import { ArrowUpRight } from 'lucide-react'

import { Container, Typography } from '../ui'

const navigationItems = [
    {
        label: 'Aprendizado',
        href: '#beneficios',
    },
    {
        label: 'Especialistas',
        href: '#especialistas',
    },
    {
        label: 'Programação',
        href: '#programacao',
    },
    {
        label: 'FAQ',
        href: '#faq',
    },
]

export function Header() {
    return (
        <header className='border-b border-border-default bg-surface'>
            <Container>
                <nav
                    aria-label='Navegação principal'
                    className='flex h-18 items-center justify-between gap-6'
                >
                    <a
                        href='#inicio'
                        className='shrink-0 text-lg font-bold tracking-tight text-content-primary'
                    >
                        acelera<span className='text-content-muted'>.</span>
                    </a>

                    <div className='hidden items-center gap-6 lg:flex'>
                        {navigationItems.map((item) => (
                            <a 
                                key={item.href}
                                href={item.href}
                                className='text-sm font-medium text-content-secondary transition-colors duration-(--duration-fast) hover:text-content-primary'
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    <a
                        href="#inscricao"
                        className='inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-content-primary transition-colors duration-(--duration-fast) hover:text-content-muted'
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
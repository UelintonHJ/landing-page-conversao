import { ArrowUpRight } from 'lucide-react'
import { Container } from '../ui/Container'

export function Header() {
    return (
        <header className='border-b border-zinc-200 bg-white'>
            <Container>
                <nav
                    aria-label='Navegação principal'
                    className='flex h-18 items-center justify-between'
                >
                    <a
                        href='#inicio'
                        className='text-lg font-bold tracking-tight'
                    >
                        acelera<span className='text-zinc-400'>.</span>
                    </a>

                    <a href="#inscricao"
                        className='
                            inline-flex items-center gap-2
                            text-sm font-semibold
                            text-zinc-900
                            transition-colors
                            hover:text-zinc-500
                        '
                    >
                        Inscreva-se
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
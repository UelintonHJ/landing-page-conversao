import { ArrowUpRight } from 'lucide-react'

import { Container, Typography } from '../ui'

export function Footer() {
    return (
        <footer className='border-t border-ui-border-default bg-ui-surface'>
            <Container>
                <div className='flex flex-col gap-8 py-10 sm:flex-row sm:items-end sm:justify-between'>
                    <div>
                        <a 
                            href="#inicio"
                            className='text-lg font-bold tracking-tight text-ui-content-primary'
                        >
                            acelera<span className='text-ui-content-muted'>.</span>
                        </a>

                        <Typography
                            variant='small'
                            className='mt-3 max-w-sm'
                        >
                            Live gratuita sobre estratégias digitais,
                            aquisição e conversão.
                        </Typography>
                    </div>

                    <div className='flex flex-col items-start gap-4 sm:items-end'>
                        <a 
                            href="#inicio"
                            className='inline-flex items-center gap-2 text-sm font-semibold text-ui-content-primary transition-colors duration-(--duration-fast) hover:text-ui-content-muted'    
                        >
                            Voltar ao início
                            <ArrowUpRight 
                                aria-hidden='true'
                                size={16}
                            />
                        </a>

                        <Typography variant='small'>
                            24 de setembro · 19h · 100% online
                        </Typography>
                    </div>
                </div>
            </Container>
        </footer>
    )
}
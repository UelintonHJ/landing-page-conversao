import { ArrowRight } from 'lucide-react'

import { Button, Container, Typography } from '../ui'

export function CTASection() {
    return (
        <section
            id='inscricao'
            aria-labelledby='cta-title'
            className='bg-surface-inverse py-24 text-content-inverse sm:py-32'
        >
            <Container>
                <div className='mx-auto max-w-3xl text-center'>
                    <Typography
                        variant='eyebrow'
                        className='text-zinc-500'
                    >
                        Inscrição gratuita
                    </Typography>

                    <Typography
                        as='h2'
                        variant='h2'
                        id='cta-title'
                        className='mt-5 text-white'
                    >
                        Pronto para acelerar suas vendas?
                    </Typography>

                    <Typography
                        variant='body-lg'
                        className='mx-auto mt-6 max-w-xl text-zinc-400'
                    >
                        Reserve seu lugar e participe gratuitamente da live.
                    </Typography>

                    <div className='mt-10'>
                        <Button variant='inverse'>
                            Garantir minha vaga

                            <ArrowRight
                                aria-hidden='true'
                                size={18}
                            />
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    )
}
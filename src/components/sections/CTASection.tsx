import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

export function CTASection() {
    return (
        <section
            id='inscricao'
            aria-labelledby='cta-title'
            className='bg-zinc-950 py-24 text-white sm:py-32'
        >
            <Container>
                <div className='mx-auto max-w-3xl text-center'>
                    <p className='text-sm font-semibold uppercase tracking-widest text-zinc-500'>
                        Inscrição gratuita
                    </p>

                    <h2
                        id='cta-title'
                        className='
                            mt-5 text-4xl font-semibold
                            tracking-tight sm:text-5xl
                        '
                    >
                        Pronto para acelerar suas vendas?
                    </h2>

                    <p className='mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-400'>
                        Reserve seu lugar e participe gratuitamente da live.
                    </p>

                    <div className='mt-10'>
                        <Button
                            className='bg-white text-zinc-950 hover:bg-zinc-200'
                        >
                            Garantir minha vaga
                            <ArrowRight 
                                aria-hidden='true'
                                className='ml-12'
                                size={18}
                            />
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    )
}
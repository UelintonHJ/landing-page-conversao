import {
    BarChart3,
    Lightbulb,
    Target,
} from 'lucide-react'

import { Container } from '../ui/Container'

const benefits = [
    {
        icon: Target,
        title: 'Estratégias práticas',
        description:
            'Aprenda abordagens que podem ser aplicadas diretamente na sua operação.',
    },
    {
        icon: BarChart3,
        title: 'Foco em resultados',
        description:
            'Entenda quais decisões realmente impactam aquisição e conversão.'
    },
    {
        icon: Lightbulb,
        title: 'Insights acionáveis',
        description:
            'Saia da live com ideias claras para colocar em prática.',
    },
]

export function BenefitsSection() {
    return (
        <section
            aria-labelledby='benefits-title'
            className='bg-white py-24 sm:py-32'
        >
            <Container>
                <div className='max-w-2xl'>
                    <p className='text-sm font-semibold uppercase tracking-widest text-zinc-500'>
                        O que você vai aprender
                    </p>

                    <h2
                        id='benefits-title'
                        className='
                            mt-4 text-3xl font-semibold
                            tracking-tight text-zinc-950
                            sm:text-4xl
                        '
                    >
                        Menos teoria. Mais aplicação.
                    </h2>
                </div>

                <div className='mt-16 grid gap-px overflow-hidden rounded-2xl bg-zinc-200 md:grid-cols-3'>
                    {benefits.map((benefit) => {
                        const Icon = benefit.icon

                        return (
                            <article
                                key={benefit.title}
                                className='bg-white p-8 sm:p-10'
                            >
                                <Icon 
                                    aria-hidden='true'
                                    size={24}
                                    strokeWidth={1.8}
                                />

                                <h3 className='mt-10 text-xl font-semibold'>
                                    {benefit.title}
                                </h3>

                                <p className='mt-4 leading-7 text-zinc-600'>
                                    {benefit.description}
                                </p>
                            </article>
                        )
                    })}
                </div>
            </Container>
        </section>
    )
}
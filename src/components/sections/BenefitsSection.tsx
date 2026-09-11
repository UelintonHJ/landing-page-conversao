import {
    BarChart3,
    Lightbulb,
    Target,
} from 'lucide-react'

import { Container, Typography } from '../ui'

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
            className='bg-surface py-24 sm:py-32'
        >
            <Container>
                <div className='max-w-2xl'>
                    <Typography variant='eyebrow'>
                        O que você vai aprender
                    </Typography>

                    <Typography
                        as='h2'
                        variant='h2'
                        id='benefits-title'
                        className='mt-4'
                    >
                        Menos teoria. Mais aplicação.
                    </Typography>
                </div>

                <div className='mt-16 grid gap-px overflow-hidden rounded-lg bg-border-default md:grid-cols-3'>
                    {benefits.map((benefit) => {
                        const Icon = benefit.icon

                        return (
                            <article
                                key={benefit.title}
                                className='bg-surface p-8 sm:p-10'
                            >
                                <Icon 
                                    aria-hidden='true'
                                    size={24}
                                    strokeWidth={1.8}
                                />

                                <Typography
                                    as='h3' 
                                    variant='h3'
                                    className='mt-10'
                                >
                                    {benefit.title}
                                </Typography>

                                <Typography 
                                    variant='body'
                                    className='mt-4'
                                >
                                    {benefit.description}
                                </Typography>
                            </article>
                        )
                    })}
                </div>
            </Container>
        </section>
    )
}
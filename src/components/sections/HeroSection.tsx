import { ArrowRight, CalendarDays, Clock3 } from 'lucide-react'

import { Button, Container, Typography } from '../ui'

export function HeroSection() {
    return (
        <section
            id='inicio'
            aria-labelledby='hero-title'
            className='overflow-hidden bg-ui-surface-inverse text-ui-content-inverse'
        >
            <Container>
                <div className='grid min-h-0 items-center gap-12 py-20 sm:min-h-180 sm:gap-16 sm:py-24 lg:grid-cols-[1.2fr_0.8fr]'>
                    <div className='max-w-3xl'>
                        <Typography
                            variant='eyebrow'
                            className='mb-8 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-zinc-300'
                        >
                            Live gratuita
                        </Typography>

                        <Typography
                            as='h1'
                            variant='display'
                            id='hero-title'
                            className='max-w-3xl text-white'
                        >
                            Acelere suas vendas
                            <span className='block text-zinc-500'>
                                no digital.
                            </span>
                        </Typography>

                        <Typography
                            variant='lead'
                            className='mt-8 max-w-2xl text-zinc-400'
                        >
                            Descubra estratégias práticas para transformar
                            presença digital em oportunidades reais de negócio.
                        </Typography>

                        <div className='mt-10 flex flex-col gap-4 sm:flex-row'>
                            <Button
                                variant='inverse'
                                onClick={() => {
                                    document
                                        .getElementById('inscricao')
                                        ?.scrollIntoView({ 
                                            behavior: window.matchMedia(
                                                '(prefers-reduced-motion: reduce)'
                                            ).matches
                                                ? 'auto' 
                                                : 'smooth', 
                                        })
                                }}
                            >
                                Quero participar gratuitamente
                                <ArrowRight
                                    aria-hidden='true'
                                    size={18}
                                />
                            </Button>
                        </div>

                        <div
                            className='mt-12 flex flex-col gap-4 text-sm text-zinc-400 sm:flex-row sm:items-center sm:gap-8'
                        >
                            <span className='inline-flex items-center gap-2'>
                                <CalendarDays 
                                    size={17} 
                                    aria-hidden='true' 
                                />
                                24 de setembro
                            </span>

                            <span className='inline-flex items-center gap-2'>
                                <Clock3 
                                    size={17} 
                                    aria-hidden='true' 
                                />
                                19h
                            </span>

                            <span>100% online</span>
                        </div>
                    </div>

                    <div
                        aria-hidden='true'
                        className='hidden aspect-square rounded-xl border border-white/10 bg-linear-to-br from-white/10 to-transparent lg:block'
                    >
                        <div className='flex h-full items-center justify-center p-12'>
                            <span
                                className='text-center text-8xl font-bold tracking-[-0.08em] text-white/10'
                            >
                                Go
                            </span>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
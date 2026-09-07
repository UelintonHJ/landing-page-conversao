import { ArrowRight, CalendarDays, Clock3 } from 'lucide-react'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

export function HeroSection() {
    return (
        <section
            id='inicio'
            aria-labelledby='hero-title'
            className='overflow-hidden bg-zinc-950 text-white'
        >
            <Container>
                <div className='grid min-h-180 items-center gap-16 py-24 lg:grid-cols-[1.2fr_0.8fr]'>
                    <div className='max-w-3xl'>
                        <div
                            className='
                                mb-8 inline-flex items-center
                                rounded-full border border-white/15
                                bg-white/5 px-4 py-2
                                text-xs font-semibold uppercase
                                tracking-[0.18em] text-zinc-300
                            '
                        >
                            Live gratuita
                        </div>

                        <h1
                            id='hero-title'
                            className='
                                max-w-3xl
                                text-5xl font-semibold
                                tracking-[-0.04em]
                                sm:text-6xl
                                lg:text-7xl
                            '
                        >
                            Acelere suas vendas
                            <span className='block text-zinc-500'>
                                no digital.
                            </span>
                        </h1>

                        <p
                            className='
                                mt-8 max-w-2xl
                                text-lg leading-8
                                text-zinc-400
                                sm:text-xl
                            '
                        >
                            Descubra estratégias práticas para transformar
                            presença digital em oportunidades reais de negócio.
                        </p>

                        <div className='mt-10 flex flex-col gap-4 sm:flex-row'>
                            <Button
                                className='bg-white text-zinc-950 hover:bg-zinc-200'
                                onClick={() => {
                                    document
                                        .getElementById('inscricao')
                                        ?.scrollIntoView({ behavior: 'smooth' })
                                }}
                            >
                                Quero participar gratuitamente
                                <ArrowRight 
                                    aria-hidden='true'
                                    className='ml-2'
                                    size={18}
                                />
                            </Button>
                        </div>

                        <div
                            className='
                                mt-12 flex flex-col gap-4
                                text-sm text-zinc-400
                                sm:flex-row sm:items-center sm:gap-8
                            '
                        >
                            <span className='inline-flex items-center gap-2'>
                                <CalendarDays size={17} aria-hidden='true' />
                                24 de setembro
                            </span>

                            <span className='inline-flex items-center gap-2'>
                                <Clock3 size={17} aria-hidden='true' />
                                19h
                            </span>

                            <span>100% online</span>
                        </div>
                    </div>

                    <div
                        aria-hidden='true'
                        className='
                            hidden aspect-square
                            rounded-3xl border border-white/10
                            bg-linear-to-br from-white/10 to-transparent
                            lg:block
                        '
                    >
                        <div className='flex h-full items-center justify-center p-12'>
                            <span 
                                className='
                                    text-center text-8xl font-bold
                                    tracking-[-0.08em]
                                    text-white/10
                                '
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
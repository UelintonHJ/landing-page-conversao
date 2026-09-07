import { Container } from '../ui/Container'

export function AboutSection() {
    return (
        <section
            aria-labelledby='about-title'
            className='bg-zinc-50 py-24 sm:py-32'
        >
            <Container>
                <div className='grid gap-16 lg:grid-cols-2 lg:items-start'>
                    <div>
                        <p className='text-sm font-semibold uppercase tracking-widest text-zinc-500'>
                            Sobre a live
                        </p>

                        <h2
                            id='about-title'
                            className='
                                mt-4 text-3xl font-semibold
                                tracking-tight text-zinc-950
                                sm:text-4xl
                            '
                        >
                            Transforme presença digital em oportunidades.
                        </h2>
                    </div>

                    <div className='space-y-6 text-lg leading-8 text-zinc-600'>
                        <p>
                            Durante a live, especialistas vão mostrar como
                            estruturar uma estratégia digital orientada a
                            resultados.
                        </p>

                        <p>
                            Você vai conhecer exemplos reais, entender os
                            principais pontos de atenção e descobrir como
                            transformar visitantes em oportunidades comerciais.
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    )
}
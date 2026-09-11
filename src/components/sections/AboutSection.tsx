import { Container, Typography } from '../ui'

export function AboutSection() {
    return (
        <section
            aria-labelledby='about-title'
            className='bg-surface-subtle py-24 sm:py-32'
        >
            <Container>
                <div className='grid gap-16 lg:grid-cols-2 lg:items-start'>
                    <div>
                        <Typography variant='eyebrow'>
                            Sobre a live
                        </Typography>

                        <Typography
                            as='h2'
                            variant='h2'
                            id='about-title'
                            className='mt-4'
                        >
                            Transforme presença digital em oportunidades.
                        </Typography>
                    </div>

                    <div className='space-y-6'>
                        <Typography variant='body-lg'>
                            Durante a live, especialistas vão mostrar como
                            estruturar uma estratégia digital orientada a
                            resultados.
                        </Typography>

                        <Typography variant='body-lg'>
                            Você vai conhecer exemplos reais, entender os
                            principais pontos de atenção e descobrir como
                            transformar visitantes em oportunidades comerciais.
                        </Typography>
                    </div>
                </div>
            </Container>
        </section>
    )
}
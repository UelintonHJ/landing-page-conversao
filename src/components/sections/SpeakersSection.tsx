import { Container, Typography } from '../ui'

import { speakers } from '../../data/speakers'

export function SpeakersSection() {
    return (
        <section
            aria-labelledby='speakers-title'
            className='bg-surface py-24 sm:py-32'
        >
            <Container>
                <div>
                    <Typography variant='eyebrow'>
                        Especialistas
                    </Typography>

                    <Typography
                        as='h2'
                        variant='h2'
                        id='speakers-title'
                        className='mt-4'
                    >
                        Quem estará com você
                    </Typography>
                </div>

                <div className='mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
                    {speakers.map((speaker) => (
                        <article key={speaker.id}>
                            <div className='aspect-4/5 rounded-lg bg-surface-muted' />

                            <Typography 
                                as='h3'
                                variant='h3'
                                className='mt-6'
                            >
                                {speaker.name}
                            </Typography>

                            <Typography 
                                variant='small'
                                className='mt-2'
                            >
                                {speaker.role} · {speaker.company}
                            </Typography>
                        </article>
                    ))}
                </div>
            </Container>
        </section>
    )
}
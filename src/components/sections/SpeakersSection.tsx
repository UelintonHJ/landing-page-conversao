import { Container, Typography } from '../ui'

import { speakers } from '../../data/speakers'

function getInitials(name: string) {
    return name
        .split(' ')
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('')
}

export function SpeakersSection() {
    return (
        <section
            id='especialistas'
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
                        <article
                            key={speaker.id}
                            className='group'
                        >
                            <div
                                aria-hidden='true'
                                className='flex aspect-4/5 items-end overflow-hidden rounded-lg border border-ui-border-default bg-surface-subtle p-8 transition-colors duration-(--duration-normal) group-hover:bg-surface-muted'>
                                <span className='text-7xl font-semibold tracking-[-0.08em] text-ui-content-primary/10 sm:text-8xl'>
                                    {getInitials(speaker.name)}
                                </span>
                            </div>

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
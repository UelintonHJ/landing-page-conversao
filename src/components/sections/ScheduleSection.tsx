import { Clock3 } from 'lucide-react'

import { schedule } from '../../data/schedule'
import { Container, Typography } from '../ui'

export function ScheduleSection() {
    return (
        <section
            id='programacao'
            aria-labelledby='schedule-title'
            className='bg-surface-subtle py-24 sm:py-32'
        >
            <Container>
                <div className='max-w-4xl'>
                    <Typography variant='eyebrow'>
                        Programação
                    </Typography>

                    <Typography
                        as='h2'
                        variant='h2'
                        id='schedule-title'
                        className='mt-4'
                    >
                        Uma noite para sair da teoria e partir para a prática.
                    </Typography>
                </div>

                <ol className='mt-16 divide-y divide-ui-border-default border-y border-ui-border-default'>
                    {schedule.map((item) => (
                        <li
                            key={`${item.time}-${item.title}`}
                            className='grid gap-6 py-8 md:grid-cols-[7rem_1fr] md:items-start'
                        >
                            <div className='flex items-center gap-2 text-sm font-semibold text-ui-content-primary'>
                                <Clock3 
                                    size={17}
                                    aria-hidden='true'
                                />
                                <time dateTime={item.time}>
                                    {item.time}
                                </time>
                            </div>

                            <div className='max-w-2xl'>
                                <Typography
                                    as='h3'
                                    variant='h3'
                                >
                                    {item.title}
                                </Typography>

                                <Typography
                                    variant='body'
                                    className='mt-3'
                                >
                                    {item.description}
                                </Typography>
                            </div>
                        </li>
                    ))}
                </ol>
            </Container>
        </section>
    )
}
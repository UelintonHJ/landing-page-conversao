import { Container } from '../ui/Container'
import { speakers } from '../../data/speakers'

export function SpeakersSection() {
    return (
        <section
            aria-labelledby='speakers-title'
            className='bg-white py-24 sm:py-32'
        >
            <Container>
                <div>
                    <p className='text-sm font-semibold uppercase tracking-widest text-zinc-500'>
                        Especialistas
                    </p>

                    <h2
                        id='speakers-title'
                        className='mt-4 text-3xl font-semibold tracking-tight sm:text-4xl'
                    >
                        Quem estará com você
                    </h2>
                </div>

                <div className='mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
                    {speakers.map((speaker) => (
                        <article key={speaker.id}>
                            <div className='aspect-4/5 rounded-2xl bg-zinc-100' />

                            <h3 className='mt-6 text-xl font-semibold'>
                                {speaker.name}
                            </h3>

                            <p className='mt-2 text-sm text-zinc-500'>
                                {speaker.role} · {speaker.company}
                            </p>
                        </article>
                    ))}
                </div>
            </Container>
        </section>
    )
}
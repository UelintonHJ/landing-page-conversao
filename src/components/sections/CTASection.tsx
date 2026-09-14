import { Container, Typography } from '../ui'
import { RegistrationForm } from '../ui/RegistrationForm'

export function CTASection() {
    return (
        <section
            id='inscricao'
            aria-labelledby='cta-title'
            className='bg-ui-surface-inverse py-24 text-ui-content-inverse sm:py-32'
        >
            <Container>
                <div className='mx-auto max-w-3xl text-center'>
                    <Typography
                        variant='eyebrow'
                        className='text-zinc-500'
                    >
                        Inscrição gratuita
                    </Typography>

                    <Typography
                        as='h2'
                        variant='h2'
                        id='cta-title'
                        className='mt-5 text-white'
                    >
                        Pronto para acelerar suas vendas?
                    </Typography>

                    <Typography
                        variant='body-lg'
                        className='mx-auto mt-6 max-w-xl text-zinc-400'
                    >
                        Reserve seu lugar e participe gratuitamente da live.
                    </Typography>

                    <RegistrationForm />
                </div>
            </Container>
        </section>
    )
}
import { Container, Typography } from '../ui'

const faqs = [
    {
        question: 'A participação é gratuita?',
        answer:
            'Sim. A Acelera Digital é apresentada como uma live gratuita, sem custo para participar.',
    },
    {
        question: 'Quando acontece a live?',
        answer:
            'A live acontece no dia 24 de setembro, às 19h.',
    },
    {
        question: 'O evento é presencial ou online?',
        answer:
            'O evento é 100% online, então você pode acompanhar a live de onde estiver.'
    },
    {
        question: 'O que vou encontrar durante a live?',
        answer: 
            'A programação aborda estratégias digitais, geração de oportunidades, exemplos de aplicações e cases reais, além de um momento para perguntas e respostas.',
    },
    {
        question: 'Como faço minha inscrição?',
        answer:
            'Preencha seu nome e e-mail no formulário de inscrição ao final da página e envie seus dados para reservar sua participação.'
    },
]

export function FAQSection() {
    return (
        <section
            id='faq'
            aria-labelledby='faq-title'
            className='bg-surface py-24 sm:py-32'
        >
            <Container>
                <div className='grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20'>
                    <div className='max-w-md'>
                        <Typography variant='eyebrow'>
                            Perguntas frequentes
                        </Typography>

                        <Typography
                            as='h2'
                            variant='h2'
                            id='faq-title'
                            className='mt-4'
                        >
                            Tudo o que você precisa saber antes de participar.
                        </Typography>

                        <Typography
                            variant='body-lg'
                            className='mt-6'
                        >
                            Reunimos as principais informações sobre a live,
                            o formato e a inscrição
                        </Typography>
                    </div>

                    <div className='divide-y divide-ui-border-default border-y border-ui-border-default'>
                        {faqs.map((faq) => (
                            <details
                                key={faq.question}
                                className='group py-6'
                            >
                                <summary className='flex cursor-pointer list-none items-start justify-between gap-6 text-left font-semibold text-ui-content-primary marker:hidden'>
                                    <span>{faq.question}</span>

                                    <span
                                        aria-hidden='true'
                                        className='shrink-0 text-xl font-normal text-ui-content-muted transition-transform duration-(--duration-normal) group-open:rotate-45'
                                    >
                                        +
                                    </span>
                                </summary>

                                <Typography
                                    variant='body'
                                    className='mt-4 max-w-2xl pr-10'
                                >
                                    {faq.answer}
                                </Typography>
                            </details>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}
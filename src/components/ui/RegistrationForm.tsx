import { useState, type FormEvent } from "react";
import va from '@vercel/analytics'

import { Button } from './Button';
import { Typography } from "./Typography";

type FormValues = {
    name: string
    email: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

type SubmissionStatus =
    | 'idle'
    | 'submitting'
    | 'success'
    | 'error'

const initialValues: FormValues = {
    name: '',
    email: '',
}

function validateForm(values: FormValues): FormErrors {
    const errors: FormErrors = {}
    const name = values.name.trim()
    const email = values.email.trim()

    if (!name) {
        errors.name = 'Digite seu nome.'
    } else if (name.length < 2) {
        errors.name = 'Digite pelo menos 2 caracteres.'
    }

    if (!email) {
        errors.email = 'Digite seu e-mail.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Digite um e-mail válido.'
    }

    return errors
}

async function submitRegistration(
    values: FormValues,
    website: string,
) {
    const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: values.name.trim(),
            email: values.email.trim(),
            website,
        }),
    })

    let data: { error?: string } 

    try {
        data = await response.json()
    } catch {
        data = {}
    }

    if (!response.ok) {
        throw new Error(
            data.error ??
            'Não foi possível concluir sua inscrição.',
        )
    }
}

export function RegistrationForm() {
    const [values, setValues] = useState<FormValues>(initialValues)
    const [errors, setErrors] = useState<FormErrors>({})
    const [status, setStatus] = useState<SubmissionStatus>('idle')
    const [submitError, setSubmitError] = useState('')

    const isSubmitting = status === 'submitting'

    function handleChange(
        field: keyof FormValues,
        value: string
    ) {
        setValues((currentValues) => ({
            ...currentValues,
            [field]: value,
        }))

        if (errors[field]) {
            setErrors((currentErrors) => ({
                ...currentErrors,
                [field]: undefined,
            }))
        }

        if (status !== 'idle') {
            setStatus('idle')
            setSubmitError('')
        }
    }

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault()

        const validationErrors = validateForm(values)

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            setStatus('error')
            setSubmitError('')
            return
        }

        const formData = new FormData(event.currentTarget)
        const website = String(formData.get('website') ?? '')

        setErrors({})
        setSubmitError('')
        setStatus('submitting')

        try {
            await submitRegistration(values, website)

            setValues(initialValues)
            setStatus('success')

            va.track('registration_completed')
        } catch (error) {
            setStatus('error')

            setSubmitError(
                error instanceof Error
                    ? error.message
                    : 'Não foi possível concluir sua inscrição.',
            )
        }
    }

    return (
        <form
            noValidate
            onSubmit={handleSubmit}
            className="mx-auto mt-10 max-w-xl text-left"
            aria-describedby="registration-description"
            aria-busy={isSubmitting}
        >
            <Typography
                variant="small"
                id="registration-description"
                className="mb-6 text-zinc-400"
            >
                Preencha seus dados para garantir sua participação gratuita.
            </Typography>

            <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
            />

            <div className="space-y-6">
                <div>
                    <label
                        htmlFor="registration-name"
                        className="mb-2 block text-sm font-semibold text-white"
                    >
                        Nome
                    </label>

                    <input
                        id="registration-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={values.name}
                        onChange={(event) =>
                            handleChange('name', event.target.value)
                        }
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={
                            errors.name
                                ? 'registration-name-error'
                                : undefined
                        }
                        className="min-h-12 w-full rounded-md border border-white/15 bg-white/5 px-4 text-base text-white outline-none transition-none transition-colors duration-(--duration-normal) placeholder:text-zinc-500 focus:border-white/40 focus:bg-white/10"
                        placeholder="Seu nome"
                    />

                    {errors.name && (
                        <p
                            id="registration-name-error"
                            className="mt-2 text-sm text-red-300"
                            role="alert"
                        >
                            {errors.name}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="registration-email"
                        className="mb-2 block text-sm font-semibold text-white"
                    >
                        E-mail
                    </label>

                    <input
                        id="registration-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        value={values.email}
                        onChange={(event) =>
                            handleChange('email', event.target.value)
                        }
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                            errors.email
                                ? 'registration-email-error'
                                : undefined
                        }
                        className="min-h-12 w-full rounded-md border border-white/15 bg-white/5 px-4 text-base text-white outline-none transition-colors duration-(--duration-normal) placeholder:text-zinc-500 focus:border-white/40 focus:bg-white/10"
                        placeholder="voce@exemplo.com"
                    />

                    {errors.email && (
                        <p
                            id="registration-email-error"
                            className="mt-2 text-sm text-red-300"
                            role="alert"
                        >
                            {errors.email}
                        </p>
                    )}
                </div>
            </div>

            <div className="mt-8">
                <Button
                    type="submit"
                    variant="inverse"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                >
                    {isSubmitting
                        ? 'Enviando...'
                        : 'Garantir minha vaga'}
                </Button>
            </div>

            {status === 'success' && (
                <p
                    className="mt-4 text-sm text-zinc-300"
                    role="status"
                    aria-live="polite"
                >
                    Inscrição realizada com sucesso. Sua vaga está garantida.
                </p>
            )}

            {status === 'error' && submitError && (
                <p
                    className="mt-4 text-sm text-red-300"
                    role="alert"
                >
                    {submitError}
                </p>
            )}
        </form>
    )
}
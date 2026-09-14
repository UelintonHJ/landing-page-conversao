type RegistrationPayload = {
    name?: unknown
    email?: unknown
    website?: unknown
}

type RateLimitEntry = {
    count: number
    resetAt: number
}

const RATE_LIMIT_MAX_REQUESTS = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const MAX_BODY_BYTES = 4 * 1024

const rateLimitStore = new Map<string, RateLimitEntry>()

function jsonResponse(
    body: Record<string, unknown>,
    status: number,
    headers: Record<string, string> = {},
): Response {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store',
            'X-Content-Type-Options': 'nosniff',
            ...headers,
        },
    })
}

function getAllowedOrigins(request: Request): Set<string> {
    const configuredOrigins =
        process.env.ALLOWED_ORIGINS
            ?.split(',')
            .map((origin) => origin.trim())
            .filter(Boolean) ?? []

    const requestOrigin = new URL(request.url).origin

    return new Set([
        requestOrigin,
        ...configuredOrigins,
    ])
}

function isOriginAllowed(request: Request): boolean {
    const origin = request.headers.get('origin')

    if (!origin) {
        return true
    }

    return getAllowedOrigins(request).has(origin)
}

function isCrossSiteRequest(request: Request): boolean {
    return request.headers.get('sec-fetch-site') === 'cross-site'
}

function getClientIdentifier(request: Request): string {
    const forwardedFor = request.headers.get('x-forwarded-for')

    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim()
    }

    return request.headers.get('x-real-ip') ?? 'unknown'
}

function checkRateLimit(identifier: string): {
    allowed: boolean
    retryAfterSeconds: number
} {
    const now = Date.now()
    const current = rateLimitStore.get(identifier)

    if (!current || now >= current.resetAt) {
        rateLimitStore.set(identifier, {
            count: 1,
            resetAt: now + RATE_LIMIT_WINDOW_MS,
        })

        return {
            allowed: true,
            retryAfterSeconds: 0,
        }
    }

    if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
        return {
            allowed: false,
            retryAfterSeconds: Math.max(
                1,
                Math.ceil((current.resetAt - now) / 1000),
            ),
        }
    }

    current.count += 1

    return {
        allowed: true,
        retryAfterSeconds: 0,
    }
}

function cleanupRateLimitStore() {
    if (rateLimitStore.size < 1000) {
        return
    }

    const now = Date.now()

    for (const [key, entry] of rateLimitStore) {
        if (now >= entry.resetAt) {
            rateLimitStore.delete(key)
        }
    }
}

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validatePayload(payload: RegistrationPayload) {
    const name =
        typeof payload.name === 'string'
            ? payload.name.trim()
            : ''

    const email =
        typeof payload.email === 'string'
            ? payload.email.trim().toLowerCase()
            : ''

    if (name.length < 2 || name.length > 100) {
        return null
    }

    if (email.length < 3 || email.length > 254) {
        return null
    }

    if (!isValidEmail(email)) {
        return null
    }

    return {
        name,
        email,
    }
}

async function parseJson(request: Request): Promise<RegistrationPayload | null> {
    try {
        return await request.json() as RegistrationPayload
    } catch {
        return null
    }
}

export async function POST(request: Request): Promise<Response> {
    cleanupRateLimitStore()

    if (!isOriginAllowed(request) || isCrossSiteRequest(request)) {
        return jsonResponse(
            {
                error: 'Origem da requisição não permitida.',
            },
            403,
        )
    }

    const contentType = request.headers.get('content-type') ?? ''

    if (!contentType.toLowerCase().startsWith('application/json')) {
        return jsonResponse(
            {
                error: 'Formato de requisição inválido.',
            },
            415,
        )
    }

    const contentLength = request.headers.get('content-length')

    if (contentLength) {
        const parsedLength = Number(contentLength)

        if (
            Number.isFinite(parsedLength) &&
            parsedLength > MAX_BODY_BYTES
        ) {
            return jsonResponse(
                {
                    error: 'Requisição muito grande.',
                },
                413,
            )
        }
    }

    const identifier = getClientIdentifier(request)
    const rateLimit = checkRateLimit(identifier)

    if (!rateLimit.allowed) {
        return jsonResponse(
            {
                error: 'Muitas tentativas. Tente novamente em alguns minutos.',
            },
            429,
            {
                'Retry-After': String(rateLimit.retryAfterSeconds),
            },
        )
    }

    const payload = await parseJson(request)

    if (!payload) {
        return jsonResponse(
            {
                error: 'Dados inválidos.',
            },
            400,
        )
    }

    if (
        typeof payload.website === 'string' &&
        payload.website.trim().length > 0
    ) {
        return new Response(null, {
            status: 204,
            headers: {
                'Cache-Control': 'no-store',
            },
        })
    }

    const registration = validatePayload(payload)

    if (!registration) {
        return jsonResponse(
            {
                error: 'Verifique os dados informados.',
            },
            400,
        )
    }

    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY

    if (!supabaseUrl || !supabaseSecretKey) {
        console.error(
            '[registrations] Missing Supabase environment variables.',
        )

        return jsonResponse(
            {
                error: 'Não foi possível concluir a inscrição.',
            },
            500,
        )
    }

    try {
        const response = await fetch(
            `${supabaseUrl}/rest/v1/registrations`,
            {
                method: 'POST',
                headers: {
                    apikey: supabaseSecretKey,
                    Authorization: `Bearer ${supabaseSecretKey}`,
                    'Content-Type': 'application/json',
                    Prefer: 'return=minimal',
                },
                body: JSON.stringify({
                    id: crypto.randomUUID(),
                    name: registration.name,
                    email: registration.email,
                }),
            },
        )

        if (response.status === 409) {
            return jsonResponse(
                {
                    error: 'Este e-mail já está inscrito.',
                },
                409,
            )
        }

        if (!response.ok) {
            const errorBody = await response.text()

            console.error(
                '[registrations] Supabase request failed:',
                response.status,
                errorBody,
            )

            return jsonResponse(
                {
                    error: 'Não foi possível concluir a inscrição.',
                },
                502,
            )
        }

        return jsonResponse(
            {
                message: 'Inscrição realizada com sucesso.',
            },
            201,
        )
    } catch (error) {
        console.error(
            '[registrations] Unexpected error:',
            error,
        )

        return jsonResponse(
            {
                error: 'Não foi possível concluir a inscrição.',
            },
            500,
        )
    }
}
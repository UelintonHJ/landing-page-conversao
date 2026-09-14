import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { POST } from './registration'

let ipCounter = 0

function nextIp() {
    ipCounter += 1
    return `203.0.113.${ipCounter}`
}

function createRequest(
    body: unknown,
    options: {
        ip?: string
        origin?: string
        secFetchSite?: string
    } = {},
) {
    return new Request('https://landing.test/api/registrations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Origin: options.origin ?? 'https://landing.test',
            'Sec-Fetch-Site': options.secFetchSite ?? 'same-origin',
            'X-Forwarded-For': options.ip ?? nextIp(),
        },
        body: JSON.stringify(body),
    })
}

describe('POST /api/registrations', () => {
    beforeEach(() => {
        process.env.SUPABASE_URL = 'https://example.supabase.co'
        process.env.SUPABASE_SECRET_KEY = 'sb_secret_test'
        process.env.ALLOWED_ORIGINS = 'https://landing.test'

        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue(
                new Response(null, {
                    status: 201,
                }),
            ),
        )
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('creates a registration with valid data', async () => {
        const response = await POST(
            createRequest({
                name: 'Uelinton',
                email: 'uelinton@example.com',
            }),
        )

        expect(response.status).toBe(201)

        expect(fetch).toHaveBeenCalledWith(
            'https://example.supabase.co/rest/v1/registrations',
            expect.objectContaining({
                method: 'POST',
            }),
        )
    })

    it('rejects invalid data', async () => {
        const response = await POST(
            createRequest({
                name: 'A',
                email: 'invalid-email',
            }),
        )

        expect(response.status).toBe(400)
        expect(fetch).not.toHaveBeenCalled()
    })

    it('rejects cross-origin requests', async () => {
        const response = await POST(
            createRequest(
                {
                    name: 'Uelinton',
                    email: 'uelinton@example.com',
                },
                {
                    origin: 'https://attacker.example',
                    secFetchSite: 'cross-site',
                },
            ),
        )

        expect(response.status).toBe(403)
        expect(fetch).not.toHaveBeenCalled()
    })

    it('returns conflict when the email already exists', async () => {
        vi.mocked(fetch).mockResolvedValue(
            new Response(
                JSON.stringify({
                    code: '23505',
                }),
                {
                    status: 409,
                },
            ),
        )

        const response = await POST(
            createRequest({
                name: 'Uelinton',
                email: 'uelinton@example.com',
            }),
        )

        expect(response.status).toBe(409)

        await expect(response.json()).resolves.toEqual({
            error: 'Error e-mail já está inscrito.',
        })
    })

    it('rate limits repeated requests from the same client', async () => {
        const ip = nextIp()

        for (let attempt = 0; attempt < 5; attempt += 1) {
            const response = await POST(
                createRequest(
                    {
                        name: 'Uelinton',
                        email: `uelinton-${attempt}@example.com`,
                    },
                    { ip },
                ),
            )
                
            expect(response.status).toBe(201)
        }

        const response = await POST(
            createRequest(
                {
                    name: 'Uelinton',
                    email: 'uelinton-limit@example.com',
                },
                { ip },
            ),
        )

        expect(response.status).toBe(429)
        expect(response.headers.get('Retry-After')).toBeTruthy()
    })

    it('silently ignores the honeypot field', async () => {
        const response = await POST(
            createRequest({
                name: 'Bot',
                email: 'bot@example.com',
                website: 'https://spam.example',
            }),
        )

        expect(response.status).toBe(204)
        expect(fetch).not.toHaveBeenCalled()
    })
})
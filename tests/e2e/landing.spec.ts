import { expect, test } from '@playwright/test'

test.describe('Acelera Digital landing page', () => {
    test('loads the page with the correct title and hero content', async ({
        page,
    }) => {
        await page.goto('/')

        await expect(page).toHaveTitle('Acelera Digital')

        await expect(
            page.getByRole('heading', {
                level: 1,
                name: /acelere suas vendas no digital/i,
            }),
        ).toBeVisible()
    })

    test('exposes the primary registration CTA in the header', async ({
        page,
    }) => {
        await page.goto('/')

        const cta = page.getByRole('link', {
            name: /inscreva-se/i,
        })

        await expect(cta).toHaveAttribute('href', '#inscricao')
        await expect(cta).toBeVisible()
    })

    test('moves the user from the hero CTA to registration', async ({
        page,
    }) => {
        await page.goto('/')

        await page.getByRole('button', {
            name: /quero participar gratuitamente/i,
        }).click()

        await expect(
            page.locator('#inscricao'),
        ).toBeInViewport()

        await expect(
            page.getByRole('heading', {
                level: 2,
                name: /pronto para acelerar suas vendas/i,
            }),
        ).toBeVisible()
    })

    test('supports keyboard access to the skip link', async ({
        page,
    }) => {
        await page.goto('/')

        await page.keyboard.press('Tab')

        await expect(
            page.getByRole('link', {
                name: /pular para o conteúdo/i,
            }),
        ).toBeFocused()
    })

    test('renders the complete schedule', async ({ page }) => {
        await page.goto('/')

        const schedule = page.locator('#programacao')

        await expect(schedule).toContainText('19:00')
        await expect(schedule).toContainText('19:20')
        await expect(schedule).toContainText('20:00')
        await expect(schedule).toContainText('20:40')
    })

    test('does not create horizontal overflow on a narrow mobile viewport', async ({
        page,
    }) => {
        await page.setViewportSize({
            width: 320,
            height: 568,
        })

        await page.goto('/')

        const overflow = await page.evaluate(
            () =>
                document.documentElement.scrollWidth > 
                document.documentElement.clientWidth,
        )

        expect(overflow).toBe(false)
    })
})
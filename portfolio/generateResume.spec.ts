import { test, expect } from "@playwright/test"
import type { Locales } from './src/i18n/i18n-types'

const locales: Set<Locales> = new Set(['en', 'fr'])

test.afterAll(async ({ browser }) => {
    await browser.close()
})

for (const locale of locales) {
    test(`Generate Resume [${locale}]`, async ({ browser }) => {
        const resumePath = "public/resume"
        const margin = { x: "0.4in", y: "0.2in" } as const

        const browserContext = await browser.newContext({
            viewport: {
                width: 1920,
                height: 1080,
            }
        })

        const page = await browserContext.newPage()
    
        await page.goto(`/${locale}`)
            
        // Generate PDF
        const generateResumePromise = await page.pdf({
            format: 'A4',
            scale: 0.51,
            margin: {
                top: margin.y,
                left: margin.x,
                right: margin.x,
                bottom: margin.y,
            },
            path: `${resumePath}-${locale}.pdf`,
        })
        
        expect(() => generateResumePromise).not.toThrow()
    })
}
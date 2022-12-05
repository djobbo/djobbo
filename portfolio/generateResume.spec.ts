import { test, expect } from "@playwright/test"


test.afterAll(async ({ browser }) => {
    await browser.close()
})

test("generate resume", async ({ browser }) => {
    const resumePath = "public/resume"
    const margin = { x: "0.4in", y: "0.2in" } as const

    const browserContext = await browser.newContext({
        viewport: {
            width: 1920,
            height: 1080,
        }
    })

    const page = await browserContext.newPage()

    await page.goto("/")

    // Generate PDF
    const data = await page.pdf({
        format: 'A4',
        scale: 0.52,
        margin: {
            top: margin.y,
            left: margin.x,
            right: margin.x,
            bottom: margin.y,
        },
        path: `${resumePath}.pdf`,
    })

    expect(data).toBeTruthy()
})

test.only("generates github readme banner", async ({ browser }) => {
    const browserContext = await browser.newContext({
        viewport: {
            width: 960,
            height: 600,
        },
    })

    const page = await browserContext.newPage()

    await page.goto("/banner")

    const container = await page.$("#banner-container")

    expect(container).toBeTruthy()

    const data = await container?.screenshot({
        omitBackground: true,
        type: "png",
        path: `../images/banner.png`,
        scale: 'device',
        caret: 'hide',
    })

    expect(data).toBeTruthy()
})
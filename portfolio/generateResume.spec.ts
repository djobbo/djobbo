import { test, expect, ViewportSize } from "@playwright/test"

const resumePath = "public/resume"
const margin = { x: "0.4in", y: "0.2in" } as const
const pageFormat = "A4"
const pageScale = 0.65
const viewport: ViewportSize = {
    width: 2480,
    height: 3508,
}

test("generate resume", async ({ browser }) => {
    const browserContext = await browser.newContext({
        viewport,
    })

    const page = await browserContext.newPage()

    await page.goto("/")

    // Generate image preview
    await page.screenshot({ path: `${resumePath}.png` })

    // Generate PDF
    const data = await page.pdf({
        format: pageFormat,
        scale: pageScale,
        margin: {
            top: margin.y,
            left: margin.x,
            right: margin.x,
            bottom: margin.y,
        },
        path: `${resumePath}.pdf`,
    })

    await browser.close()

    expect(data).toBeTruthy()
})

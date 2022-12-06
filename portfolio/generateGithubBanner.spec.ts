import { test, expect } from "@playwright/test"


test.afterAll(async ({ browser }) => {
    await browser.close()
})

test("generate github readme banner", async ({ browser }) => {
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
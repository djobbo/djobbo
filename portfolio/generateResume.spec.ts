import { test, expect } from "@playwright/test"
import { existsSync } from "node:fs"
import { writeFile, rm } from "node:fs/promises"

const RESUME_PATH = "public/resume.pdf"
const MARGIN_X = "0.4in"
const MARGIN_Y = "0.2in"

test("generate resume", async ({ browser }) => {
    const browserContext = await browser.newContext({
        viewport: {
            width: 2480,
            height: 3508,
        },
    })

    const page = await browserContext.newPage()

    await page.goto("/resume")

    const data = await page.pdf({
        format: "A4",
        scale: 0.65,
        margin: {
            top: MARGIN_Y,
            left: MARGIN_X,
            right: MARGIN_X,
            bottom: MARGIN_Y,
        },
    })

    await browser.close()

    expect(data).toBeTruthy()

    if (existsSync(RESUME_PATH)) {
        await rm(RESUME_PATH)
    }

    await writeFile(RESUME_PATH, data)
})

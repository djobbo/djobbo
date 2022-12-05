import { PlaywrightTestConfig, devices } from "@playwright/test"

// Use process.env.PORT by default and fallback to port 3000
const PORT = process.env.PORT || 1104

// Set webServer.url and use.baseURL with the location of the WebServer respecting the correct set port
const baseURL = `http://localhost:${PORT}`

// Reference: https://playwright.dev/docs/test-configuration
const config: PlaywrightTestConfig = {
    timeout: 30 * 1000,
    retries: 2,
    outputDir: "test-results/",
    webServer: {
        command: "pnpm run dev",
        url: baseURL,
        timeout: 120 * 1000,
        reuseExistingServer: !process.env.CI,
    },
    use: {
        baseURL,
        trace: "retry-with-trace",
    },
    projects: [
        {
            name: "Desktop Chrome",
            use: devices["Desktop Chrome"],
        },
    ],
}
export default config

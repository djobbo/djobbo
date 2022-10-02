import { $ } from "zx"
import {
    logError,
    logH3,
    logSuccess,
    logWarning,
    newLine,
} from "../util/log.js"
import { runWithSpinner } from "../util/runWithSpinner.js"
import { upgradePackages } from "../util/upgrade.js"

type Options = {
    upgrade?: boolean
}

export const install = async ({ upgrade }: Options) => {
    if (upgrade) {
        await upgradePackages()
    }

    logH3("Python 3")

    try {
        await runWithSpinner(
            async () => {
                await $`sudo nala install python3 python3-pip`
            },
            { text: "Downloading & Installing Python3" },
        )
        logSuccess("Installed Python")
    } catch (e) {
        if (e.stdout.includes("already at the latest version")) {
            logWarning(
                "Python's latest version is already installed, skipping...",
            )
        } else {
            logError("Failed to install Python")
            throw new Error("Failed to install Python")
        }
    }

    newLine()
}

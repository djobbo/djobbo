import { $, chalk } from "zx"
import { logError, logH3, logSuccess, newLine } from "./log.js"
import { upgradePackages } from "./upgrade.js"
import { runWithSpinner } from "./runWithSpinner.js"

type Options = {
    upgrade?: boolean
}

export const nala = async (packages: string[], { upgrade }: Options) => {
    if (upgrade) {
        await upgradePackages()
    }

    logH3("Installing packages via Nala")

    try {
        await runWithSpinner(
            async () => {
                await $`sudo nala install ${packages.join(" ")}`
            },
            {
                text: `Installing ${packages.join(", ")} with ${chalk.blue(
                    "nala",
                )}`,
            },
        )
        logSuccess(`Installed '${packages.join(", ")}' with Nala`)
    } catch {
        logError("Failed to install packages with Nala")
        throw new Error("Failed to install packages with Nala")
    }

    newLine()
}

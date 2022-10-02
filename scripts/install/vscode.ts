import { join } from "path"
import { $, chalk } from "zx"
import { logError, logH3, logSuccess, newLine } from "../util/log.js"
import { upgradePackages } from "../util/upgrade.js"
import { runWithSpinner } from "../util/runWithSpinner.js"

type Options = {
    upgrade?: boolean
    tmpDir: string
}

export const install = async ({ upgrade, tmpDir }: Options) => {
    if (upgrade) {
        await upgradePackages()
    }

    logH3("Visual Studio Code")

    const debPath = join(tmpDir, "vscode.deb")

    try {
        await runWithSpinner(
            async () => {
                await $`wget -O ${debPath} "https://code.visualstudio.com/sha/download?build=stable&os=linux-deb-x64"`
            },
            { text: "Downloading VSCode" },
        )
        logSuccess("Downloaded VSCode")
    } catch {
        logError("Failed to download vscode")
        throw new Error("Failed to download vscode")
    }

    try {
        await runWithSpinner(
            async () => {
                await $`sudo dpkg -i ${debPath}`
            },
            { text: "Installing VSCode" },
        )

        logSuccess("Installed VSCode")
    } catch {
        logError("Failed to install vscode")
        throw new Error("Failed to install vscode")
    }

    newLine()
}

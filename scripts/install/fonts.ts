import { $, chalk } from "zx"
import {
    logError,
    logH2,
    logH4,
    logInfo,
    logSuccess,
    newLine,
} from "../util/log.js"
import { runWithSpinner } from "../util/runWithSpinner.js"
import { upgradePackages } from "../util/upgrade.js"

const fonts = [
    {
        name: "Fira Code",
        url: "https://github.com/ryanoasis/nerd-fonts/releases/download/v2.1.0/FiraCode.zip",
        filename: "FiraCode.zip",
    },
]

type Options = {
    upgrade?: boolean
    tmpDir: string
    fontsDir: string
}

export const install = async ({ upgrade, tmpDir, fontsDir }: Options) => {
    if (upgrade) {
        await upgradePackages()
    }

    logH2(`Installing ${fonts.length} fonts`)
    logInfo(`Installing ${chalk.magenta("unzip")} before installing fonts`)
    try {
        await runWithSpinner(
            async () => {
                await $`sudo nala install unzip`
            },
            { text: "Downloading & Installing unzip" },
        )
        logSuccess("Installed unzip")
    } catch (e) {
        logError(`Failed to install unzip`)
        throw new Error("Failed to install unzip")
    }

    newLine()

    for (const font of fonts) {
        logH4(font.name)
        try {
            await runWithSpinner(
                async () => {
                    await $`wget -O ${tmpDir}/${font.filename} ${font.url}`
                },
                { text: `Downloading ${font.name}` },
            )
            logSuccess(`Downloaded ${font.name}`)
        } catch (e) {
            logError(`Failed to download ${font.name}`)
            continue
        }

        try {
            await runWithSpinner(
                async () => {
                    await $`unzip ${tmpDir}/${font.filename} -d ${fontsDir}`
                },
                { text: `Installing ${font.name}` },
            )
            logSuccess(`Unzipped & Installed ${font.name}`)
        } catch (e) {
            logError(`Failed to install ${font.name}`)
            continue
        }
    }

    newLine()
}

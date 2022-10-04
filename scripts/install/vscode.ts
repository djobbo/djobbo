import { join } from "path"
import { $, cd, chalk } from "zx"
import { logError, logH3, logSuccess, newLine } from "../util/log.js"
import { upgradePackages } from "../util/upgrade.js"
import { runWithSpinner } from "../util/runWithSpinner.js"

type Options = {
    upgrade?: boolean
    tmpDir: string
    baseDir: string
}

export const install = async ({ upgrade, tmpDir, baseDir }: Options) => {
    if (upgrade) {
        await upgradePackages()
    }

    logH3("Visual Studio Code")

    try {
        await runWithSpinner(
            async () => {
                return $`git clone https://github.com/djobbo/vscode.git ${join(
                    tmpDir,
                    "vscode",
                )}`
            },
            { text: "Cloning custom VSCode fork repository" },
        )
        logSuccess("Cloned custom VSCode fork repository")
    } catch (e) {
        const folderExists = e.exitCode === 128
        logError(
            `Failed to clone VSCode fork repository${
                folderExists ? chalk.gray(" (folder already exists)") : ""
            }`,
        )
        if (!folderExists) return
    }

    cd(join(tmpDir, "vscode"))

    const buildDir = join(tmpDir, "vscode", ".build")

    $.verbose = true

    try {
        await runWithSpinner(
            async () => {
                const currentNPMExecPath = process.env.npm_execpath
                const yarnExecPath = (await $`whereis yarn`).stdout
                    .trim()
                    .split(" ")
                    .at(-1)
                process.env.npm_execpath = yarnExecPath

                await $`git fetch`
                await $`git checkout no-titlebar`
                await $`git pull`
                await $`${yarnExecPath}`
                await $`${yarnExecPath} cache clean`
                await $`${yarnExecPath} gulp vscode-linux-x64-min`
                await $`${yarnExecPath} gulp vscode-linux-x64-build-deb`

                process.env.npm_execpath = currentNPMExecPath
            },
            { text: "Building VSCode.deb from source" },
        )
        logSuccess("Built VSCode.deb from source")
    } catch (e) {
        console.error(e)
        logError("Failed to build VSCode.deb from source")
        return
    }

    const debDir = join(buildDir, "linux", "deb", "amd64", "deb")
    const debPath = join(
        debDir,
        (await $`ls ${debDir}`).stdout
            .trim()
            .split(" ")
            .filter((f) => f.endsWith(".deb"))[0],
    )

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

    cd(baseDir)

    // TODO: Delete folder

    newLine()
}

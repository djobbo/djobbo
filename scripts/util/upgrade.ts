import { $ } from "zx"
import { logError, logInfo, logSuccess, newLine } from "./log.js"

export const updatePackages = async () => {
    logInfo("Updating packages")

    try {
        await $`sudo nala update`
        logSuccess("Updated packages")
    } catch {
        logError("Failed to update packages")
    }

    newLine()
}

export const upgradePackages = async () => {
    await updatePackages()

    logInfo("Upgrading packages")

    try {
        await $`sudo nala upgrade`
        logSuccess("Upgraded packages")
    } catch {
        logError("Failed to upgrade packages")
    }

    newLine()
}

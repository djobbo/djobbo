#! ./node_modules/.bin/ts-node

import { $, chalk } from "zx"
import { dirname, join } from "path"
import { replaceHomeDirWithTilde } from "./scripts/util/homeDir.js"
import { createSymlinks, SymlinkConfig } from "./scripts/util/symlinks.js"
import { logBoxed, logSuccess, logError, newLine } from "./scripts/util/log.js"

$.verbose = false

const [, filename, ...args] = process.argv

const installDir = dirname(filename)

// Create .bin folder if it doesn't exist
logBoxed(`Creating ${chalk.blue(".bin")} folder`)
const binDir = join(installDir, ".bin")
try {
    await $`mkdir -p ${binDir}`
    logSuccess(`Created folder ${chalk.blue(replaceHomeDirWithTilde(binDir))}`)
} catch {
    logError(
        `Failed to create ${chalk.blue(
            replaceHomeDirWithTilde(binDir),
        )}  folder`,
    )
}

newLine()

// Configure symlinks
logBoxed("Configuring root symlinks")
const symlinks: SymlinkConfig[] = [
    ".profile",
    ".zshrc",
    ".bashrc",
    // ["theme/aki.zsh-theme", ".oh-my-zsh/custom/themes/aki.zsh-theme"],
    // ".config/i3/config",
    // ".config/rofi",
    // ".config/eww",
]

createSymlinks(installDir)(symlinks)

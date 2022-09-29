#! ./node_modules/.bin/ts-node

import { $, chalk } from "zx"
import { dirname, join } from "path"
import { HOME, replaceHomeDirWithTilde } from "./scripts/util/homeDir.js"
import { createSymlinks, SymlinkConfig } from "./scripts/util/symlinks.js"
import { logH2, logSuccess, logError, newLine } from "./scripts/util/log.js"
import { nala } from "./scripts/util/nala.js"

const [, filename, ...args] = process.argv

$.verbose = args.includes("--verbose")

const installDir = dirname(filename)

const createFolder = async (path: string) => {
    try {
        await $`mkdir -p ${path}`
        logSuccess(
            `Created folder ${chalk.blue(replaceHomeDirWithTilde(path))}`,
        )
    } catch {
        logError(
            `Failed to create ${chalk.blue(
                replaceHomeDirWithTilde(path),
            )}  folder`,
        )
    }
}

logH2("Creating folders")
// Create .bin folder if it doesn't exist
const binDir = join(installDir, ".bin")
await createFolder(binDir)

// Create .tmp folder if it doesn't exist
const tmpDir = join(installDir, ".tmp")
await createFolder(tmpDir)

// Create ~/.fonts folder if it doesn't exist
const fontsDir = join(HOME, ".fonts")
await createFolder(fontsDir)

newLine()

// Configure symlinks
logH2("Configuring root symlinks")
const symlinks: SymlinkConfig[] = [
    ".profile",
    ".zshrc",
    ".bashrc",
    // ["theme/aki.zsh-theme", ".oh-my-zsh/custom/themes/aki.zsh-theme"],
    // ".config/i3/config",
    // ".config/rofi",
    // ".config/eww",
    // ".config/awesome",
]

await createSymlinks(installDir)(symlinks)

newLine()

await nala(["wmctrl"], { upgrade: true })

// const fonts = await import("./scripts/install/fonts.js")
// await fonts.install({ tmpDir, fontsDir })

// newLine()

// // Install apps
// logH2("Installing apps")
// const python = await import("./scripts/install/python.js")
// await python.install({})

// const vscode = await import("./scripts/install/vscode.js")
// await vscode.install({ tmpDir })

// const spotify = await import("./scripts/install/spotify.js")
// await spotify.install({ installSpicetify: true })

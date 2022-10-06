import { stat } from "fs/promises"
import { join } from "path"
import { $, chalk } from "zx"
import { HOME, replaceHomeDirWithTilde } from "./homeDir.js"
import { logError, logSuccess } from "./log.js"

export type SymlinkConfig = string | [target: string, link: string]

const ln = async (target: string, link: string, sudo: boolean = false) =>
    $`ln -s ${target} ${link}`

type SymlinkOptions = {
    installDir: string
    absolute?: boolean
    sudo?: boolean
}

export const createSymlink =
    ({ installDir, absolute = false, sudo }: SymlinkOptions) =>
    async (config: SymlinkConfig) => {
        let target: string, link: string, linkDisplay: string

        if (typeof config === "string") {
            // Link parent dir if `link` is not specified and `target` is a directory
            const shouldLinkParentDir = (await stat(config)).isDirectory()

            target = join(installDir, config)
            link = join(
                absolute ? (config.startsWith("/") ? "" : "/") : HOME,
                shouldLinkParentDir ? join(config, "..") : config,
            )

            linkDisplay = join(
                absolute ? (config.startsWith("/") ? "" : "/") : HOME,
                config,
            )
        } else {
            target = join(installDir, config[0])
            link = join(
                absolute ? (config[1].startsWith("/") ? "" : "/") : HOME,
                config[1],
            )
            linkDisplay = link
        }

        try {
            await ln(target, link, sudo)
            logSuccess(
                `Created symlink ${chalk.blue(
                    replaceHomeDirWithTilde(linkDisplay),
                )} -> ${chalk.blue(replaceHomeDirWithTilde(target))}`,
            )
        } catch (e) {
            const fileExists = e.stderr.toString().includes("File exists")
            logError(
                `Failed to create symlink ${chalk.blue(
                    replaceHomeDirWithTilde(linkDisplay),
                )} -> ${chalk.blue(replaceHomeDirWithTilde(target))}${
                    fileExists ? chalk.gray(" (file exists)") : ""
                }`,
            )
        }
    }

export const createSymlinks =
    (options: SymlinkOptions) => async (symlinks: SymlinkConfig[]) =>
        await Promise.all(symlinks.map(createSymlink(options)))

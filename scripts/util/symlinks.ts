import { stat } from "fs/promises"
import { join } from "path"
import { $, chalk } from "zx"
import { HOME, replaceHomeDirWithTilde } from "./homeDir.js"
import { logError, logSuccess } from "./log.js"

export type SymlinkConfig = string | [target: string, link: string]

const ln = async (target: string, link: string) => $`ln -s ${target} ${link}`

export const createSymlink =
    (installDir: string) => async (config: SymlinkConfig) => {
        let target: string, link: string, linkDisplay: string

        if (typeof config === "string") {
            // Link parent dir if `link` is not specified and `target` is a directory
            const shouldLinkParentDir = (await stat(config)).isDirectory()

            target = join(installDir, config)
            link = join(HOME, shouldLinkParentDir ? join(config, "..") : config)
            linkDisplay = join(HOME, config)
        } else {
            target = join(installDir, config[0])
            link = join(HOME, config[1])
            linkDisplay = link
        }

        try {
            await ln(target, link)
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
    (installDir: string) => async (symlinks: SymlinkConfig[]) =>
        await Promise.all(symlinks.map(createSymlink(installDir)))

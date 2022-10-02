import { chalk } from "zx"
import stripAnsi from "strip-ansi"

export const { log } = console

export const logInfo = (msg: string) => log(chalk.gray("[i]"), msg)

export const logSuccess = (msg: string) => log(chalk.green("[✓]"), msg)

export const logError = (msg: string) => log(chalk.red("[✗]"), msg)

export const logWarning = (msg: string) => log(chalk.yellow("[⚠]"), msg)

export const logBoxed = (msg: string) => {
    const len = stripAnsi(msg).length + 2
    log("╭" + "─".repeat(len) + "╮")
    log("│ " + msg + " │")
    log("╰" + "─".repeat(len) + "╯")
}

export const newLine = () => log()

export const logH2 = logBoxed

export const logH3 = (msg: string) => log(chalk.bold(chalk.underline(msg)))

export const logH4 = (msg: string) => log(chalk.bold(msg))

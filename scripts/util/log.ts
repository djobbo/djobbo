import { chalk } from "zx"
import stripAnsi from "strip-ansi"

export const logInfo = (...args) => console.log(chalk.gray("[i]"), ...args)
export const logSuccess = (...args) => console.log(chalk.green("[✓]"), ...args)
export const logError = (...args) => console.log(chalk.red("[✗]"), ...args)
export const logWarning = (...args) => console.log(chalk.yellow("[⚠]"), ...args)
export const logBoxed = (msg) => {
    const len = stripAnsi(msg).length + 2
    console.log("╭" + "─".repeat(len) + "╮")
    console.log("│ " + msg + " │")
    console.log("╰" + "─".repeat(len) + "╯")
}
export const newLine = () => console.log()

import { exec } from "node:child_process"
import { join } from "node:path"

const daemonPath = join("..", "daemon.sh")

export const startDaemon = () => {
    console.log("Starting daemon...")
    const child = exec(`sh ${daemonPath} start`)

    child.on("spawn", () => {
        console.log("Daemon started!")
    })

    child.stdout?.on("error", (err) => {
        console.error(err)
    })

    child.stdout?.on("data", (data) => {
        console.log(data.toString().trim())
    })
}

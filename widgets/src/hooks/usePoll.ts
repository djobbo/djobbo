import { execSync } from "child_process"
import { useState } from "react"
import { useInterval } from "./useInterval"

export const usePoll = (
    command: string,
    interval: number = 1000,
    defaultValue: string = "",
) => {
    const [output, setOutput] = useState(defaultValue)

    useInterval(async () => {
        setOutput(await window.aki.exec(command))
    }, interval)

    return output
}

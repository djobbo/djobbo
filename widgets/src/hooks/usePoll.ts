import { execSync } from "child_process"
import { useState } from "react"
import { useInterval } from "./useInterval"

export const usePoll = (
    command: string,
    interval: number = 1000,
    defaultValue: string = "",
    callback?: (value: string) => void,
) => {
    const [output, setOutput] = useState(defaultValue)

    useInterval(async () => {
        const data = await window.aki.exec(command)
        setOutput(data)
        callback?.(data)
    }, interval)

    return output
}

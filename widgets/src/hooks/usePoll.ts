import { useState } from "react"
import { useInterval } from "./useInterval"

export const usePoll = (
    command: string,
    interval: number = 1000,
    defaultValue: string = "",
    {
        onPoll,
        active = true,
    }: { onPoll?: (value: string) => void; active?: boolean } = {},
) => {
    const [output, setOutput] = useState(defaultValue)

    useInterval(
        async () => {
            if (!active) return

            const data = await window.aki.exec(command)
            setOutput(data)
            onPoll?.(data)
        },
        interval,
        [command, active],
    )

    return output
}

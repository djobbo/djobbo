import { useState, useEffect } from "react"

export const useListen = (
    command: string,
    defaultValue: string = "",
    callback?: (data: string) => void,
) => {
    const [output, setOutput] = useState(defaultValue)

    useEffect(() => {
        window.aki.listenTo(command)

        window.aki.handleListen(command, (data) => {
            setOutput(data)
            callback?.(data)
        })

        return () => {
            window.aki.stopListening(command)
        }
    }, [])

    return output
}

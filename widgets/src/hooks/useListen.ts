import { useState, useEffect } from "react"

export const useListen = (
    command: string,
    defaultValue: string = "",
    callback?: (data: string) => void,
) => {
    const [output, setOutput] = useState(defaultValue)

    useEffect(() => {
        const stopListening = window.aki.listenTo(command)

        const cleanup = window.aki.handleListen(command, (data) => {
            setOutput(data)
            callback?.(data)
        })

        return () => {
            cleanup()
            stopListening()
        }
    }, [])

    return output
}

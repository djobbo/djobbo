import { useCallback, useState } from "react"
import { usePoll } from "./usePoll"

export const useVolume = (channel: number | string = 1) => {
    const [volume, setVolume] = useState(0)
    usePoll(
        `amixer -c ${channel} get Master | grep -o '[0-9]\\+%' | head -n 1`,
        250,
        "0",
        (rawVolume) => {
            setVolume(parseInt(rawVolume, 10))
        },
    )

    const setVolumeTo = useCallback((volume: number) => {
        window.aki.exec(`amixer -c ${channel} set Master ${volume}%`)
        setVolume(volume)
    }, [])

    return [volume, setVolumeTo] as const
}

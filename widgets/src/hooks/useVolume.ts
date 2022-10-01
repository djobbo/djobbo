import { useCallback, useState } from "react"
import { usePoll } from "./usePoll"

export const useVolume = () => {
    const [volume, setVolume] = useState(0)
    usePoll(
        `amixer -c 2 get Master | grep -o '[0-9]\\+%' | head -n 1`,
        250,
        "0",
        (rawVolume) => {
            setVolume(parseInt(rawVolume, 10))
        },
    )

    const setVolumeTo = useCallback((volume: number) => {
        window.aki.exec(`amixer -c 2 set Master ${volume}%`)
        setVolume(volume)
    }, [])

    return [volume, setVolumeTo] as const
}

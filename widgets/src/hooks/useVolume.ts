import { useCallback, useEffect, useState } from "react"
import { usePoll } from "./usePoll"

const MAX_CHANNELS_TO_CHECK = 4

export const useVolume = (defaultChannel = -1) => {
    const [channel, setChannel] = useState(defaultChannel)
    const [volume, setVolume] = useState(100)

    const active = channel >= 0

    usePoll(
        `amixer -c ${channel} get Master | grep -o '[0-9]\\+%' | head -n 1`,
        250,
        "0",
        {
            onPoll: (rawVolume) => {
                setVolume(parseInt(rawVolume, 10))
            },
            active,
        },
    )

    useEffect(() => {
        if (channel > 0) return

        let shouldSetChannel = true

        const findMasterChannel = async () => {
            const find = async () => {
                for (let i = 0; i < MAX_CHANNELS_TO_CHECK; i++) {
                    const channelInfo = await window.aki.exec(`amixer -c ${i}`)

                    if (channelInfo.includes("Master")) return i
                }
                return -1
            }

            if (!shouldSetChannel) return

            const channel = await find()
            setChannel(channel)
        }

        findMasterChannel()

        return () => {
            shouldSetChannel = false
        }
    }, [])

    const setVolumeTo = useCallback(
        (volume: number) => {
            window.aki.exec(`amixer -c ${channel} set Master ${volume}%`)
            setVolume(volume)
        },
        [channel],
    )

    return [volume, setVolumeTo, active] as const
}

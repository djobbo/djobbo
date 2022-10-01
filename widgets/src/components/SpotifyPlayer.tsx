import { useSpotify } from "../hooks/useSpotify"
import { NextIcon, PlayIcon, PreviousIcon, SpotifyIcon } from "./Icons"
import { Pill } from "./Pill"
export const SpotifyPlayer = () => {
    const music = useSpotify()

    if (!music) {
        return null
    }

    return (
        <div className="flex gap-2 items-center">
            <button
                type="button"
                className="text-xs flex gap-2 items-center hover:text-[#98C379]"
                onClick={() => window.aki.exec(`i3-msg workspace 6`)}
            >
                <SpotifyIcon
                    width={14}
                    height={14}
                    className="text-[#98C379]"
                />
                {music}
            </button>
            <Pill>
                <button
                    onClick={() =>
                        window.aki.exec(`playerctl previous --player=spotify`)
                    }
                >
                    <PreviousIcon
                        width={16}
                        height={16}
                        className="text-[#D0D0D0] hover:text-[#FFFFFF]"
                    />
                </button>
                <button
                    onClick={() =>
                        window.aki.exec(`playerctl play-pause --player=spotify`)
                    }
                >
                    <PlayIcon
                        width={16}
                        height={16}
                        className="text-[#98C379] hover:text-[#FFFFFF]"
                    />
                </button>
                <button
                    onClick={() =>
                        window.aki.exec(`playerctl next --player=spotify`)
                    }
                >
                    <NextIcon
                        width={16}
                        height={16}
                        className="text-[#D0D0D0] hover:text-[#FFFFFF]"
                    />
                </button>
            </Pill>
        </div>
    )
}

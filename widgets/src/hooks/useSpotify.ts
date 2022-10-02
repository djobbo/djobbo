import { useListen } from "./useListen"

export const useSpotify = () => {
    return useListen(
        `playerctl --player=spotify --follow metadata --format "{{ title }} - {{ artist }}" | stdbuf -oL cut -b 1-42 || true`,
    )
}

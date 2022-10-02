import { useEffect } from "react"

export const useInterval = (callback: () => void, interval: number) => {
    useEffect(() => {
        callback()
        const id = setInterval(callback, interval)
        return () => clearInterval(id)
    }, [interval])
}

import { useEffect } from "react"

export const useTimeout = (callback: () => void, delay: number) => {
    useEffect(() => {
        const timeout = setTimeout(callback, delay)
        return () => clearTimeout(timeout)
    }, [])
}

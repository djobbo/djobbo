import { useEffect, useState } from "react"

export const useSharedState = <T>(uniqueKey: string, defaultValue: T) => {
    const [state, setState] = useState<T>(defaultValue)

    const onStorageUpdate = (e: StorageEvent) => {
        const { key, newValue } = e

        if (key !== uniqueKey) return

        setState(newValue ? JSON.parse(newValue) : defaultValue)
    }

    const handleChange = (newValue: T) => {
        setState(newValue)
        localStorage.setItem(uniqueKey, JSON.stringify(newValue))
    }

    useEffect(() => {
        const storedValue = localStorage.getItem(uniqueKey)
        setState(storedValue ? JSON.parse(storedValue) : defaultValue)
        window.addEventListener("storage", onStorageUpdate)

        return () => {
            window.removeEventListener("storage", onStorageUpdate)
        }
    }, [])

    return [state, handleChange] as const
}

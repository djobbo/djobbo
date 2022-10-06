import { DependencyList, useEffect } from "react"

export const useInterval = (
    callback: () => void,
    interval: number,
    deps: DependencyList = [],
) => {
    useEffect(() => {
        callback()
        const id = setInterval(callback, interval)
        return () => clearInterval(id)
    }, [interval, ...deps])
}

import { useEffect } from "react"

export const useGlobalShortcut = (
    shortcut: Electron.Accelerator,
    callback: () => void,
) => {
    useEffect(() => {
        window.aki.registerShortcut(shortcut)

        const cleanup = window.aki.handleShortcut(shortcut, callback)

        return () => {
            window.aki.removeShortcut(shortcut)
            cleanup()
        }
    }, [])
}

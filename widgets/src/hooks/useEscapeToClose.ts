import { useEffect } from "react"
import { useWidgets } from "../providers/WidgetsProvider"

export const useEscapeToClose = () => {
    const { closeCurrentWidget } = useWidgets()

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return

            closeCurrentWidget()
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])
}

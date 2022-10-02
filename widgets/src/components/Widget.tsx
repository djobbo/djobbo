import { ReactNode, useEffect } from "react"
import { useWidgetsRouter } from "../providers/WidgetsRouterProvider"

type WidgetProps = {
    name: string
    children: ReactNode
    showDevTools?: boolean
} & Electron.BrowserWindowConstructorOptions

export const Widget = ({
    name,
    children,
    showDevTools = false,
    ...options
}: WidgetProps) => {
    const { addWidget, removeWidget } = useWidgetsRouter()

    useEffect(() => {
        addWidget({ name, element: children })

        const removeWindowPromise = window.aki.createWindow(
            name,
            {
                ...options,
            },
            showDevTools,
        )

        return () => {
            removeWidget(name)

            const cleanup = async () => {
                const removeWindow = await removeWindowPromise
                removeWindow()
            }

            cleanup()
        }
    }, [])

    return null
}

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react"
import {
    createBrowserRouter,
    RouteObject,
    RouterProvider,
} from "react-router-dom"

type WidgetsContext = {
    openWidget: (
        name: string,
        options?: Electron.BrowserWindowConstructorOptions & {
            showDevTools?: boolean
        },
    ) => () => void
    widgetId: number
    closeWidget: (id: number) => void
    closeCurrentWidget: () => void
}

const widgetsContext = createContext<WidgetsContext>({
    openWidget: () => () => void 0,
    widgetId: 0,
    closeWidget: () => void 0,
    closeCurrentWidget: () => void 0,
})

export const useWidgets = () => useContext(widgetsContext)

type WidgetsProviderProps = {
    children: ReactNode
    widgets: {
        name: string
        element: ReactNode
        options?: Electron.BrowserWindowConstructorOptions
    }[]
}

export const WidgetsProvider = ({
    children,
    widgets,
}: WidgetsProviderProps) => {
    const [widgetId, setWidgetId] = useState(-1)
    const router = useMemo(() => {
        const routes = widgets.map<RouteObject>(({ name, element }) => ({
            path: name,
            element,
        }))

        return createBrowserRouter([
            { path: "/", element: <>{children}</> },
            ...routes,
            { path: "*", element: <></> },
        ])
    }, [widgets])

    useEffect(() => {
        window.aki.getWindowId().then(setWidgetId)
    }, [])

    const openWidget = (
        name: string,
        {
            showDevTools = false,
            ...options
        }: Electron.BrowserWindowConstructorOptions & {
            showDevTools?: boolean
        } = {},
    ) => {
        const widget = widgets.find((widget) => widget.name === name)

        if (!widget) return () => {}

        const removeWindowPromise = window.aki.createWindow(
            name,
            { ...widget.options, ...options },
            showDevTools,
        )

        return () => {
            const cleanup = async () => {
                const removeWindow = await removeWindowPromise
                removeWindow()
            }

            cleanup()
        }
    }

    const closeWidget = (widgetId: number) => window.aki.closeWindow(widgetId)
    const closeCurrentWidget = () => window.aki.closeCurrentWindow()

    return (
        <widgetsContext.Provider
            value={{ openWidget, widgetId, closeWidget, closeCurrentWidget }}
        >
            <RouterProvider router={router} />
        </widgetsContext.Provider>
    )
}

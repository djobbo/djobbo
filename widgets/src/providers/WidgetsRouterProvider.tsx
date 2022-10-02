import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

export type Widget = {
    name: string
    element: ReactNode
}

type WidgetsRouterContext = {
    addWidget: (widget: Widget) => void
    removeWidget: (name: string) => void
}

const widgetsRouterContext = createContext<WidgetsRouterContext>({
    addWidget: () => void 0,
    removeWidget: () => void 0,
})

export const useWidgetsRouter = () => useContext(widgetsRouterContext)

type WidgetsRouterProps = {
    children: ReactNode
}

export const WidgetsRouterProvider = ({ children }: WidgetsRouterProps) => {
    const [widgets, setWidgets] = useState<Widget[]>([])

    const router = createBrowserRouter([
        {
            path: "/",
            element: <></>,
        },
        ...widgets.map(({ name, element }) => ({
            path: `/${name}`,
            element,
        })),
    ])

    const addWidget = useCallback((widget: Widget) => {
        setWidgets((widgets) => {
            const newWidgets = widgets.filter((w) => w.name !== widget.name)
            newWidgets.push(widget)
            return newWidgets
        })
    }, [])

    const removeWidget = useCallback((name: string) => {
        setWidgets((widgets) => widgets.filter((w) => w.name !== name))
    }, [])

    return (
        <widgetsRouterContext.Provider value={{ addWidget, removeWidget }}>
            <RouterProvider router={router} />
            {children}
        </widgetsRouterContext.Provider>
    )
}

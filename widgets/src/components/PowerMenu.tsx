import { useEscapeToClose } from "../hooks/useEscapeToClose"
import { useWidgets } from "../providers/WidgetsProvider"

export const PowerMenu = () => {
    const { closeCurrentWidget } = useWidgets()

    useEscapeToClose()

    return (
        <div className="w-screen h-screen" onClick={() => closeCurrentWidget()}>
            <h1
                className="text-xl text-black"
                onClick={() => closeCurrentWidget()}
            >
                Hello World
            </h1>
        </div>
    )
}

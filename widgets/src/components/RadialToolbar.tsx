import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useEscapeToClose } from "../hooks/useEscapeToClose"
import { useTimeout } from "../hooks/useTimeout"
import { useWidgets } from "../providers/WidgetsProvider"
import { RadialToolbarItem, IRadialToolbarItem } from "./RadialToolbarItem"

interface Props {
    items: IRadialToolbarItem[]
}

const directions = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
]

const keyToDirectionMap: Record<string, "left" | "right" | "up" | "down"> = {
    KeyA: "left",
    KeyD: "right",
    KeyW: "up",
    KeyS: "down",
}

export const RadialToolbar = ({ items }: Props) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [direction, setDirection] = useState<{
        left: boolean
        right: boolean
        up: boolean
        down: boolean
    }>({ left: false, right: false, up: false, down: false })
    const { closeCurrentWidget } = useWidgets()
    const closeTimeoutRef = useRef<NodeJS.Timeout>()

    const selectedItem = useMemo(
        () =>
            directions.findIndex(
                (arr) =>
                    arr[0] === +direction.right - +direction.left &&
                    arr[1] === +direction.up - +direction.down,
            ),
        [direction],
    )

    useEscapeToClose()

    useTimeout(() => {
        setMenuOpen(true)
    }, 40)

    const handleCloseMenu = async () => {
        if (closeTimeoutRef.current) return

        if (selectedItem !== -1) await items[selectedItem].activeFn()

        setMenuOpen(false)
        closeTimeoutRef.current = setTimeout(() => {
            closeCurrentWidget()
        }, 80)
    }

    const updateDirection = (key: string, value: boolean) => {
        if (!value && key === "Space") {
            handleCloseMenu()
            return
        }

        const dir = keyToDirectionMap[key]

        if (!dir) return

        setDirection((prev) => ({ ...prev, [dir]: value }))
    }

    const onKeyDown = (e: KeyboardEvent) => updateDirection(e.code, true)

    const onKeyUp = (e: KeyboardEvent) => updateDirection(e.code, false)

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown)
        document.addEventListener("keyup", onKeyUp)

        return () => {
            document.removeEventListener("keydown", onKeyDown)
            document.removeEventListener("keyup", onKeyUp)
        }
    }, [selectedItem])

    useEffect(() => {
        setDirection({
            left: false,
            right: false,
            up: false,
            down: false,
        })
    }, [menuOpen])

    return (
        <div className="absolute inset-0">
            <div
                className={`absolute bg-[#d33] ${
                    menuOpen ? "opacity-100" : "opacity-0"
                }`}
                style={{
                    transition: "0.15s all ease",
                    top: "50%",
                    left: "50%",
                }}
            >
                {items.map((item, i) => (
                    <RadialToolbarItem
                        {...item}
                        key={i}
                        index={i}
                        size={200}
                        menuOpen={menuOpen}
                        selected={selectedItem === i}
                    />
                ))}
            </div>
        </div>
    )
}

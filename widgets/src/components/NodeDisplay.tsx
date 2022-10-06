import { I3Node } from "../hooks/useWindowTree"
import {
    SiDiscord,
    SiSpotify,
    SiVisualstudiocode,
    SiFirefox,
    SiObsstudio,
} from "react-icons/si"
import { FaTerminal, FaRegQuestionCircle } from "react-icons/fa"
import { useRef } from "react"
import { motion, Transition } from "framer-motion"

type I3NodeDisplayProps = {
    node: I3Node
}

const classToIcon = new Map([
    ["discord", SiDiscord],
    ["spotify", SiSpotify],
    ["code-oss", SiVisualstudiocode],
    ["code", SiVisualstudiocode],
    ["kitty", FaTerminal],
    ["firefox", SiFirefox],
    ["obs", SiObsstudio],
])

const WindowNodeDisplay = ({ node }: I3NodeDisplayProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null)

    const Icon =
        (node.window_properties &&
            classToIcon.get(node.window_properties.class.toLowerCase())) ??
        FaRegQuestionCircle

    const iconSize = buttonRef.current
        ? Math.min(
              buttonRef.current.offsetWidth - 6,
              buttonRef.current.offsetHeight - 6,
              16,
          )
        : 0

    return (
        <button
            ref={buttonRef}
            className={`flex flex-1 justify-center items-center rounded-sm hover:bg-[#A8E4FE40] ${
                node.focused ? "bg-[#A8E4FE2A]" : "bg-[#A8E4FE0F]"
            }`}
            style={{
                border: node.focused
                    ? "1px solid #A8E4FE"
                    : "1px solid #A8E4FE1F",
            }}
            onClick={() => {
                window.aki.exec(`i3-msg '[con_id="${node.id}"] focus'`)
            }}
        >
            {iconSize > 8 && !!Icon ? <Icon size={iconSize} /> : null}
        </button>
    )
}

const selectionTransition: Transition = {
    type: "spring",
    stiffness: 320,
    damping: 30,
}

export const NodeDisplay = ({ node }: I3NodeDisplayProps) => {
    if (!node.orientation || node.orientation === "none") {
        return <WindowNodeDisplay node={node} />
    }

    return (
        <div
            className={`flex gap-0.5 relative ${
                node.orientation === "horizontal" ? "flex-row" : "flex-col"
            } ${
                node.type === "workspace"
                    ? "p-0.5 w-16 h-9 bg-[#0B102360]"
                    : "flex-1"
            }`}
        >
            {node.type === "workspace" && (
                <>
                    <p className="absolute top-0.5 right-1 text-xs text-[#A8E4FEBB] pointer-events-none">
                        {node.name}
                    </p>
                    {!!node.fullscreen_mode && (
                        <motion.div
                            layoutId="outline"
                            className="absolute inset-0 border border-[#A8E4FE80] rounded-[0.25rem] pointer-events-none"
                            initial={false}
                            transition={selectionTransition}
                        />
                    )}
                </>
            )}
            {node.nodes.map((node) => (
                <NodeDisplay key={node.id} node={node} />
            ))}
        </div>
    )
}

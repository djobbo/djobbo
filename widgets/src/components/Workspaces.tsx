import { LayoutGroup } from "framer-motion"
import { useWindowTree } from "../hooks/useWindowTree"
import { NodeDisplay } from "./NodeDisplay"

export const Workspaces = () => {
    const workspaces = useWindowTree()

    if (!workspaces) {
        return null
    }

    return (
        <LayoutGroup>
            <div className="flex py-2 gap-1">
                {workspaces.map((w) => (
                    <NodeDisplay node={w} key={w.id} />
                ))}
            </div>
        </LayoutGroup>
    )
}

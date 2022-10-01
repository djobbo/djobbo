import { useWindowTree } from "../hooks/useWindowTree"
import { NodeDisplay } from "./NodeDisplay"

export const Workspaces = () => {
    const workspaces = useWindowTree()

    if (!workspaces) {
        return null
    }

    return (
        <div className="flex px-1 py-2 gap-2">
            {workspaces.map((w) => (
                <NodeDisplay node={w} key={w.id} />
            ))}
        </div>
    )
}

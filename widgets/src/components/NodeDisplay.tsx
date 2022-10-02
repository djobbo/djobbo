import { I3Node } from "../hooks/useWindowTree"

type I3NodeDisplayProps = {
    node: I3Node
}

export const NodeDisplay = ({ node }: I3NodeDisplayProps) => {
    if (!node.orientation || node.orientation === "none") {
        return (
            <button
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
            />
        )
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
            style={
                node.type === "workspace"
                    ? {
                          border: node.fullscreen_mode
                              ? "1px solid #A8E4FE80"
                              : "1px solid transparent",
                          borderRadius: "0.25rem",
                      }
                    : {}
            }
        >
            {node.type === "workspace" && (
                <p className="absolute top-0.5 right-1 text-xs text-[#A8E4FEBB] pointer-events-none">
                    {node.name}
                </p>
            )}
            {node.nodes.map((node) => (
                <NodeDisplay key={node.id} node={node} />
            ))}
        </div>
    )
}

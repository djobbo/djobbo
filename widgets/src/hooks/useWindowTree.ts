import { usePoll } from "./usePoll"

type I3WindowGeometry = {
    x: number
    y: number
    width: number
    height: number
}

type I3WindowTree = {
    id: number
    type: "workspace" | "output" | "con"
    orientation: "none" | "horizontal" | "vertical"
    scratchpad_state: string
    percent: number
    urgent: boolean
    marks: []
    focused: boolean
    layout: string
    workspace_layout: string
    last_split_layout: string
    border: string
    current_border_width: string
    rect: I3WindowGeometry
    deco_rect: I3WindowGeometry
    window_rect: I3WindowGeometry
    geometry: I3WindowGeometry
    name: string
    window_icon_padding: string
    window: null
    window_type: null
    nodes: I3WindowTree[]
    floating_nodes: I3WindowTree[]
    focus: [number, number]
    fullscreen_mode: number
    sticky: boolean
    floating: string
    swallows: []
}

const findWorkspaces = (tree: I3WindowTree): I3WindowTree[] => {
    if (tree.type === "workspace") {
        return [tree]
    }

    return tree.nodes.flatMap(findWorkspaces)
}

export type I3Node = Pick<
    I3WindowTree,
    "type" | "id" | "name" | "focused" | "fullscreen_mode" | "orientation"
> & { nodes: I3Node[] }

const parseI3Tree = ({
    id,
    type,
    name,
    focused,
    fullscreen_mode,
    orientation,
    nodes,
}: I3WindowTree): I3Node => {
    return {
        type,
        id,
        name,
        focused,
        fullscreen_mode,
        orientation,
        nodes: nodes.map(parseI3Tree),
    }
}

export const useWindowTree = () => {
    const treeStr = usePoll("i3-msg -t get_tree", 50)

    if (!treeStr) {
        return null
    }

    const treeJson = JSON.parse(treeStr) as I3WindowTree

    const workspaces = findWorkspaces(treeJson)

    const parsedI3Tree = workspaces
        .filter((workspace) => workspace.name !== "__i3_scratch")
        .map(parseI3Tree)

    return parsedI3Tree
}

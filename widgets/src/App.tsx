import { SpotifyPlayer } from "./components/SpotifyPlayer"
import { SystemMonitor } from "./components/SystemMonitor"
import { Widget } from "./components/Widget"
import { Workspaces } from "./components/Workspaces"
import { useGlobalShortcut } from "./hooks/useGlobalShortcut"

function App() {
    useGlobalShortcut("Meta+Space", () => {
        console.log("Meta+Space")
    })

    return (
        <Widget
            name="bar"
            alwaysOnTop
            frame={false}
            transparent
            focusable={false}
            x={0}
            y={0}
            width={1920}
            height={48}
            // showDevTools
        >
            <div className="flex items-center justify-between px-2">
                <Workspaces />
                <div className="flex items-center gap-4">
                    <SpotifyPlayer />
                    <SystemMonitor />
                </div>
            </div>
        </Widget>
    )
}

export default App

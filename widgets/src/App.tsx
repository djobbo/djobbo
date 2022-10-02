import { SpotifyPlayer } from "./components/SpotifyPlayer"
import { SystemMonitor } from "./components/SystemMonitor"
import { Workspaces } from "./components/Workspaces"
import { useGlobalShortcut } from "./hooks/useGlobalShortcut"

function App() {
    useGlobalShortcut("Meta+Space", () => {
        console.log("Meta+Space")
    })

    return (
        <div className="flex items-center justify-between px-2">
            <Workspaces />
            <div className="flex items-center gap-4">
                <SpotifyPlayer />
                <SystemMonitor />
            </div>
        </div>
    )
}

export default App

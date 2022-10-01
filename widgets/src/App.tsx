import { SpotifyPlayer } from "./components/SpotifyPlayer"
import { SystemMonitor } from "./components/SystemMonitor"
import { Workspaces } from "./components/Workspaces"

function App() {
    return (
        <div className="flex items-center justify-between">
            <Workspaces />
            <div className="flex items-center gap-4">
                <SpotifyPlayer />
                <SystemMonitor />
            </div>
        </div>
    )
}

export default App

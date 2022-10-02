import { SpotifyPlayer } from "./components/SpotifyPlayer"
import { SystemMonitor } from "./components/SystemMonitor"
import { useWidgets, WidgetsProvider } from "./providers/WidgetsProvider"
import { Workspaces } from "./components/Workspaces"
import { useGlobalShortcut } from "./hooks/useGlobalShortcut"
import { useEffect } from "react"
import { PowerMenu } from "./components/PowerMenu"
import { RadialToolbar } from "./components/RadialToolbar"
import { SiObsstudio, SiDiscord, SiSpotify } from "react-icons/si"
import { FaPowerOff, FaUserLock, FaTerminal } from "react-icons/fa"

const AppSetup = () => {
    const { openWidget } = useWidgets()

    useGlobalShortcut("Meta+Space", () => {
        // TODO: keep radial menu always open and just toggle visibility for better performance
        openWidget("radial_toolbar")
    })

    useEffect(() => {
        const closeBar = openWidget("bar")

        return () => {
            closeBar()
        }
    }, [])

    return null
}

function App() {
    return (
        <WidgetsProvider
            widgets={[
                {
                    name: "bar",
                    element: (
                        <div className="flex items-center justify-between px-2 bg-gradient-to-b from-[#0B102360] to-[#0B102300]">
                            <Workspaces />
                            <div className="flex items-center gap-4">
                                <SpotifyPlayer />
                                <SystemMonitor />
                            </div>
                        </div>
                    ),
                    options: {
                        alwaysOnTop: true,
                        frame: false,
                        transparent: true,
                        x: 0,
                        y: 0,
                        width: 1920,
                        height: 48,
                        type: "dock",
                    },
                },
                {
                    name: "power_menu",
                    element: <PowerMenu />,
                    options: {
                        alwaysOnTop: true,
                        frame: false,
                        transparent: true,
                        fullscreen: true,
                        x: 0,
                        y: 0,
                        width: 1920,
                        height: 1080,
                    },
                },
                {
                    name: "radial_toolbar",
                    element: (
                        <RadialToolbar
                            items={[
                                {
                                    label: "Power Menu",
                                    icon: (
                                        <div className="w-full h-full flex justify-center items-center">
                                            <FaPowerOff
                                                size={48}
                                                fill="#D0D0D0"
                                            />
                                        </div>
                                    ),
                                    activeFn: () =>
                                        window.aki.exec(`shutdown -h 0`),
                                },
                                {
                                    label: "Kitty",
                                    icon: (
                                        <div className="w-full h-full flex justify-center items-center">
                                            <FaTerminal
                                                size={48}
                                                fill="#D0D0D0"
                                            />
                                        </div>
                                    ),
                                    activeFn: () => window.aki.spawn("kitty"),
                                },
                                {
                                    label: "Obs",
                                    icon: (
                                        <div className="w-full h-full flex justify-center items-center">
                                            <SiObsstudio
                                                size={48}
                                                fill="#D0D0D0"
                                            />
                                        </div>
                                    ),
                                    activeFn: () => window.aki.spawn("obs"),
                                },
                                {
                                    label: "Discord",
                                    icon: (
                                        <div className="w-full h-full flex justify-center items-center">
                                            <SiDiscord
                                                size={48}
                                                fill="#61AFEF"
                                            />
                                        </div>
                                    ),
                                    activeFn: () =>
                                        window.aki.exec("i3-msg workspace 5"),
                                },
                                {
                                    label: "Spotify",
                                    icon: (
                                        <div className="w-full h-full flex justify-center items-center">
                                            <SiSpotify
                                                size={48}
                                                fill="#98C379"
                                            />
                                        </div>
                                    ),
                                    activeFn: () =>
                                        window.aki.exec("i3-msg workspace 6"),
                                },
                                {
                                    label: "",
                                    icon: <></>,
                                    activeFn: () => {},
                                },
                                {
                                    label: "",
                                    icon: <></>,
                                    activeFn: () => {},
                                },
                                {
                                    label: "Lockscreen",
                                    icon: (
                                        <div className="w-full h-full flex justify-center items-center">
                                            <FaUserLock
                                                size={48}
                                                fill="#D0D0D0"
                                            />
                                        </div>
                                    ),
                                    activeFn: () =>
                                        window.aki.exec(`i3-msg exit`),
                                },
                            ]}
                        />
                    ),
                    options: {
                        alwaysOnTop: true,
                        frame: false,
                        transparent: true,
                        x: 0,
                        y: 0,
                        width: 1920,
                        height: 1080,
                        type: "toolbar",
                    },
                },
            ]}
        >
            <AppSetup />
        </WidgetsProvider>
    )
}

export default App

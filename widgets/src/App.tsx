import { SpotifyPlayer } from "./components/SpotifyPlayer"
import { SystemMonitor } from "./components/SystemMonitor"
import { useWidgets, WidgetsProvider } from "./providers/WidgetsProvider"
import { Workspaces } from "./components/Workspaces"
import { useGlobalShortcut } from "./hooks/useGlobalShortcut"
import { useEffect } from "react"
import { PowerMenu } from "./components/PowerMenu"
import { RadialToolbar } from "./components/RadialToolbar"

const AppSetup = () => {
    const { openWidget } = useWidgets()

    useGlobalShortcut("Meta+Space", () => {
        openWidget("radial_toolbar")
    })

    useEffect(() => {
        const closeBar = openWidget("bar")
        // const closeRadialToolbar = openWidget("radial_toolbar")

        return () => {
            closeBar()
            // closeRadialToolbar()
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
                                    label: "Bucko",
                                    img: "https://images.prismic.io/bucko/d652e489-7540-4a49-8715-02816d4095bb_bucko.png?auto=compress,format&rect=0,0,290,290&w=480&h=480",
                                    activeFn: () => console.log("Bucko"),
                                },
                                {
                                    label: "Kitty",
                                    img: "https://sw.kovidgoyal.net/kitty/_static/kitty.svg",
                                    activeFn: () => window.aki.spawn("kitty"),
                                },
                                {
                                    label: "",
                                    img: "",
                                    activeFn: () => console.log("t"),
                                },
                                {
                                    label: "",
                                    img: "",
                                    activeFn: () => console.log("tl"),
                                },
                                {
                                    label: "",
                                    img: "",
                                    activeFn: () => console.log("l"),
                                },
                                {
                                    label: "",
                                    img: "",
                                    activeFn: () => console.log("bl"),
                                },
                                {
                                    label: "",
                                    img: "",
                                    activeFn: () => console.log("b"),
                                },
                                {
                                    label: "",
                                    img: "",
                                    activeFn: () => console.log("br"),
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

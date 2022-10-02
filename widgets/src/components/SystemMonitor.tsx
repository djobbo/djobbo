import { useCPU } from "../hooks/useCPU"
import { useMemory } from "../hooks/useMemory"
import { usePoll } from "../hooks/usePoll"
import { useVolume } from "../hooks/useVolume"
import { Pill } from "./Pill"
import { FaMemory, FaPowerOff, FaHamburger } from "react-icons/fa"
import { HiChip } from "react-icons/hi"
import { useWidgets } from "../providers/WidgetsProvider"

export const SystemMonitor = () => {
    const memory = useMemory()
    const cpu = useCPU()
    const date = usePoll(`date "+%H:%M %b %d, %Y"`, 1000, "")
    const [volume, setVolume] = useVolume()
    const { openWidget } = useWidgets()

    return (
        <div className="flex items-center gap-2 text-sm">
            <Pill className="text-xs gap-2">
                <div className="flex items-center gap-1">
                    <FaMemory
                        className="text-[#E5C07B]"
                        width={14}
                        height={14}
                    />
                    {((1 - memory.free / memory.total) * 100).toFixed(2)}%
                </div>
                <div className="flex items-center gap-1">
                    <HiChip className="text-[#61AFEF]" width={14} height={14} />
                    {(cpu.usage * 100).toFixed(2)}%
                </div>
            </Pill>
            {date}
            <div className="flex items-center gap-1">
                <input
                    type="range"
                    min={0}
                    max={100}
                    step={2}
                    onChange={(e) => setVolume(e.target.valueAsNumber)}
                    value={volume}
                />
                {!isNaN(volume) && (
                    <button onClick={() => setVolume(80)}>{volume}%</button>
                )}
            </div>
            <button
                className="p-2 bg-[#0B102360] rounded-lg hover:text-[#61AFEF]"
                onClick={() => openWidget("power_menu")}
            >
                <FaHamburger width={14} height={14} />
            </button>
            {/* <button
                className="p-2 bg-[#0B102360] rounded-lg hover:text-[#61AFEF]"
                onClick={() => window.aki.exec(`shutdown -h 0`)}
            >
                <FaPowerOff width={14} height={14} />
            </button> */}
        </div>
    )
}

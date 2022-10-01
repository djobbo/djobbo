import { useCPU } from "../hooks/useCPU"
import { useMemory } from "../hooks/useMemory"
import { usePoll } from "../hooks/usePoll"
import { useVolume } from "../hooks/useVolume"
import { CpuIcon, MemoryIcon } from "./Icons"
import { Pill } from "./Pill"

export const SystemMonitor = () => {
    const memory = useMemory()
    const cpu = useCPU()
    const date = usePoll(`date "+%H:%M %b %d, %Y"`, 1000, "")
    const [volume, setVolume] = useVolume()

    return (
        <div className="flex items-center gap-2 text-sm">
            <Pill className="text-xs gap-2">
                <div className="flex items-center gap-1">
                    <MemoryIcon className="text-[#E5C07B]" />
                    {((memory.free / memory.total) * 100).toFixed(2)}%
                </div>
                <div className="flex items-center gap-1">
                    <CpuIcon className="text-[#61AFEF]" />
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
        </div>
    )
}

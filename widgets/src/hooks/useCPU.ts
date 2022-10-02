import { useState } from "react"
import type os from "node:os"
import { useInterval } from "./useInterval"

export const useCPU = () => {
    const [cores, setCores] = useState<os.CpuInfo[]>([])
    const [usage, setUsage] = useState(0)

    useInterval(async () => {
        const cpu = await window.aki.cpu()
        setCores(cpu)
        setUsage(
            cpu.reduce(
                (acc, cpu) =>
                    acc + (cpu.times.user + cpu.times.nice + cpu.times.sys),
                0,
            ) /
                cpu.reduce(
                    (acc, cpu) =>
                        acc +
                        cpu.times.user +
                        cpu.times.nice +
                        cpu.times.sys +
                        cpu.times.idle,
                    0,
                ),
        )
    }, 2500)

    return { cores, usage }
}

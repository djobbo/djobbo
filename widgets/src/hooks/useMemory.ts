import { useState } from "react"
import { useInterval } from "./useInterval"

export const useMemory = () => {
    const [memory, setMemory] = useState({ total: 0, free: 0 })

    useInterval(async () => {
        const memory = await window.aki.memory()
        setMemory(memory)
    }, 2500)

    return memory
}

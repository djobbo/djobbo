import { contextBridge, ipcRenderer } from "electron"
import type os from "os"

const api = {
    listenTo: (command: string) => ipcRenderer.send("listen", command),
    stopListening: (command: string) =>
        ipcRenderer.send("stop-listening", command),
    handleListen: (command: string, callback: (data: string) => void) =>
        ipcRenderer.on(
            `listen-output`,
            (event, listenCommand: string, data: string) => {
                if (listenCommand !== command) return
                callback(data)
            },
        ),
    exec: (command: string): Promise<string> =>
        ipcRenderer.invoke("exec", command),
    cpu: (): Promise<os.CpuInfo[]> => ipcRenderer.invoke("cpu"),
    memory: (): Promise<{ total: number; free: number }> =>
        ipcRenderer.invoke("memory"),
} as const

export type ElectronAPI = typeof api

contextBridge.exposeInMainWorld("aki", api)

import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron"
import type os from "os"

const api = {
    listenTo: (command: string) => {
        ipcRenderer.send("listen", command)

        return () => {
            ipcRenderer.send("stop-listening", command)
        }
    },
    handleListen: (command: string, callback: (data: string) => void) => {
        const handler = (
            event: IpcRendererEvent,
            listenCommand: string,
            data: string,
        ) => {
            if (listenCommand !== command) return
            callback(data)
        }
        ipcRenderer.on(`listen-output`, handler)

        return () => {
            ipcRenderer.off(`listen-output`, handler)
        }
    },
    exec: (command: string): Promise<string> =>
        ipcRenderer.invoke("exec", command),
    cpu: (): Promise<os.CpuInfo[]> => ipcRenderer.invoke("cpu"),
    memory: (): Promise<{ total: number; free: number }> =>
        ipcRenderer.invoke("memory"),
    registerShortcut: (shortcut: Electron.Accelerator) =>
        ipcRenderer.invoke("shortcut:register", shortcut),
    removeShortcut: (shortcut: Electron.Accelerator) =>
        ipcRenderer.invoke("shortcut:remove", shortcut),
    handleShortcut: (shortcut: Electron.Accelerator, callback: () => void) => {
        const handler = (event: IpcRendererEvent, pressedShortcut: string) => {
            if (pressedShortcut !== shortcut) return
            callback()
        }

        ipcRenderer.on("shortcut:pressed", handler)

        return () => {
            ipcRenderer.off("shortcut:pressed", handler)
        }
    },
} as const

export type ElectronAPI = typeof api

contextBridge.exposeInMainWorld("aki", api)

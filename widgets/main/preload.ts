import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron"
import { SpawnOptionsWithoutStdio } from "node:child_process"
import type os from "node:os"

const api = {
    log: (...args: unknown[]) => {
        ipcRenderer.invoke("log", ...args)
    },
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
    spawn: (
        command: string,
        args: string[] = [],
        options: SpawnOptionsWithoutStdio = {
            detached: true,
        },
    ): Promise<string> => ipcRenderer.invoke("spawn", command, args, options),
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
    createWindow: async (
        widgetPath: string,
        options: Electron.BrowserWindowConstructorOptions,
        showDevTools: boolean,
    ) => {
        const id = await ipcRenderer.invoke(
            "window:create",
            widgetPath,
            options,
            showDevTools,
        )

        return () => {
            ipcRenderer.invoke("window:close", id)
        }
    },
    closeWindow: (id: number) => ipcRenderer.invoke("window:close", id),
    getWindowId: () => ipcRenderer.invoke("window:id"),
    closeCurrentWindow: () => ipcRenderer.invoke("window:close-self"),
} as const

export type ElectronAPI = typeof api

contextBridge.exposeInMainWorld("aki", api)

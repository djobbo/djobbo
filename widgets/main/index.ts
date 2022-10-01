import { app, BrowserWindow, ipcMain } from "electron"
import { ChildProcess, exec, execSync } from "node:child_process"
import os from "os"

import path from "path"

const IS_DEV = process.env.IS_IN_DEVELOPMENT || false

const listeners = new Map<string, { child: ChildProcess; count: number }>()

const createWindow = () => {
    const win = new BrowserWindow({
        alwaysOnTop: true,
        frame: false,
        transparent: true,
        focusable: false,
        x: 0,
        y: 0,
        width: 1920,
        height: 48,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js"),
        },
    })

    ipcMain.on("listen", (event, command: string) => {
        const listener = listeners.get(command)

        listener?.child.kill()
        const child = exec(command)
        listeners.set(command, { child, count: (listener?.count ?? 0) + 1 })

        child.stdout?.on("data", (data) => {
            win.webContents.send(
                `listen-output`,
                command,
                data.toString().trim(),
            )
        })

        return () => {
            child.kill()
        }
    })

    ipcMain.on("stop-listening", (event, command: string) => {
        const listener = listeners.get(command)

        if (!listener) return

        listener.count--

        if (listener.count <= 0) {
            listener.child.kill()
            listeners.delete(command)
        }
    })

    ipcMain.handle("exec", (event, command: string) => {
        return execSync(command).toString().trim()
    })

    ipcMain.handle("cpu", () => {
        return os.cpus()
    })

    ipcMain.handle("memory", () => {
        return {
            total: os.totalmem(),
            free: os.freemem(),
        }
    })

    if (IS_DEV) {
        win.loadURL("http://localhost:3000")
        win.webContents.openDevTools({ mode: "detach" })
    } else {
        win.loadURL(
            `file://${path.join(__dirname, "..", "dist", "index.html")}`,
        )
    }
}

app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

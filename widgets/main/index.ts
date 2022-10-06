import {
    app,
    BrowserWindow,
    ipcMain,
    globalShortcut,
    webContents,
} from "electron"
import {
    ChildProcess,
    exec,
    execSync,
    ExecSyncOptionsWithStringEncoding,
    spawn,
    SpawnOptionsWithoutStdio,
} from "node:child_process"
import os from "node:os"
import path from "path"
import { startDaemon } from "./daemon"

const IS_DEV = process.env.IS_IN_DEVELOPMENT || false

const processListeners = new Map<
    string,
    { child: ChildProcess; count: number }
>()

const dispatch = <T extends unknown[]>(channel: string, ...args: T) => {
    webContents.getAllWebContents().forEach((w) => w.send(channel, ...args))
}

const prepare = () => {
    startDaemon()

    ipcMain.handle("log", (event, ...args) => {
        console.log(...args)
    })

    ipcMain.on("listen", (event, command: string) => {
        const listener = processListeners.get(command)

        listener?.child.kill()
        const child = exec(command)
        processListeners.set(command, {
            child,
            count: (listener?.count ?? 0) + 1,
        })

        child.stdout?.on("data", (data) => {
            dispatch(`listen-output`, command, data.toString().trim())
        })
    })

    ipcMain.on("stop-listening", (event, command: string) => {
        const listener = processListeners.get(command)

        if (!listener) return

        listener.count--

        if (listener.count <= 0) {
            listener.child.kill()
            processListeners.delete(command)
        }
    })

    ipcMain.handle(
        "exec",
        (
            event,
            command: string,
            options?: ExecSyncOptionsWithStringEncoding,
        ) => {
            return execSync(command, options).toString().trim()
        },
    )

    ipcMain.handle(
        "spawn",
        (
            event,
            command: string,
            args: string[],
            options?: SpawnOptionsWithoutStdio,
        ) => {
            const subprocess = spawn(command, args, options)
            subprocess.unref()
        },
    )

    ipcMain.handle("cpu", () => {
        return os.cpus()
    })

    ipcMain.handle("memory", () => {
        return {
            total: os.totalmem(),
            free: os.freemem(),
        }
    })

    ipcMain.handle(
        "shortcut:register",
        (event, shortcut: Electron.Accelerator) => {
            globalShortcut.register(shortcut, () => {
                dispatch("shortcut:pressed", shortcut)
            })
        },
    )

    ipcMain.handle(
        "shortcut:remove",
        (event, shortcut: Electron.Accelerator) => {
            globalShortcut.unregister(shortcut)
        },
    )

    ipcMain.handle(
        "window:create",
        (
            event,
            widgetPath: string,
            options: Electron.BrowserWindowConstructorOptions,
            showDevTools: boolean,
        ) => {
            const win = createWindow(widgetPath, options, showDevTools)
            return win.id
        },
    )

    ipcMain.handle("window:close", (event, id: number) => {
        const win = BrowserWindow.fromId(id)
        win?.close()
    })

    ipcMain.handle("window:close-self", (event) => {
        const win = BrowserWindow.fromWebContents(event.sender)
        win?.close()
    })

    ipcMain.handle("window:id", (event) => {
        return event.sender.id
    })

    createWindow("", {
        alwaysOnTop: true,
        frame: false,
        transparent: true,
        focusable: false,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    })
}

const createWindow = (
    widgetPath: string,
    options: Electron.BrowserWindowConstructorOptions = {
        alwaysOnTop: true,
        frame: false,
        transparent: true,
        focusable: false,
        x: 0,
        y: 0,
        width: 1920,
        height: 48,
    },
    showDevTools: boolean = false,
) => {
    const win = new BrowserWindow({
        ...options,
        ...{
            webPreferences: {
                nodeIntegration: true,
                preload: path.join(__dirname, "preload.js"),
            },
        },
    })

    if (IS_DEV) {
        win.loadURL(`http://localhost:1103/${widgetPath}`)

        if (showDevTools) {
            win.webContents.openDevTools({ mode: "detach" })
        }
    } else {
        win.loadURL(
            `file://${path.join(__dirname, "..", "dist", "index.html")}`,
        )
    }

    return win
}

app.whenReady().then(prepare)

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

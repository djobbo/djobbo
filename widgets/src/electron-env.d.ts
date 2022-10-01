import { ElectronAPI } from "../main/preload"

declare global {
    interface Window {
        aki: ElectronAPI
    }
}

import { $ } from "zx"
import { upgradePackages } from "../util/upgrade.js"

export const vscode = async (upgrade?: boolean) => {
    if (upgrade) {
        await upgradePackages()
    }

    $`mkdir -p ~/.aki/.tmp`
    $`wget -O ~/.aki/.tmp/vscode.deb "https://code.visualstudio.com/sha/download?build=stable&os=linux-deb-x64"`
    $`sudo dpkg -i ~/.aki/.tmp/vscode.deb`
}

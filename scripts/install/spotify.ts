import { $ } from "zx"
import {
    logError,
    logH3,
    logH4,
    logSuccess,
    logWarning,
    newLine,
} from "../util/log.js"
import { runWithSpinner } from "../util/runWithSpinner.js"

type Options = {
    installSpicetify?: boolean
}

export const install = async ({ installSpicetify }: Options) => {
    logH3("Spotify")

    try {
        await runWithSpinner(
            async () => {
                await $`curl -sS https://download.spotify.com/debian/pubkey_5E3C45D7B312C643.gpg | sudo apt-key add -`
                await $`echo "deb http://repository.spotify.com stable non-free" | sudo tee /etc/apt/sources.list.d/spotify.list`
            },
            { text: "Downloading Spotify" },
        )
    } catch {
        logError("Failed to download Spotify")
        throw new Error("Failed to download Spotify")
    }

    try {
        await runWithSpinner(
            async () => {
                await $`sudo nala install spotify-client`

                await $`sudo chmod a+wr /usr/share/spotify`
                await $`sudo chmod a+wr /usr/share/spotify/Apps -R`
            },
            { text: "Installing Spotify" },
        )
    } catch (e) {
        if (e.stdout.includes("already at the latest version")) {
            logWarning(
                "Spotify's latest version is already installed, skipping...",
            )
        } else {
            logError("Failed to install Spotify")
            throw new Error("Failed to install Spotify")
        }
    }

    if (!installSpicetify) return

    logH4("Installing spicetify")

    try {
        await runWithSpinner(
            async () => {
                await $`curl -fsSL https://raw.githubusercontent.com/spicetify/spicetify-cli/master/install.sh | sh`
                await $`curl -fsSL https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/resources/install.sh | sh`
            },
            { text: "Installing spicetify" },
        )
        logSuccess("Installed Spicetify")
    } catch (e) {
        console.log(e)
        logError("Failed to install spicetify")
        throw new Error("Failed to install spicetify")
    }

    newLine()
}

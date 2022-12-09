import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import react from "@astrojs/react"
import image from "@astrojs/image"
import partytown from "@astrojs/partytown"
import sitemap from "@astrojs/sitemap"
import compress from "astro-compress"

// https://astro.build/config
export default defineConfig({
    site: "https://djobbo.com",
    integrations: [
        tailwind(),
        react(),
        image({
            serviceEntryPoint: "@astrojs/image/sharp",
        }),
        partytown(),
        sitemap(),
        compress(),
    ],
    vite: {
        ssr: {
            noExternal: ["@radix-ui/react-dropdown-menu", "usehooks-ts"],
        },
    },
})

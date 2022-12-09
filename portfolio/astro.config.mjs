import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import react from "@astrojs/react"
import image from "@astrojs/image"

// https://astro.build/config
export default defineConfig({
    integrations: [
        tailwind(),
        react(),
        image({
            serviceEntryPoint: "@astrojs/image/sharp",
        }),
    ],
    vite: {
        ssr: {
            noExternal: ["@radix-ui/react-dropdown-menu", "usehooks-ts"],
        },
    },
})

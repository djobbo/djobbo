const plugin = require("tailwindcss/plugin")

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                light: "#ffffff",
                lightVar1: "#94999f",

                dark: "#1c232e",
                darkVar1: "#222a36",
                darkVar2: "#29313d",

                accent: "#676cdb",

                branch: "#e2e4e9",
                border: "#e2e4e9",
            },
        },
    },
    plugins: [
        plugin(({ addBase, config }) => {
            addBase({
                html: {
                    color: config("theme.colors.dark"),
                    backgroundColor: config("theme.colors.light"),
                },
                body: {
                    color: config("theme.colors.dark"),
                    backgroundColor: config("theme.colors.light"),
                },
            })
        }),
    ],
}

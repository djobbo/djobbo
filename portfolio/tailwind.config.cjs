/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,svg}"],
    theme: {
        extend: {
            colors: {
                bg: "#F9F9FA",
                bg1: "#FFFFFF",
                bg2: "#F2F2F3",
                text: "#130F1C",
                text1: "#68666E",
                outline: "#DDDDDF",
                logofill: "#8B898F",
                primary: "#5D51DE",
            },
        },
    },
    plugins: [],
}

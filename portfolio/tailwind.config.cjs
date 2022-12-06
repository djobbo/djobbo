/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,svg}"],
    theme: {
        extend: {
            colors: {
                bg: "var(--bg)",
                bg1: "var(--bg1)",
                bg2: "var(--bg2)",
                text: "var(--text)",
                text1: "var(--text1)",
                outline: "var(--outline)",
                logofill: "var(--logofill)",
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                secondaryAlt: "var(--secondaryAlt)",

                "light-bg": "var(--light-bg)",
                "light-bg1": "var(--light-bg1)",
                "light-bg2": "var(--light-bg2)",
                "light-text": "var(--light-text)",
                "light-text1": "var(--light-text1)",
                "light-outline": "var(--light-outline)",
                "light-logofill": "var(--light-logofill)",

                "dark-bg": "var(--dark-bg)",
                "dark-bg1": "var(--dark-bg1)",
                "dark-bg2": "var(--dark-bg2)",
                "dark-text": "var(--dark-text)",
                "dark-text1": "var(--dark-text1)",
                "dark-outline": "var(--dark-outline)",
                "dark-logofill": "var(--dark-logofill)",
            },
        },
    },
    plugins: [],
}

module.exports = {
    plugins: [require.resolve("prettier-plugin-astro")],
    semi: false,
    printWidth: 80,
    trailingComma: "all",
    tabWidth: 4,
    overrides: [
        {
            files: "*.astro",
            options: {
                parser: "astro",
            },
        },
    ],
}

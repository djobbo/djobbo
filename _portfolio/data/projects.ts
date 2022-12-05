export type ProjectData = {
    name: string
    tags: string[]
    description: string
    featured?: boolean
    link?: string
    code?: string
    images: { src: string; alt: string }[]
}

export const projects: ProjectData[] = [
    {
        name: "Corehalla",
        description: "Statistics website for the game Brawlhalla.",
        tags: [
            "React",
            "NextJS",
            "Typescript",
            "TailwindCSS",
            "Supabase",
            "Brawlhalla API",
        ],
        images: [
            {
                src: "/images/projects/Corehalla.jpg",
                alt: "Corehalla",
            },
        ],
        code: "https://github.com/djobbo/corehalla",
        link: "https://dev.corehalla.com",
        featured: true,
    },
    {
        name: "Reaccord",
        description:
            "Custom react renderer for Discord's bot API. Allows you to create interactive bots using the React ecosystem.",
        images: [
            {
                src: "/images/projects/Reaccord.png",
                alt: "Reaccord",
            },
        ],
        tags: ["Typescript", "Discord API", "React", "React Reconciler"],
        code: "https://github.com/djobbo/reaccord",
        link: "https://www.npmjs.com/package/reaccord",
        featured: true,
    },
    {
        name: "Portfolio & Dotfiles",
        description:
            "My Portfolio, Resume and linux configuration files, build scripts and widgets.",
        images: [
            {
                src: "/images/projects/Dotfiles.png",
                alt: "Portfolio & Dotfiles",
            },
        ],
        tags: [
            "React",
            "NextJS",
            "Typescript",
            "TailwindCSS",
            "Playwright",
            "zx",
        ],
        link: "https://djobbo.com",
        code: "https://github.com/djobbo/djobbo",
    },
    {
        name: "Bucko Graphics",
        description: "Website for an upcoming design startup.",
        images: [
            {
                src: "/images/projects/Bucko.png",
                alt: "Bucko Graphics",
            },
        ],
        tags: [
            "React",
            "NextJS",
            "Typescript",
            "SCSS",
            "Prismic CMS",
            "GraphQL",
        ],
        link: "https://bucko.graphics",
    },
]

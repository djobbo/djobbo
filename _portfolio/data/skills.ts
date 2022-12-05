import { IconData } from "../components/IconItem"
import {
    SiHtml5,
    SiCss3,
    SiSass,
    SiTailwindcss,
    SiJavascript,
    SiTypescript,
    SiNodedotjs,
    SiReact,
    SiNextdotjs,
    SiPython,
    SiGit,
    SiFigma,
} from "react-icons/si"

export type SkillData = IconData

export const skills: SkillData[] = [
    {
        title: "HTML",
        Icon: SiHtml5,
    },
    {
        title: "CSS",
        Icon: SiCss3,
    },
    {
        title: "SCSS",
        Icon: SiSass,
    },
    {
        title: "TailwindCSS",
        Icon: SiTailwindcss,
    },
    {
        title: "Javascript",
        Icon: SiJavascript,
    },
    {
        title: "Typescript",
        Icon: SiTypescript,
    },
    {
        title: "Node.JS",
        Icon: SiNodedotjs,
    },
    {
        title: "React",
        Icon: SiReact,
    },
    {
        title: "Next.JS",
        Icon: SiNextdotjs,
    },
    {
        title: "Python",
        Icon: SiPython,
    },
    {
        title: "Git",
        Icon: SiGit,
    },
    {
        title: "Figma",
        Icon: SiFigma,
    },
]

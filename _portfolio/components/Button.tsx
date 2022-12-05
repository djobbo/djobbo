import Link from "next/link"
import { ReactNode } from "react"

const buttonStyles = {
    Primary: `bg-accent fill-light`,
    Secondary: `bg-darkVar2`,
}

type ButtonStyle = keyof typeof buttonStyles

type ButtonProps = {
    children: ReactNode
    style?: ButtonStyle
    href: string
    external?: boolean
}

export const Button = ({
    style = "Secondary",
    href,
    children,
    external = false,
}: ButtonProps) => {
    return (
        <Link href={href}>
            <a
                className={`text-light py-2 px-4 rounded-[0.25rem] font-semibold inline-flex items-center gap-1 ${buttonStyles[style]} hover:translate-y-[-0.15rem]`}
                style={{
                    transition: "0.15s all ease",
                }}
                target={external ? "__blank" : undefined}
            >
                {children}
                {/* TODO: svg children style */}
            </a>
        </Link>
    )
}

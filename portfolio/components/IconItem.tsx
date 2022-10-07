import Link from "next/link"
import { IconBaseProps } from "react-icons"

export type IconData = {
    title: string
    Icon: (props: IconBaseProps) => JSX.Element
    link?: {
        href: string
        external?: boolean
    }
}

type IconItemProps = {
    iconData: IconData
}

const IconContent = ({ iconData }: IconItemProps) => {
    const { title, Icon } = iconData

    return (
        <div className="flex flex-col items-center group">
            <Icon
                size={48}
                className="fill-lightVar1 group-hover:fill-accent group-hover:translate-y-[-0.15rem]"
                style={{
                    transition: "0.15s all ease",
                }}
            />
            <p
                style={{
                    transition: "0.15s all ease",
                }}
                className="text-xs font-semibold text-lightVar1 uppercase mt-3 group-hover:text-accent"
            >
                {title}
            </p>
        </div>
    )
}

export const IconItem = ({ iconData: data }: IconItemProps) => {
    const { link } = data

    if (!link) return <IconContent iconData={data} />

    const { href, external } = link

    return (
        <Link href={href}>
            <a target={external ? "__blank" : undefined}>
                <IconContent iconData={data} />
            </a>
        </Link>
    )
}

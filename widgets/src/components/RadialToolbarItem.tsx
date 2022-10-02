import { ReactNode } from "react"

export type IRadialToolbarItem = {
    label: string
    icon?: ReactNode
    img?: string
    activeFn: () => Promise<unknown> | unknown
}

type Props = IRadialToolbarItem & {
    index: number
    size: number
    menuOpen: boolean
    selected: boolean
}

export const RadialToolbarItem = ({
    index,
    label,
    img,
    icon,
    size,
    menuOpen,
    selected,
}: Props) => {
    const [x, y] = [
        Math.sin((index * Math.PI) / 4) * (menuOpen ? size : 0),
        Math.cos((index * Math.PI) / 4) * (menuOpen ? size : 0),
    ]

    return (
        <div
            className="absolute w-24 h-24"
            style={{
                transition: "0.15s all ease",
                transform: `translate(calc(-50% + ${x}px), calc(-50% - ${y}px))`,
            }}
        >
            <div
                className="w-full h-full bg-[#0B1023AA] rounded-full overflow-hidden"
                style={{
                    transition: "0.15s all ease",
                    border: "1px solid #A8E4FE1F",
                    ...(selected
                        ? {
                              transform: "scale(1.5)",
                              boxShadow: "0 0 1rem #0B102360",
                          }
                        : {}),
                }}
            >
                {img ? (
                    <img
                        src={img}
                        alt={label}
                        className="w-full h-full object-cover object-center"
                    />
                ) : (
                    icon
                )}
            </div>
        </div>
    )
}

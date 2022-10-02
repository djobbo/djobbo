export type IRadialToolbarItem = {
    label: string
    img: string
    activeFn: () => Promise<void> | void
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
    size,
    menuOpen,
    selected,
}: Props) => {
    const [x, y] = [
        Math.cos((index * Math.PI) / 4) * (menuOpen ? size : 0),
        Math.sin((index * Math.PI) / 4) * (menuOpen ? size : 0),
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
                className="w-full h-full bg-[#a11] rounded-full overflow-hidden"
                style={{
                    transition: "0.15s all ease",
                    ...(selected
                        ? {
                              transform: "scale(1.5)",
                              boxShadow: "0 0 2rem rgba(0, 0, 0, 0.16)",
                          }
                        : {}),
                }}
            >
                <img
                    src={img}
                    alt={label}
                    className="w-full h-full object-cover object-center"
                />
            </div>
        </div>
    )
}

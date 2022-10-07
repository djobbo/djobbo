import { IconItem, IconData } from "./IconItem"

type IconGroupProps = {
    icons: IconData[]
    gridConfig?: string
}

export const IconGroup = ({
    icons,
    gridConfig = "gap-y-16 grid-cols-3 sm:grid-cols-4 md:grid-cols-6",
}: IconGroupProps) => {
    return (
        <div className={`w-full grid gap-x-8 ${gridConfig}`}>
            {icons.map((iconData) => (
                <IconItem key={iconData.title} iconData={iconData} />
            ))}
        </div>
    )
}

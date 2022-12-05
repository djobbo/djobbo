import { IconData } from "../IconItem"

type ResumeIconGridProps = {
    icons: IconData[]
}

export const ResumeIconGrid = ({ icons }: ResumeIconGridProps) => (
    <div
        className="grid w-full gap-4"
        style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(128px, 1fr))",
        }}
    >
        {icons.map((icon, i) => (
            <div key={i} className="flex items-center gap-3">
                <icon.Icon size={24} />
                {icon.title}
            </div>
        ))}
    </div>
)

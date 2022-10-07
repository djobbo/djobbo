import { ReactNode } from "react"
import { useScrollSection } from "../providers/ScrollSectionsProvider"

type SectionProps = {
    title?: string
    children: ReactNode
    id: string
    altBackground?: boolean
}

export const Section = ({
    title,
    children,
    id,
    altBackground = false,
}: SectionProps) => {
    const sectionRef = useScrollSection(id)

    return (
        <section
            className={`px-8 py-24 ${altBackground ? "bg-darkVar1" : ""}`}
            id={id}
            ref={sectionRef}
        >
            <div className="max-w-screen-xl mx-auto">
                {title && <h2 className="text-5xl font-bold mb-16">{title}</h2>}
                {children}
            </div>
        </section>
    )
}

import { ReactNode } from "react"

type PillProps = {
    children: ReactNode
    className?: string
}

export const Pill = ({ children, className = "" }: PillProps) => {
    return (
        <div
            className={`flex items-center gap-1 bg-[#0B102360] py-1 px-2 rounded-full ${className}`}
        >
            {children}
        </div>
    )
}

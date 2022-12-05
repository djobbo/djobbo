import { ReactNode } from "react"
import { IconBaseProps } from "react-icons"

type ResumeSectionProps = {
    children: ReactNode
    title: string
    Icon: (props: IconBaseProps) => JSX.Element
}

export const ResumeSection = ({
    children,
    title,
    Icon,
}: ResumeSectionProps) => {
    return (
        <section className="relative ml-4 pt-8 flex flex-col gap-7 z-10 before:content-[''] before:absolute before:-inset-x-0.5 left-[calc(1rem - 2px)] w-1 -z-10 rounded-sm">
            <h2 className="relative text-base font-bold uppercase flex items-center gap-4">
                <div className="relative bg-dark w-8 h-8 flex justify-center items-center rounded-2xl">
                    <Icon
                        size={20}
                        className="fill-transparent stroke-light stroke-[2px] object-cover"
                    />
                </div>
                <svg
                    className="fill-dark"
                    xmlns="http://www.w3.org/2000/svg"
                    width="0.5rem"
                    viewBox="0 0 100 100"
                >
                    <polygon points="86.603, 50 0,0 0, 100" />
                </svg>
                {title}
            </h2>
            {children}
        </section>
    )
}

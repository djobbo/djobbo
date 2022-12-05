import { ReactNode } from "react"

type ResumeSubSectionProps = {
    children?: ReactNode
    title?: ReactNode
}

export const ResumeSubSection = ({
    children,
    title,
}: ResumeSubSectionProps) => (
    <div className="relative font-normal text-sm pl-16">
        <div className="absolute top-0.5 left-0 bg-light w-4 h-4 flex justify-center items-center rounded-2xl border-[4px] border-solid border-dark ml-2">
            {children && (
                <svg
                    viewBox="0 0 42 32"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-transparent stroke-branch stroke-[2px] absolute h-8 top-1/2 left-1/2 z-10"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                >
                    <path d="M0,0 Q0,16 8,16 L32,16 Q42,16 40,32" />
                </svg>
            )}
        </div>
        {title && (
            <h3
                className={`relative font-normal text-inherit ${
                    children ? "mb-4" : "mb-0"
                } before:content-[""] before:bg-dark before:absolute top-[calc(0.625rem - 1px)] left-14 w-12 h-0.5 -z-20`}
            >
                {title}
            </h3>
        )}

        {children && (
            <div
                className={`w-full relative ${
                    title ? "" : "mt-8"
                } before:content-[""] before:absolute before:top-0 before:bottom-0 before:left-[calc(-1rem - 2px)] w-1 bg-branch -z-10 rounded-sm`}
            >
                {children}
            </div>
        )}
    </div>
)

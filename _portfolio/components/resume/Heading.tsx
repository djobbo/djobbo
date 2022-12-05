import { Logo } from "../Logo"

type ResumeHeadingProps = {
    firstname: string
    lastname: string
    titles: string[]
}

export const ResumeHeading = ({
    firstname,
    lastname,
    titles,
}: ResumeHeadingProps) => (
    <header className="mb-4">
        <div className="flex items-center gap-4 mb-3">
            <figure>
                <Logo size={64} />
                <figcaption />
            </figure>
            <div>
                <h1 className="text-5xl font-extralight">{firstname}</h1>
                <p className="text-base font-bold uppercase">{lastname}</p>
            </div>
        </div>
        <div className="flex flex-col items-start gap-1">
            {titles.map((title, i) => (
                <p key={i} className="bg-dark px-4 py-1 uppercase">
                    {title}
                </p>
            ))}
        </div>
    </header>
)

import Link from "next/link"
import { NavLink } from "../data/navigation"
import { Button } from "./Button"
import { useScrollSections } from "../providers/ScrollSectionsProvider"

type HeaderProps = {
    navLinks: NavLink[]
}

export const Header = ({ navLinks }: HeaderProps) => {
    const { currentSection } = useScrollSections()

    return (
        <header className="sticky top-0 bg-darkVar1 z-50 flex justify-between items-center h-20 py-0 px-8">
            <Link href="/#">
                <a>
                    <svg
                        width="32"
                        height="30"
                        viewBox="0 0 32 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.41703 29.6681C-5.69909e-07 29.6681 0 22.2511 0 22.2511V7.60199C0 7.60199 6.77344 1.69418 16.118 6.1346C14.2008 7.90344 12.5224 9.91478 11.1254 12.1177C10.6028 11.7166 10.0062 11.4226 9.36987 11.2523C8.7335 11.082 8.06979 11.0389 7.41674 11.1254V21.2591C7.41674 21.2591 18.1256 0.213938 31.3919 2.25692e-09C31.3922 -0.000298794 12.1694 29.6681 7.41703 29.6681Z"
                            fill="white"
                        />
                        <path
                            d="M22.1917 15.936C23.9716 23.7761 20.3093 26.9497 17.2296 29.6678H11.0597C15.6035 25.8339 19.3807 21.1746 22.1917 15.936Z"
                            fill="white"
                        />
                    </svg>
                </a>
            </Link>
            <nav className="flex items-center font-normal text-lightVar1 gap-10">
                {navLinks.map(({ title, href, id }) => (
                    <Link href={href} key={id}>
                        <a
                            style={{
                                transition: "0.15s all ease",
                            }}
                            // TODO: ::after transition
                            className={`relative after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 bg-transparent hover:text-light ${
                                id === currentSection
                                    ? "text-light after:w-full bg-colors.accent"
                                    : ""
                            }`}
                        >
                            {title}
                        </a>
                    </Link>
                ))}
                {/* <Button href='#contact' style='Primary'>
					Contact me
				</Button> */}
                <Button href="mailto:hi@djobbo.com" style="Primary">
                    Email me
                </Button>
            </nav>
        </header>
    )
}

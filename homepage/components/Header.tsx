import Link from "next/link"

export const Header = () => {
    return (
        <header className="flex justify-between items-center px-8 py-4 w-full">
            <Link href="/">
                <a className="text-4xl font-bold">Aki</a>
            </Link>
            <nav className="flex items-center">
                <Link href="https://reddit.com">
                    <a target="_blank">Reddit</a>
                </Link>
            </nav>
        </header>
    )
}

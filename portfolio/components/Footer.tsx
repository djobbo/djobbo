export const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className="text-center text-xs text-lightVar1">
            Copyright © 2021-{year} - Djobbo-Victor Maïga-Monsallier
        </footer>
    )
}

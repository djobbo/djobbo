export const About = () => {
    return (
        <div
            className="grid gap-16 "
            style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))",
            }}
        >
            <div>
                <p className="flex items-center text-accent">
                    Solution Designer{" "}
                    <span className="flex-1 h-px bg-accent border-0 ml-4" />
                </p>
                <p>
                    I love solving problems and finding clean and simple
                    solutions.
                </p>
            </div>
            <div></div>
        </div>
    )
}

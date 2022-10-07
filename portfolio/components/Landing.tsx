import { Button } from "./Button"
import { TagGroup } from "./TagGroup"
import Link from "next/link"

export const Landing = () => {
    return (
        <div
            className="h-[80vh] grid items-center justify-items-center bg-darkVar1"
            style={{
                gridTemplateColumns: "1fr",
                gridTemplateRows: "1fr 5rem",
                gridTemplateAreas: `'content' 'scroll'`,
            }}
            id="home"
        >
            <svg
                width="484"
                height="451"
                viewBox="0 0 484 451"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    gridArea: "content",
                }}
            >
                <path
                    d="M426.357 25.4957C466.749 56.6807 482.49 122.318 483.381 188.846C484.569 255.671 470.907 323.387 430.515 372.392C389.826 421.694 322.11 452.285 256.473 449.909C191.133 447.83 127.872 412.784 78.2734 363.779C28.9714 314.477 -6.66865 251.216 1.05335 195.677C8.77535 139.841 59.5624 92.0237 108.864 60.5417C158.463 29.3567 206.28 14.8037 263.304 5.89371C320.031 -2.71929 385.668 -5.98629 426.357 25.4957Z"
                    fill="#1C232E"
                />
            </svg>
            <div style={{ gridArea: "content" }}>
                <span className="text-base text-accent font-semibold">
                    {`Hi there 👋, I'm`}
                </span>
                <h1 className="mt-3 mb-5 text-7xl text-light font-bold">
                    Djobbo <span className="text-lightVar1">- Victor</span>
                </h1>
                <span className="text-lg mb-2">
                    I build accessible and visually appealing applications.
                </span>
                <TagGroup tags={["Frontend", "Backend", "UI Design"]} />
                <div className="mt-6 flex items-center gap-4">
                    <Button href="#projects" style="Primary">
                        View my work
                    </Button>
                    <Button href="/resume.pdf" external>
                        Resume
                    </Button>
                </div>
            </div>
            <Link href="#about">
                <a className="text-xs font-semibold text-lightVar1 uppercase">
                    Scroll For More
                </a>
            </Link>
        </div>
    )
}

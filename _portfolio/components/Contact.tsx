import { Button } from "./Button"
import { IconGroup } from "./IconGroup"
import { SiGithub, SiLinkedin, SiGmail } from "react-icons/si"

export const Contact = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="text-center mb-24">
                <p className="mb-4">
                    Want to work with me? Let me know what I can do for you!
                </p>
                <Button href="mailto:hi@djobbo.com" style="Primary">
                    Email me
                </Button>
            </div>
            <IconGroup
                gridConfig="max-w-screen-md grid-cols-3"
                icons={[
                    {
                        title: "/djobbo",
                        Icon: SiGithub,
                        link: {
                            href: "https://github.com/djobbo",
                            external: true,
                        },
                    },
                    {
                        title: "/in/djobbo",
                        Icon: SiLinkedin,
                        link: {
                            href: "https://linkedin.com/in/djobbo",
                            external: true,
                        },
                    },
                    {
                        title: "hi@djobbo.com",
                        Icon: SiGmail,
                        link: {
                            href: "mailto:hi@djobbo.com",
                        },
                    },
                ]}
            />
        </div>
    )
}

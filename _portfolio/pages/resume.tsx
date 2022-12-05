import { ResumeHeading } from "../components/resume/Heading"
import { ResumeIconGrid } from "../components/resume/IconGrid"
import { ResumeSection } from "../components/resume/Section"
import { ResumeSubSection } from "../components/resume/SubSection"
import styles from "~styles/Resume.module.scss"

export default function Home() {
    return (
        <>
            <div className={styles.page}>
                <div>
                    <ResumeHeading
                        firstname="Djobbo-Victor"
                        lastname="Maiga-Monsallier"
                        titles={["Frontend & Backend Development", "UI Design"]}
                    />
                    <ResumeSection title="About me" icon={generalIcons.person}>
                        <ResumeSubSection title="Who am I ?">
                            <p>
                                {`I'm`} a Fullstack developer focusing on
                                Frontend and UI Design. I use NextJS, React,
                                NodeJS and Typescript daily to build visually
                                appealing and accessible applications.
                            </p>
                            <ul>
                                <li>{techIcons.gmail} hi@djobbo.com</li>
                                <li>{generalIcons.globe} djobbo.com</li>
                                <li>{techIcons.github} github.com/djobbo</li>
                                <li>
                                    {techIcons.linkedin} linkedin.com/in/djobbo
                                </li>
                            </ul>
                        </ResumeSubSection>
                    </ResumeSection>
                    <ResumeSection
                        title="Experience"
                        icon={generalIcons.suitcase}
                    >
                        <ResumeSubSection title="Fullstack Developer">
                            <strong>@Corehalla</strong> (since 2019) <br />
                            Statistics and Rankings website for the Fighting
                            Game <strong>Brawlhalla</strong>.
                            <br />
                            <i>
                                <a href="http://corehalla.com" target="_blank">
                                    corehalla.com
                                </a>
                                <br />
                                <a
                                    href="https://neue.corehalla.com"
                                    target="_blank"
                                >
                                    neue.corehalla.com
                                </a>
                            </i>
                            <ul>
                                <li>
                                    Complete website overhaul using React,
                                    NextJS, Typescript, Sass, Framer Motion and
                                    Brawlhalla's REST API.
                                </li>
                                <li>
                                    Use of NodeJS, Typescript and Discord.js to
                                    build a Discord bot.
                                </li>
                            </ul>
                        </ResumeSubSection>
                        <ResumeSubSection title="Freelance Fullstack Developer">
                            <strong>@BuckoGraphics</strong> (since january 2021)
                            <br />
                            Logo Design Startup.
                            <br />
                            <i>
                                <a
                                    href="https://bucko.graphics"
                                    target="_blank"
                                >
                                    bucko.graphics
                                </a>
                            </i>
                            <ul>
                                <li>
                                    Portfolio development with React, NextJS,
                                    Typescript, Sass, Framer Motion, Prismic CMS
                                    and GraphQL.
                                </li>
                            </ul>
                        </ResumeSubSection>
                        <ResumeSubSection title="Freelance Fullstack Developer">
                            Association{" "}
                            <strong>@Brawlhalla French League</strong> (since
                            october 2020)
                            <br />
                            Esport association striving to promote Esport in
                            France.
                            <br />
                            <i>
                                <a
                                    href="https://league.brawl.fr"
                                    target="_blank"
                                >
                                    league.brawl.fr
                                </a>
                            </i>
                            <ul>
                                <li>
                                    Creation of the Association's Blog using
                                    React, NextJS, Typescript, Scss, Contentful
                                    CMS and GraphQL.
                                </li>
                                <li>
                                    Setup of online events and fighting game
                                    tournaments.
                                </li>
                                <li>
                                    Merch Design (Shirts and Esport Jerseys.)
                                </li>
                            </ul>
                        </ResumeSubSection>
                        {/* <ResumeSubSection title='Développeur Freelance'>
							<strong>@Global Breakout</strong> (janvier 2021 -
							avril 2021)
							<ul>
								<li>
									Dévelopement d'une extension pour la
									platforme de streaming Twitch.tv utilisant
									le stack: React, Typescript, NodeJS,
									TwitchAPI.
								</li>
							</ul>
						</ResumeSubSection> */}
                        <ResumeSubSection title="Men's Artistic Gymnastics Coach">
                            <strong>@Étoile Alençonnaise</strong> (2012 - 2016)
                        </ResumeSubSection>
                        <ResumeSubSection
                            title={
                                <>
                                    View more projects on my portfolio:{" "}
                                    <strong>
                                        <a href="https://djobbo.com">
                                            djobbo.com
                                        </a>
                                    </strong>
                                </>
                            }
                        ></ResumeSubSection>
                    </ResumeSection>
                </div>
                <div>
                    <ResumeSection
                        title="My tech stack"
                        icon={generalIcons.code}
                    >
                        <ResumeSubSection title="Languages">
                            <ResumeIconGrid
                                icons={[
                                    { name: "HTML5", icon: techIcons.html },
                                    { name: "CSS3", icon: techIcons.css },
                                    { name: "JavaScript", icon: techIcons.js },
                                    { name: "TypeScript", icon: techIcons.ts },
                                    { name: "SCSS/SASS", icon: techIcons.scss },
                                    { name: "Python", icon: techIcons.py },
                                    { name: "C Sharp", icon: techIcons.cs },
                                    { name: "GraphQL", icon: techIcons.gql },
                                    { name: "Solidity", icon: techIcons.sol },
                                    {
                                        name: "Shopify Liquid",
                                        icon: techIcons.liquid,
                                    },
                                ]}
                            />
                        </ResumeSubSection>
                        <ResumeSubSection title="Libraries / Frameworks">
                            <ResumeIconGrid
                                icons={[
                                    { name: "NodeJS", icon: techIcons.nodejs },
                                    { name: "React", icon: techIcons.react },
                                    { name: "NextJS", icon: techIcons.nextjs },
                                    { name: "Vue", icon: techIcons.vue },
                                    { name: "Svelte", icon: techIcons.svelte },
                                    {
                                        name: "Express",
                                        icon: techIcons.express,
                                    },
                                    {
                                        name: "Styled Components",
                                        icon: techIcons.styledComponents,
                                    },
                                    {
                                        name: "Framer Motion",
                                        icon: techIcons.framerMotion,
                                    },
                                    { name: "Jest", icon: techIcons.jest },
                                    {
                                        name: "Storybook",
                                        icon: techIcons.storybook,
                                    },
                                    { name: "Flask", icon: techIcons.flask },
                                    { name: "Pillow", icon: techIcons.py },
                                ]}
                            />
                        </ResumeSubSection>
                        <ResumeSubSection title="Tools / Software">
                            <ResumeIconGrid
                                icons={[
                                    { name: "VS Code", icon: techIcons.vscode },
                                    { name: "Vim", icon: techIcons.vim },
                                    { name: "Adobe XD", icon: techIcons.xd },
                                    { name: "Figma", icon: techIcons.figma },
                                    {
                                        name: "Adobe Photoshop",
                                        icon: techIcons.photoshop,
                                    },
                                    {
                                        name: "Adobe Illustrator",
                                        icon: techIcons.illustrator,
                                    },
                                    { name: "Markdown", icon: techIcons.md },
                                    { name: "Git", icon: techIcons.git },
                                    { name: "Github", icon: techIcons.github },
                                ]}
                            />
                        </ResumeSubSection>
                    </ResumeSection>
                    <ResumeSection
                        title="Education"
                        icon={generalIcons.gradCap}
                    >
                        <ResumeSubSection
                            title={
                                <>
                                    <strong>Licence Mathématiques</strong>{" "}
                                    @UNICAEN (Currently)
                                </>
                            }
                        />
                        <ResumeSubSection
                            title={
                                <>
                                    <strong>Driver's License</strong> (2017).
                                </>
                            }
                        />
                        <ResumeSubSection
                            title={
                                <>
                                    <strong>Baccalauréat Scientifique</strong>{" "}
                                    (2017).
                                </>
                            }
                        />
                        <ResumeSubSection
                            title={
                                <>
                                    <strong>Diplôme National du Brevet</strong>{" "}
                                    (2014).
                                </>
                            }
                        />
                        <ResumeSubSection
                            title={
                                <>
                                    <strong>
                                        Men's Artistic Gymnastics Judge Diploma
                                    </strong>
                                    (2011).
                                </>
                            }
                        />
                    </ResumeSection>
                    <ResumeSection
                        title="Other skills"
                        icon={generalIcons.puzzle}
                    >
                        <ResumeSubSection title="Languages">
                            <ul>
                                <li>French - Native Language</li>
                                <li>English - Advanced</li>
                                <li>French Sign Language - Beginner</li>
                                <li>German - Beginner</li>
                            </ul>
                        </ResumeSubSection>
                        <ResumeSubSection title="Hobbys">
                            <ul>
                                <li>Guitar</li>
                                <li>Artistic Gymnastics</li>
                                <li>Logo Design</li>
                                <li>Fighting Games</li>
                            </ul>
                        </ResumeSubSection>
                    </ResumeSection>
                </div>
            </div>
            <p className={styles.footer}>
                Resume generated using NextJS, React and Playwright. Source:
                github.com/djobbo/djobbo
            </p>
        </>
    )
}

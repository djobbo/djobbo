import { Header } from "../components/Header"
import { Landing } from "../components/Landing"
import { navLinks } from "../data/navigation"
import { IconGroup } from "../components/IconGroup"
import { skills } from "../data/skills"
import { ProjectGroup } from "../components/ProjectGroup"
import { About } from "../components/About"
import { projects } from "../data/projects"
import Head from "next/head"
import { Section } from "../components/Section"
import { ScrollSectionsProvider } from "../providers/ScrollSectionsProvider"
import { Footer } from "../components/Footer"
import { Contact } from "../components/Contact"
import { NextPage } from "next"

const HomePage: NextPage = () => {
    return (
        <ScrollSectionsProvider defaultSection="home" scrollOffset={120}>
            <Head>
                <title>Djobbo-Victor Maïga-Monsallier</title>
            </Head>
            <div className="bg-dark text-light">
                <Header navLinks={navLinks} />
                <Landing />
                <Section id="about" title="About me">
                    <About />
                </Section>
                <Section title="Skills" id="skills" altBackground>
                    <IconGroup icons={skills} />
                </Section>
                <hr className="w-full h-0.5 max-w-screen-lg mx-auto my-0 border-0" />
                <Section id="projects" title="Projects" altBackground>
                    <ProjectGroup projects={projects} />
                </Section>
                <Section id="contact" title="Contact">
                    <Contact />
                </Section>
                <Section id="footer">
                    <Footer />
                </Section>
            </div>
        </ScrollSectionsProvider>
    )
}

export default HomePage

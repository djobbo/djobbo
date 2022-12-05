import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react"
import { isDefined } from "../helpers/isDefined"

type Section = {
    name: string
    ref: HTMLElement | null
}

type ScrollSectionsContext = {
    addSection: (newSection: Section) => void
    currentSection: string
}

const scrollSectionsContext = createContext<ScrollSectionsContext>({
    addSection: () => () => ({}),
    currentSection: "",
})

export const useScrollSections = () => useContext(scrollSectionsContext)

type ScrollSectionsProviderProps = {
    children: ReactNode
    defaultSection: string
    scrollOffset?: number
}

export const useScrollSection = (name: string) => {
    const { addSection } = useScrollSections()
    const elementRef = useRef<HTMLElement>(null)

    useEffect(() => {
        return addSection({ name, ref: elementRef.current })
    }, [name, addSection])

    return elementRef
}

export const ScrollSectionsProvider = ({
    children,
    defaultSection,
    scrollOffset = 0,
}: ScrollSectionsProviderProps) => {
    const sections = useRef<Section[]>([])
    const [currentSection, setCurrentSection] = useState(defaultSection)

    const addSection = useCallback((newSection: Section) => {
        sections.current.push(newSection)

        return () => {
            sections.current = sections.current.filter(
                (section) => section.name !== newSection.name,
            )
        }
    }, [])

    useEffect(() => {
        const sectionsOffsets = sections.current
            .map(({ name, ref }) => {
                if (!ref) return null
                return {
                    name,
                    offset: ref.offsetTop,
                }
            })
            .filter(isDefined)
            .sort((sectionA, sectionB) => sectionB.offset - sectionA.offset)

        const onScroll = () => {
            const scroll = window.scrollY
            const section = sectionsOffsets.find(
                ({ offset }) => offset < scroll + scrollOffset,
            )

            setCurrentSection(section ? section.name : defaultSection)
        }

        window.addEventListener("scroll", onScroll)

        return () => {
            window.removeEventListener("scroll", onScroll)
        }
    }, [defaultSection, scrollOffset])

    return (
        <scrollSectionsContext.Provider
            value={{
                addSection,
                currentSection,
            }}
        >
            {children}
        </scrollSectionsContext.Provider>
    )
}

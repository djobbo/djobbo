import { useEffect, useRef } from "react"
import { useRive, useStateMachineInput } from "@rive-app/react-canvas"
import { useLocalStorage } from "react-use"

export const ThemeToggleContent = () => {
    const [isNightMode = false, setIsNightMode] = useLocalStorage(
        "isNightMode",
        false,
        {
            raw: false,
            serializer: (value) => value.toString(),
            deserializer: (value) => value === "true",
        },
    )
    const isFirstRender = useRef(true)

    const { rive, RiveComponent } = useRive({
        src: "/theme_toggle.riv",
        stateMachines: "ThemeToggle",
        autoplay: true,
    })

    const isThemeIconNightMode = useStateMachineInput(
        rive,
        "ThemeToggle",
        "isNightMode",
        isNightMode,
    )

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isNightMode)
        const themeWrapper = document.getElementById("theme-wrapper")

        if (isThemeIconNightMode) {
            isThemeIconNightMode.value = isNightMode
        }

        if (!themeWrapper) {
            isFirstRender.current = false
            return
        }

        if (!!isFirstRender.current) {
            themeWrapper.classList.toggle("dark", isNightMode)
            isFirstRender.current = false
            return
        }

        isFirstRender.current = false

        themeWrapper.classList.add("in-transition")

        const clonedThemeWrapper = themeWrapper.cloneNode(true) as HTMLElement
        clonedThemeWrapper.classList.toggle("dark", isNightMode)
        clonedThemeWrapper.classList.add("in-transition")
        clonedThemeWrapper.id = "theme-wrapper-temp"
        clonedThemeWrapper.setAttribute("aria-hidden", "true")
        clonedThemeWrapper
            .querySelectorAll("[id]")
            .forEach((el) => el.removeAttribute("id"))

        themeWrapper.parentNode?.insertBefore(clonedThemeWrapper, themeWrapper)

        let inTransitionTimeout: NodeJS.Timeout

        const timeout = setTimeout(() => {
            themeWrapper.classList.toggle("dark", isNightMode)
            inTransitionTimeout = setTimeout(() => {
                themeWrapper.classList.remove("in-transition")
            }, 15)
            document.documentElement.classList.toggle("dark", isNightMode)
            clonedThemeWrapper.parentNode?.removeChild(clonedThemeWrapper)
        }, 250)

        return () => {
            if (timeout) {
                clearTimeout(timeout)
            }

            if (inTransitionTimeout) {
                clearTimeout(inTransitionTimeout)
            }

            themeWrapper.classList.remove("in-transition")
            clonedThemeWrapper?.parentNode?.removeChild(clonedThemeWrapper)
        }
    }, [isNightMode])

    return (
        <>
            <div
                className={`keep-transition absolute top-0 w-6 h-full py-0.5 px-1 transition-[transform,left] delay-200 flex justify-center items-center`}
                style={
                    isNightMode
                        ? { left: "0", transform: "translateX(0)" }
                        : { left: "100%", transform: "translateX(-100%)" }
                }
            >
                <RiveComponent />
            </div>
            <input
                type="checkbox"
                checked={isNightMode}
                onChange={() => setIsNightMode(!isNightMode)}
                className="opacity-0 absolute w-0 h-0 max-w-0 max-h-0"
            />
        </>
    )
}

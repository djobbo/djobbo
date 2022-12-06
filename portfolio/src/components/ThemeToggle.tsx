import { useEffect, useState } from 'react'

export const ThemeToggle = () => {
    const [isNightMode, setIsNightMode] = useState(false)

    useEffect(() => {

        const themeWrapper = document.getElementById('theme-wrapper')
        
        if (!themeWrapper) return

        themeWrapper.classList.add('in-transition')

        const clonedThemeWrapper = themeWrapper.cloneNode(true) as HTMLElement
        clonedThemeWrapper.classList.toggle('dark', isNightMode)
        clonedThemeWrapper.classList.add('in-transition')
        clonedThemeWrapper.id = 'theme-wrapper-temp'
        clonedThemeWrapper.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'))

        themeWrapper.parentNode?.insertBefore(clonedThemeWrapper, themeWrapper)

        let inTransitionTimeout: NodeJS.Timeout

        const timeout = setTimeout(() => {
            themeWrapper.classList.toggle('dark', isNightMode)
            inTransitionTimeout = setTimeout(() => {
                themeWrapper.classList.remove('in-transition')
            }, 15)
            document.documentElement.classList.toggle('dark', isNightMode)
            clonedThemeWrapper.parentNode?.removeChild(clonedThemeWrapper)
        }, 250)

        return () => {
            if (timeout) {
                clearTimeout(timeout)
            }
            
            if (inTransitionTimeout) {
                clearTimeout(inTransitionTimeout)
            }

            themeWrapper.classList.remove('in-transition')
            clonedThemeWrapper?.parentNode?.removeChild(clonedThemeWrapper)
        }
    }, [isNightMode])

    return <input type="checkbox" checked={isNightMode} onChange={() => setIsNightMode(!isNightMode)} />
}
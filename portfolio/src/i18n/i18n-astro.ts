import type { AstroGlobal } from 'astro'
import { locales, baseLocale } from './i18n-util'
import type { Locales} from './i18n-types'
import L from './i18n-node'

export const getCurrentLocale = (astro: Readonly<AstroGlobal>): Locales => {
    return astro.params.locale && locales.includes(astro.params.locale as Locales)
        ? (astro.params.locale as Locales)
        : baseLocale
}

export const i18n =
    (astro: Readonly<AstroGlobal>) => L[getCurrentLocale(astro)]

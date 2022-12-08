import type { AstroGlobal } from 'astro'
import { locales, baseLocale } from './i18n-util'
import type { Locales, TranslationFunctions} from './i18n-types'
import L from './i18n-node'

export const getCurrentLocale = (astro: Readonly<AstroGlobal>): Locales => {
    return astro.params.locale && locales.includes(astro.params.locale as Locales)
        ? (astro.params.locale as Locales)
        : baseLocale
}

type I18nKey = keyof TranslationFunctions

export const i18n =
    (astro: Readonly<AstroGlobal>) =>
        (key: I18nKey) => L[getCurrentLocale(astro)][key]()


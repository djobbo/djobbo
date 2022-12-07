import type { AstroGlobal } from 'astro'

export const DEFAULT_LOCALE: Locale = "en"

export const locales = ["en", "fr"] as const
export type Locale = typeof locales[number]

export const getCurrentLocale = (astro: Readonly<AstroGlobal>): Locale => {
    return astro.params.locale && locales.includes(astro.params.locale as Locale)
        ? (astro.params.locale as Locale)
        : DEFAULT_LOCALE
}
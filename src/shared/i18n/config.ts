export const locales = ['en', 'es', 'ca', 'it'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

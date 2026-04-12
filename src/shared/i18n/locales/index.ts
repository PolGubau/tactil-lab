import { en } from './en'
import { es } from './es'
import { ca } from './ca'
import { it } from './it'
import type { Locale } from '../config'
import type { Translations } from '../types'

export const translations: Record<Locale, Translations> = { en, es, ca, it }

export function getTranslations(locale: Locale): Translations {
  return translations[locale] ?? translations.en
}

'use client'
import type { ReactNode } from 'react'
import { LocaleContext } from '@/shared/i18n/context'
import type { Locale } from '@/shared/i18n/config'
import type { Translations } from '@/shared/i18n/types'

interface Props {
  locale: Locale
  translations: Translations
  children: ReactNode
}

export default function LocaleProvider({ locale, translations, children }: Props) {
  return (
    <LocaleContext.Provider value={{ locale, t: translations }}>
      {children}
    </LocaleContext.Provider>
  )
}

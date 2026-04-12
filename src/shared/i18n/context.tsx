'use client'
import { createContext, useContext } from 'react'
import type { Locale } from './config'
import type { Translations } from './types'

interface LocaleContextValue {
  locale: Locale
  t: Translations
}

export const LocaleContext = createContext<LocaleContextValue | null>(null)

export function useLocaleContext(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocaleContext must be used within LocaleProvider')
  return ctx
}

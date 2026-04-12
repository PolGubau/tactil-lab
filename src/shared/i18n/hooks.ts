'use client'
import { useLocaleContext } from './context'

export function useTranslation() {
  return useLocaleContext().t
}

export function useLocale() {
  return useLocaleContext().locale
}

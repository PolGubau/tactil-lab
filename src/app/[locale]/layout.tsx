import type { Metadata } from 'next'
import { use } from 'react'
import { Onest } from 'next/font/google'
import '../globals.css'
import { locales, isValidLocale, defaultLocale, type Locale } from '@/shared/i18n/config'
import { getTranslations } from '@/shared/i18n/locales'
import LocaleProvider from '@/components/providers/LocaleProvider'
import LenisProvider from '@/components/providers/LenisProvider'
import Cursor from '@/components/cursor/Cursor'
import Nav from '@/features/nav/Nav'

const onest = Onest({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-onest',
  display: 'swap',
})

interface Props {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale
  const t = getTranslations(validLocale)
  const descriptions: Record<Locale, string> = {
    en: 'We build custom websites that attract more customers. Clean design, clear strategy, real results — based in Barcelona.',
    es: 'Creamos webs personalizadas que atraen más clientes. Diseño limpio, estrategia clara, resultados reales — con base en Barcelona.',
    ca: 'Creem webs personalitzades que atrauen més clients. Disseny net, estratègia clara, resultats reals — amb base a Barcelona.',
    it: 'Creiamo siti web personalizzati che attraggono più clienti. Design pulito, strategia chiara, risultati reali — a Barcellona.',
  }
  return {
    title: { default: 'Tactil — Web Design & Development', template: '%s | Tactil' },
    description: descriptions[validLocale],
    metadataBase: new URL('https://tactil.dev'),
    openGraph: { siteName: 'Tactil', locale: validLocale, type: 'website' },
  }
}

export default function LocaleLayout({ children, params }: Props) {
  const { locale } = use(params)
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale
  const t = getTranslations(validLocale)

  return (
    <html lang={validLocale}>
      <body className={`${onest.variable} grain antialiased`} style={{ fontFamily: 'var(--font-onest), system-ui, sans-serif' }}>
        <LocaleProvider locale={validLocale} translations={t}>
          <LenisProvider>
            <Cursor />
            <Nav />
            {children}
          </LenisProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}

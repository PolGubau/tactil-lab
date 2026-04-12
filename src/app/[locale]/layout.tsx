import type { Metadata } from 'next'
import { Onest } from 'next/font/google'
import { use } from 'react'
import '../globals.css'
import Cursor from '@/components/cursor/Cursor'
import LenisProvider from '@/components/providers/LenisProvider'
import LocaleProvider from '@/components/providers/LocaleProvider'
import Nav from '@/features/nav/Nav'
import { type Locale, defaultLocale, isValidLocale, locales } from '@/shared/i18n/config'
import { getTranslations } from '@/shared/i18n/locales'

const BASE_URL = 'https://tactil.dev'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: 'Tactil',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/og-image.jpg`,
  description: 'Custom web design and development studio based in Barcelona. We build fast, bespoke websites - no templates, no WordPress.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Barcelona',
    addressRegion: 'Catalonia',
    addressCountry: 'ES',
  },
  areaServed: ['ES', 'EU'],
  priceRange: '€€',
  sameAs: [],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Tactil',
  url: BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/en#contact`,
    'query-input': 'required name=search_term_string',
  },
}

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

  const titles: Record<Locale, string> = {
    en: 'Tactil - Web Design & Development Studio · Barcelona',
    es: 'Tactil - Diseño y Desarrollo Web · Barcelona',
    ca: 'Tactil - Disseny i Desenvolupament Web · Barcelona',
    it: 'Tactil - Design e Sviluppo Web · Barcellona',
  }

  const descriptions: Record<Locale, string> = {
    en: 'We build custom websites that attract more customers. Clean design, clear strategy, real results - based in Barcelona.',
    es: 'Creamos webs personalizadas que atraen más clientes. Diseño limpio, estrategia clara, resultados reales - con base en Barcelona.',
    ca: 'Creem webs personalitzades que atrauen més clients. Disseny net, estratègia clara, resultats reals - amb base a Barcelona.',
    it: 'Creiamo siti web personalizzati che attraggono più clienti. Design pulito, strategia chiara, risultati reali - a Barcellona.',
  }

  const languageAlternates: Record<string, string> = {}
  for (const loc of locales) {
    languageAlternates[loc] = `${BASE_URL}/${loc}`
  }
  languageAlternates['x-default'] = `${BASE_URL}/en`

  return {
    title: { default: titles[validLocale], template: '%s | Tactil' },
    description: descriptions[validLocale],
    metadataBase: new URL(BASE_URL),
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: {
      canonical: `${BASE_URL}/${validLocale}`,
      languages: languageAlternates,
    },
    openGraph: {
      siteName: 'Tactil',
      locale: validLocale,
      type: 'website',
      title: titles[validLocale],
      description: descriptions[validLocale],
      url: `${BASE_URL}/${validLocale}`,
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'Tactil - Web Design & Development' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[validLocale],
      description: descriptions[validLocale],
      images: [`${BASE_URL}/og-image.jpg`],
    },
  }
}

export default function LocaleLayout({ children, params }: Props) {
  const { locale } = use(params)
  const validLocale: Locale = isValidLocale(locale) ? locale : defaultLocale
  const t = getTranslations(validLocale)

  return (
    <html lang={validLocale}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </head>
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

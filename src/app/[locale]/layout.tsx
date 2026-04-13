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
  '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
  name: 'Tactil Studio',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/og-image.jpg`,
  description: 'Custom web design and development studio based in Barcelona. Hand-coded websites delivered in 7 days — no templates, no WordPress. 100/100 Google Lighthouse on every project.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Barcelona',
    addressRegion: 'Catalonia',
    addressCountry: 'ES',
  },
  areaServed: [
    { '@type': 'Country', name: 'Spain' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Continent', name: 'Europe' },
  ],
  priceRange: '€€',
  foundingDate: '2022',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 2 },
  sameAs: [],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Tactil Studio',
  url: BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/en#contact`,
    'query-input': 'required name=search_term_string',
  },
}

const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Tactil Studio — Web Design Services',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Service',
        name: 'Landing Page',
        description: 'High-converting single-page website. Custom-coded, delivered in 5–7 days. Includes contact form, hosting, and full SEO setup.',
        provider: { '@type': 'Organization', name: 'Tactil Studio' },
        areaServed: 'Worldwide',
        offers: {
          '@type': 'Offer',
          price: '499',
          priceCurrency: 'EUR',
          priceValidUntil: '2025-12-31',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Service',
        name: 'Business Website',
        description: 'Multi-page professional website (up to 5 pages). Custom-coded, delivered in 2–3 weeks. Includes hosting (1st year) and full SEO setup.',
        provider: { '@type': 'Organization', name: 'Tactil Studio' },
        areaServed: 'Worldwide',
        offers: {
          '@type': 'Offer',
          price: '699',
          priceCurrency: 'EUR',
          priceValidUntil: '2025-12-31',
        },
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Service',
        name: 'Custom Web Development',
        description: 'E-commerce stores, booking systems, and web applications. Fully custom-built to specification with a fixed price and delivery date.',
        provider: { '@type': 'Organization', name: 'Tactil Studio' },
        areaServed: 'Worldwide',
      },
    },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does Tactil do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tactil is a custom web design and development studio based in Barcelona. We build websites from scratch — no templates, no WordPress. Every site is hand-coded for your specific business, from a single landing page to a full e-commerce platform.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does a website take to build?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A landing page is delivered in 5–7 days. A full business website in 2–3 weeks. An online store in 3–4 weeks. You receive a fixed delivery date before we start — no open-ended timelines.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will I own my website after it is built?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — 100% ownership from day one. We hand over all source files, hosting access, and domain control. No lock-in, no recurring fees unless you choose a maintenance plan.',
      },
    },
    {
      '@type': 'Question',
      name: 'What support do I get after launch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every project includes 30 days of free post-launch support. After that, we offer flexible monthly maintenance plans, or you can simply reach out when you need something.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with clients outside Barcelona?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We work with businesses across Spain, Europe, and internationally. The entire process runs remotely — strategy calls, design reviews, and delivery all happen online via video call, email, or WhatsApp.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you use WordPress, Wix, or templates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Never. Every site is built from scratch with custom code. That means faster load times, better security, no plugin conflicts, and a site perfectly tailored to your brand — not constrained by a theme.',
      },
    },
    {
      '@type': 'Question',
      name: 'What Google Lighthouse score do your websites achieve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every website we build achieves a 100/100 score on Google Lighthouse across Performance, SEO, Accessibility, and Best Practices — out of the box, on every project.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I speak to you before committing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — and we encourage it. The first strategy call is completely free with no commitment. We walk you through what you need, what it costs, and how long it takes. No sales pressure.',
      },
    },
  ],
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
    en: 'Tactil Studio · Custom Web Design Barcelona — Delivered in 7 Days',
    es: 'Tactil Studio · Diseño Web a Medida Barcelona — Entregado en 7 Días',
    ca: 'Tactil Studio · Disseny Web a Mida Barcelona — Entregat en 7 Dies',
    it: 'Tactil Studio · Web Design Personalizzato Barcellona — Consegnato in 7 Giorni',
  }

  const descriptions: Record<Locale, string> = {
    en: 'Hand-coded websites from Barcelona. 100/100 Google Lighthouse. Delivered in 7 days. 50+ projects. No templates, no WordPress — fixed price, fixed deadline.',
    es: 'Webs a mano desde Barcelona. 100/100 en Google Lighthouse. Entregadas en 7 días. 50+ proyectos. Sin plantillas, sin WordPress — precio fijo, fecha fija.',
    ca: 'Webs a mà des de Barcelona. 100/100 a Google Lighthouse. Entregades en 7 dies. 50+ projectes. Sense plantilles, sense WordPress — preu fix, data fixa.',
    it: 'Siti web artigianali da Barcellona. 100/100 su Google Lighthouse. Consegnati in 7 giorni. 50+ progetti. Nessun template, nessun WordPress — prezzo fisso, scadenza fissa.',
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
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

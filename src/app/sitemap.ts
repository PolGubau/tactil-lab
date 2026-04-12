import { MetadataRoute } from 'next'
import { locales, type Locale } from '@/shared/i18n/config'

const BASE_URL = 'https://tactil.dev'

const sections = ['', '#services', '#process', '#projects', '#stats', '#pricing', '#faq', '#contact']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    const url = `${BASE_URL}/${locale}`

    const languages: Record<string, string> = {}
    for (const alt of locales) {
      languages[alt] = `${BASE_URL}/${alt}`
    }
    languages['x-default'] = `${BASE_URL}/en`

    entries.push({
      url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: locale === 'en' ? 1.0 : 0.9,
      alternates: { languages },
    })
  }

  return entries
}

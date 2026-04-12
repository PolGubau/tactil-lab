import type { Locale } from '@/shared/i18n/config'

export interface Project {
  id: string
  title: string
  category: string
  color: string
  coverImage: string
  video?: string
  link?: string
  tags: string[]
  summary: Record<Locale, string>
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'novahair',
    title: 'NovaHair',
    category: 'Web App',
    color: '#73c5ff',
    coverImage: '/projects/novahair/landing.webp',
    video: '/projects/novahair/booking-selectors.mp4',
    link: 'https://novahair.polgubau.com',
    tags: ['React', 'TypeScript', 'Booking System'],
    featured: true,
    summary: {
      en: 'Enterprise salon management platform combining an admin panel, embeddable booking widget, and customizable landing pages into one cohesive ecosystem.',
      es: 'Plataforma de gestión de salones de belleza con panel de administración, widget de reservas y páginas personalizables en un solo ecosistema.',
      ca: 'Plataforma de gestió de salons de bellesa amb panell d\'administració, widget de reserves i pàgines personalitzables en un sol ecosistema.',
      it: 'Piattaforma di gestione salone con pannello admin, widget di prenotazione integrabile e landing page personalizzabili in un unico ecosistema.',
    },
  },
  {
    id: 'acetate',
    title: 'Acetate',
    category: 'E-commerce',
    color: '#c8ff00',
    coverImage: '/projects/acetate/landing.webp',
    link: 'https://www.acetatedubplates.com/',
    tags: ['React', 'Stripe', 'E-commerce'],
    featured: true,
    summary: {
      en: 'B2C ecommerce for custom vinyl manufacturing. DJs and musicians order small-batch or large-volume records with complete Stripe payment orchestration.',
      es: 'Ecommerce B2C para fabricación de vinilos personalizados. DJs y músicos piden discos con sistema completo de pagos con Stripe.',
      ca: 'Ecommerce B2C per a fabricació de vinils personalitzats. DJs i músics comanden discos amb sistema complet de pagaments amb Stripe.',
      it: 'Ecommerce B2C per la produzione di vinili personalizzati. DJ e musicisti ordinano dischi con orchestrazione completa dei pagamenti con Stripe.',
    },
  },
  {
    id: 'flatmatch',
    title: 'Flatmatch',
    category: 'Web Platform',
    color: '#ff4d00',
    coverImage: '/projects/flatmatch/0.png',
    tags: ['React', 'UX', 'Housing Platform'],
    featured: true,
    summary: {
      en: 'Tinder-like housing platform revolutionizing temporary accommodation search for students and young professionals. 500+ users in 3 months.',
      es: 'Plataforma de alojamiento tipo Tinder que revoluciona la búsqueda de alojamiento temporal. 500+ usuarios en 3 meses sin inversión en marketing.',
      ca: 'Plataforma d\'allotjament tipus Tinder que revoluciona la cerca d\'allotjament temporal. 500+ usuaris en 3 mesos sense inversió en màrqueting.',
      it: 'Piattaforma tipo Tinder che rivoluziona la ricerca di alloggi temporanei per studenti e giovani professionisti. 500+ utenti in 3 mesi.',
    },
  },
]

export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured)
}

export function getProjectSummary(project: Project, locale: Locale): string {
  return project.summary[locale] ?? project.summary.en
}

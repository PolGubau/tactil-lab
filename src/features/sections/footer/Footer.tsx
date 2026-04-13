'use client'
import { useTranslation } from '@/shared/i18n/hooks'

export default function Footer() {
  const t = useTranslation()

  const links = [
    { label: 'Projects', href: '#projects' }, { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' }, { label: 'Contact', href: '#contact' },
  ]

  return (<div className='bg-accent'>
    <div className="h-[5vw] rounded-b-full bg-canvas" >
    </div>
    <footer
      className="bg-accent"
      style={{ padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,5rem) clamp(2rem,4vw,3rem)' }}
    >
      <div className='max-w-7xl mx-auto'>
        <div className='grid md:grid-cols-2 gap-10 items-end mb-14'>
          <div>
            <span className='text-2xl font-black tracking-tight block mb-3 text-ink'>Tactil</span>
            <p className='text-2xl md:text-3xl font-black leading-[1.1] max-w-md tracking-tight text-ink'>
              {t.footer_tagline}
            </p>
          </div>
          <div className='flex flex-col gap-4 md:items-end'>
            <a
              href='#contact'
              className='inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm tracking-wide transition-all duration-200 bg-ink text-accent hover:opacity-80'
            >
              {t.cta_primary}
            </a>
          </div>
        </div>

        <div className='pt-7 border-t border-ink/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
          <span className='text-xs text-ink/60'>{t.footer_copyright}</span>
          <nav className='flex gap-5'>
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                className='text-xs tracking-[0.18em] uppercase font-medium text-ink/70 transition-colors duration-200 hover:text-ink'
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  </div>
  )
}

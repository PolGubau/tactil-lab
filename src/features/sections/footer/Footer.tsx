'use client'
import { useTranslation } from '@/shared/i18n/hooks'

export default function Footer() {
  const t = useTranslation()

  const links = [
    { label: 'Projects', href: '#projects' }, { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' }, { label: 'Contact', href: '#contact' },
  ]

  return (
    <footer className='border-t' style={{ borderColor: 'var(--border-soft)', padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,5rem) clamp(2rem,4vw,3rem)' }}>
      <div className='max-w-7xl mx-auto'>
        <div className='grid md:grid-cols-2 gap-10 items-end mb-14'>
          <div>
            <span className='text-2xl font-black tracking-tight block mb-3' style={{ color: 'var(--fg)' }}>Tactil</span>
            <p className='text-2xl md:text-3xl font-black leading-[1.1] max-w-md tracking-tight'>{t.footer_tagline}</p>
          </div>
          <div className='flex flex-col gap-4 md:items-end'>
            <a href='#contact' className='btn-primary'>{t.cta_primary}</a>
          </div>
        </div>

        <div className='pt-7 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-4' style={{ borderColor: 'var(--border-soft)' }}>
          <span className='text-xs' style={{ color: 'var(--fg-subtle)' }}>{t.footer_copyright}</span>
          <nav className='flex gap-5'>
            {links.map(link => (
              <a key={link.href} href={link.href}
                className='text-xs tracking-[0.18em] uppercase font-medium transition-colors duration-200'
                style={{ color: 'var(--fg-muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg-muted)')}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}

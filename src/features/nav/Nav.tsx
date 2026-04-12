'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { useTranslation, useLocale } from '@/shared/i18n/hooks'
import { locales, type Locale } from '@/shared/i18n/config'
import { useRouter, usePathname } from 'next/navigation'

const LOCALE_LABELS: Record<Locale, string> = { en: 'EN', es: 'ES', ca: 'CA', it: 'IT' }

export default function Nav() {
  const t = useTranslation()
  const locale = useLocale()
  const navRef = useRef<HTMLElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.4, ease: 'power4.out' })
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      if (progressRef.current) {
        const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
        progressRef.current.style.transform = `scaleX(${Math.min(pct, 1)})`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return
    if (menuOpen) {
      overlay.style.pointerEvents = 'auto'
      gsap.timeline()
        .set(overlay, { display: 'flex' })
        .fromTo(overlay, { clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' },
          { clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)', duration: 0.7, ease: 'power4.inOut' })
        .fromTo('[data-menu-link]', { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out' }, '-=0.3')
        .fromTo('[data-menu-footer]', { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.1')
    } else {
      overlay.style.pointerEvents = 'none'
      gsap.to(overlay, {
        clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)',
        duration: 0.55, ease: 'power4.inOut',
        onComplete: () => { overlay.style.display = 'none' },
      })
    }
  }, [menuOpen])

  const switchLocale = useCallback((newLocale: Locale) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/') || `/${newLocale}`)
  }, [pathname, router])

  const links = [
    { label: t.nav_projects, href: '#projects' },
    { label: t.nav_prices, href: '#pricing' },
    { label: t.nav_contact, href: '#contact' },
  ]

  return (
    <>
      <div ref={progressRef} className='scroll-progress' style={{ transform: 'scaleX(0)' }} />

      <nav
        ref={navRef}
        className='fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 lg:px-20 py-5 flex items-center justify-between transition-all duration-500'
        style={{
          background: scrolled ? 'rgba(247,244,239,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-soft)' : '1px solid transparent',
        }}
      >
        <a href={`/${locale}`} className='text-xl font-black tracking-tight transition-opacity duration-300 hover:opacity-60' style={{ color: 'var(--fg)' }}>
          Tactil
        </a>

        <div className='hidden md:flex items-center gap-8'>
          {links.map(link => (
            <a key={link.href} href={link.href}
              className='group relative text-xs tracking-[0.18em] uppercase font-medium transition-colors duration-300'
              style={{ color: 'var(--fg-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg-muted)')}>
              {link.label}
              <span className='absolute -bottom-0.5 left-0 h-px w-0 bg-[var(--accent)] transition-all duration-300 group-hover:w-full' />
            </a>
          ))}
        </div>

        <div className='flex items-center gap-3'>
          <div className='hidden md:flex items-center gap-0.5 rounded-full border px-1.5 py-1' style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
            {locales.map(loc => (
              <button key={loc} onClick={() => switchLocale(loc)}
                className='text-[10px] px-2.5 py-1 rounded-full font-semibold tracking-widest uppercase transition-all duration-200'
                style={{ background: loc === locale ? 'var(--accent)' : 'transparent', color: loc === locale ? '#fff' : 'var(--fg-muted)' }}>
                {LOCALE_LABELS[loc]}
              </button>
            ))}
          </div>

          <a href='#contact' className='btn-primary hidden md:inline-flex text-xs'>
            {t.cta_primary}
          </a>

          <button onClick={() => setMenuOpen(v => !v)}
            className='md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-full transition-colors duration-200'
            style={{ background: menuOpen ? 'var(--accent)' : 'var(--bg-subtle)' }}
            aria-label='Toggle menu'>
            <span className='w-4 h-px block transition-all duration-300'
              style={{ background: menuOpen ? '#fff' : 'var(--fg)', transform: menuOpen ? 'rotate(45deg) translate(1px, 3px)' : 'none' }} />
            <span className='w-4 h-px block transition-all duration-300'
              style={{ background: menuOpen ? '#fff' : 'var(--fg)', opacity: menuOpen ? 0 : 1 }} />
            <span className='w-4 h-px block transition-all duration-300'
              style={{ background: menuOpen ? '#fff' : 'var(--fg)', transform: menuOpen ? 'rotate(-45deg) translate(1px, -3px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Full-screen overlay */}
      <div ref={overlayRef} style={{ display: 'none', position: 'fixed', inset: 0, zIndex: 99, background: 'var(--fg)', clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)', flexDirection: 'column', justifyContent: 'center', padding: '6rem 2rem 3rem', pointerEvents: 'none' }}>
        <nav className='flex flex-col gap-1 mb-12'>
          {links.map(link => (
            <a key={link.href} href={link.href} data-menu-link onClick={() => setMenuOpen(false)}
              className='text-[clamp(2.5rem,10vw,5rem)] font-black leading-none tracking-tight transition-colors duration-200'
              style={{ color: 'var(--bg)', opacity: 0 }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--bg)')}>
              {link.label}
            </a>
          ))}
        </nav>
        <div data-menu-footer className='border-t pt-6 flex items-center justify-between' style={{ borderColor: 'rgba(247,244,239,0.12)', opacity: 0 }}>
          <a href='#contact' onClick={() => setMenuOpen(false)} className='btn-primary'>
            {t.cta_primary}
          </a>
          <div className='flex gap-2'>
            {locales.map(loc => (
              <button key={loc} onClick={() => { switchLocale(loc); setMenuOpen(false) }}
                className='text-xs px-3 py-1.5 rounded-full font-semibold tracking-widest uppercase transition-all duration-200'
                style={{ background: loc === locale ? 'var(--accent)' : 'rgba(247,244,239,0.12)', color: loc === locale ? '#fff' : 'var(--bg)' }}>
                {LOCALE_LABELS[loc]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

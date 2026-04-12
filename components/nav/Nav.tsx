
'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { CONTENT } from '@/lib/content'

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Initial reveal
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: 'power3.out' }
    )

    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className='fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20 py-5 flex items-center justify-between transition-all duration-500'
      style={{
        background: scrolled ? 'rgba(8,8,8,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <a href='/' className='text-lg font-black tracking-tight hover:text-[var(--accent)] transition-colors'>
        {CONTENT.brand}
      </a>

      <div className='hidden md:flex items-center gap-10'>
        {[
          { label: 'Work', href: '#features' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'FAQ', href: '#faq' },
        ].map(link => (
          <a key={link.href} href={link.href}
            className='text-xs tracking-[0.2em] uppercase text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors'>
            {link.label}
          </a>
        ))}
      </div>

      <a
        href='#contact'
        className='text-xs tracking-[0.2em] uppercase px-5 py-3 font-bold transition-all duration-300 hover:gap-3'
        style={{ background: 'var(--accent)', color: 'var(--bg)' }}
      >
        {CONTENT.hero.cta_primary}
      </a>
    </nav>
  )
}

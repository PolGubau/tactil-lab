'use client'
import { useTranslation } from '@/shared/i18n/hooks'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight } from 'lucide-react'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const t = useTranslation()
  const footerRef = useRef<HTMLDivElement>(null)

  const links = [
    { label: 'Projects', href: '#projects' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ]

  const taglineWords = t.footer_tagline.split(' ')

  useEffect(() => {
    if (!footerRef.current) return
    const ctx = gsap.context(() => {
      gsap.set('[data-f-word]', { y: '110%' })
      gsap.set('[data-f-brand]', { opacity: 0, y: 20 })
      gsap.set('[data-f-cta]', { opacity: 0, y: 16 })
      gsap.set('[data-f-bottom]', { opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
      })
      tl.to('[data-f-brand]', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0)
      tl.to('[data-f-word]', { y: '0%', duration: 0.85, stagger: 0.055, ease: 'power4.out' }, 0.1)
      tl.to('[data-f-cta]', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.55)
      tl.to('[data-f-bottom]', { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.8)
    }, footerRef)
    return () => ctx.revert()
  }, [t])

  return (
    <div ref={footerRef} className='bg-accent'>
      <footer className="bg-accent" style={{ padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,5rem) clamp(2rem,4vw,3rem)' }}>
        <div className='max-w-7xl mx-auto'>
          <div className='grid md:grid-cols-2 gap-10 items-end mb-14'>
            <div>
              <span data-f-brand className='text-2xl font-black tracking-tight block mb-3 text-ink opacity-0'>Tactil</span>
              <p className='text-2xl md:text-3xl font-black leading-[1.1] max-w-md tracking-tight text-ink'>
                <span className='flex flex-wrap gap-x-[0.22em]'>
                  {taglineWords.map((word, i) => (
                    <span key={i} className='overflow-hidden inline-block pb-[0.1em] mb-[-0.1em]'>
                      <span data-f-word className='inline-block text-ink leading-none'>{word}</span>
                    </span>
                  ))}
                </span>
              </p>
            </div>
            <div data-f-cta className='flex flex-col gap-4 md:items-end opacity-0'>
              <a
                href='#contact'
                className='inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm tracking-wide transition-all duration-200 bg-ink text-accent hover:opacity-80 w-fit'
              >
                {t.cta_primary}
                <ChevronRight size={18} />
              </a>
            </div>
          </div>
          <div data-f-bottom className='pt-7 border-t border-ink/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 opacity-0'>
            <span className='text-xs text-ink/60'>{t.footer_copyright}</span>
            <nav className='flex gap-5'>
              {links.map(link => (
                <a key={link.href} href={link.href} className='text-xs tracking-[0.18em] uppercase font-medium text-ink/70 transition-colors duration-200 hover:text-ink'>
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

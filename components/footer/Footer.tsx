
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CONTENT } from '@/lib/content'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null)
  const bigTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = bigTextRef.current?.querySelectorAll('.word-inner') ?? []
      gsap.fromTo(words,
        { y: '100%', opacity: 0 },
        {
          y: '0%', opacity: 1, duration: 1, stagger: 0.04, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const bigText = 'If your business exists, it deserves a great website.'.split(' ')

  return (
    <footer ref={sectionRef} className='py-20 px-6 md:px-12 lg:px-20 border-t' style={{ borderColor: 'var(--border)' }}>
      <div className='max-w-7xl mx-auto'>
        <div ref={bigTextRef} className='text-3xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-20'>
          {bigText.map((word, i) => (
            <span key={i} className='inline-block overflow-hidden mr-[0.3em]'>
              <span className='word-inner inline-block'>{word}</span>
            </span>
          ))}
        </div>

        <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-t pt-8' style={{ borderColor: 'var(--border)' }}>
          <div>
            <div className='text-2xl font-black mb-1'>{CONTENT.brand}</div>
            <div className='text-xs text-[var(--fg-muted)] tracking-[0.2em] uppercase'>Web Design & Development</div>
          </div>

          <nav className='flex flex-wrap gap-8'>
            {[
              { label: 'Features', href: '#features' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'FAQ', href: '#faq' },
              { label: 'Contact', href: '#contact' },
            ].map(link => (
              <a key={link.href} href={link.href}
                className='text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors tracking-wider uppercase text-xs'>
                {link.label}
              </a>
            ))}
          </nav>

          <div className='text-xs text-[var(--fg-muted)] tracking-wider'>
            2024 Tactil. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

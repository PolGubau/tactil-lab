'use client'
import { useTranslation } from '@/shared/i18n/hooks'
import gsap from 'gsap'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

// Filmstrip — duplicated for seamless infinite loop
const STRIP = [
  { src: '/projects/novahair/landing.webp', label: 'Nova Hair' },
  { src: '/projects/acetate/landing.webp', label: 'Acetate' },
  { src: '/projects/flatmatch/0.webp', label: 'Flatmatch' },
]

export default function Hero() {
  const t = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  const titleWords = t.hero_title.split(' ')
  const accentWords = t.hero_accent.split(' ')

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.12 })

      // Word-by-word rise — the Awwwards signature move
      tl.fromTo('[data-h-word]',
        { y: '108%' },
        { y: '0%', duration: 1, stagger: 0.06, ease: 'power4.out' },
        0.2
      )

      // Desc + CTAs
      tl.fromTo('[data-h-desc]', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 1.05)
      tl.fromTo('[data-h-cta]', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 1.2)

      // Divider + filmstrip
      tl.fromTo('[data-h-divider]', { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power3.inOut' }, 0.85)
      tl.fromTo('[data-h-strip]', { opacity: 0 }, { opacity: 1, duration: 0.7 }, 1.1)
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className='relative min-h-dvh flex flex-col overflow-hidden bg-canvas'
    >
      {/* Subtle dot grid texture */}
      <div
        className='pointer-events-none absolute inset-0'
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(26,23,20,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Giant editorial headline ────────────────────────── */}
      {/* pt clears the fixed nav (~80px) + breathing room */}
      <div className='relative z-20 flex-1 flex flex-col justify-center px-6 md:px-12 pt-28 pb-6 max-w-7xl mx-auto w-full'>
        <h1
          className='font-black leading-[0.88] tracking-tight mb-10 md:mb-14'
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 7rem)', letterSpacing: '-0.04em' }}
        >
          {/* Line 1 — main title words */}
          <span className='flex flex-wrap gap-x-[0.22em]'>
            {titleWords.map((word, i) => (
              <span key={`t-${i}-${word}`} className='overflow-hidden inline-block pb-[0.15em] mb-[-0.15em]'>
                <span data-h-word className='inline-block text-ink leading-none'>
                  {word}
                </span>
              </span>
            ))}
          </span>
          {/* Line 2 — accent words (lime) */}
          <span className='flex flex-wrap gap-x-[0.22em] mt-1'>
            {accentWords.map((word, i) => (
              <span key={`a-${i}-${word}`} className='overflow-hidden inline-block pb-[0.15em] mb-[-0.15em]'>
                <span data-h-word className='inline-block text-accent leading-none'>
                  {word}
                </span>
              </span>
            ))}
          </span>
        </h1>

        {/* Desc + CTAs row */}
        <div className='flex flex-col md:flex-row md:items-end gap-8 md:gap-16 max-w-6xl'>
          <p
            data-h-desc
            className='text-base md:text-lg leading-relaxed max-w-xs text-muted opacity-0'
          >
            {t.hero_description}
          </p>
          <div data-h-cta className='flex flex-wrap items-center gap-4 opacity-0 md:ml-auto'>
            <a href='#contact' className='btn-primary'>
              {t.cta_primary}
              <svg width='13' height='13' viewBox='0 0 14 14' fill='none' aria-hidden='true'>
                <path d='M2 7h10M8 3l4 4-4 4' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
              </svg>
            </a>
            <a href='#projects' className='btn-ghost'>{t.cta_secondary}</a>
          </div>
        </div>
      </div>

      {/* ── Filmstrip divider ───────────────────────────────── */}
      <div
        data-h-divider
        className='relative z-20 h-px mx-6 md:mx-12 mb-5 origin-left'
        style={{ background: 'var(--border-soft)' }}
      />

      {/* ── Infinite filmstrip ──────────────────────────────── */}
      <div data-h-strip className='relative z-20 overflow-hidden pb-8 opacity-0'>
        {/* Edge fade masks */}
        <div
          className='pointer-events-none absolute inset-y-0 left-0 z-10 w-24'
          style={{ background: 'linear-gradient(to right, var(--bg) 0%, transparent 100%)' }}
        />
        <div
          className='pointer-events-none absolute inset-y-0 right-0 z-10 w-24'
          style={{ background: 'linear-gradient(to left, var(--bg) 0%, transparent 100%)' }}
        />

        {/* Track — duplicated for seamless loop */}
        <div className='flex gap-4 w-max' style={{ animation: 'filmstrip 18s linear infinite' }}>
          {[...STRIP, ...STRIP, ...STRIP].map((item, i) => (
            <div
              key={`${item.label}-${i}`}
              className='relative shrink-0 rounded-2xl overflow-hidden'
              style={{
                width: 'clamp(200px, 22vw, 340px)',
                height: 'clamp(130px, 14vw, 220px)',
                boxShadow: '0 4px 24px rgba(26,23,20,0.10), 0 0 0 1px rgba(26,23,20,0.06)',
              }}
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                className='object-cover object-top'
                sizes='22vw'
              />
              {/* Bottom gradient + label */}
              <div
                className='absolute inset-0'
                style={{ background: 'linear-gradient(to bottom, transparent 45%, rgba(26,23,20,0.65) 100%)' }}
              />
              <span
                className='absolute bottom-2.5 left-3 text-[9px] tracking-widest uppercase font-bold px-2.5 py-1 rounded-full'
                style={{
                  background: 'rgba(26,23,20,0.7)',
                  backdropFilter: 'blur(8px)',
                  color: '#c4eb36',
                  border: '1px solid rgba(196,235,54,0.2)',
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes filmstrip {
          from { transform: translateX(0) }
          to   { transform: translateX(calc(-100% / 3)) }
        }
      `}</style>
    </section>
  )
}

'use client'
import { useTranslation } from '@/shared/i18n/hooks'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

function useMagnetic(ref: React.RefObject<HTMLElement | null>, strength = 0.35) {
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength
      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' })
    }
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' })
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [ref, strength])
}

export default function Hero() {
  const t = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const btnPrimaryRef = useRef<HTMLAnchorElement>(null)
  const btnGhostRef = useRef<HTMLAnchorElement>(null)

  useMagnetic(btnPrimaryRef)
  useMagnetic(btnGhostRef, 0.22)

  const titleWords = t.hero_title.split(' ')
  const accentWords = t.hero_accent.split(' ')

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.set('[data-h-word]', { y: '108%' })
      gsap.set('[data-h-eyebrow]', { opacity: 0, y: 12 })
      gsap.set('[data-h-desc]', { opacity: 0, y: 18 })
      gsap.set('[data-h-cta]', { opacity: 0, y: 12 })

      gsap.to('[data-h-bar]', { scaleX: 1, duration: 0.42, ease: 'power2.inOut' })
      gsap.to('[data-h-loader]', {
        opacity: 0, duration: 0.55, delay: 0.38, ease: 'power2.out',
        onComplete: () => { gsap.set('[data-h-loader]', { display: 'none' }) },
      })

      const tl = gsap.timeline({ delay: 0.48 })
      tl.to('[data-h-eyebrow]', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0)
      tl.to('[data-h-word]', { y: '0%', duration: 1, stagger: 0.055, ease: 'power4.out' }, 0.08)
      tl.to('[data-h-desc]', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.85)
      tl.to('[data-h-cta]', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.98)

      gsap.matchMedia().add('(min-width: 1024px)', () => {
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=90%',
            pin: true,
            scrub: 1.3,
            anticipatePin: 1,
          },
        })
          .fromTo('[data-h-expand]',
            { clipPath: 'inset(4% 4% 4% 54% round 24px)' },
            { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power1.inOut' }, 0)
          .to('[data-h-left]', { opacity: 0, x: -48, ease: 'power2.in' }, 0)
          .fromTo('[data-h-veil]', { opacity: 0 }, { opacity: 0.52, ease: 'none' }, 0)
          .fromTo('[data-h-label]', { opacity: 0, y: 22 }, { opacity: 1, y: 0, ease: 'power3.out' }, 0.62)
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className='relative overflow-hidden bg-canvas' style={{ height: '100dvh' }}>
      {/* LOADER */}
      <div data-h-loader className='absolute inset-0 z-50 bg-canvas flex flex-col justify-end pb-10 px-8 pointer-events-none' aria-hidden='true'>
        <div className='w-full h-px bg-edge overflow-hidden'>
          <div data-h-bar className='h-full bg-accent origin-left' style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>

      {/* Dot grid */}
      <div className='pointer-events-none absolute inset-0 z-0'
        style={{ backgroundImage: 'radial-gradient(circle, rgba(26,23,20,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* VIDEO EXPAND */}
      <div data-h-expand className='absolute inset-0 z-10 hidden lg:block' style={{ clipPath: 'inset(4% 4% 4% 54% round 24px)' }}>
        <video src='/media/hero.mp4' autoPlay muted loop playsInline className='w-full h-full object-cover' />
        <div data-h-veil className='absolute inset-0 bg-ink opacity-0' />
        <div data-h-label className='absolute bottom-10 left-10 right-10 opacity-0 z-10'>
          <span className='block text-[10px] tracking-[0.28em] uppercase mb-3 text-canvas/50'>Tactil Studio · Barcelona</span>
          <p className='font-black text-canvas leading-[0.9]' style={{ fontSize: 'clamp(1.8rem, 3.2vw, 4rem)' }}>
            {t.hero_title} <span className='text-accent'>{t.hero_accent}</span>
          </p>
        </div>
      </div>

      {/* TEXT COLUMN */}
      <div data-h-left className='relative z-20 flex items-center w-full h-full px-6 md:px-12' style={{ paddingTop: '88px' }}>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 w-full max-w-7xl mx-auto items-center'>
          <div>
            <div data-h-eyebrow className='opacity-0 flex items-center gap-3 mb-7'>
              <span className='text-[10px] tracking-[0.22em] uppercase font-bold px-3 py-1.5 rounded-full bg-accent text-ink'>Studio</span>
              <span className='text-[11px] text-muted tracking-wide'>Barcelona · Est. 2026</span>
            </div>

            <h1 className='font-black leading-[0.88] mb-8 md:mb-10 text-balance' style={{ fontSize: 'clamp(2.4rem, 4.8vw, 6.5rem)', letterSpacing: '-0.04em' }}>
              <span className='flex flex-wrap gap-x-[0.22em]'>
                {titleWords.map((word, i) => (
                  <span key={`t-${i}`} className='overflow-hidden inline-block pb-[0.15em] mb-[-0.15em]'>
                    <span data-h-word className='inline-block text-ink leading-none'>{word}</span>
                  </span>
                ))}
              </span>
              <span className='flex flex-wrap gap-x-[0.22em] mt-1'>
                {accentWords.map((word, i) => (
                  <span key={`a-${i}`} className='overflow-hidden inline-block pb-[0.15em] mb-[-0.15em]'>
                    <span data-h-word className='inline-block text-accent leading-none'>{word}</span>
                  </span>
                ))}
              </span>
            </h1>

            <p data-h-desc className='text-base md:text-lg leading-relaxed text-muted opacity-0 mb-8 max-w-sm text-pretty'>
              {t.hero_description}
            </p>

            <div data-h-cta className='flex flex-wrap items-center gap-4 opacity-0'>
              <a ref={btnPrimaryRef} href='#contact' className='btn-primary'>
                {t.cta_primary}
                <svg width='13' height='13' viewBox='0 0 14 14' fill='none' aria-hidden='true'>
                  <path d='M2 7h10M8 3l4 4-4 4' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
                </svg>
              </a>
              <a ref={btnGhostRef} href='#projects' className='btn-ghost'>{t.cta_secondary}</a>
            </div>
          </div>
          <div className='hidden lg:block' aria-hidden='true' />
        </div>
      </div>

      {/* Scroll cue */}
      <div className='absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none'>
        <span className='text-[9px] tracking-[0.24em] uppercase text-muted/50'>Scroll</span>
        <div className='w-px h-7 overflow-hidden bg-muted/20'>
          <div className='w-full bg-muted/50' style={{ height: '100%', animation: 'scrollLine 1.8s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`@keyframes scrollLine{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  )
}

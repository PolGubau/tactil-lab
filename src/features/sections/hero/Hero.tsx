'use client'
import { useTranslation } from '@/shared/i18n/hooks'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { id: 'projects', end: 50, suffix: '+', label: 'Projects' },
  { id: 'score', end: 100, suffix: '', label: 'Lighthouse' },
  { id: 'days', end: 7, suffix: '', label: 'Days avg.' },
  { id: 'response', end: 24, suffix: 'h', label: 'Response' },
]

export default function Hero() {
  const t = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const mouseReady = useRef(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.05 })

      // 1. Lime sweep bar
      tl.fromTo('[data-h-sweep]',
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.5, ease: 'power3.inOut' }
      )
      tl.to('[data-h-sweep]',
        { scaleX: 0, transformOrigin: 'right center', duration: 0.4, ease: 'power3.inOut' }
      )

      // 2. Eyebrow
      tl.fromTo('[data-h-eyebrow]', { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')

      // 3. Headline - masked 3D line reveal
      tl.fromTo('[data-h-line]',
        { yPercent: 108, rotationX: -10 },
        { yPercent: 0, rotationX: 0, duration: 1.05, stagger: 0.14, transformOrigin: 'bottom center' },
        '-=0.35'
      )

      // 4. Desc + CTA
      tl.fromTo('[data-h-desc]', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.65 }, '-=0.55')
      tl.fromTo('[data-h-cta]', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55 }, '-=0.5')

      // 5. Floating images
      tl.fromTo('[data-h-img="1"]', { opacity: 0, y: -50, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }, 0.55)
      tl.fromTo('[data-h-img="2"]', { opacity: 0, x: -45, scale: 0.9 }, { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out' }, 0.70)
      tl.fromTo('[data-h-img="3"]', { opacity: 0, y: 50, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' }, 0.65)

      // 6. Stats
      tl.fromTo('[data-h-stat]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.07 }, '-=0.6')

      // 7. Count-up + enable parallax
      tl.add(() => {
        STATS.forEach(({ id, end, suffix }) => {
          const el = sectionRef.current?.querySelector(`[data-count="${id}"]`)
          if (!el) return
          const obj = { val: 0 }
          gsap.to(obj, {
            val: end, duration: 1.6, ease: 'power2.out',
            onUpdate() { el.textContent = Math.round(obj.val) + suffix }
          })
        })
        mouseReady.current = true
      }, '-=0.3')
    }, sectionRef)

    const handleMouse = (e: MouseEvent) => {
      if (!mouseReady.current) return
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      gsap.to('[data-h-img="1"]', { x: x * -22, y: y * -14, duration: 1.3, ease: 'power2.out', overwrite: 'auto' })
      gsap.to('[data-h-img="2"]', { x: x * 18, y: y * 12, duration: 1.5, ease: 'power2.out', overwrite: 'auto' })
      gsap.to('[data-h-img="3"]', { x: x * -15, y: y * 16, duration: 1.7, ease: 'power2.out', overwrite: 'auto' })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => { ctx.revert(); window.removeEventListener('mousemove', handleMouse) }
  }, [t])

  return (
    <section ref={sectionRef} className='relative min-h-dvh flex flex-col overflow-hidden'
      style={{ background: 'var(--bg)' }}>

      {/* Lime sweep bar (fixed so it's always across full viewport) */}
      <div data-h-sweep className='pointer-events-none fixed inset-x-0 z-[999]'
        style={{ top: '50%', height: '2px', background: 'var(--accent)', transform: 'scaleX(0)' }} />

      {/* Dot grid */}
      <div className='pointer-events-none absolute inset-0'
        style={{ backgroundImage: 'radial-gradient(circle, rgba(26,23,20,0.045) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      {/* Background watermark */}
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none'>
        <span className='font-black leading-none'
          style={{ fontSize: 'clamp(7rem,20vw,22rem)', color: 'var(--fg)', opacity: 0.028, letterSpacing: '-0.06em' }}>
          TACTIL
        </span>
      </div>

      {/* ── Floating project images ───────────────────────────── */}

      {/* Top-right: Nova Hair */}
      <div data-h-img="1" className='hidden lg:block absolute opacity-0 z-10'
        style={{
          top: '8%', right: '3.5%', width: 'clamp(190px,18vw,300px)',
          borderRadius: '18px', overflow: 'hidden', rotate: '-3deg',
          boxShadow: '0 28px 70px rgba(26,23,20,0.18), 0 0 0 1px rgba(26,23,20,0.06)'
        }}>
        <div className='relative' style={{ height: 'clamp(125px,12vw,200px)' }}>
          <Image src='/projects/novahair/landing.webp' alt='Nova Hair project' fill
            className='object-cover object-top' sizes='18vw' />
          <div className='absolute inset-0'
            style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(26,23,20,0.6) 100%)' }} />
          <span className='absolute bottom-2.5 left-3 text-[8px] tracking-widest uppercase font-bold px-2.5 py-1 rounded-full'
            style={{ background: 'rgba(26,23,20,0.72)', backdropFilter: 'blur(8px)', color: '#c4eb36', border: '1px solid rgba(196,235,54,0.22)' }}>
            Nova Hair
          </span>
        </div>
      </div>

      {/* Mid-left: Acetate */}
      <div data-h-img="2" className='hidden lg:block absolute opacity-0 z-10'
        style={{
          top: '40%', left: '1%', width: 'clamp(155px,14vw,240px)',
          borderRadius: '16px', overflow: 'hidden', rotate: '2.5deg',
          boxShadow: '0 20px 55px rgba(26,23,20,0.15), 0 0 0 1px rgba(26,23,20,0.06)'
        }}>
        <div className='relative' style={{ height: 'clamp(105px,10vw,168px)' }}>
          <Image src='/projects/acetate/landing.webp' alt='Acetate project' fill
            className='object-cover object-top' sizes='14vw' />
          <div className='absolute inset-0'
            style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(26,23,20,0.6) 100%)' }} />
          <span className='absolute bottom-2 left-2.5 text-[8px] tracking-widest uppercase font-bold px-2 py-0.5 rounded-full'
            style={{ background: 'rgba(26,23,20,0.72)', backdropFilter: 'blur(8px)', color: '#c4eb36', border: '1px solid rgba(196,235,54,0.2)' }}>
            Acetate
          </span>
        </div>
      </div>

      {/* Bottom-right: Flatmatch */}
      <div data-h-img="3" className='hidden lg:block absolute opacity-0 z-10'
        style={{
          bottom: '17%', right: '2.5%', width: 'clamp(145px,13vw,220px)',
          borderRadius: '16px', overflow: 'hidden', rotate: '1.5deg',
          boxShadow: '0 18px 50px rgba(26,23,20,0.14), 0 0 0 1px rgba(26,23,20,0.06)'
        }}>
        <div className='relative' style={{ height: 'clamp(96px,9.5vw,154px)' }}>
          <Image src='/projects/flatmatch/0.webp' alt='Flatmatch project' fill
            className='object-cover object-top' sizes='13vw' />
          <div className='absolute inset-0'
            style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(26,23,20,0.6) 100%)' }} />
          <span className='absolute bottom-2 left-2.5 text-[8px] tracking-widest uppercase font-bold px-2 py-0.5 rounded-full'
            style={{ background: 'rgba(26,23,20,0.72)', backdropFilter: 'blur(8px)', color: '#c4eb36', border: '1px solid rgba(196,235,54,0.2)' }}>
            Flatmatch
          </span>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────── */}
      <div className='relative z-20 flex flex-col justify-center flex-1'
        style={{ padding: 'clamp(6rem,11vw,9rem) clamp(1.5rem,6vw,7rem) clamp(3.5rem,6vw,5rem)' }}>

        {/* Eyebrow */}
        <div data-h-eyebrow className='flex items-center gap-3 mb-10 opacity-0'>
          <span className='pill'>{t.hero_eyebrow}</span>
          <span className='w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse' />
          <span className='text-xs font-medium tracking-wide' style={{ color: 'var(--fg-muted)' }}>Barcelona, 2025</span>
        </div>

        {/* Headline - masked 3D line reveal */}
        <h1 className='mb-10' style={{ fontSize: 'clamp(3.2rem,7vw,9.5rem)', fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.04em', perspective: '1000px' }}>
          <div className='overflow-hidden mb-1'>
            <div data-h-line style={{ color: 'var(--fg)' }}>{t.hero_title}</div>
          </div>
          <div className='overflow-hidden'>
            <div data-h-line style={{ color: 'var(--accent)' }}>{t.hero_accent}</div>
          </div>
        </h1>

        {/* Desc + CTA */}
        <div className='flex flex-col md:flex-row md:items-end gap-8 md:gap-14'
          style={{ maxWidth: 'min(100%, 1100px)' }}>
          <p data-h-desc className='text-lg md:text-xl leading-relaxed max-w-sm opacity-0'
            style={{ color: 'var(--fg-muted)' }}>
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

      {/* ── Stats strip ──────────────────────────────────────── */}
      <div className='relative z-20 border-t flex items-stretch' style={{ borderColor: 'var(--border-soft)' }}>
        {STATS.map((s, i) => (
          <div key={s.id} data-h-stat className='flex-1 flex flex-col items-center justify-center py-4 gap-0.5 opacity-0'
            style={{ borderRight: i < STATS.length - 1 ? '1px solid var(--border-soft)' : 'none' }}>
            <span data-count={s.id} className='text-xl md:text-2xl font-black leading-none'
              style={{ color: i === 0 ? 'var(--accent)' : 'var(--fg)' }}>
              {s.end}{s.suffix}
            </span>
            <span className='text-[9px] uppercase tracking-widest font-medium'
              style={{ color: 'var(--fg-subtle)' }}>
              {s.label}
            </span>
          </div>
        ))}
        <div className='flex items-center justify-center px-5 md:px-8 gap-2.5'
          style={{ borderLeft: '1px solid var(--border-soft)' }}>
          <div className='w-px h-7 overflow-hidden' style={{ background: 'var(--border)' }}>
            <div className='w-full h-1/2'
              style={{ background: 'var(--accent)', animation: 'heroScroll 1.8s ease-in-out infinite' }} />
          </div>
          <span className='text-[9px] tracking-[0.25em] uppercase hidden md:block'
            style={{ color: 'var(--fg-subtle)' }}>Scroll</span>
        </div>
      </div>

      <style>{`
        @keyframes heroScroll {
          0%   { transform: translateY(-100%) }
          100% { transform: translateY(200%)  }
        }
      `}</style>
    </section>
  )
}

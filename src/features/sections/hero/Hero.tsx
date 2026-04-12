'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from '@/shared/i18n/hooks'

gsap.registerPlugin(ScrollTrigger)

function WordReveal({ text, className, dataKey, style }: { text: string; className?: string; dataKey: string; style?: React.CSSProperties }) {
  return (
    <div className={className} data-word-group={dataKey} style={style}>
      {text.split(' ').map((word, i) => (
        <span key={i} className='inline-block overflow-hidden mr-[0.3em] mb-1'>
          <span className='word-inner inline-block'>{word}</span>
        </span>
      ))}
    </div>
  )
}

export default function Hero() {
  const t = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const blob1Ref = useRef<HTMLDivElement>(null)
  const blob2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Blob parallax on mouse move
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40
      const y = (e.clientY / window.innerHeight - 0.5) * 30
      gsap.to(blob1Ref.current, { x: x * 0.6, y: y * 0.6, duration: 1.8, ease: 'power2.out' })
      gsap.to(blob2Ref.current, { x: -x * 0.4, y: -y * 0.4, duration: 2.2, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', onMove)

    // Entrance timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.3 })
      tl.fromTo('[data-hero-eyebrow]', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9 })
      tl.fromTo('[data-word-group="title1"] .word-inner', { y: '105%' }, { y: '0%', duration: 1.1, stagger: 0.045 }, '-=0.5')
      tl.fromTo('[data-word-group="title2"] .word-inner', { y: '105%' }, { y: '0%', duration: 0.9, stagger: 0.055 }, '-=0.7')
      tl.fromTo('[data-hero-line]', { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 0.9, ease: 'power2.inOut' }, '-=0.4')
      tl.fromTo(['[data-hero-desc]', '[data-hero-ctas]'], { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.18 }, '-=0.4')
      tl.fromTo('[data-hero-scroll]', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.2')

      // Scroll-driven parallax on title
      gsap.to('[data-hero-inner]', {
        y: 80, ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, section)

    return () => { ctx.revert(); window.removeEventListener('mousemove', onMove) }
  }, [t])

  return (
    <section ref={sectionRef} className='relative min-h-[100dvh] flex flex-col justify-center overflow-hidden'
      style={{ padding: 'clamp(5rem,12vw,10rem) clamp(1.5rem,5vw,5rem) clamp(3rem,6vw,5rem)' }}>

      {/* Organic background blobs */}
      <div ref={blob1Ref} className='pointer-events-none absolute' style={{ top: '10%', right: '5%', width: 'clamp(300px,40vw,600px)', height: 'clamp(300px,40vw,600px)', background: 'radial-gradient(circle, rgba(232,69,0,0.12) 0%, transparent 68%)', filter: 'blur(60px)', borderRadius: '60% 40% 70% 30% / 50% 60% 40% 70%', willChange: 'transform' }} />
      <div ref={blob2Ref} className='pointer-events-none absolute' style={{ bottom: '5%', left: '-5%', width: 'clamp(250px,35vw,500px)', height: 'clamp(250px,35vw,500px)', background: 'radial-gradient(circle, rgba(168,196,0,0.1) 0%, transparent 68%)', filter: 'blur(80px)', borderRadius: '40% 60% 30% 70% / 60% 40% 70% 30%', willChange: 'transform' }} />

      {/* Subtle dot grid */}
      <div className='pointer-events-none absolute inset-0' style={{ backgroundImage: 'radial-gradient(circle, rgba(26,23,20,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.7 }} />

      <div data-hero-inner className='relative z-10 max-w-7xl mx-auto w-full'>
        {/* Eyebrow */}
        <div data-hero-eyebrow className='flex items-center gap-3 mb-10 opacity-0'>
          <span className='pill'>{t.hero_eyebrow}</span>
          <div className='flex gap-1.5 items-center'>
            <span className='w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse' />
            <span className='text-xs text-[var(--fg-muted)] font-medium'>Barcelona</span>
          </div>
        </div>

        {/* Main title */}
        <div className='mb-8'>
          <WordReveal dataKey='title1' text={t.hero_title}
            className='text-[clamp(3.2rem,8vw,8.5rem)] font-black leading-[0.88] tracking-[-0.03em]'
            style={{ color: 'var(--fg)' } as React.CSSProperties} />
          <WordReveal dataKey='title2' text={t.hero_accent}
            className='text-[clamp(3.2rem,8vw,8.5rem)] font-black leading-[0.88] tracking-[-0.03em]'
            style={{ color: 'var(--accent)' } as React.CSSProperties} />
        </div>

        <div data-hero-line className='h-px mb-10 max-w-xl' style={{ background: 'var(--border)', transformOrigin: 'left' }} />

        <div className='grid md:grid-cols-2 gap-10 items-end max-w-4xl'>
          <p data-hero-desc className='text-lg md:text-xl leading-relaxed opacity-0' style={{ color: 'var(--fg-muted)' }}>
            {t.hero_description}
          </p>
          <div data-hero-ctas className='flex flex-wrap gap-4 opacity-0'>
            <a href='#contact' className='btn-primary'>
              {t.cta_primary}
              <svg width='14' height='14' viewBox='0 0 16 16' fill='none'><path d='M3 8h10M9 4l4 4-4 4' stroke='currentColor' strokeWidth='2' strokeLinecap='round' /></svg>
            </a>
            <a href='#projects' className='btn-ghost'>
              {t.cta_secondary}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div data-hero-scroll className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0'>
        <span className='text-[10px] tracking-[0.25em] uppercase font-medium' style={{ color: 'var(--fg-subtle)' }}>Scroll</span>
        <div className='w-px h-10 overflow-hidden' style={{ background: 'var(--border)' }}>
          <div className='w-full h-1/2' style={{ background: 'var(--accent)', animation: 'scrollDown 1.8s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  )
}

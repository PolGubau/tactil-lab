
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CONTENT } from '@/lib/content'

gsap.registerPlugin(ScrollTrigger)

function splitIntoLines(text: string) {
  return text.split(' ').map((word, i) => (
    <span key={i} className='inline-block overflow-hidden mr-[0.25em]'>
      <span className='word-inner inline-block'>{word}</span>
    </span>
  ))
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const title1Ref = useRef<HTMLDivElement>(null)
  const title2Ref = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      // Eyebrow fade in
      tl.fromTo(eyebrowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 }
      )

      // Title words stagger up
      const words1 = title1Ref.current?.querySelectorAll('.word-inner') ?? []
      tl.fromTo(words1,
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1, stagger: 0.04 },
        '-=0.4'
      )

      const words2 = title2Ref.current?.querySelectorAll('.word-inner') ?? []
      tl.fromTo(words2,
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.8, stagger: 0.05 },
        '-=0.6'
      )

      // Separator line
      tl.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 0.8, ease: 'power2.inOut' },
        '-=0.4'
      )

      // Desc + CTAs
      tl.fromTo([descRef.current, ctasRef.current],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 },
        '-=0.3'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className='relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-24 pb-16 overflow-hidden'
    >
      {/* Background grid */}
      <div className='absolute inset-0 opacity-[0.03]'
        style={{ backgroundImage: 'linear-gradient(var(--fg) 1px, transparent 1px), linear-gradient(90deg, var(--fg) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      {/* Accent blob */}
      <div className='absolute top-1/3 right-1/4 w-96 h-96 rounded-full opacity-[0.04]'
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className='relative z-10 max-w-7xl mx-auto w-full'>
        {/* Eyebrow */}
        <div ref={eyebrowRef} className='flex items-center gap-3 mb-12 opacity-0'>
          <span className='w-8 h-px bg-[var(--accent)]' />
          <span className='text-xs tracking-[0.3em] uppercase text-[var(--fg-muted)]'>
            {CONTENT.hero.eyebrow}
          </span>
        </div>

        {/* Title */}
        <div className='mb-6'>
          <div ref={title1Ref} className='text-[clamp(3rem,8vw,8rem)] font-black leading-[0.9] tracking-tight text-[var(--fg)]'>
            {splitIntoLines('Your business can')}
          </div>
          <div ref={title2Ref} className='text-[clamp(3rem,8vw,8rem)] font-black leading-[0.9] tracking-tight' style={{ color: 'var(--accent)' }}>
            {splitIntoLines('generate more customers.')}
          </div>
        </div>

        {/* Separator */}
        <div ref={lineRef} className='h-px bg-[var(--border)] mb-10 max-w-2xl' />

        <div className='grid md:grid-cols-2 gap-8 items-end max-w-4xl'>
          <p ref={descRef} className='text-lg md:text-xl text-[var(--fg-muted)] leading-relaxed opacity-0'>
            {CONTENT.hero.description}
          </p>
          <div ref={ctasRef} className='flex flex-wrap gap-4 opacity-0'>
            <a
              href='#contact'
              className='group inline-flex items-center gap-3 px-8 py-4 font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:gap-5'
              style={{ background: 'var(--accent)', color: 'var(--bg)' }}
            >
              {CONTENT.hero.cta_primary}
              <svg width='16' height='16' viewBox='0 0 16 16' fill='none' className='transition-transform group-hover:translate-x-1'>
                <path d='M3 8h10M9 4l4 4-4 4' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round'/>
              </svg>
            </a>
            <a
              href='#features'
              className='inline-flex items-center gap-2 px-8 py-4 border border-[var(--border)] text-sm tracking-widest uppercase transition-colors hover:border-[var(--fg)] text-[var(--fg-muted)] hover:text-[var(--fg)]'
            >
              {CONTENT.hero.cta_secondary}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40'>
        <span className='text-xs tracking-widest uppercase text-[var(--fg-muted)]'>Scroll</span>
        <div className='w-px h-12 bg-[var(--fg-muted)]'
          style={{ animation: 'scaleY 1.5s ease-in-out infinite', transformOrigin: 'top' }}
        />
      </div>
    </section>
  )
}


'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CONTENT } from '@/lib/content'

gsap.registerPlugin(ScrollTrigger)

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      if (!track) return

      const cards = track.querySelectorAll('.feature-card')
      const totalWidth = track.scrollWidth - window.innerWidth

      // Horizontal scroll pinning
      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => '+=' + (totalWidth + window.innerHeight),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      // Stagger reveal cards
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 0.8,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.1,
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id='features' className='overflow-hidden'>
      <div
        ref={trackRef}
        className='flex gap-0 w-max'
        style={{ willChange: 'transform' }}
      >
        {/* Section label card */}
        <div className='feature-card flex-shrink-0 w-screen h-screen flex flex-col justify-between p-12 md:p-20 border-r' style={{ borderColor: 'var(--border)' }}>
          <div>
            <span className='text-xs tracking-[0.3em] uppercase text-[var(--fg-muted)] block mb-6'>What we do</span>
            <h2 className='text-5xl md:text-7xl font-black leading-[0.9] tracking-tight max-w-sm'>
              Made for<br />
              <span style={{ color: 'var(--accent)' }}>real</span><br />
              results.
            </h2>
          </div>
          <div className='flex items-center gap-3 text-[var(--fg-muted)] text-sm'>
            <span>Scroll to explore</span>
            <div className='flex gap-1'>
              {CONTENT.features.map((_, i) => (
                <span key={i} className='w-6 h-px' style={{ background: 'var(--border)' }} />
              ))}
            </div>
          </div>
        </div>

        {/* Feature cards */}
        {CONTENT.features.map((feat, i) => (
          <div
            key={feat.number}
            className='feature-card flex-shrink-0 w-[min(600px,85vw)] h-screen flex flex-col justify-between p-10 md:p-16 border-r'
            style={{ borderColor: 'var(--border)' }}
          >
            <div className='flex items-start justify-between'>
              <span
                className='text-7xl md:text-9xl font-black leading-none opacity-15 select-none'
                style={{ color: feat.color }}
              >
                {feat.number}
              </span>
              <span
                className='text-xs tracking-[0.3em] uppercase px-3 py-1 border mt-2'
                style={{ borderColor: feat.color, color: feat.color }}
              >
                {feat.tag}
              </span>
            </div>

            <div>
              <h3 className='text-3xl md:text-5xl font-black leading-[1.1] mb-6'>
                {feat.title}
              </h3>
              <p className='text-base md:text-lg text-[var(--fg-muted)] leading-relaxed max-w-sm'>
                {feat.description}
              </p>
            </div>

            <div className='h-px' style={{ background: feat.color, opacity: 0.3 }} />
          </div>
        ))}
      </div>
    </section>
  )
}

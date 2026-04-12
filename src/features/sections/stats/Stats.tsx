'use client'
import { useTranslation } from '@/shared/i18n/hooks'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function Stats() {
  const t = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  const stats = [
    { value: t.stat_1_value, label: t.stat_1_label },
    { value: t.stat_2_value, label: t.stat_2_label },
    { value: t.stat_3_value, label: t.stat_3_label },
    { value: t.stat_4_value, label: t.stat_4_label },
    { value: t.stat_5_value, label: t.stat_5_label },
    { value: t.stat_6_value, label: t.stat_6_label },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-stats-header]', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' }
      })
      gsap.fromTo('[data-stat-card]', { opacity: 0, y: 32 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.08,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [t])

  return (
    <section
      ref={sectionRef}
      id='stats'
      style={{ padding: 'clamp(4.5rem,9vw,7rem) clamp(1.5rem,5vw,5rem)', background: 'var(--bg-subtle)' }}
    >
      <div className='max-w-7xl mx-auto'>
        <span className='pill mb-8 block w-fit'>{t.stats_label}</span>
        <div className='grid lg:grid-cols-5 gap-12 lg:gap-16 items-start'>

          {/* Left: editorial headline */}
          <div data-stats-header className='lg:col-span-2 opacity-0'>
            <h2
              className='font-black leading-[0.92] tracking-tight mb-5'
              style={{ fontSize: 'clamp(2.2rem,4.5vw,4rem)', color: 'var(--fg)' }}
            >
              {t.stats_headline}
            </h2>
            <p className='text-base leading-relaxed' style={{ color: 'var(--fg-muted)', maxWidth: '30ch' }}>
              {t.stats_description}
            </p>
            <div className='mt-10 h-px w-16' style={{ background: 'var(--accent)' }} />
          </div>

          {/* Right: 3×2 stat grid */}
          <div className='lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-4'>
            {stats.map((stat) => (
              <div key={stat.label} data-stat-card className='card opacity-0 p-7 flex flex-col gap-2'>
                <span
                  className='font-black tracking-tight leading-none'
                  style={{ fontSize: 'clamp(2.4rem,4.5vw,3.2rem)', color: 'var(--accent)' }}
                >
                  {stat.value}
                </span>
                <span
                  className='text-[10px] tracking-[0.18em] uppercase font-semibold leading-snug'
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

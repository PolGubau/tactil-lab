'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from '@/shared/i18n/hooks'

gsap.registerPlugin(ScrollTrigger)

export default function Stats() {
  const t = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  const stats = [
    { value: t.stat_1_value, label: t.stat_1_label, numeric: 100 },
    { value: t.stat_2_value, label: t.stat_2_label, numeric: 7 },
    { value: t.stat_3_value, label: t.stat_3_label, numeric: 30 },
    { value: t.stat_4_value, label: t.stat_4_label, numeric: 100 },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current, { opacity: 0 }, {
        opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      })

      const cards = sectionRef.current?.querySelectorAll('.stat-card') ?? []
      gsap.fromTo(cards, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [t])

  return (
    <section ref={sectionRef} className='opacity-0' style={{ padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,5rem)' }}>
      <div className='max-w-7xl mx-auto'>
        <span className='pill mb-10 block w-fit'>{t.stats_label}</span>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          {stats.map((stat, i) => (
            <div key={i} className='stat-card card p-8 md:p-12 flex flex-col gap-3'>
              <span className='text-5xl md:text-6xl font-black tracking-tight' style={{ color: 'var(--accent)' }}>
                {stat.value}
              </span>
              <span className='text-xs tracking-[0.18em] uppercase font-medium' style={{ color: 'var(--fg-muted)' }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

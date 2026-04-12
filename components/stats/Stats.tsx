
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CONTENT } from '@/lib/content'

gsap.registerPlugin(ScrollTrigger)

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const numbers = sectionRef.current?.querySelectorAll('.stat-number') ?? []

      numbers.forEach((el, i) => {
        const stat = CONTENT.stats[i]
        const target = stat.value
        const obj = { val: 0 }

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 70%',
          onEnter: () => {
            gsap.to(obj, {
              val: target,
              duration: 1.5,
              ease: 'power2.out',
              delay: i * 0.1,
              onUpdate: () => {
                (el as HTMLElement).textContent = Math.round(obj.val).toString() + stat.suffix
              },
            })
          },
        })
      })

      // Reveal section
      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className='py-24 px-6 md:px-12 lg:px-20 opacity-0'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-px' style={{ background: 'var(--border)' }}>
          {CONTENT.stats.map((stat, i) => (
            <div key={i} className='p-10 md:p-16 flex flex-col gap-3' style={{ background: 'var(--bg)' }}>
              <span className='stat-number text-5xl md:text-7xl font-black tracking-tight' style={{ color: 'var(--accent)' }}>
                0{stat.suffix}
              </span>
              <span className='text-sm tracking-[0.2em] uppercase text-[var(--fg-muted)]'>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

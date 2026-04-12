'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from '@/shared/i18n/hooks'

gsap.registerPlugin(ScrollTrigger)

export default function Process() {
  const t = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  const steps = [
    { num: t.step_1_num, title: t.step_1_title, desc: t.step_1_desc },
    { num: t.step_2_num, title: t.step_2_title, desc: t.step_2_desc },
    { num: t.step_3_num, title: t.step_3_title, desc: t.step_3_desc },
    { num: t.step_4_num, title: t.step_4_title, desc: t.step_4_desc },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.process-header', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      })
      gsap.fromTo('.process-step', { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [t])

  return (
    <section ref={sectionRef} style={{ padding: 'clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,5rem)' }}>
      <div className='max-w-7xl mx-auto'>
        <div className='process-header mb-16 opacity-0'>
          <span className='pill mb-4 block w-fit'>{t.process_label}</span>
          <h2 className='text-4xl md:text-6xl font-black leading-[0.95] tracking-tight max-w-xl'>{t.process_headline}</h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {steps.map((step, idx) => (
            <div key={idx} className='process-step card opacity-0 p-7 md:p-8 flex flex-col gap-5 relative group'>
              <div className='flex items-start justify-between'>
                <span className='text-4xl font-black leading-none select-none' style={{ color: 'var(--accent)', opacity: 0.15 }}>{step.num}</span>
                <div className='w-8 h-8 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300'
                  style={{ borderColor: 'var(--accent)', background: 'var(--accent-soft)' }}>
                  <svg width='10' height='10' viewBox='0 0 12 12' fill='none'>
                    <path d='M2 10L10 2M10 2H4M10 2v6' stroke='var(--accent)' strokeWidth='1.5' strokeLinecap='round' />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className='text-lg font-black mb-2'>{step.title}</h3>
                <p className='text-sm leading-relaxed' style={{ color: 'var(--fg-muted)' }}>{step.desc}</p>
              </div>
              {idx < steps.length - 1 && (
                <div className='hidden lg:block absolute -right-2 top-8 z-10 text-[var(--fg-subtle)]'>→</div>
              )}
            </div>
          ))}
        </div>

        <div className='mt-12 flex justify-center'>
          <a href='#contact' className='btn-primary'>{t.cta_primary}</a>
        </div>
      </div>
    </section>
  )
}

'use client'
import { useTranslation } from '@/shared/i18n/hooks'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code2, MessageCircle, PenTool, Rocket } from 'lucide-react'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const STEP_ICONS = [
  <MessageCircle key='msg' size={20} />,
  <PenTool key='pen' size={20} />,
  <Code2 key='code' size={20} />,
  <Rocket key='rocket' size={20} />,
]

export default function Process() {
  const t = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  const steps = [
    { num: t.step_1_num, title: t.step_1_title, desc: t.step_1_desc, accent: false },
    { num: t.step_2_num, title: t.step_2_title, desc: t.step_2_desc, accent: true },
    { num: t.step_3_num, title: t.step_3_title, desc: t.step_3_desc, accent: false },
    { num: t.step_4_num, title: t.step_4_title, desc: t.step_4_desc, accent: true },
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
          {steps.map((step) => (
            <div key={step.num} className='process-step card opacity-0 p-7 md:p-8 flex flex-col gap-5'>
              <div className='flex items-center justify-between'>
                <div className='w-10 h-10 rounded-xl flex items-center justify-center'
                  style={{ background: step.accent ? 'var(--accent)' : 'var(--bg-subtle)', color: step.accent ? '#1A1714' : 'var(--fg-muted)' }}>
                  {STEP_ICONS[steps.indexOf(step)]}
                </div>
                <span
                  className='text-4xl font-black leading-none select-none'
                  style={{ color: 'var(--accent)', opacity: step.accent ? 0.5 : 0.12 }}
                >
                  {step.num}
                </span>
              </div>
              <div>
                <h3 className='text-lg font-black mb-2'>{step.title}</h3>
                <p className='text-sm leading-relaxed' style={{ color: 'var(--fg-muted)' }}>{step.desc}</p>
              </div>
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

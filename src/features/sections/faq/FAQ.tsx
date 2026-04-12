'use client'
import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from '@/shared/i18n/hooks'

gsap.registerPlugin(ScrollTrigger)

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!bodyRef.current) return
    gsap.to(bodyRef.current, {
      height: open ? 'auto' : 0, duration: 0.4, ease: 'power2.inOut',
      onStart: () => { if (open && bodyRef.current) bodyRef.current.style.overflow = 'visible' },
      onComplete: () => { if (!open && bodyRef.current) bodyRef.current.style.overflow = 'hidden' }
    })
  }, [open])

  return (
    <div className='border-b transition-colors duration-200' style={{ borderColor: 'var(--border-soft)' }}>
      <button onClick={() => setOpen(!open)}
        className='w-full text-left py-5 flex items-start justify-between gap-6 transition-colors duration-200'
        style={{ color: open ? 'var(--accent)' : 'var(--fg)' }}>
        <span className='text-base font-semibold'>{question}</span>
        <span className='flex-shrink-0 mt-0.5 text-lg font-light transition-transform duration-300 w-6 h-6 rounded-full border flex items-center justify-center'
          style={{ transform: open ? 'rotate(45deg)' : 'none', borderColor: open ? 'var(--accent)' : 'var(--border)', color: 'var(--accent)' }}>+</span>
      </button>
      <div ref={bodyRef} style={{ height: 0, overflow: 'hidden' }}>
        <p className='pb-5 text-sm leading-relaxed max-w-2xl' style={{ color: 'var(--fg-muted)' }}>{answer}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const t = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  const faqs = [
    { q: t.faq_q1, a: t.faq_a1 }, { q: t.faq_q2, a: t.faq_a2 },
    { q: t.faq_q3, a: t.faq_a3 }, { q: t.faq_q4, a: t.faq_a4 },
    { q: t.faq_q5, a: t.faq_a5 }, { q: t.faq_q6, a: t.faq_a6 },
    { q: t.faq_q7, a: t.faq_a7 }, { q: t.faq_q8, a: t.faq_a8 },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className='opacity-0' style={{ padding: 'clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,5rem)', background: 'var(--bg-subtle)' }}>
      <div className='max-w-7xl mx-auto grid md:grid-cols-2 gap-14 md:gap-20'>
        <div className='md:sticky top-32 self-start'>
          <span className='pill mb-4 block w-fit'>{t.faq_label}</span>
          <h2 className='text-4xl md:text-5xl font-black leading-[0.95] tracking-tight'>{t.faq_headline}</h2>
          <div className='mt-8'>
            <a href='#contact' className='btn-primary'>{t.cta_primary}</a>
          </div>
        </div>
        <div>
          {faqs.map((item, i) => <FAQItem key={i} question={item.q} answer={item.a} />)}
        </div>
      </div>
    </section>
  )
}

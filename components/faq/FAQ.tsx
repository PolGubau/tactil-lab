
'use client'
import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CONTENT } from '@/lib/content'

gsap.registerPlugin(ScrollTrigger)

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    if (open) {
      gsap.set(el, { height: 'auto', opacity: 1 })
      gsap.from(el, { height: 0, opacity: 0, duration: 0.4, ease: 'power2.out' })
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' })
    }
  }, [open])

  return (
    <div className='border-b' style={{ borderColor: 'var(--border)' }}>
      <button
        onClick={() => setOpen(!open)}
        className='w-full text-left py-6 flex items-center justify-between gap-4 group'
      >
        <span className='font-medium text-base group-hover:text-[var(--accent)] transition-colors'>{question}</span>
        <span
          className='flex-shrink-0 w-6 h-6 border flex items-center justify-center transition-all duration-300'
          style={{
            borderColor: open ? 'var(--accent)' : 'var(--border)',
            background: open ? 'var(--accent)' : 'transparent',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          <svg width='12' height='12' viewBox='0 0 12 12' fill='none'>
            <path d='M6 2v8M2 6h8' stroke={open ? 'var(--bg)' : 'var(--fg)'} strokeWidth='1.5' strokeLinecap='round'/>
          </svg>
        </span>
      </button>
      <div ref={bodyRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <p className='pb-6 text-[var(--fg-muted)] leading-relaxed'>{answer}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const header = sectionRef.current?.querySelector('.faq-header') as HTMLElement | null
      const items = sectionRef.current?.querySelectorAll('.faq-item') ?? []

      if (header) gsap.fromTo(header,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      )

      gsap.fromTo(items,
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.5, stagger: 0.05,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const half = Math.ceil(CONTENT.faq.length / 2)

  return (
    <section ref={sectionRef} id='faq' className='py-32 px-6 md:px-12 lg:px-20'
      style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border)' }}
    >
      <div className='max-w-7xl mx-auto'>
        <div className='faq-header mb-20 opacity-0'>
          <span className='text-xs tracking-[0.3em] uppercase text-[var(--fg-muted)] block mb-4'>FAQ</span>
          <h2 className='text-4xl md:text-6xl font-black mb-4'>Frequently asked</h2>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-20'>
          <div>
            {CONTENT.faq.slice(0, half).map((item, i) => (
              <div key={i} className='faq-item opacity-0'>
                <FAQItem question={item.question} answer={item.answer} index={i} />
              </div>
            ))}
          </div>
          <div>
            {CONTENT.faq.slice(half).map((item, i) => (
              <div key={i} className='faq-item opacity-0'>
                <FAQItem question={item.question} answer={item.answer} index={i + half} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CONTENT } from '@/lib/content'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current?.querySelectorAll('.contact-reveal') ?? []
      gsap.fromTo(els,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
  }

  return (
    <section ref={sectionRef} id='contact' className='py-32 px-6 md:px-12 lg:px-20 border-t' style={{ borderColor: 'var(--border)' }}>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-20'>
          {/* Left */}
          <div>
            <div className='contact-reveal opacity-0'>
              <span className='text-xs tracking-[0.3em] uppercase text-[var(--fg-muted)] block mb-6'>Contact</span>
              <h2 className='text-4xl md:text-6xl font-black leading-[0.95] mb-8'>
                {CONTENT.contact.title}
              </h2>
              <p className='text-[var(--fg-muted)] leading-relaxed mb-12 max-w-sm'>
                {CONTENT.contact.subtitle}
              </p>
            </div>

            <div className='grid grid-cols-2 gap-0 contact-reveal opacity-0' style={{ border: '1px solid var(--border)' }}>
              {CONTENT.contact.reasons.map((r, i) => (
                <div key={i} className='p-6 border-b border-r' style={{ borderColor: 'var(--border)' }}>
                  <div className='w-2 h-2 rounded-full mb-3' style={{ background: 'var(--accent)' }} />
                  <div className='font-bold text-sm mb-1'>{r.title}</div>
                  <div className='text-xs text-[var(--fg-muted)] leading-relaxed'>{r.description}</div>
                </div>
              ))}
            </div>

            <div className='mt-10 contact-reveal opacity-0'>
              <a href={'mailto:' + CONTENT.contact.email} className='text-[var(--accent)] text-lg font-medium hover:underline'>
                {CONTENT.contact.email}
              </a>
            </div>
          </div>

          {/* Form */}
          <div className='contact-reveal opacity-0'>
            {sent ? (
              <div className='h-full flex items-center justify-center text-center p-12 border' style={{ borderColor: 'var(--border)' }}>
                <div>
                  <div className='w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6' style={{ background: 'var(--accent)' }}>
                    <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
                      <path d='M4 10l5 5 7-7' stroke='var(--bg)' strokeWidth='2' strokeLinecap='round'/>
                    </svg>
                  </div>
                  <h3 className='text-2xl font-black mb-3'>Message sent!</h3>
                  <p className='text-[var(--fg-muted)]'>We will get back to you within 24 hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                {[
                  { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                  { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                ].map(f => (
                  <div key={f.name} className='flex flex-col gap-2'>
                    <label className='text-xs tracking-[0.2em] uppercase text-[var(--fg-muted)]'>{f.label}</label>
                    <input
                      type={f.type}
                      name={f.name}
                      placeholder={f.placeholder}
                      required
                      className='bg-transparent border px-4 py-3 text-sm outline-none focus:border-[var(--accent)] transition-colors'
                      style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                    />
                  </div>
                ))}
                <div className='flex flex-col gap-2'>
                  <label className='text-xs tracking-[0.2em] uppercase text-[var(--fg-muted)]'>Message</label>
                  <textarea
                    name='message'
                    placeholder='Tell us about your project...'
                    rows={5}
                    required
                    className='bg-transparent border px-4 py-3 text-sm outline-none focus:border-[var(--accent)] transition-colors resize-none'
                    style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                  />
                </div>
                <button
                  type='submit'
                  disabled={loading}
                  className='py-4 font-bold text-sm tracking-widest uppercase transition-all duration-300 mt-2 disabled:opacity-50'
                  style={{ background: 'var(--accent)', color: 'var(--bg)' }}
                >
                  {loading ? 'Sending...' : 'Send message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

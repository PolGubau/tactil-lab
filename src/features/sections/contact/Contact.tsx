'use client'
import { useTranslation } from '@/shared/i18n/hooks'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const t = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })

  const whys = [
    { title: t.contact_why_1_title, desc: t.contact_why_1_desc },
    { title: t.contact_why_2_title, desc: t.contact_why_2_desc },
    { title: t.contact_why_3_title, desc: t.contact_why_3_desc },
    { title: t.contact_why_4_title, desc: t.contact_why_4_desc },
  ]

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      // Set initial hidden state via GSAP (not CSS class) — more reliable with ScrollTrigger
      gsap.set('[data-c-header]', { opacity: 0, y: 40 })
      gsap.set('[data-c-why]', { opacity: 0, x: -24 })
      gsap.set('[data-c-form]', { opacity: 0, y: 32 })

      gsap.to('[data-c-header]', {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
      })
      gsap.to('[data-c-why]', {
        opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      })
      gsap.to('[data-c-form]', {
        opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      setStatus('success')
      setForm({ name: '', email: '', phone: '', service: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputClass = 'w-full bg-transparent border-b border-edge py-3 text-sm text-ink outline-none transition-colors appearance-none'
  const labelClass = 'block text-[10px] tracking-[0.2em] uppercase font-semibold mb-2 text-muted'

  return (
    <section ref={sectionRef} id='contact' style={{ padding: 'clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,5rem)' }}>
      <div className='max-w-7xl mx-auto'>
        <div data-c-header className='mb-14'>
          <span className='pill mb-4 block w-fit'>{t.contact_label}</span>
          <h2 className='text-4xl md:text-6xl font-black mb-3 tracking-tight'>{t.contact_headline}</h2>
          <p className='max-w-md text-base text-muted'>{t.contact_subtitle}</p>
        </div>

        <div className='grid md:grid-cols-5 gap-14 md:gap-20'>
          <div className='md:col-span-2 flex flex-col gap-7'>
            {whys.map((w, i) => (
              <div key={i} data-c-why className='flex gap-4'>
                <span className='text-xs font-black mt-0.5 w-6 text-accent'>0{i + 1}</span>
                <div>
                  <div className='font-bold text-sm mb-1'>{w.title}</div>
                  <div className='text-sm leading-relaxed text-muted'>{w.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <form data-c-form onSubmit={handleSubmit} className='bg-card md:col-span-3 flex flex-col gap-5 p-8 rounded-[var(--r-xl)] border border-soft shadow-sm'>
            <div className='grid md:grid-cols-2 gap-5'>
              <div>
                <label htmlFor='f-name' className={labelClass}>{t.form_name}</label>
                <input id='f-name' type='text' placeholder={t.form_name_placeholder} className={inputClass}
                  required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label htmlFor='f-email' className={labelClass}>{t.form_email}</label>
                <input id='f-email' type='email' placeholder={t.form_email_placeholder} className={inputClass}
                  required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
            </div>
            <div className='grid md:grid-cols-2 gap-5'>
              <div>
                <label htmlFor='f-phone' className={labelClass}>{t.form_phone}</label>
                <input id='f-phone' type='tel' placeholder={t.form_phone_placeholder} className={inputClass}
                  value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
              <div>
                <label htmlFor='f-service' className={labelClass}>{t.form_service}</label>
                <select id='f-service' className={inputClass}
                  value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}>
                  <option value=''>{t.form_service_placeholder}</option>
                  <option>{t.form_service_web}</option>
                  <option>{t.form_service_landing}</option>
                  <option>{t.form_service_ecommerce}</option>
                  <option>{t.form_service_app}</option>
                  <option>{t.form_service_other}</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor='f-message' className={labelClass}>{t.form_message}</label>
              <textarea id='f-message' placeholder={t.form_message_placeholder} rows={4} className={inputClass + ' resize-none'}
                value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
            </div>
            {status === 'success' && (
              <p className='text-sm font-bold px-4 py-2 rounded-full bg-accent text-ink'>{t.form_success}</p>
            )}
            {status === 'error' && <p className='text-sm font-medium text-red-500'>{t.form_error}</p>}
            <button type='submit' disabled={status === 'sending'} className='btn-primary self-start disabled:opacity-50'>
              {status === 'sending' ? t.form_sending : t.form_submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

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
      const st = { trigger: sectionRef.current, start: 'top 72%' }
      gsap.fromTo('[data-c-header]', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: st })
      gsap.fromTo('[data-c-why]', { opacity: 0, x: -24 }, {
        opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' },
      })
      gsap.fromTo('[data-c-form]', { opacity: 0, y: 32 }, {
        opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
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

  const inputClass = 'w-full bg-transparent border-b py-3 text-sm outline-none transition-colors appearance-none'
  const labelClass = 'block text-[10px] tracking-[0.2em] uppercase font-semibold mb-2'

  return (
    <section ref={sectionRef} id='contact' style={{ padding: 'clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,5rem)' }}>
      <div className='max-w-7xl mx-auto'>
        <div data-c-header className='mb-14 opacity-0'>
          <span className='pill mb-4 block w-fit'>{t.contact_label}</span>
          <h2 className='text-4xl md:text-6xl font-black mb-3 tracking-tight'>{t.contact_headline}</h2>
          <p className='max-w-md text-base' style={{ color: 'var(--fg-muted)' }}>{t.contact_subtitle}</p>
        </div>

        <div className='grid md:grid-cols-5 gap-14 md:gap-20'>
          <div className='md:col-span-2 flex flex-col gap-7'>
            {whys.map((w, i) => (
              <div key={i} data-c-why className='flex gap-4 opacity-0'>
                <span className='text-xs font-black mt-0.5 w-6' style={{ color: 'var(--accent)' }}>0{i + 1}</span>
                <div>
                  <div className='font-bold text-sm mb-1'>{w.title}</div>
                  <div className='text-sm leading-relaxed' style={{ color: 'var(--fg-muted)' }}>{w.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <form data-c-form onSubmit={handleSubmit} className='md:col-span-3 flex flex-col gap-5 p-8 rounded-[var(--r-xl)] border opacity-0'
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)', boxShadow: 'var(--shadow-sm)' }}>
            <div className='grid md:grid-cols-2 gap-5'>
              <div>
                <label className={labelClass} style={{ color: 'var(--fg-muted)' }}>{t.form_name}</label>
                <input type='text' placeholder={t.form_name_placeholder} className={inputClass} style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                  required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass} style={{ color: 'var(--fg-muted)' }}>{t.form_email}</label>
                <input type='email' placeholder={t.form_email_placeholder} className={inputClass} style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                  required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
            </div>
            <div className='grid md:grid-cols-2 gap-5'>
              <div>
                <label className={labelClass} style={{ color: 'var(--fg-muted)' }}>{t.form_phone}</label>
                <input type='tel' placeholder={t.form_phone_placeholder} className={inputClass} style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                  value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass} style={{ color: 'var(--fg-muted)' }}>{t.form_service}</label>
                <select className={inputClass} style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
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
              <label className={labelClass} style={{ color: 'var(--fg-muted)' }}>{t.form_message}</label>
              <textarea placeholder={t.form_message_placeholder} rows={4} className={inputClass + ' resize-none'} style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
                value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
            </div>
            {status === 'success' && (
              <p className='text-sm font-bold px-4 py-2 rounded-full' style={{ background: '#c4eb36', color: '#1A1714' }}>{t.form_success}</p>
            )}
            {status === 'error' && <p className='text-sm font-medium' style={{ color: '#E84500' }}>{t.form_error}</p>}
            <button type='submit' disabled={status === 'sending'} className='btn-primary self-start disabled:opacity-50'>
              {status === 'sending' ? t.form_sending : t.form_submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

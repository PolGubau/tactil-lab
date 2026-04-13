'use client'
import { useTranslation } from '@/shared/i18n/hooks'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)


export default function Pricing() {
  const t = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  const plans = [
    {
      title: t.pack_1_title, desc: t.pack_1_desc, cta: t.pack_1_cta,
      price: '699', oldPrice: '1,499',
      features: [t.pack_1_feat_1, t.pack_1_feat_2, t.pack_1_feat_3, t.pack_1_feat_4, t.pack_1_feat_5],
    },
    {
      title: t.pack_2_title, desc: t.pack_2_desc, cta: t.pack_2_cta,
      price: '499', oldPrice: '799', isPopular: true,
      features: [t.pack_2_feat_1, t.pack_2_feat_2, t.pack_2_feat_3, t.pack_2_feat_4, t.pack_2_feat_5],
    },
    {
      title: t.pack_3_title, desc: t.pack_3_desc, cta: t.pack_3_cta,
      features: [t.pack_3_feat_1, t.pack_3_feat_2, t.pack_3_feat_3, t.pack_3_feat_4, t.pack_3_feat_5],
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pricing-header', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } })
      gsap.fromTo('.pricing-card', { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [t])

  return (
    <section ref={sectionRef} id='pricing' style={{ padding: 'clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,5rem)' }}>
      <div className='max-w-7xl mx-auto'>
        <div className='pricing-header text-center mb-16 opacity-0'>
          <span className='pill mx-auto mb-4 block w-fit'>{t.pricing_label}</span>
          <h2 className='text-4xl md:text-6xl font-black mb-4 tracking-tight'>{t.pricing_headline}</h2>
          <p className='max-w-lg mx-auto text-base text-muted'>{t.pricing_subtitle}</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          {plans.map((plan, idx) => (
            <div key={idx} className='pricing-card opacity-0 relative flex flex-col p-8 transition-all duration-350'
              style={{
                background: plan.isPopular ? 'var(--fg)' : 'var(--bg-card)',
                borderRadius: 'var(--r-xl)',
                border: plan.isPopular ? 'none' : '1px solid var(--border-soft)',
                boxShadow: plan.isPopular ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                color: plan.isPopular ? 'var(--bg)' : 'var(--fg)',
              }}>
              {plan.isPopular && (
                <div className='absolute -top-3 left-6 bg-accent text-fg px-4 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full'>{t.popular}</div>
              )}
              <div className='mb-7 pb-7 border-b' style={{ borderColor: plan.isPopular ? 'rgba(247,244,239,0.12)' : 'var(--border-soft)' }}>
                <h3 className='text-xl font-black mb-2'>{plan.title}</h3>
                <p className='text-sm leading-relaxed mb-5' style={{ color: plan.isPopular ? 'rgba(247,244,239,0.6)' : 'var(--fg-muted)' }}>{plan.desc}</p>
                {plan.price ? (
                  <div>
                    {plan.oldPrice && <span className='text-xs line-through' style={{ color: plan.isPopular ? 'rgba(247,244,239,0.4)' : 'var(--fg-subtle)' }}>{plan.oldPrice} EUR</span>}
                    <div className='flex items-baseline gap-2 mt-1'>
                      <span className='text-5xl font-black'>{plan.price}</span>
                      <span className='text-sm' style={{ color: plan.isPopular ? 'rgba(247,244,239,0.5)' : 'var(--fg-muted)' }}>EUR {t.per_project}</span>
                    </div>
                  </div>
                ) : (
                  <div className='text-3xl font-black text-accent'>Custom</div>
                )}
              </div>
              <ul className='flex flex-col gap-3 mb-8 flex-1'>
                {plan.features.map((feat, i) => (
                  <li key={i} className='flex items-center gap-3 text-sm'
                    style={{ color: plan.isPopular ? 'rgba(247,244,239,0.75)' : 'var(--fg-muted)' }}>
                    <svg width='16' height='16' viewBox='0 0 16 16' fill='none' className='flex-shrink-0'>
                      <path d='M3 8l4 4 6-6' stroke={plan.isPopular ? '#fff' : 'var(--accent)'} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>
              <a href='#contact' className='block w-full py-3.5 text-center text-xs font-bold tracking-widest uppercase transition-all duration-250'
                style={plan.isPopular
                  ? { background: 'var(--accent)', color: '#fff', borderRadius: 'var(--r-full)' }
                  : { border: '1.5px solid var(--border)', color: 'var(--fg)', borderRadius: 'var(--r-full)' }}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

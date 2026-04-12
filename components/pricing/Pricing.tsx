
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CONTENT } from '@/lib/content'

gsap.registerPlugin(ScrollTrigger)

interface Plan {
  id: string
  title: string
  description: string
  features: readonly string[]
  cta: string
  price?: string
  oldPrice?: string
  isPopular?: boolean
}

function PricingCard({ plan }: { plan: Plan }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    gsap.to(cardRef.current, { rotateX: -y * 12, rotateY: x * 12, duration: 0.4, ease: 'power2.out', transformPerspective: 800 })
  }

  const onMouseLeave = () => {
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className='relative flex flex-col p-8 border transition-all duration-300 hover:border-[var(--accent)]'
      style={{
        background: plan.isPopular ? 'rgba(255,77,0,0.04)' : 'var(--card-bg)',
        borderColor: plan.isPopular ? 'var(--accent)' : 'var(--border)',
        transformStyle: 'preserve-3d',
      }}
      data-reveal='true'
    >
      {plan.isPopular === true && (
        <div className='absolute -top-3 left-8 px-4 py-1 text-xs font-bold tracking-widest uppercase'
          style={{ background: 'var(--accent)', color: 'var(--bg)' }}>
          Most popular
        </div>
      )}

      <div className='mb-8 pb-8 border-b' style={{ borderColor: 'var(--border)' }}>
        <h3 className='text-2xl font-black mb-2'>{plan.title}</h3>
        <p className='text-sm text-[var(--fg-muted)] leading-relaxed mb-6'>{plan.description}</p>
        {plan.price ? (
          <div>
            {plan.oldPrice && (
              <span className='text-sm line-through text-[var(--fg-muted)]'>{plan.oldPrice}EUR</span>
            )}
            <div className='flex items-baseline gap-2 mt-1'>
              <span className='text-5xl font-black'>{plan.price}</span>
              <span className='text-[var(--fg-muted)] text-sm'>EUR / project</span>
            </div>
          </div>
        ) : (
          <div className='text-3xl font-black' style={{ color: 'var(--accent)' }}>Custom</div>
        )}
      </div>

      <ul className='flex flex-col gap-4 mb-8 flex-1'>
        {plan.features.map((feat, i) => (
          <li key={i} className='flex items-center gap-3 text-sm text-[var(--fg-muted)]'>
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
              <path d='M3 8l4 4 6-6' stroke='var(--accent)' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/>
            </svg>
            {feat}
          </li>
        ))}
      </ul>

      <a href='#contact'
        className='block w-full py-4 text-center text-sm font-bold tracking-widest uppercase transition-all duration-300'
        style={plan.isPopular ? { background: 'var(--accent)', color: 'var(--bg)' } : { border: '1px solid var(--border)', color: 'var(--fg)' }}
      >
        {plan.cta}
      </a>
    </div>
  )
}

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const header = sectionRef.current?.querySelector('.pricing-header') as HTMLElement | null
      const cards = sectionRef.current?.querySelectorAll('[data-reveal]') ?? []
      if (header) gsap.fromTo(header,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      )
      gsap.fromTo(cards,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const plans: Plan[] = CONTENT.pricing.map(p => ({ ...p, features: p.features as readonly string[] }))

  return (
    <section ref={sectionRef} id='pricing' className='py-32 px-6 md:px-12 lg:px-20'>
      <div className='max-w-7xl mx-auto'>
        <div className='pricing-header text-center mb-20 opacity-0'>
          <span className='text-xs tracking-[0.3em] uppercase text-[var(--fg-muted)] block mb-4'>Pricing</span>
          <h2 className='text-4xl md:text-6xl font-black mb-4'>Solutions for every need</h2>
          <p className='text-[var(--fg-muted)] max-w-lg mx-auto'>No surprises. Clear pricing, real results.</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-0 border' style={{ borderColor: 'var(--border)' }}>
          {plans.map((plan) => <PricingCard key={plan.id} plan={plan} />)}
        </div>
      </div>
    </section>
  )
}

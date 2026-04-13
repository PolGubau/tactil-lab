'use client'
import { useTranslation } from '@/shared/i18n/hooks'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code2, Palette, Smartphone, Zap } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface FeatureCardData {
  number: string
  title: string
  description: string
  tag: string
  icon: React.ReactNode
  visual: React.ReactNode
  span: string
}

// Fixed-height image box — prevents aspect-ratio distortion across different column spans
function ProjectImage({ src, alt, position = 'object-top' }: { src: string; alt: string; position?: string }) {
  return (
    <div className='relative overflow-hidden rounded-xl mt-4' style={{ height: '180px' }}>
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${position} transition-transform duration-700 group-hover:scale-105`}
        sizes='(max-width: 768px) 100vw, 50vw'
      />
    </div>
  )
}

function BentoCard({ feat }: { feat: FeatureCardData }) {
  return (
    <div
      data-f-card
      className={`feat-card group flex flex-col p-7 md:p-9 bg-card rounded-xl border border-soft shadow-sm ${feat.span}`}
    >
      {/* Header */}
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-xl flex items-center justify-center bg-accent text-ink'>
            {feat.icon}
          </div>
          <span className='text-[9px] tracking-[0.22em] uppercase font-bold px-3 py-1.5 rounded-full bg-accent text-ink'>
            {feat.tag}
          </span>
        </div>
        <span className='text-6xl font-black leading-none select-none text-ink opacity-[0.07]'>
          {feat.number}
        </span>
      </div>

      {/* Image — fixed height keeps all cards visually consistent */}
      {feat.visual}

      {/* Text */}
      <div className='mt-6 flex-1'>
        <h3 className='text-xl md:text-2xl font-black leading-[1.1] mb-2 text-balance'>{feat.title}</h3>
        <p className='text-sm leading-relaxed text-muted text-pretty'>{feat.description}</p>
      </div>

      <div className='h-px w-10 mt-5 bg-accent opacity-60' />
    </div>
  )
}

export default function Features() {
  const t = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  const features: FeatureCardData[] = [
    {
      number: '01', tag: t.feature_1_tag,
      title: t.feature_1_title, description: t.feature_1_desc,
      span: 'col-span-1 md:col-span-2',
      icon: <Palette size={18} />,
      visual: <ProjectImage src='/projects/acetate/landing.webp' alt='Acetate ecommerce design' />,
    },
    {
      number: '02', tag: t.feature_2_tag,
      title: t.feature_2_title, description: t.feature_2_desc,
      span: 'col-span-1',
      icon: <Code2 size={18} />,
      visual: <ProjectImage src='/projects/novahair/calendar-filters.webp' alt='NovaHair admin panel' />,
    },
    {
      number: '03', tag: t.feature_3_tag,
      title: t.feature_3_title, description: t.feature_3_desc,
      span: 'col-span-1',
      icon: <Smartphone size={18} />,
      visual: (
        <div className='flex gap-2 mt-4 overflow-hidden rounded-xl' style={{ height: '180px' }}>
          {/* Desktop screenshot — wider */}
          <div className='relative flex-1 overflow-hidden rounded-l-xl'>
            <Image
              src='/projects/acetate/about.webp'
              alt='Desktop view'
              fill
              className='object-cover object-top transition-transform duration-700 group-hover:scale-105'
              sizes='20vw'
            />
          </div>
          {/* Mobile screenshot — narrower */}
          <div className='relative overflow-hidden rounded-r-xl' style={{ width: '36%' }}>
            <Image
              src='/projects/novahair/book-appointment.webp'
              alt='Mobile view'
              fill
              className='object-cover object-top transition-transform duration-700 group-hover:scale-105'
              sizes='12vw'
            />
          </div>
        </div>
      ),
    },
    {
      number: '04', tag: t.feature_4_tag,
      title: t.feature_4_title, description: t.feature_4_desc,
      span: 'col-span-1 md:col-span-2',
      icon: <Zap size={18} />,
      visual: <ProjectImage src='/projects/novahair/metrics.webp' alt='Performance metrics dashboard' position='object-center' />,
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('[data-f-card]')
      if (!cards) return
      cards.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 48, x: i % 2 === 0 ? -20 : 20 }, {
          opacity: 1, y: 0, x: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' },
          delay: (i % 2) * 0.12,
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id='features' style={{ padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,5rem)', background: 'var(--bg-subtle)' }}>
      <div className='max-w-7xl mx-auto'>
        <div data-f-card className='mb-12 md:mb-16'>
          <span className='pill mb-5 block w-fit'>{t.features_label}</span>
          <h2 className='font-black leading-[0.88] tracking-tight text-balance' style={{ fontSize: 'clamp(2.8rem,5.5vw,6rem)' }}>
            {t.features_headline}{' '}
            <span className='text-accent'>{t.features_headline_accent}</span>
          </h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {features.map(feat => <BentoCard key={feat.number} feat={feat} />)}
        </div>
      </div>
    </section>
  )
}

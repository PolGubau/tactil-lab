'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from '@/shared/i18n/hooks'

gsap.registerPlugin(ScrollTrigger)

interface FeatureCardData {
  number: string; title: string; description: string; tag: string; color: string; video?: string
}

function FeatureCard({ feat }: { feat: FeatureCardData }) {
  return (
    <div className='feature-card flex-shrink-0 w-[min(520px,88vw)] h-screen flex flex-col justify-between p-8 md:p-12 mr-4'
      style={{ background: 'var(--bg-card)', borderRadius: 'var(--r-xl)', border: '1px solid var(--border-soft)', boxShadow: 'var(--shadow-sm)' }}>
      <div className='flex items-start justify-between'>
        <span className='text-7xl md:text-8xl font-black leading-none select-none' style={{ color: feat.color, opacity: 0.08 }}>{feat.number}</span>
        <span className='text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 font-semibold' style={{ borderRadius: 'var(--r-full)', background: feat.color + '18', color: feat.color }}>{feat.tag}</span>
      </div>

      {feat.video ? (
        <div className='overflow-hidden flex-shrink-0 max-h-48' style={{ borderRadius: 'var(--r-lg)' }}>
          <video src={feat.video} autoPlay muted loop playsInline className='w-full h-full object-cover' />
        </div>
      ) : (
        <div className='flex-1 flex items-center justify-center my-6'>
          <div className='w-full h-28 border border-dashed' style={{ borderRadius: 'var(--r-lg)', borderColor: feat.color + '30' }} />
        </div>
      )}

      <div>
        <h3 className='text-2xl md:text-3xl font-black leading-[1.1] mb-4'>{feat.title}</h3>
        <p className='text-base leading-relaxed max-w-sm' style={{ color: 'var(--fg-muted)' }}>{feat.description}</p>
      </div>

      <div className='h-px w-12' style={{ background: feat.color, opacity: 0.4 }} />
    </div>
  )
}

export default function Features() {
  const t = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const features: FeatureCardData[] = [
    { number: '01', title: t.feature_1_title, description: t.feature_1_desc, tag: t.feature_1_tag, color: '#E84500', video: undefined },
    { number: '02', title: t.feature_2_title, description: t.feature_2_desc, tag: t.feature_2_tag, color: '#A8C400', video: undefined },
    { number: '03', title: t.feature_3_title, description: t.feature_3_desc, tag: t.feature_3_tag, color: '#0097B2', video: undefined },
    { number: '04', title: t.feature_4_title, description: t.feature_4_desc, tag: t.feature_4_tag, color: '#7C5CBF', video: undefined },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      if (!track) return
      const totalWidth = track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: -totalWidth, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current, start: 'top top',
          end: () => '+=' + (totalWidth + window.innerHeight),
          scrub: 1, pin: true, anticipatePin: 1,
        },
      })

      track.querySelectorAll('.feature-card').forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 60 }, {
          opacity: 1, y: 0, duration: 0.8, delay: i * 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [t])

  return (
    <section ref={sectionRef} id='features' className='overflow-hidden' style={{ background: 'var(--bg-subtle)' }}>
      <div ref={trackRef} className='flex w-max items-stretch' style={{ willChange: 'transform', gap: '1rem', padding: '2rem 2rem 2rem 5vw' }}>
        {/* Intro card */}
        <div className='feature-card flex-shrink-0 w-[min(420px,80vw)] h-[calc(100vh-4rem)] flex flex-col justify-between p-8 md:p-12'
          style={{ background: 'var(--bg-card)', borderRadius: 'var(--r-xl)', border: '1px solid var(--border-soft)' }}>
          <div>
            <span className='pill mb-6 block w-fit'>{t.features_label}</span>
            <h2 className='text-4xl md:text-5xl font-black leading-[0.9] tracking-tight'>
              {t.features_headline}<br />
              <span style={{ color: 'var(--accent)' }}>{t.features_headline_accent}</span>
            </h2>
          </div>
          <div className='flex items-center gap-3 text-sm font-medium' style={{ color: 'var(--fg-muted)' }}>
            <span>{t.scroll_hint}</span>
            <svg width='28' height='10' viewBox='0 0 28 10' fill='none'><path d='M0 5h24M20 1l4 4-4 4' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' /></svg>
          </div>
        </div>

        {features.map(feat => <FeatureCard key={feat.number} feat={feat} />)}
      </div>
    </section>
  )
}

'use client'
import { useTranslation } from '@/shared/i18n/hooks'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code2, Palette, Smartphone, Zap } from 'lucide-react'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

// ── Illustration components ───────────────────────────────────────────────────

function DesignIllustration({ color }: { color: string }) {
  return (
    <div className='rounded-2xl p-5 mt-auto' style={{ background: `${color}0D`, border: `1px solid ${color}22` }}>
      <div className='flex gap-2 mb-4'>
        {['#1A1714', color, '#F7F4EF', '#7a7068', '#b5afa8'].map((c, i) => (
          <div key={c + i} className='w-7 h-7 rounded-lg shrink-0' style={{ background: c }} />
        ))}
      </div>
      <div className='space-y-2'>
        <div className='h-4 rounded' style={{ background: 'var(--fg)', opacity: 0.7, width: '65%' }} />
        <div className='h-2.5 rounded' style={{ background: 'var(--fg)', opacity: 0.14, width: '100%' }} />
        <div className='h-2.5 rounded' style={{ background: 'var(--fg)', opacity: 0.09, width: '80%' }} />
      </div>
      <div className='flex gap-2 mt-4'>
        <div className='flex-1 h-9 rounded-xl' style={{ background: color, opacity: 0.22 }} />
        <div className='flex-1 h-9 rounded-xl border' style={{ borderColor: `${color}40` }} />
      </div>
    </div>
  )
}

function DevIllustration({ color }: { color: string }) {
  const lines = [
    { w: '60%', accent: true }, { w: '85%', accent: false }, { w: '45%', accent: false },
    { w: '70%', accent: true }, { w: '55%', accent: false }, { w: '90%', accent: false },
  ]
  return (
    <div className='rounded-2xl overflow-hidden mt-auto' style={{ background: '#1A1714', border: `1px solid ${color}22` }}>
      <div className='flex items-center gap-1.5 px-3 py-2.5 border-b' style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        {['#EF4444', '#F59E0B', '#10B981'].map((c) => (
          <span key={c} className='w-2.5 h-2.5 rounded-full' style={{ background: c, opacity: 0.75 }} />
        ))}
        <span className='ml-2 text-[9px] text-white/25 font-mono'>index.tsx</span>
      </div>
      <div className='p-4 space-y-2.5 font-mono'>
        {lines.map((l, i) => (
          <div key={i} className='flex gap-2 items-center'>
            <span className='text-[9px] w-4 text-white/20 select-none'>{i + 1}</span>
            <div className='h-2 rounded-full' style={{ width: l.w, background: l.accent ? color : 'rgba(255,255,255,0.14)' }} />
          </div>
        ))}
      </div>
    </div>
  )
}

function ResponsiveIllustration({ color }: { color: string }) {
  return (
    <div className='flex items-end justify-center gap-3 mt-auto'>
      <div className='flex-1 flex flex-col gap-1'>
        <div className='w-full rounded-xl overflow-hidden' style={{ background: 'var(--bg-subtle)', border: `1px solid ${color}28`, aspectRatio: '16/10' }}>
          <div className='h-3 border-b flex items-center px-2 gap-1' style={{ borderColor: `${color}20` }}>
            {[0, 1, 2].map(d => <span key={d} className='w-1.5 h-1.5 rounded-full bg-black/10' />)}
          </div>
          <div className='p-2 space-y-1'>
            <div className='h-1.5 rounded-full bg-black/10 w-3/4' />
            <div className='h-1 rounded-full bg-black/6 w-full' />
          </div>
        </div>
        <div className='h-1.5 rounded-full mx-auto w-8 bg-black/10' />
      </div>
      <div style={{ width: '36%' }} className='flex flex-col gap-1'>
        <div className='w-full rounded-xl overflow-hidden' style={{ background: 'var(--bg-subtle)', border: `2px solid ${color}44`, aspectRatio: '3/4' }}>
          <div className='p-2 space-y-1'>
            <div className='h-2 rounded-full w-full' style={{ background: color, opacity: 0.35 }} />
            <div className='h-1 rounded-full bg-black/8 w-4/5' />
          </div>
        </div>
        <div className='h-2 w-2 rounded-full mx-auto bg-black/15' />
      </div>
      <div style={{ width: '20%' }} className='flex flex-col gap-1'>
        <div className='w-full rounded-2xl overflow-hidden' style={{ background: 'var(--fg)', border: `2px solid ${color}`, aspectRatio: '9/19.5' }}>
          <div className='p-1.5 space-y-1'>
            <div className='h-1 rounded-full mx-auto w-4 bg-white/20' />
            <div className='h-1 rounded-full bg-white/28 w-full' />
            <div className='mt-1 h-4 rounded-lg w-full' style={{ background: color, opacity: 0.7 }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function PerformanceIllustration({ color }: { color: string }) {
  const metrics = [
    { label: 'LCP', value: '0.8s', score: 95 },
    { label: 'CLS', value: '0.01', score: 100 },
    { label: 'FID', value: '12ms', score: 98 },
  ]
  return (
    <div className='rounded-2xl p-5 mt-auto' style={{ background: `${color}08`, border: `1px solid ${color}1A` }}>
      <div className='flex items-center justify-between mb-4'>
        <span className='text-[9px] uppercase tracking-widest font-semibold' style={{ color: 'var(--fg-muted)' }}>Performance</span>
        <span className='text-3xl font-black leading-none' style={{ color }}>100</span>
      </div>
      {metrics.map((m) => (
        <div key={m.label} className='flex items-center gap-3 mb-2'>
          <span className='text-[9px] font-mono w-7 text-right' style={{ color: 'var(--fg-muted)' }}>{m.label}</span>
          <div className='flex-1 h-1.5 rounded-full overflow-hidden' style={{ background: 'rgba(26,23,20,0.08)' }}>
            <div className='h-full rounded-full' style={{ width: `${m.score}%`, background: color }} />
          </div>
          <span className='text-[9px] font-semibold w-8' style={{ color: 'var(--fg-muted)' }}>{m.value}</span>
        </div>
      ))}
    </div>
  )
}

// ── Feature data type ─────────────────────────────────────────────────────────

interface FeatureCardData {
  number: string
  title: string
  description: string
  tag: string
  icon: React.ReactNode
  illustration: React.ReactNode
  /** grid span class - controls bento layout */
  span: string
}

// ── Bento card ────────────────────────────────────────────────────────────────

function BentoCard({ feat }: { feat: FeatureCardData }) {
  return (
    <div
      data-f-card
      className={`feat-card flex flex-col justify-between p-7 md:p-9 min-h-80 bg-card rounded-xl border border-soft shadow-sm ${feat.span}`}
    >
      {/* Header */}
      <div className='flex items-start justify-between mb-4'>
        <div className='flex items-center gap-3'>
          {/* Icon: accent bg + dark icon — always readable */}
          <div className='w-10 h-10 rounded-xl flex items-center justify-center bg-accent text-ink'>
            {feat.icon}
          </div>
          {/* Tag: accent bg + dark text — always readable */}
          <span className='text-[9px] tracking-[0.22em] uppercase font-bold px-3 py-1.5 rounded-full bg-accent text-ink'>
            {feat.tag}
          </span>
        </div>
        {/* Number: dark ink at very low opacity — subtle, never lime-on-white */}
        <span className='text-6xl font-black leading-none select-none text-ink opacity-[0.07]'>
          {feat.number}
        </span>
      </div>

      {/* Illustration */}
      {feat.illustration}

      {/* Text */}
      <div className='mt-6'>
        <h3 className='text-xl md:text-2xl font-black leading-[1.1] mb-2'>
          {feat.title}
        </h3>
        <p className='text-sm leading-relaxed text-muted'>
          {feat.description}
        </p>
      </div>

      {/* Bottom accent line — lime as decoration, not text */}
      <div className='h-px w-10 mt-5 bg-accent opacity-60' />
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function Features() {
  const t = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)

  const ACCENT = '#c4eb36'

  const features: FeatureCardData[] = [
    {
      number: '01', tag: t.feature_1_tag,
      title: t.feature_1_title, description: t.feature_1_desc,
      span: 'col-span-1 md:col-span-2',
      icon: <Palette size={18} />,
      illustration: <DesignIllustration color={ACCENT} />,
    },
    {
      number: '02', tag: t.feature_2_tag,
      title: t.feature_2_title, description: t.feature_2_desc,
      span: 'col-span-1',
      icon: <Code2 size={18} />,
      illustration: <DevIllustration color={ACCENT} />,
    },
    {
      number: '03', tag: t.feature_3_tag,
      title: t.feature_3_title, description: t.feature_3_desc,
      span: 'col-span-1',
      icon: <Smartphone size={18} />,
      illustration: <ResponsiveIllustration color={ACCENT} />,
    },
    {
      number: '04', tag: t.feature_4_tag,
      title: t.feature_4_title, description: t.feature_4_desc,
      span: 'col-span-1 md:col-span-2',
      icon: <Zap size={18} />,
      illustration: <PerformanceIllustration color={ACCENT} />,
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('[data-f-card]')
      if (!cards) return

      cards.forEach((card, i) => {
        const fromLeft = i % 2 === 0
        gsap.fromTo(
          card,
          { opacity: 0, y: 48, x: fromLeft ? -20 : 20 },
          {
            opacity: 1, y: 0, x: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
            delay: (i % 2) * 0.12,
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section ref={sectionRef} id='features' style={{ padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,5rem)', background: 'var(--bg-subtle)' }}>
      <div className='max-w-7xl mx-auto'>

        {/* Section header */}
        <div data-f-card className='mb-12 md:mb-16'>
          <span className='pill mb-5 block w-fit'>{t.features_label}</span>
          <h2 className='font-black leading-[0.88] tracking-tight'
            style={{ fontSize: 'clamp(2.8rem,5.5vw,6rem)' }}>
            {t.features_headline}{' '}
            <span className='text-accent'>{t.features_headline_accent}</span>
          </h2>
        </div>

        {/* Bento grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {features.map(feat => <BentoCard key={feat.number} feat={feat} />)}
        </div>

      </div>
    </section>
  )
}

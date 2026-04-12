'use client'
import { useTranslation } from '@/shared/i18n/hooks'

export default function Marquee() {
  const t = useTranslation()
  // 2× duplication for seamless loop with translateX(-50%)
  const row1 = [...t.marquee_items, ...t.marquee_items]
  const row2 = [...t.marquee_items, ...t.marquee_items]

  return (
    <div className='py-5 border-y overflow-hidden select-none'
      style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-subtle)' }}>
      {/* Row 1: scrolls right → left */}
      <div className='marquee-track flex whitespace-nowrap mb-2'>
        {row1.map((item, i) => (
          <span key={i} className='flex items-center gap-4 px-5 text-[10px] tracking-[0.22em] uppercase font-semibold flex-shrink-0'
            style={{ color: 'var(--fg-muted)' }}>
            {item}
            <span className='w-1.5 h-1.5 rounded-full flex-shrink-0'
              style={{ background: i % 2 === 0 ? 'var(--accent)' : 'rgba(26,23,20,0.2)' }} />
          </span>
        ))}
      </div>
      {/* Row 2: scrolls left → right */}
      <div className='marquee-track-reverse flex whitespace-nowrap'>
        {row2.map((item, i) => (
          <span key={i} className='flex items-center gap-4 px-5 text-[10px] tracking-[0.22em] uppercase font-medium flex-shrink-0'
            style={{ color: 'var(--fg-subtle)' }}>
            {item}
            <span className='w-1 h-1 rounded-full flex-shrink-0'
              style={{ border: '1px solid var(--border)' }} />
          </span>
        ))}
      </div>
    </div>
  )
}

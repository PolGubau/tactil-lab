'use client'
import { useTranslation } from '@/shared/i18n/hooks'

export default function Marquee() {
  const t = useTranslation()
  const items = [...t.marquee_items, ...t.marquee_items, ...t.marquee_items]

  return (
    <div className='py-4 border-y overflow-hidden' style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-subtle)' }}>
      <div className='marquee-track flex gap-0 whitespace-nowrap'>
        {items.map((item, i) => (
          <span key={i} className='flex items-center gap-5 px-5 text-[10px] tracking-[0.22em] uppercase font-semibold' style={{ color: 'var(--fg-muted)' }}>
            {item}
            <span className='w-1 h-1 rounded-full' style={{ background: 'var(--accent)', flexShrink: 0 }} />
          </span>
        ))}
      </div>
    </div>
  )
}

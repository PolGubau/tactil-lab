
'use client'
import { CONTENT } from '@/lib/content'

const items = [...CONTENT.marquee, ...CONTENT.marquee]

export default function Marquee() {
  return (
    <div className='py-6 border-y overflow-hidden' style={{ borderColor: 'var(--border)' }}>
      <div className='marquee-track flex gap-0 whitespace-nowrap'>
        {items.map((item, i) => (
          <span key={i} className='flex items-center gap-6 px-6 text-sm tracking-[0.2em] uppercase text-[var(--fg-muted)]'>
            {item}
            <span className='w-1.5 h-1.5 rounded-full flex-shrink-0' style={{ background: 'var(--accent)' }} />
          </span>
        ))}
        {items.map((item, i) => (
          <span key={i+100} className='flex items-center gap-6 px-6 text-sm tracking-[0.2em] uppercase text-[var(--fg-muted)]'>
            {item}
            <span className='w-1.5 h-1.5 rounded-full flex-shrink-0' style={{ background: 'var(--accent)' }} />
          </span>
        ))}
      </div>
    </div>
  )
}

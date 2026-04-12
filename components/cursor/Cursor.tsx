
'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 })

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' })
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' })

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX); yDot(e.clientY)
      xRing(e.clientX); yRing(e.clientY)
    }
    document.addEventListener('mousemove', onMove)

    const onEnter = () => {
      dot.classList.add('is-hovering')
      ring.classList.add('is-hovering')
    }
    const onLeave = () => {
      dot.classList.remove('is-hovering')
      ring.classList.remove('is-hovering')
    }

    const targets = document.querySelectorAll('a, button, [data-cursor]')
    targets.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div ref={dotRef} className='cursor' />
      <div ref={ringRef} className='cursor-follower' />
    </>
  )
}

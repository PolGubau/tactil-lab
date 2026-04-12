'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
    }

    const animate = () => {
      followerX += (mouseX - followerX) * 0.12
      followerY += (mouseY - followerY) * 0.12
      follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(animate)
    }

    const onEnter = () => { cursor.classList.add('is-hovering'); follower.classList.add('is-hovering') }
    const onLeave = () => { cursor.classList.remove('is-hovering'); follower.classList.remove('is-hovering') }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    raf = requestAnimationFrame(animate)
    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className='cursor' />
      <div ref={followerRef} className='cursor-follower' />
    </>
  )
}

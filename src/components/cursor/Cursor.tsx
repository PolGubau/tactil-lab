'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Don't run on touch/mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0
    let visible = false
    let raf: number

    const show = () => {
      if (visible) return
      visible = true
      cursor.style.opacity = '1'
      follower.style.opacity = '1'
    }

    const hide = () => {
      visible = false
      cursor.style.opacity = '0'
      follower.style.opacity = '0'
      cursor.classList.remove('is-hovering', 'is-clicking')
      follower.classList.remove('is-hovering', 'is-clicking')
    }

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
      show()
    }

    const animate = () => {
      followerX += (mouseX - followerX) * 0.12
      followerY += (mouseY - followerY) * 0.12
      follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(animate)
    }

    const onEnter = () => { cursor.classList.add('is-hovering'); follower.classList.add('is-hovering') }
    const onLeave = () => { cursor.classList.remove('is-hovering'); follower.classList.remove('is-hovering') }
    const onDown = () => { cursor.classList.add('is-clicking'); follower.classList.add('is-clicking') }
    const onUp = () => { cursor.classList.remove('is-clicking'); follower.classList.remove('is-clicking') }

    // Hide when mouse leaves the browser window
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)

    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    // Hide during scroll; show again on next mousemove
    let scrollTimer: ReturnType<typeof setTimeout>
    const onScroll = () => {
      hide()
      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(show, 150)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Start hidden — only show after first mousemove
    hide()
    raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
      clearTimeout(scrollTimer)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className='cursor' style={{ opacity: 0 }} />
      <div ref={followerRef} className='cursor-follower' style={{ opacity: 0 }} />
    </>
  )
}

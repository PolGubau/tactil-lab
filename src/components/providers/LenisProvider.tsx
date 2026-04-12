'use client'
import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    let raf: number
    function animate(time: number) {
      lenis.raf(time)
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => { lenis.destroy(); cancelAnimationFrame(raf) }
  }, [])

  return <>{children}</>
}

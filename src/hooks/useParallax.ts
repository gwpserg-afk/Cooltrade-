import { useEffect, useRef, useState } from 'react'

/**
 * Lightweight parallax: returns a translateY (px) for an element based on how
 * far it has moved through the viewport. `speed` > 0 drifts down, < 0 drifts up.
 * No-ops under prefers-reduced-motion.
 */
export function useParallax(speed = 0.15) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const update = () => {
      const rect = el.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const fromCenter = center - window.innerHeight / 2
      setOffset(-fromCenter * speed)
      raf = 0
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [speed])

  return { ref, offset }
}

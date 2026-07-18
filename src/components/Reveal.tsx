import { createElement, useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Fades + lifts children into view on scroll. Respects prefers-reduced-motion
 * by rendering immediately without animation.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'section'
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setVisible(true)
      return
    }
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return createElement(
    as,
    {
      ref,
      className,
      style: {
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(14px)',
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      },
    },
    children,
  )
}

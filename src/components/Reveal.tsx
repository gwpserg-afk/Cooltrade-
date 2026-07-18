import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'

type Direction = 'up' | 'left' | 'right' | 'scale' | 'none'

const OFFSETS: Record<Direction, string> = {
  up: 'translateY(20px)',
  left: 'translateX(-28px)',
  right: 'translateX(28px)',
  scale: 'scale(0.96)',
  none: 'none',
}

/**
 * Fades + moves children into view on scroll. `from` sets the entrance
 * direction so sections can alternate for a more dynamic feel. Respects
 * prefers-reduced-motion by rendering immediately without animation.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
  from = 'up',
  style,
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'section'
  from?: Direction
  style?: CSSProperties
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
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : OFFSETS[from],
        transition: `opacity 0.7s cubic-bezier(0.2,0.7,0.2,1) ${delay}ms, transform 0.7s cubic-bezier(0.2,0.7,0.2,1) ${delay}ms`,
        willChange: visible ? 'auto' : 'opacity, transform',
      },
    },
    children,
  )
}

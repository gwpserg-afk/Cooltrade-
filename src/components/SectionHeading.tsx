import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

/**
 * Editorial section heading: optional mono section number + kicker, then a
 * serif h2 and an optional intro. Left-aligned by default (EXON-style).
 */
export function SectionHeading({
  num,
  kicker,
  title,
  intro,
  align = 'left',
}: {
  num?: string
  kicker?: string
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'center'
}) {
  return (
    <Reveal className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-[60ch]'}>
      {(num || kicker) && (
        <div
          className={`mb-3 flex items-baseline gap-3 ${align === 'center' ? 'justify-center' : ''}`}
        >
          {num && <span className="sec-num">{num}</span>}
          {kicker && <span className="kicker">{kicker}</span>}
        </div>
      )}
      <h2 className="text-3xl font-semibold leading-[1.03] sm:text-4xl lg:text-[2.9rem]">{title}</h2>
      {intro && (
        <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">{intro}</p>
      )}
    </Reveal>
  )
}

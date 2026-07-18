import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

/**
 * Interior-page hero — editorial, on the paper ground with a serif headline
 * and mono kicker. Supports an italic-blue accent via the `.accent-i` class
 * inside the title node.
 */
export function PageHero({
  kicker,
  title,
  subtitle,
  children,
}: {
  kicker: string
  title: ReactNode
  subtitle?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="border-b border-line bg-paper">
      <div className="container-page py-14 sm:py-20 lg:py-24">
        <Reveal className="max-w-3xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="kicker-line" />
            <span className="kicker">{kicker}</span>
          </div>
          <h1 className="font-serif text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </section>
  )
}

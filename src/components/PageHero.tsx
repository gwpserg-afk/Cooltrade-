import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

/** Compact interior-page hero on the dark steel base. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-steel-950 text-white">
      <div className="absolute inset-0 bg-grid-steel opacity-60" />
      <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-frost-500/15 blur-3xl" />
      <div className="container-page relative py-14 sm:py-20">
        <Reveal className="max-w-3xl">
          <span className="eyebrow text-frost-300">{eyebrow}</span>
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-300 sm:text-lg">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-7">{children}</div>}
        </Reveal>
      </div>
    </section>
  )
}

import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  icon,
}: {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'center' | 'left'
  icon?: ReactNode
}) {
  return (
    <Reveal
      className={
        align === 'center'
          ? 'mx-auto max-w-2xl text-center'
          : 'max-w-2xl text-left'
      }
    >
      {eyebrow && (
        <span className={`eyebrow ${align === 'center' ? 'justify-center' : ''}`}>
          {icon}
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-steel-600 sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}

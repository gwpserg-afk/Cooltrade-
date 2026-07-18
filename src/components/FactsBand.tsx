import { useTranslation } from 'react-i18next'
import { useProducts } from '@/hooks/useProducts'
import { useCountUp } from '@/hooks/useCountUp'

/**
 * Animated facts band — count-up figures on a fixed-dark ground. Adds motion
 * and a strong visual break in the page rhythm. All figures are plain facts
 * (no revenue / projections).
 */
function Stat({
  value,
  suffix,
  label,
  delay,
}: {
  value: number
  suffix?: string
  label: string
  delay: number
}) {
  const { ref, value: n } = useCountUp<HTMLDivElement>(value, 1400 + delay)
  return (
    <div className="text-center sm:text-left">
      <div
        ref={ref}
        className="font-serif text-[clamp(2.6rem,6vw,4.2rem)] font-semibold leading-none tabular-nums"
        style={{ color: '#F3EEE4' }}
      >
        {n}
        {suffix && <span style={{ color: '#8B99FF' }}>{suffix}</span>}
      </div>
      <div className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.12em]" style={{ color: 'rgba(243,238,228,0.6)' }}>
        {label}
      </div>
    </div>
  )
}

export function FactsBand() {
  const { t } = useTranslation()
  const products = useProducts()

  return (
    <section style={{ background: '#17120B' }}>
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:py-16 lg:grid-cols-4 lg:py-20">
        <Stat value={24} suffix="h" label={t('home.facts.delivery')} delay={0} />
        <Stat value={4} label={t('home.facts.families')} delay={150} />
        <Stat value={products.length} suffix="+" label={t('home.facts.refs')} delay={300} />
        <Stat value={30} suffix=" j" label={t('home.facts.credit')} delay={450} />
      </div>
    </section>
  )
}

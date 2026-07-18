import { useTranslation } from 'react-i18next'

/**
 * Subtle scrolling strip of what the depot carries. Pauses on hover; renders
 * static (wrapped) when the viewer prefers reduced motion.
 */
export function Marquee() {
  const { t } = useTranslation()
  const items = [
    'R410A',
    'R32',
    'R134a',
    'R22',
    t('marquee.compressors'),
    t('marquee.condensers'),
    'Manifolds',
    t('marquee.pumps'),
    t('marquee.detectors'),
    t('marquee.brazing'),
    t('marquee.kits'),
  ]
  const row = (
    <div className="flex w-max shrink-0 motion-safe:animate-marquee motion-reduce:flex-wrap motion-reduce:justify-center">
      {items.concat(items).map((it, i) => (
        <span
          key={i}
          className="flex items-center gap-5 whitespace-nowrap px-6 font-mono text-[0.82rem] uppercase tracking-[0.08em] text-ink-soft"
        >
          {it}
          <span className="h-[5px] w-[5px] rounded-full bg-blue/50" />
        </span>
      ))}
    </div>
  )
  return (
    <div className="overflow-hidden border-y border-line bg-card-2 py-4" aria-hidden="true">
      <div className="group flex">{row}</div>
    </div>
  )
}

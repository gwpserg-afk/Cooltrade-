import { useTranslation } from 'react-i18next'
import { Reveal } from './Reveal'
import { WrenchIcon, BuildingIcon, HotelIcon, CartIcon, UsersIcon } from './Icons'

const segments = [
  { key: 'tech', Icon: WrenchIcon },
  { key: 'hvac', Icon: BuildingIcon },
  { key: 'hotels', Icon: HotelIcon },
  { key: 'supermarkets', Icon: CartIcon },
  { key: 'resellers', Icon: UsersIcon },
] as const

export function TrustStrip() {
  const { t } = useTranslation()
  return (
    <Reveal className="flex flex-wrap gap-2.5">
      {segments.map((s) => (
        <span
          key={s.key}
          className="inline-flex items-center gap-2.5 rounded-full border border-line bg-card px-5 py-3 text-[0.94rem] font-medium text-ink"
        >
          <s.Icon className="h-[19px] w-[19px] text-blue" />
          {t(`home.segments.items.${s.key}`)}
        </span>
      ))}
    </Reveal>
  )
}

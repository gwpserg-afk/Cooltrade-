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
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {segments.map((s, i) => (
        <Reveal
          key={s.key}
          delay={i * 60}
          className="flex flex-col items-center gap-3 rounded-2xl border border-steel-100 bg-white px-4 py-6 text-center"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-frost-50 text-frost-600">
            <s.Icon className="h-6 w-6" />
          </span>
          <span className="text-sm font-semibold text-steel-700">
            {t(`home.segments.items.${s.key}`)}
          </span>
        </Reveal>
      ))}
    </div>
  )
}

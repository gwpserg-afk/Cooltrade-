import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Category } from '@/data/catalog'
import { ProductIcon, ArrowRightIcon } from './Icons'

const accentMap = {
  frost: {
    ring: 'group-hover:border-frost-300',
    iconBg: 'bg-frost-50 text-frost-600 group-hover:bg-frost-500 group-hover:text-white',
    link: 'text-frost-600',
  },
  steel: {
    ring: 'group-hover:border-steel-300',
    iconBg: 'bg-steel-50 text-steel-600 group-hover:bg-steel-700 group-hover:text-white',
    link: 'text-steel-600',
  },
  sun: {
    ring: 'group-hover:border-sun-300',
    iconBg: 'bg-sun-50 text-sun-600 group-hover:bg-sun-500 group-hover:text-white',
    link: 'text-sun-600',
  },
} as const

export function ProductCategoryCard({
  category,
  count,
}: {
  category: Category
  count?: number
}) {
  const { t } = useTranslation()
  const a = accentMap[category.accent]

  return (
    <Link
      to={`/catalogue?cat=${category.id}`}
      className={`card group flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${a.ring}`}
    >
      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl transition-colors duration-300 ${a.iconBg}`}
      >
        <ProductIcon name={category.icon} className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-bold text-steel-900">
        {t(`catalog.categories.${category.i18nKey}.name`)}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-steel-600">
        {t(`catalog.categories.${category.i18nKey}.short`)}
      </p>
      <span className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${a.link}`}>
        {typeof count === 'number' && (
          <span className="mr-1 rounded-full bg-steel-100 px-2 py-0.5 text-xs font-semibold text-steel-500">
            {count}
          </span>
        )}
        {t('common.learnMore')}
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  )
}

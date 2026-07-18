import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Category } from '@/data/catalog'
import { ProductIcon, ArrowRightIcon } from './Icons'

/**
 * Catalog category card — warm bordered surface, serif title, cobalt "Voir"
 * link, and (for gases) the refrigerant colour-code dots as a subtle signature.
 */
export function ProductCategoryCard({
  category,
  count,
}: {
  category: Category
  count?: number
}) {
  const { t } = useTranslation()

  return (
    <Link
      to={`/catalogue?cat=${category.id}`}
      className="group card-surface flex flex-col p-7 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:shadow-[0_26px_50px_-30px_rgba(24,20,16,0.4)]"
    >
      <div className="flex items-start justify-between">
        <span className="text-blue">
          <ProductIcon name={category.icon} className="h-11 w-11" strokeWidth={1.5} />
        </span>
        {typeof count === 'number' && (
          <span className="font-mono text-[0.72rem] text-ink-faint">
            {String(count).padStart(2, '0')} réf.
          </span>
        )}
      </div>
      <h3 className="mt-5 font-serif text-2xl font-semibold tracking-tight">
        {t(`catalog.categories.${category.i18nKey}.name`)}
      </h3>
      <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">
        {t(`catalog.categories.${category.i18nKey}.short`)}
      </p>

      {category.id === 'gaz' && (
        <div className="mt-4 flex gap-1.5">
          {['#C67DA0', '#7E9CB6', '#5C9DD0', '#9AA3B2'].map((c) => (
            <span key={c} className="h-2.5 w-2.5 rounded-[3px]" style={{ background: c }} />
          ))}
        </div>
      )}

      <div className="mt-5 flex items-center justify-between border-t border-line-soft pt-4">
        <span className="font-mono text-[0.68rem] uppercase tracking-wide text-ink-faint">
          {t('common.contactForPrice')}
        </span>
        <span className="link-blue">
          {t('common.learnMore')}
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

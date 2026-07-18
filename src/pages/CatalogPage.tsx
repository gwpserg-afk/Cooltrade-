import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CATEGORIES, type CategoryId } from '@/data/catalog'
import { useProducts } from '@/hooks/useProducts'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { ProductIcon, WhatsAppIcon, ArrowRightIcon, CheckIcon } from '@/components/Icons'
import { whatsappLink } from '@/config/brand'

export function CatalogPage() {
  const { t } = useTranslation()
  const products = useProducts()
  const [params, setParams] = useSearchParams()
  const active = (params.get('cat') as CategoryId | 'all') || 'all'

  const setCat = (cat: string) => {
    if (cat === 'all') setParams({})
    else setParams({ cat })
  }

  const visible = useMemo(
    () => (active === 'all' ? products : products.filter((p) => p.categoryId === active)),
    [products, active],
  )

  const tabs = [{ id: 'all' as const }, ...CATEGORIES]

  return (
    <>
      <PageHero
        eyebrow={t('catalog.eyebrow')}
        title={t('catalog.title')}
        subtitle={t('catalog.subtitle')}
      />

      {/* Price note */}
      <div className="border-b border-steel-100 bg-sun-50/60">
        <div className="container-page flex items-center gap-3 py-3.5 text-sm text-steel-700">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sun-500 text-white">
            <CheckIcon className="h-4 w-4" />
          </span>
          {t('catalog.priceNote')}
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-30 border-b border-steel-100 bg-white/95 backdrop-blur lg:top-20">
        <div className="container-page">
          <div className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((tab) => {
              const id = 'id' in tab ? tab.id : 'all'
              const label =
                id === 'all'
                  ? t('common.allCategories')
                  : t(`catalog.categories.${id}.name`)
              const isActive = active === id
              return (
                <button
                  key={id}
                  onClick={() => setCat(id)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-steel-900 text-white'
                      : 'bg-steel-50 text-steel-600 hover:bg-steel-100'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Category intro (when one category selected) */}
      {active !== 'all' && (
        <div className="border-b border-steel-100 bg-frost-50/40">
          <div className="container-page py-6">
            <p className="max-w-3xl text-steel-600">
              {t(`catalog.categories.${active}.desc`)}
            </p>
          </div>
        </div>
      )}

      {/* Products grid */}
      <section className="section">
        <div className="container-page">
          {visible.length === 0 ? (
            <p className="py-10 text-center text-steel-500">{t('catalog.empty')}</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((product, i) => {
                const category = CATEGORIES.find((c) => c.id === product.categoryId)!
                return (
                  <Reveal key={product.id} delay={(i % 3) * 70} className="card flex flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-frost-50 text-frost-600">
                        <ProductIcon name={category.icon} className="h-6 w-6" />
                      </span>
                      {product.badge && (
                        <span className="rounded-full bg-sun-100 px-2.5 py-1 text-xs font-semibold text-sun-800">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-steel-900">{product.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-steel-600">
                      {product.description}
                    </p>

                    {product.formats.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-steel-400">
                          {t('common.formats')}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {product.formats.map((f) => (
                            <span
                              key={f}
                              className="rounded-md border border-steel-200 bg-steel-50 px-2 py-1 text-xs font-medium text-steel-700"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-5 flex items-center justify-between border-t border-steel-100 pt-4">
                      <span className="text-sm font-semibold text-steel-500">
                        {t('common.contactForPrice')}
                      </span>
                      <a
                        href={whatsappLink(`Bonjour, je souhaite un devis pour : ${product.name}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#25D366] hover:underline"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        {t('common.quoteShort')}
                      </a>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-14 rounded-2xl border border-steel-100 bg-steel-50/60 p-8 text-center sm:p-10">
            <h3 className="text-xl font-bold text-steel-900 sm:text-2xl">
              {t('catalog.quoteCta')}
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-steel-600">
              {t('catalog.priceNote')}
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {t('common.whatsapp')}
              </a>
              <Link to="/contact" className="btn-secondary">
                {t('common.quote')}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

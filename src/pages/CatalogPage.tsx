import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CATEGORIES, type CategoryId } from '@/data/catalog'
import { useProducts } from '@/hooks/useProducts'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { ProductIcon, WhatsAppIcon, ArrowRightIcon, CheckIcon } from '@/components/Icons'
import { whatsappLink } from '@/config/brand'
import { tx, txArray } from '@/lib/localize'

export function CatalogPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
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
        kicker={t('catalog.eyebrow')}
        title={
          <>
            {t('home.h.catLead')} <span className="accent-i">{t('home.h.catAccent')}</span>.
          </>
        }
        subtitle={t('catalog.subtitle')}
      />

      {/* Price note */}
      <div className="border-b border-line bg-card-2">
        <div className="container-page flex items-center gap-3 py-3.5 text-sm text-ink-soft">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue text-on-blue">
            <CheckIcon className="h-4 w-4" />
          </span>
          {t('catalog.priceNote')}
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-[74px] z-30 border-b border-line bg-paper/95 backdrop-blur">
        <div className="container-page">
          <div className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((tab) => {
              const id = 'id' in tab ? tab.id : 'all'
              const label =
                id === 'all' ? t('common.allCategories') : t(`catalog.categories.${id}.name`)
              const isActive = active === id
              return (
                <button
                  key={id}
                  onClick={() => setCat(id)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-ink text-paper'
                      : 'border border-line bg-card text-ink-soft hover:text-ink'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {active !== 'all' && (
        <div className="border-b border-line bg-card">
          <div className="container-page py-6">
            <p className="max-w-3xl text-ink-soft">{t(`catalog.categories.${active}.desc`)}</p>
          </div>
        </div>
      )}

      {/* Products */}
      <section className="section">
        <div className="container-page">
          {visible.length === 0 ? (
            <p className="py-10 text-center text-ink-faint">{t('catalog.empty')}</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((product, i) => {
                const category = CATEGORIES.find((c) => c.id === product.categoryId)!
                return (
                  <Reveal key={product.id} delay={(i % 3) * 70} className="card-surface flex flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-blue">
                        <ProductIcon name={category.icon} className="h-9 w-9" strokeWidth={1.5} />
                      </span>
                      {product.badge && (
                        <span className="rounded-full bg-blue/10 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wide text-blue">
                          {tx(product.badge, lang)}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 font-serif text-xl font-semibold tracking-tight">
                      {tx(product.name, lang)}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                      {tx(product.description, lang)}
                    </p>

                    {product.specs && product.specs.length > 0 && (
                      <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                        {txArray(product.specs, lang).map((s) => (
                          <li key={s} className="flex items-center gap-1 text-xs text-ink-faint">
                            <CheckIcon className="h-3.5 w-3.5 text-blue" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    )}

                    {product.formats.length > 0 && (
                      <div className="mt-4">
                        <p className="font-mono text-[0.62rem] uppercase tracking-wide text-ink-faint">
                          {t('common.formats')}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {product.formats.map((f) => (
                            <span
                              key={f}
                              className="rounded-md border border-line bg-card-2 px-2 py-1 font-mono text-xs text-ink-soft"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-5 flex items-center justify-between border-t border-line-soft pt-4">
                      <span className="font-mono text-[0.66rem] uppercase tracking-wide text-ink-faint">
                        {t('common.contactForPrice')}
                      </span>
                      <a
                        href={whatsappLink(
                          t('whatsapp.productQuote', { product: tx(product.name, lang) }),
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-wa hover:underline"
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
          <div className="mt-14 rounded-2xl border border-line bg-card-2 p-8 text-center sm:p-10">
            <h3 className="font-serif text-2xl font-semibold tracking-tight">{t('catalog.quoteCta')}</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-ink-soft">{t('catalog.priceNote')}</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-wa">
                <WhatsAppIcon className="h-5 w-5" />
                {t('common.whatsapp')}
              </a>
              <Link to="/contact" className="btn-ink">
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

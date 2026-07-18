import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { whatsappLink } from '@/config/brand'
import { CATEGORIES } from '@/data/catalog'
import { useProducts } from '@/hooks/useProducts'
import { SectionHeading } from '@/components/SectionHeading'
import { ProductCategoryCard } from '@/components/ProductCategoryCard'
import { TrustStrip } from '@/components/TrustStrip'
import { Reveal } from '@/components/Reveal'
import {
  WhatsAppIcon,
  ArrowRightIcon,
  TruckIcon,
  SnowflakeIcon,
  WalletIcon,
  ShieldIcon,
} from '@/components/Icons'

const valueIcons = {
  delivery: TruckIcon,
  advice: SnowflakeIcon,
  credit: WalletIcon,
  storage: ShieldIcon,
} as const

export function HomePage() {
  const { t } = useTranslation()
  const products = useProducts()

  const valueKeys = ['delivery', 'advice', 'credit', 'storage'] as const
  const stats = [
    { value: t('home.hero.stat1'), label: t('home.hero.stat1Label') },
    { value: t('home.hero.stat2'), label: t('home.hero.stat2Label') },
    { value: t('home.hero.stat3'), label: t('home.hero.stat3Label') },
  ]

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-steel-950 text-white">
        <div className="absolute inset-0 bg-grid-steel opacity-60" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-frost-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-sun-500/10 blur-3xl" />

        <div className="container-page relative grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:items-center lg:py-28">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow text-frost-300">{t('home.hero.eyebrow')}</span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-4 text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
                {t('home.hero.title')}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-steel-300 sm:text-lg">
                {t('home.hero.subtitle')}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappLink(t('whatsapp.defaultMessage'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {t('home.hero.ctaPrimary')}
                </a>
                <Link to="/contact" className="btn-outline border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10">
                  {t('home.hero.ctaSecondary')}
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Stat cards */}
          <div className="lg:col-span-5">
            <Reveal delay={320} className="grid grid-cols-3 gap-3 sm:gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center backdrop-blur sm:p-5"
                >
                  <div className="font-display text-2xl font-bold text-frost-300 sm:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs leading-tight text-steel-400 sm:text-sm">
                    {s.label}
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Value props ---------------- */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow={t('home.values.eyebrow')}
            title={t('home.values.title')}
            subtitle={t('home.values.subtitle')}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {valueKeys.map((key, i) => {
              const Icon = valueIcons[key]
              return (
                <Reveal key={key} delay={i * 80} className="card p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-frost-50 text-frost-600">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-steel-900">
                    {t(`home.values.items.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel-600">
                    {t(`home.values.items.${key}.desc`)}
                  </p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Catalog overview ---------------- */}
      <section className="section bg-steel-50/60">
        <div className="container-page">
          <SectionHeading
            eyebrow={t('catalog.eyebrow')}
            title={t('home.categories.title')}
            subtitle={t('home.categories.subtitle')}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((cat) => (
              <ProductCategoryCard
                key={cat.id}
                category={cat}
                count={products.filter((p) => p.categoryId === cat.id).length}
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/catalogue" className="btn-secondary">
              {t('home.categories.cta')}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- Segments / trust ---------------- */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow={t('home.segments.eyebrow')}
            title={t('home.segments.title')}
            subtitle={t('home.segments.subtitle')}
          />
          <div className="mt-12">
            <TrustStrip />
          </div>
        </div>
      </section>

      {/* ---------------- Final CTA ---------------- */}
      <section className="section pt-0">
        <div className="container-page">
          <Reveal className="relative overflow-hidden rounded-3xl bg-steel-900 px-6 py-14 text-center sm:px-12 sm:py-16">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-frost-500/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-sun-500/10 blur-3xl" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                {t('home.cta.title')}
              </h2>
              <p className="mt-3 text-steel-300">{t('home.cta.subtitle')}</p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {t('home.cta.primary')}
                </a>
                <Link to="/espace-pro" className="btn-outline border-white/20 bg-transparent text-white hover:border-white/40 hover:bg-white/10">
                  {t('home.cta.secondary')}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

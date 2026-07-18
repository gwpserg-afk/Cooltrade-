import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { whatsappLink } from '@/config/brand'
import { CATEGORIES } from '@/data/catalog'
import { useProducts } from '@/hooks/useProducts'
import { useParallax } from '@/hooks/useParallax'
import { SectionHeading } from '@/components/SectionHeading'
import { ProductCategoryCard } from '@/components/ProductCategoryCard'
import { TrustStrip } from '@/components/TrustStrip'
import { Marquee } from '@/components/Marquee'
import { Reveal } from '@/components/Reveal'
import { FounderNote } from '@/components/FounderNote'
import { FactsBand } from '@/components/FactsBand'
import { HeroArt } from '@/components/HeroArt'
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
  const { t, i18n } = useTranslation()
  const products = useProducts()
  const valueKeys = ['delivery', 'advice', 'credit', 'storage'] as const
  const qm = i18n.language.startsWith('fr') ? ' ?' : '?'
  const art = useParallax(0.06)

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="border-b border-line">
        <div className="container-page grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-24">
          <Reveal from="left">
            <div className="mb-6 flex items-center gap-3">
              <span className="kicker-line" />
              <span className="kicker">{t('home.hero.eyebrow')}</span>
            </div>
            <h1 className="max-w-[15ch] font-serif text-[clamp(2.6rem,5.6vw,4.8rem)] font-semibold leading-[0.99] tracking-tight">
              {t('home.h.heroLead')} <span className="accent-i">{t('home.h.heroAccent')}</span>.
            </h1>
            <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-ink-soft sm:text-xl">
              {t('home.hero.subtitle')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappLink(t('whatsapp.defaultMessage'))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa"
              >
                <WhatsAppIcon className="h-[18px] w-[18px]" />
                {t('home.hero.ctaPrimary')}
                <ArrowRightIcon className="h-[17px] w-[17px]" />
              </a>
              <Link to="/catalogue" className="btn-outline">
                {t('common.viewCatalog')}
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.74rem] text-ink-soft">
              <span className="flex items-center gap-2">
                <span className="h-[7px] w-[7px] rounded-full bg-wa" />
                {t('home.hero.metaStock')}
              </span>
              <span className="hidden h-4 w-px bg-line sm:block" />
              <span>{t('home.hero.metaDelivery')}</span>
              <span className="hidden h-4 w-px bg-line sm:block" />
              <span>{t('home.hero.metaCredit')}</span>
            </div>
          </Reveal>

          <Reveal from="scale" delay={120} className="relative">
            <div ref={art.ref} style={{ transform: `translateY(${art.offset}px)` }} className="text-ink">
              <HeroArt className="w-full drop-shadow-[0_30px_60px_rgba(24,20,16,0.15)]" />
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee />

      {/* ---------------- Facts (animated, dark) ---------------- */}
      <FactsBand />

      {/* ---------------- 01 Catalogue ---------------- */}
      <section className="section" id="catalogue">
        <div className="container-page">
          <SectionHeading
            num="01"
            kicker={t('catalog.eyebrow')}
            title={
              <>
                {t('home.h.catLead')} <span className="accent-i">{t('home.h.catAccent')}</span>.
              </>
            }
            intro={t('home.categories.subtitle')}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {CATEGORIES.map((cat, i) => (
              <Reveal key={cat.id} from={i % 2 === 0 ? 'left' : 'right'} delay={(i % 2) * 80}>
                <ProductCategoryCard
                  category={cat}
                  count={products.filter((p) => p.categoryId === cat.id).length}
                />
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/catalogue" className="btn-ink">
              {t('home.categories.cta')}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- 02 Value props (editorial list) ---------------- */}
      <section className="section bg-card-2 pt-16 sm:pt-24">
        <div className="container-page">
          <SectionHeading
            num="02"
            kicker={t('home.values.eyebrow')}
            title={
              <>
                {t('home.h.valLead')} <span className="accent-i">{t('home.h.valAccent')}</span>.
              </>
            }
          />
          <div className="mt-11 border-t border-line">
            {valueKeys.map((key, i) => {
              const Icon = valueIcons[key]
              return (
                <Reveal
                  key={key}
                  from="up"
                  delay={i * 60}
                  className="grid grid-cols-[auto_1fr] items-center gap-x-7 gap-y-1 border-b border-line py-6 sm:grid-cols-[auto_1fr_auto] sm:gap-x-8"
                >
                  <span className="font-mono text-[0.78rem] text-blue">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold tracking-tight">
                      {t(`home.values.items.${key}.title`)}
                    </h3>
                    <p className="mt-1.5 max-w-[60ch] text-[0.98rem] text-ink-soft">
                      {t(`home.values.items.${key}.desc`)}
                    </p>
                  </div>
                  <Icon className="hidden h-8 w-8 text-ink-faint sm:block" strokeWidth={1.5} />
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------------- 03 Founder ---------------- */}
      <FounderNote num="03" />

      {/* ---------------- 04 Segments ---------------- */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            num="04"
            kicker={t('home.segments.eyebrow')}
            title={
              <>
                {t('home.h.segLead')} <span className="accent-i">{t('home.h.segAccent')}</span>.
              </>
            }
          />
          <div className="mt-11">
            <TrustStrip />
          </div>
        </div>
      </section>

      {/* ---------------- Final CTA (always-dark block) ---------------- */}
      <section style={{ background: '#0A0D14' }}>
        <div className="container-page flex flex-col items-center py-16 text-center sm:py-24 lg:py-28">
          <Reveal from="scale" className="flex flex-col items-center">
            <h2
              className="max-w-[15ch] font-serif text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05]"
              style={{ color: '#F2F5FA' }}
            >
              {t('home.h.ctaLead')}{' '}
              <span className="font-serif italic" style={{ color: '#8B99FF' }}>
                {t('home.h.ctaAccent')}
              </span>
              {qm}
            </h2>
            <p className="mt-4 max-w-[46ch] text-lg" style={{ color: 'rgba(242,245,250,0.64)' }}>
              {t('home.cta.subtitle')}
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-wa">
                <WhatsAppIcon className="h-[18px] w-[18px]" />
                {t('home.cta.primary')}
              </a>
              <Link
                to="/espace-pro"
                className="btn"
                style={{
                  background: 'transparent',
                  color: '#F2F5FA',
                  borderColor: 'rgba(242,245,250,0.28)',
                }}
              >
                {t('home.cta.secondary')}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

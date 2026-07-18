import { useTranslation } from 'react-i18next'
import { whatsappLink } from '@/config/brand'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { FounderNote } from '@/components/FounderNote'
import { SnowflakeIcon, ShieldIcon, UsersIcon, WalletIcon, WhatsAppIcon } from '@/components/Icons'

const diffIcons = {
  stock: SnowflakeIcon,
  proximity: UsersIcon,
  compliance: ShieldIcon,
  terms: WalletIcon,
} as const

export function AboutPage() {
  const { t } = useTranslation()
  const diffKeys = ['stock', 'proximity', 'compliance', 'terms'] as const

  return (
    <>
      <PageHero kicker={t('about.eyebrow')} title={t('about.title')} subtitle={t('about.lead')} />

      {/* Mission / Vision */}
      <section className="section">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          <Reveal className="card-surface p-8">
            <h2 className="font-serif text-xl font-semibold tracking-tight">{t('about.mission.title')}</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{t('about.mission.desc')}</p>
          </Reveal>
          <Reveal delay={80} className="card-surface p-8">
            <h2 className="font-serif text-xl font-semibold tracking-tight">{t('about.vision.title')}</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{t('about.vision.desc')}</p>
          </Reveal>
        </div>
      </section>

      {/* Founder */}
      <FounderNote />

      {/* R32 explainer */}
      <section className="section">
        <div className="container-page">
          <Reveal className="grid gap-8 rounded-3xl border border-line bg-card-2 p-8 sm:p-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <span className="kicker">{t('about.r32.eyebrow')}</span>
              <h2 className="mt-3 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
                {t('about.r32.title')}
              </h2>
              <span className="mt-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue text-on-blue">
                <SnowflakeIcon className="h-8 w-8" />
              </span>
            </div>
            <div className="space-y-4 lg:col-span-7">
              <p className="leading-relaxed text-ink-soft">{t('about.r32.p1')}</p>
              <p className="leading-relaxed text-ink-soft">{t('about.r32.p2')}</p>
              <a
                href={whatsappLink(t('about.r32.whatsappMessage'))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa mt-2"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {t('about.r32.cta')}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Differentiators */}
      <section className="section pt-0">
        <div className="container-page">
          <SectionHeading title={t('about.diff.title')} />
          <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {diffKeys.map((key, i) => {
              const Icon = diffIcons[key]
              return (
                <Reveal key={key} delay={i * 70} className="card-surface p-6">
                  <span className="text-blue">
                    <Icon className="h-9 w-9" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-4 font-semibold text-ink">{t(`about.diff.items.${key}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {t(`about.diff.items.${key}.desc`)}
                  </p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

import { useTranslation } from 'react-i18next'
import { brand, whatsappLink } from '@/config/brand'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import {
  SnowflakeIcon,
  ShieldIcon,
  UsersIcon,
  WalletIcon,
  WhatsAppIcon,
} from '@/components/Icons'

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
      <PageHero eyebrow={t('about.eyebrow')} title={t('about.title')} subtitle={t('about.lead')} />

      {/* Mission / Vision */}
      <section className="section">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          <Reveal className="card p-8">
            <h2 className="text-xl font-bold text-steel-900">{t('about.mission.title')}</h2>
            <p className="mt-3 leading-relaxed text-steel-600">{t('about.mission.desc')}</p>
          </Reveal>
          <Reveal delay={80} className="card p-8">
            <h2 className="text-xl font-bold text-steel-900">{t('about.vision.title')}</h2>
            <p className="mt-3 leading-relaxed text-steel-600">{t('about.vision.desc')}</p>
          </Reveal>
        </div>
      </section>

      {/* Founder note */}
      <section className="section pt-0">
        <div className="container-page">
          <Reveal className="overflow-hidden rounded-3xl bg-steel-900 p-8 text-white sm:p-12">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-3">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-frost-500/20 text-4xl font-bold text-frost-300">
                  {brand.founder
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>
              </div>
              <div className="lg:col-span-9">
                <span className="eyebrow text-frost-300">{t('about.founder.title')}</span>
                <blockquote className="mt-3 text-lg leading-relaxed text-steel-100 sm:text-xl">
                  « {t('about.founder.quote')} »
                </blockquote>
                <div className="mt-5">
                  <div className="font-bold text-white">{t('about.founder.name')}</div>
                  <div className="text-sm text-steel-400">{t('about.founder.role')}</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* R32 explainer */}
      <section className="section pt-0">
        <div className="container-page">
          <Reveal className="grid gap-8 rounded-3xl border border-frost-100 bg-frost-50/50 p-8 sm:p-12 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <span className="eyebrow">{t('about.r32.eyebrow')}</span>
              <h2 className="mt-3 text-2xl font-bold text-steel-900 sm:text-3xl">
                {t('about.r32.title')}
              </h2>
              <span className="mt-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-frost-500 text-white">
                <SnowflakeIcon className="h-8 w-8" />
              </span>
            </div>
            <div className="space-y-4 lg:col-span-7">
              <p className="leading-relaxed text-steel-700">{t('about.r32.p1')}</p>
              <p className="leading-relaxed text-steel-700">{t('about.r32.p2')}</p>
              <a
                href={whatsappLink(
                  'Bonjour, je souhaite des conseils sur la transition vers le R32.',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp mt-2"
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
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {diffKeys.map((key, i) => {
              const Icon = diffIcons[key]
              return (
                <Reveal key={key} delay={i * 70} className="card p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-steel-50 text-steel-700">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-bold text-steel-900">
                    {t(`about.diff.items.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel-600">
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

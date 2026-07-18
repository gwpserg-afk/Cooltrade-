import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { whatsappLink } from '@/config/brand'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import {
  SnowflakeIcon,
  ShieldIcon,
  WrenchIcon,
  WalletIcon,
  CheckIcon,
  WhatsAppIcon,
  ArrowRightIcon,
} from '@/components/Icons'

const serviceIcons = {
  consulting: SnowflakeIcon,
  training: ShieldIcon,
  aftersales: WrenchIcon,
  credit: WalletIcon,
} as const

export function ServicesPage() {
  const { t } = useTranslation()
  const serviceKeys = ['consulting', 'training', 'aftersales', 'credit'] as const
  const eligibility = t('services.creditProgram.eligibility', { returnObjects: true }) as string[]

  return (
    <>
      <PageHero
        kicker={t('services.eyebrow')}
        title={t('services.title')}
        subtitle={t('services.subtitle')}
      />

      <section className="section">
        <div className="container-page">
          <div className="grid gap-5 sm:grid-cols-2">
            {serviceKeys.map((key, i) => {
              const Icon = serviceIcons[key]
              return (
                <Reveal key={key} delay={i * 70} className="card-surface flex gap-5 p-7">
                  <span className="text-blue">
                    <Icon className="h-11 w-11" strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-semibold tracking-tight">
                      {t(`services.items.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {t(`services.items.${key}.desc`)}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Credit program */}
      <section className="section pt-0">
        <div className="container-page">
          <Reveal className="overflow-hidden rounded-3xl border border-line bg-card-2">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 sm:p-10 lg:p-12">
                <span className="kicker">{t('services.creditProgram.eyebrow')}</span>
                <h2 className="mt-3 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
                  {t('services.creditProgram.title')}
                </h2>
                <p className="mt-4 text-ink-soft">{t('services.creditProgram.desc')}</p>
                <Link to="/espace-pro" className="btn-blue mt-7">
                  {t('services.creditProgram.cta')}
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
              <div className="border-t border-line bg-card p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                <h3 className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-ink-faint">
                  {t('services.creditProgram.eligibilityTitle')}
                </h3>
                <ul className="mt-5 space-y-4">
                  {eligibility.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue text-on-blue">
                        <CheckIcon className="h-4 w-4" />
                      </span>
                      <span className="text-sm text-ink-soft">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section pt-0">
        <div className="container-page">
          <Reveal
            className="flex flex-col items-center rounded-3xl px-6 py-14 text-center sm:px-12"
            style={{ background: '#0A0D14' }}
          >
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl" style={{ color: '#F2F5FA' }}>
              {t('services.cta.title')}
            </h2>
            <p className="mx-auto mt-3 max-w-xl" style={{ color: 'rgba(242,245,250,0.64)' }}>
              {t('services.cta.subtitle')}
            </p>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-wa mt-7">
              <WhatsAppIcon className="h-5 w-5" />
              {t('services.cta.primary')}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}

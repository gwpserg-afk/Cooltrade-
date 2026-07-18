import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { whatsappLink } from '@/config/brand'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { SnowflakeIcon, ShieldIcon, WrenchIcon, WalletIcon, CheckIcon, WhatsAppIcon, ArrowRightIcon } from '@/components/Icons'

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
        eyebrow={t('services.eyebrow')}
        title={t('services.title')}
        subtitle={t('services.subtitle')}
      />

      {/* Services grid */}
      <section className="section">
        <div className="container-page">
          <div className="grid gap-5 sm:grid-cols-2">
            {serviceKeys.map((key, i) => {
              const Icon = serviceIcons[key]
              return (
                <Reveal key={key} delay={i * 80} className="card flex gap-5 p-6 sm:p-7">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-frost-50 text-frost-600">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-steel-900">
                      {t(`services.items.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-steel-600">
                      {t(`services.items.${key}.desc`)}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Credit program highlight */}
      <section className="section pt-0">
        <div className="container-page">
          <Reveal className="overflow-hidden rounded-3xl border border-steel-100 bg-steel-50/70">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 sm:p-10 lg:p-12">
                <span className="eyebrow">{t('services.creditProgram.eyebrow')}</span>
                <h2 className="mt-3 text-2xl font-bold text-steel-900 sm:text-3xl">
                  {t('services.creditProgram.title')}
                </h2>
                <p className="mt-4 text-steel-600">{t('services.creditProgram.desc')}</p>
                <Link to="/espace-pro" className="btn-primary mt-7">
                  {t('services.creditProgram.cta')}
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
              <div className="border-t border-steel-100 bg-white p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-steel-500">
                  {t('services.creditProgram.eligibilityTitle')}
                </h3>
                <ul className="mt-5 space-y-4">
                  {eligibility.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-frost-500 text-white">
                        <CheckIcon className="h-4 w-4" />
                      </span>
                      <span className="text-sm text-steel-700">{item}</span>
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
          <Reveal className="rounded-3xl bg-steel-900 px-6 py-12 text-center sm:px-12">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">{t('services.cta.title')}</h2>
            <p className="mx-auto mt-3 max-w-xl text-steel-300">{t('services.cta.subtitle')}</p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-7"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {t('services.cta.primary')}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}

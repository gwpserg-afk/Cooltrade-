import { useTranslation } from 'react-i18next'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { ProCreditForm } from '@/components/ProCreditForm'
import { WalletIcon, TruckIcon, UsersIcon, GaugeIcon } from '@/components/Icons'

const benefitIcons = {
  pricing: GaugeIcon,
  credit: WalletIcon,
  priority: TruckIcon,
  advisor: UsersIcon,
} as const

export function ProPage() {
  const { t } = useTranslation()
  const benefitKeys = ['pricing', 'credit', 'priority', 'advisor'] as const

  return (
    <>
      <PageHero kicker={t('pro.eyebrow')} title={t('pro.title')} subtitle={t('pro.subtitle')} />

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-serif text-2xl font-semibold tracking-tight">
                {t('pro.benefits.title')}
              </h2>
            </Reveal>
            <div className="mt-8 space-y-5">
              {benefitKeys.map((key, i) => {
                const Icon = benefitIcons[key]
                return (
                  <Reveal key={key} delay={i * 70} className="flex gap-4">
                    <span className="mt-0.5 text-blue">
                      <Icon className="h-7 w-7" strokeWidth={1.5} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-ink">{t(`pro.benefits.items.${key}.title`)}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                        {t(`pro.benefits.items.${key}.desc`)}
                      </p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal className="card-surface p-6 sm:p-8">
              <h2 className="font-serif text-xl font-semibold tracking-tight">{t('pro.form.title')}</h2>
              <p className="mt-1.5 text-sm text-ink-soft">{t('pro.form.subtitle')}</p>
              <div className="mt-6">
                <ProCreditForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

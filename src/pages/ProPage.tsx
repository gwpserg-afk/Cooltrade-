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
      <PageHero eyebrow={t('pro.eyebrow')} title={t('pro.title')} subtitle={t('pro.subtitle')} />

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          {/* Benefits */}
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-2xl font-bold text-steel-900">{t('pro.benefits.title')}</h2>
            </Reveal>
            <div className="mt-8 space-y-5">
              {benefitKeys.map((key, i) => {
                const Icon = benefitIcons[key]
                return (
                  <Reveal key={key} delay={i * 70} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-frost-50 text-frost-600">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-bold text-steel-900">
                        {t(`pro.benefits.items.${key}.title`)}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-steel-600">
                        {t(`pro.benefits.items.${key}.desc`)}
                      </p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal className="card p-6 sm:p-8">
              <h2 className="text-xl font-bold text-steel-900">{t('pro.form.title')}</h2>
              <p className="mt-1.5 text-sm text-steel-600">{t('pro.form.subtitle')}</p>
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

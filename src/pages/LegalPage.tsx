import { useTranslation } from 'react-i18next'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'

export function LegalPage() {
  const { t, i18n } = useTranslation()
  const sectionKeys = ['editor', 'registration', 'hosting', 'data', 'ip'] as const
  const today = new Date().toLocaleDateString(i18n.language === 'en' ? 'en-GB' : 'fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <PageHero eyebrow={t('legal.eyebrow')} title={t('legal.title')} />

      <section className="section">
        <div className="container-page max-w-3xl">
          <Reveal>
            <p className="text-sm text-steel-500">
              {t('legal.updated')} : {today}
            </p>
            <p className="mt-4 rounded-xl border border-sun-200 bg-sun-50 p-4 text-sm text-sun-800">
              {t('legal.intro')}
            </p>
          </Reveal>

          <div className="mt-10 space-y-8">
            {sectionKeys.map((key, i) => (
              <Reveal key={key} delay={i * 50}>
                <h2 className="text-lg font-bold text-steel-900">
                  {t(`legal.sections.${key}.title`)}
                </h2>
                <p className="mt-2 leading-relaxed text-steel-600">
                  {t(`legal.sections.${key}.body`)}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

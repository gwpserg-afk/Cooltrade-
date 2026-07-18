import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SnowflakeIcon } from '@/components/Icons'

export function NotFoundPage() {
  const { t } = useTranslation()
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-5 py-20 text-center">
      <div>
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue/10 text-blue">
          <SnowflakeIcon className="h-8 w-8" />
        </span>
        <p className="mt-6 font-serif text-6xl font-semibold">404</p>
        <h1 className="mt-2 font-serif text-2xl font-semibold tracking-tight">{t('notFound.title')}</h1>
        <p className="mt-2 text-ink-soft">{t('notFound.subtitle')}</p>
        <Link to="/" className="btn-blue mt-8">
          {t('notFound.cta')}
        </Link>
      </div>
    </section>
  )
}

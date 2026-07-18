import { useTranslation } from 'react-i18next'
import { AVAILABLE_LANGUAGES } from '@/i18n'

/**
 * Compact FR / EN toggle. Renders only when more than one locale is available,
 * so it disappears automatically if the site is ever reduced to one language.
 */
export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { i18n } = useTranslation()
  if (AVAILABLE_LANGUAGES.length < 2) return null

  const current = (i18n.language || 'fr').slice(0, 2)

  return (
    <div
      className={`inline-flex items-center rounded-lg border border-steel-200 bg-white p-0.5 ${className}`}
      role="group"
      aria-label="Language"
    >
      {AVAILABLE_LANGUAGES.map((lng) => {
        const active = current === lng
        return (
          <button
            key={lng}
            onClick={() => i18n.changeLanguage(lng)}
            aria-pressed={active}
            className={`rounded-md px-2.5 py-1 text-xs font-bold uppercase transition-colors ${
              active
                ? 'bg-steel-900 text-white'
                : 'text-steel-500 hover:text-steel-800'
            }`}
          >
            {lng}
          </button>
        )
      })}
    </div>
  )
}

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import fr from './locales/fr.json'
import en from './locales/en.json'

/**
 * i18n — French-first, bilingual (FR / EN).
 *
 * French is the default and the fallback (the working language of the Senegalese
 * trade market). English mirrors the same key structure in `locales/en.json`.
 * To add a further language (e.g. Wolof), drop another locale file with the same
 * keys and register it in `resources` + `AVAILABLE_LANGUAGES`; no page code
 * changes. Catalog *content* is localized separately via `src/lib/localize.ts`.
 */

export const DEFAULT_LANGUAGE = 'fr'
export const AVAILABLE_LANGUAGES = ['fr', 'en'] as const
export type Language = (typeof AVAILABLE_LANGUAGES)[number]

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: AVAILABLE_LANGUAGES as unknown as string[],
    nonExplicitSupportedLngs: true,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'cooltrade_lang',
    },
  })

/** Keep <html lang> in sync with the active language. */
function syncHtmlLang(lng?: string) {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = (lng || DEFAULT_LANGUAGE).slice(0, 2)
  }
}
// Set once for the language detected at init (the 'languageChanged' event during
// init fires before this handler is registered, so we apply it explicitly here)…
syncHtmlLang(i18n.language)
// …and on every subsequent switch.
i18n.on('languageChanged', syncHtmlLang)

export default i18n

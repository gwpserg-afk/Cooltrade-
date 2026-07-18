import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import fr from './locales/fr.json'

/**
 * i18n scaffolding — French-first.
 *
 * The site ships in French only for now. English (or Wolof) can be added later
 * by dropping a `locales/en.json` with the same key structure and registering
 * it in `resources` below; no page code needs to change. The language switcher
 * in the header is intentionally hidden until a second locale exists.
 */

export const DEFAULT_LANGUAGE = 'fr'
export const AVAILABLE_LANGUAGES = ['fr'] as const
export type Language = (typeof AVAILABLE_LANGUAGES)[number]

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      // en: { translation: en },  // <- add here when an English build is requested
    },
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: AVAILABLE_LANGUAGES as unknown as string[],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'cooltrade_lang',
    },
  })

export default i18n

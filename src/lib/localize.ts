/**
 * Localization helper for *data* (as opposed to UI strings, which live in
 * i18next locale files).
 *
 * Catalog product content is business data managed by the admin panel, so it
 * can't live in the static locale JSON. Instead a product field can be either a
 * plain string (single-language, French) or a `{ fr, en }` pair. `tx()` picks
 * the right one for the active language and always falls back to French, so a
 * product that only has French copy still renders fine on the English site.
 */

import i18n from '@/i18n'

export type Localized = string | { fr: string; en?: string }

export function tx(value: Localized | undefined, lang?: string): string {
  if (value == null) return ''
  if (typeof value === 'string') return value
  const l = (lang ?? i18n.language ?? 'fr').slice(0, 2)
  if (l === 'en' && value.en && value.en.trim()) return value.en
  return value.fr
}

export function txArray(values: Localized[] | undefined, lang?: string): string[] {
  return (values ?? []).map((v) => tx(v, lang))
}

/** Normalise any Localized into a fully-populated { fr, en } pair (for editors). */
export function toPair(value: Localized | undefined): { fr: string; en: string } {
  if (value == null) return { fr: '', en: '' }
  if (typeof value === 'string') return { fr: value, en: '' }
  return { fr: value.fr ?? '', en: value.en ?? '' }
}

/** Build a Localized from an editor pair, collapsing to a string when EN is empty. */
export function fromPair(pair: { fr: string; en: string }): Localized {
  return pair.en.trim() ? { fr: pair.fr, en: pair.en } : pair.fr
}

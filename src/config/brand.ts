/**
 * Central brand & contact configuration.
 *
 * Everything that could change before launch — company name (provisional
 * pending APIX registration), phone, WhatsApp number, address, registration
 * numbers — lives here so a rename or a number swap is a one-file edit and
 * never a find-and-replace across the codebase.
 *
 * Anything marked TODO is a placeholder to confirm with the client.
 */

export const brand = {
  /** Provisional per the business plan (pending APIX name registration). */
  name: 'CoolTrade Sénégal',
  shortName: 'CoolTrade',
  tagline: 'Le partenaire de proximité du frigoriste sénégalais',
  founder: 'Abdoul Lahad Niang',

  // --- Contact -------------------------------------------------------------
  /** Phone in international format for tel: links. TODO: confirm real number. */
  phone: '+221000000000',
  /** Human-readable phone display. TODO: confirm real number. */
  phoneDisplay: '+221 00 000 00 00',

  /**
   * WhatsApp Business number in wa.me format (digits only, country code, no +).
   * TODO: replace with the real CoolTrade WhatsApp Business number.
   */
  whatsappNumber: '221000000000',

  email: 'contact@cooltrade.sn', // TODO: confirm

  address: {
    line1: 'Zone industrielle / VDN', // TODO: confirm exact depot address
    city: 'Dakar',
    country: 'Sénégal',
    // TODO: confirm — used for the map embed
    mapsQuery: 'Dakar, Sénégal',
  },

  hours: [
    { days: 'Lundi – Vendredi', time: '08h30 – 18h30' },
    { days: 'Samedi', time: '09h00 – 14h00' },
    { days: 'Dimanche', time: 'Fermé' },
  ],

  social: {
    // TODO: add real links when available
    facebook: '',
    instagram: '',
    linkedin: '',
  },

  // --- Legal (footer) ------------------------------------------------------
  legal: {
    // Placeholders — not required to be complete at launch.
    ninea: '[TODO: confirm NINEA]',
    rccm: '[TODO: confirm RCCM]',
  },
} as const

/** Pre-built wa.me link with a friendly default French message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${brand.whatsappNumber}`
  const text =
    message ??
    `Bonjour ${brand.name}, je suis un professionnel et je souhaite un renseignement.`
  return `${base}?text=${encodeURIComponent(text)}`
}

export const telLink = `tel:${brand.phone}`
export const mailLink = `mailto:${brand.email}`

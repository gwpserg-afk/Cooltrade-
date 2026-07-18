/**
 * Non-brand site configuration: navigation, admin gate, form endpoint.
 */

export const nav = [
  { key: 'home', path: '/' },
  { key: 'catalog', path: '/catalogue' },
  { key: 'services', path: '/services' },
  { key: 'pro', path: '/espace-pro' },
  { key: 'about', path: '/a-propos' },
  { key: 'contact', path: '/contact' },
] as const

export const site = {
  /**
   * Web3Forms access key for the contact & pro-credit forms.
   * TODO: replace with the real key from https://web3forms.com (free).
   * Leaving the placeholder makes forms fall back to a WhatsApp / mailto flow.
   */
  web3formsKey: 'YOUR_WEB3FORMS_ACCESS_KEY',

  /**
   * Admin panel password. This client-side gate is convenience-only — it keeps
   * the panel out of casual reach on a static host but is NOT real security.
   * When the panel is wired to a backend, move auth server-side.
   * TODO: change this before deploying.
   */
  adminPassword: 'cooltrade-admin',
} as const

export function web3formsConfigured(): boolean {
  const key: string = site.web3formsKey
  return !!key && key !== 'YOUR_WEB3FORMS_ACCESS_KEY' && key.length > 10
}

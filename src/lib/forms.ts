/**
 * Form submission pipeline.
 *
 * Every form goes through here. Behaviour:
 *   - Always records the submission locally so it shows up in the admin panel.
 *   - If a Web3Forms key is configured, also POSTs to Web3Forms (email
 *     notification + their dashboard). Otherwise resolves as "local-only" and
 *     the UI nudges the user toward the WhatsApp fallback.
 *
 * Swap Web3Forms for any endpoint (Formspree, a Cloudflare Function, etc.) by
 * changing `postToService` only.
 */

import { site, web3formsConfigured } from '@/config/site'
import { brand } from '@/config/brand'
import { addSubmission, type SubmissionType } from './store'

export type SubmitResult = 'sent' | 'local-only' | 'error'

async function postToService(
  subject: string,
  data: Record<string, string>,
): Promise<boolean> {
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: site.web3formsKey,
      subject,
      from_name: `${brand.name} — site web`,
      ...data,
    }),
  })
  const json = await res.json().catch(() => ({ success: false }))
  return res.ok && json.success === true
}

export async function submitForm(
  type: SubmissionType,
  subject: string,
  data: Record<string, string>,
): Promise<SubmitResult> {
  // Local record first — never lose a lead.
  addSubmission(type, data)

  if (!web3formsConfigured()) return 'local-only'

  try {
    const ok = await postToService(subject, data)
    return ok ? 'sent' : 'error'
  } catch {
    return 'error'
  }
}

/** Build a WhatsApp message body from arbitrary form fields. */
export function whatsappFromFields(
  intro: string,
  fields: Array<{ label: string; value: string }>,
): string {
  const lines = fields
    .filter((f) => f.value && f.value.trim())
    .map((f) => `${f.label}: ${f.value}`)
  return [intro, '', ...lines].join('\n')
}

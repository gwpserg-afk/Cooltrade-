import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { submitForm, whatsappFromFields } from '@/lib/forms'
import { web3formsConfigured } from '@/config/site'
import { whatsappLink } from '@/config/brand'
import { TextField, SelectField } from './FormFields'
import { FormFeedback, type FeedbackState } from './FormFeedback'
import { WhatsAppIcon } from './Icons'

/**
 * Highest-intent form on the site — kept to 6 fields, with a WhatsApp fallback
 * that pre-fills the same data so no lead is lost to form friction.
 */
export function ProCreditForm() {
  const { t } = useTranslation()
  const [state, setState] = useState<FeedbackState>('idle')
  const [submitting, setSubmitting] = useState(false)
  const volumeKeys = ['small', 'medium', 'large', 'xlarge']

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const fd = new FormData(e.currentTarget)
    const data = {
      name: String(fd.get('name') || ''),
      company: String(fd.get('company') || ''),
      phone: String(fd.get('phone') || ''),
      whatsapp: String(fd.get('whatsapp') || ''),
      regNumber: String(fd.get('regNumber') || ''),
      volume: String(fd.get('volume') || ''),
    }
    const result = await submitForm('pro-credit', `Demande compte pro — ${data.company || data.name}`, data)
    setState(result)
    setSubmitting(false)
    if (result === 'sent' || result === 'local-only') e.currentTarget.reset()
  }

  function waFallback(): string {
    return whatsappLink(
      whatsappFromFields(t('pro.form.whatsappMessage'), [
        { label: t('forms.name'), value: '' },
        { label: t('forms.company'), value: '' },
      ]),
    )
  }

  if (state === 'sent' || state === 'local-only') {
    return <FormFeedback state={state} whatsappMessage={t('pro.form.whatsappMessage')} />
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id="pro-name"
          name="name"
          label={t('forms.name')}
          placeholder={t('forms.namePlaceholder')}
          required
          autoComplete="name"
        />
        <TextField
          id="pro-company"
          name="company"
          label={t('forms.company')}
          placeholder={t('forms.companyPlaceholder')}
          autoComplete="organization"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id="pro-phone"
          name="phone"
          type="tel"
          label={t('forms.phone')}
          placeholder={t('forms.phonePlaceholder')}
          required
          autoComplete="tel"
        />
        <TextField
          id="pro-whatsapp"
          name="whatsapp"
          type="tel"
          label={t('forms.whatsapp')}
          placeholder={t('forms.whatsappPlaceholder')}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id="pro-reg"
          name="regNumber"
          label={t('forms.regNumber')}
          placeholder={t('forms.regNumberPlaceholder')}
        />
        <SelectField id="pro-volume" name="volume" label={t('forms.volume')} defaultValue="" required>
          <option value="" disabled>
            {t('forms.volumePlaceholder')}
          </option>
          {volumeKeys.map((k) => (
            <option key={k} value={t(`forms.volumeOptions.${k}`)}>
              {t(`forms.volumeOptions.${k}`)}
            </option>
          ))}
        </SelectField>
      </div>

      {!web3formsConfigured() && (
        <p className="text-xs text-steel-500">{t('forms.fallbackNotice')}</p>
      )}
      {state === 'error' && (
        <FormFeedback state="error" whatsappMessage={t('pro.form.whatsappMessage')} />
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={submitting}>
          {submitting ? t('forms.submitting') : t('forms.submit')}
        </button>
        <a
          href={waFallback()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp w-full sm:w-auto"
        >
          <WhatsAppIcon className="h-4 w-4" />
          {t('pro.form.whatsappCta')}
        </a>
      </div>
    </form>
  )
}

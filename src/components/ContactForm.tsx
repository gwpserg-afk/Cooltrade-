import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { submitForm } from '@/lib/forms'
import { web3formsConfigured } from '@/config/site'
import { whatsappLink } from '@/config/brand'
import { TextField, TextAreaField, SelectField } from './FormFields'
import { FormFeedback, type FeedbackState } from './FormFeedback'
import { WhatsAppIcon } from './Icons'

export function ContactForm() {
  const { t } = useTranslation()
  const [state, setState] = useState<FeedbackState>('idle')
  const [submitting, setSubmitting] = useState(false)

  const segmentKeys = ['tech', 'hvac', 'hotel', 'supermarket', 'reseller', 'other']

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const fd = new FormData(e.currentTarget)
    const data = {
      name: String(fd.get('name') || ''),
      phone: String(fd.get('phone') || ''),
      email: String(fd.get('email') || ''),
      segment: String(fd.get('segment') || ''),
      message: String(fd.get('message') || ''),
    }
    const result = await submitForm('contact', `Contact — ${data.name}`, data)
    setState(result)
    setSubmitting(false)
    if (result === 'sent' || result === 'local-only') e.currentTarget.reset()
  }

  if (state === 'sent' || state === 'local-only') {
    return <FormFeedback state={state} whatsappMessage={t('contact.whatsappMessage')} />
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id="name"
          name="name"
          label={t('forms.name')}
          placeholder={t('forms.namePlaceholder')}
          required
          autoComplete="name"
        />
        <TextField
          id="phone"
          name="phone"
          type="tel"
          label={t('forms.phone')}
          placeholder={t('forms.phonePlaceholder')}
          required
          autoComplete="tel"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id="email"
          name="email"
          type="email"
          label={t('forms.email')}
          placeholder={t('forms.emailPlaceholder')}
          autoComplete="email"
        />
        <SelectField id="segment" name="segment" label={t('forms.segment')} defaultValue="">
          <option value="" disabled>
            {t('forms.subjectPlaceholder')}
          </option>
          {segmentKeys.map((k) => (
            <option key={k} value={t(`forms.segmentOptions.${k}`)}>
              {t(`forms.segmentOptions.${k}`)}
            </option>
          ))}
        </SelectField>
      </div>
      <TextAreaField
        id="message"
        name="message"
        label={t('forms.message')}
        placeholder={t('forms.messagePlaceholder')}
        rows={4}
        required
      />

      {!web3formsConfigured() && (
        <p className="text-xs text-steel-500">{t('forms.fallbackNotice')}</p>
      )}
      {state === 'error' && (
        <FormFeedback state="error" whatsappMessage={t('contact.whatsappMessage')} />
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={submitting}>
          {submitting ? t('forms.submitting') : t('forms.submit')}
        </button>
        <a
          href={whatsappLink(t('contact.whatsappMessage'))}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp w-full sm:w-auto"
        >
          <WhatsAppIcon className="h-4 w-4" />
          {t('forms.sendWhatsapp')}
        </a>
      </div>
    </form>
  )
}

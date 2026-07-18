import { useTranslation } from 'react-i18next'
import { whatsappLink } from '@/config/brand'
import { WhatsAppIcon, CheckIcon } from './Icons'

export type FeedbackState = 'idle' | 'sent' | 'local-only' | 'error'

/**
 * Shared post-submit feedback for both forms. On success (or local-only save)
 * it always surfaces the WhatsApp fallback, since that's the fastest channel.
 */
export function FormFeedback({
  state,
  whatsappMessage,
}: {
  state: FeedbackState
  whatsappMessage: string
}) {
  const { t } = useTranslation()
  if (state === 'idle') return null

  if (state === 'error') {
    return (
      <div className="rounded-xl border border-rust/40 bg-rust/10 p-4">
        <p className="font-semibold text-rust">{t('forms.errorTitle')}</p>
        <p className="mt-1 text-sm text-ink-soft">{t('forms.errorBody')}</p>
        <a
          href={whatsappLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-wa mt-3"
        >
          <WhatsAppIcon className="h-4 w-4" />
          {t('forms.sendWhatsapp')}
        </a>
      </div>
    )
  }

  return (
    <div className="card-surface p-6 text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-wa text-white">
        <CheckIcon className="h-6 w-6" />
      </span>
      <p className="mt-3 font-serif text-xl font-semibold">{t('forms.successTitle')}</p>
      <p className="mt-1 text-sm text-ink-soft">{t('forms.successBody')}</p>
      <a
        href={whatsappLink(whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-wa mt-4"
      >
        <WhatsAppIcon className="h-4 w-4" />
        {t('common.whatsapp')}
      </a>
    </div>
  )
}

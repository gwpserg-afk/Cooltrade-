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
      <div className="rounded-xl border border-sun-200 bg-sun-50 p-4">
        <p className="font-semibold text-sun-800">{t('forms.errorTitle')}</p>
        <p className="mt-1 text-sm text-sun-700">{t('forms.errorBody')}</p>
        <a
          href={whatsappLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp mt-3"
        >
          <WhatsAppIcon className="h-4 w-4" />
          {t('forms.sendWhatsapp')}
        </a>
      </div>
    )
  }

  // sent OR local-only both read as success to the user; local-only nudges WA.
  return (
    <div className="rounded-xl border border-frost-200 bg-frost-50 p-5 text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-frost-500 text-white">
        <CheckIcon className="h-6 w-6" />
      </span>
      <p className="mt-3 font-semibold text-steel-900">{t('forms.successTitle')}</p>
      <p className="mt-1 text-sm text-steel-600">{t('forms.successBody')}</p>
      <a
        href={whatsappLink(whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-whatsapp mt-4"
      >
        <WhatsAppIcon className="h-4 w-4" />
        {t('common.whatsapp')}
      </a>
    </div>
  )
}

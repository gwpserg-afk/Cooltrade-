import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { whatsappLink } from '@/config/brand'
import { WhatsAppIcon } from './Icons'

/**
 * Persistent WhatsApp Business CTA — the #1 conversion channel for this market.
 * Bottom-right, standard pattern, with a one-time tooltip nudge.
 */
export function WhatsAppFloatingButton() {
  const { t } = useTranslation()
  const [showBubble, setShowBubble] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 2600)
    const hide = setTimeout(() => setShowBubble(false), 9000)
    return () => {
      clearTimeout(timer)
      clearTimeout(hide)
    }
  }, [])

  return (
    <div className="fixed bottom-5 right-4 z-50 flex items-end gap-2 sm:bottom-6 sm:right-6">
      {showBubble && (
        <button
          onClick={() => setShowBubble(false)}
          className="mb-1 max-w-[190px] animate-fade-up rounded-2xl rounded-br-sm border border-line bg-card px-3.5 py-2.5 text-left text-xs font-medium text-ink-soft shadow-lg"
        >
          {t('whatsapp.bubble')}
        </button>
      )}
      <a
        href={whatsappLink(t('whatsapp.defaultMessage'))}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('whatsapp.float')}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-wa text-on-blue shadow-xl transition-transform hover:scale-105 active:scale-95"
      >
        <span className="absolute inset-0 rounded-full bg-wa motion-safe:animate-ring" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </a>
    </div>
  )
}

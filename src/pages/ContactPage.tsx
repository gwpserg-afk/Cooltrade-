import { useTranslation } from 'react-i18next'
import { brand, whatsappLink, telLink, mailLink } from '@/config/brand'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { ContactForm } from '@/components/ContactForm'
import { MapPinIcon, PhoneIcon, WhatsAppIcon, MailIcon, ClockIcon } from '@/components/Icons'
import type { ReactNode } from 'react'

export function ContactPage() {
  const { t } = useTranslation()
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    brand.address.mapsQuery,
  )}&output=embed`

  return (
    <>
      <PageHero
        kicker={t('contact.eyebrow')}
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
      />

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="font-serif text-xl font-semibold tracking-tight">{t('contact.infoTitle')}</h2>
            </Reveal>

            <div className="mt-6 space-y-4">
              <ContactRow icon={<MapPinIcon className="h-5 w-5" />} label={t('contact.depot')}>
                {brand.address.line1}
                <br />
                {brand.address.city}, {brand.address.country}
              </ContactRow>
              <ContactRow icon={<WhatsAppIcon className="h-5 w-5" />} label={t('contact.whatsapp')}>
                <a
                  href={whatsappLink(t('contact.whatsappMessage'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue hover:underline"
                >
                  {brand.phoneDisplay}
                </a>
              </ContactRow>
              <ContactRow icon={<PhoneIcon className="h-5 w-5" />} label={t('contact.phone')}>
                <a href={telLink} className="text-blue hover:underline">
                  {brand.phoneDisplay}
                </a>
              </ContactRow>
              <ContactRow icon={<MailIcon className="h-5 w-5" />} label={t('contact.email')}>
                <a href={mailLink} className="text-blue hover:underline">
                  {brand.email}
                </a>
              </ContactRow>
              <ContactRow icon={<ClockIcon className="h-5 w-5" />} label={t('contact.hours')}>
                <ul className="space-y-0.5">
                  {brand.hours.map((h) => (
                    <li key={h.days} className="flex justify-between gap-6">
                      <span>{h.days}</span>
                      <span className="font-medium text-ink">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </ContactRow>
            </div>

            <div className="mt-6 rounded-2xl border border-line bg-wa/10 p-5">
              <p className="text-sm font-medium text-ink-soft">{t('whatsapp.bubble')}</p>
              <a
                href={whatsappLink(t('contact.whatsappMessage'))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa mt-3 w-full"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {t('common.whatsapp')}
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal className="card-surface p-6 sm:p-8">
              <h2 className="font-serif text-xl font-semibold tracking-tight">{t('contact.formTitle')}</h2>
              <div className="mt-6">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="container-page">
          <Reveal>
            <h2 className="mb-4 font-serif text-xl font-semibold tracking-tight">{t('contact.mapTitle')}</h2>
            <div className="overflow-hidden rounded-2xl border border-line">
              <iframe
                title={t('contact.mapTitle')}
                src={mapSrc}
                width="100%"
                height="380"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full"
              />
            </div>
            <p className="mt-3 text-sm text-ink-faint">{t('contact.mapPlaceholder')}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-line bg-card p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue/10 text-blue">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="font-mono text-[0.64rem] uppercase tracking-wide text-ink-faint">{label}</div>
        <div className="mt-1 text-sm text-ink-soft">{children}</div>
      </div>
    </div>
  )
}

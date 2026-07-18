import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { nav } from '@/config/site'
import { brand, whatsappLink, telLink, mailLink } from '@/config/brand'
import { CATEGORIES } from '@/data/catalog'
import { Logo } from './Logo'
import {
  WhatsAppIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
  ArrowRightIcon,
} from './Icons'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-steel-950 text-steel-300">
      {/* Pro CTA band */}
      <div className="border-b border-white/10">
        <div className="container-page flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl font-bold text-white sm:text-2xl">
              {t('pro.title')}
            </h3>
            <p className="mt-1.5 max-w-lg text-sm text-steel-300">
              {t('pro.subtitle')}
            </p>
          </div>
          <Link to="/espace-pro" className="btn-primary shrink-0">
            {t('footer.proCta')}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="container-page grid grid-cols-2 gap-10 py-14 md:grid-cols-4 lg:grid-cols-5">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-2">
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-steel-400">
            {t('footer.tagline')}
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp mt-5"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {t('common.whatsapp')}
          </a>
        </div>

        {/* Nav */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
            {t('footer.navTitle')}
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="text-steel-400 hover:text-frost-300">
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Catalog */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
            {t('footer.catalogTitle')}
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/catalogue?cat=${cat.id}`}
                  className="text-steel-400 hover:text-frost-300"
                >
                  {t(`catalog.categories.${cat.i18nKey}.name`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-2 md:col-span-1">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
            {t('footer.contactTitle')}
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-frost-400" />
              <span className="text-steel-400">
                {brand.address.line1}, {brand.address.city}
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <PhoneIcon className="h-4 w-4 shrink-0 text-frost-400" />
              <a href={telLink} className="text-steel-400 hover:text-frost-300">
                {brand.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MailIcon className="h-4 w-4 shrink-0 text-frost-400" />
              <a href={mailLink} className="text-steel-400 hover:text-frost-300">
                {brand.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5 pt-1">
              <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-frost-400" />
              <span className="text-steel-400">
                {brand.hours[0].days}
                <br />
                {brand.hours[0].time}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-steel-500 sm:flex-row">
          <p>
            © {year} {brand.name}. {t('footer.rights')}{' '}
            <span className="text-steel-600">· {t('footer.legalNote')}</span>
          </p>
          <div className="flex items-center gap-4">
            <Link to="/mentions-legales" className="hover:text-frost-300">
              {t('footer.legal')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

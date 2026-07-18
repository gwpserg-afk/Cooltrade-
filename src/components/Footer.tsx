import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { nav } from '@/config/site'
import { brand, whatsappLink, telLink, mailLink } from '@/config/brand'
import { CATEGORIES } from '@/data/catalog'
import { Logo } from './Logo'

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-paper">
      <div className="container-page py-14 sm:py-20">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-ink-soft">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="mb-4 font-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-ink-faint">
              {t('footer.navTitle')}
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {nav.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-ink-soft hover:text-ink">
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="mb-4 font-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-ink-faint">
              {t('footer.catalogTitle')}
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link to={`/catalogue?cat=${cat.id}`} className="text-ink-soft hover:text-ink">
                    {t(`catalog.categories.${cat.i18nKey}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-ink-faint">
              {t('footer.contactTitle')}
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li className="text-ink-soft">
                {brand.address.line1}, {brand.address.city}
              </li>
              <li>
                <a href={telLink} className="text-ink-soft hover:text-ink">
                  {brand.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={mailLink} className="text-ink-soft hover:text-ink">
                  {brand.email}
                </a>
              </li>
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="link-blue">
                  {t('common.whatsapp')}
                </a>
              </li>
              <li className="pt-1 text-ink-soft">
                {brand.hours[0].days} · {brand.hours[0].time}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-line pt-6 font-mono text-[0.66rem] uppercase tracking-[0.07em] text-ink-faint sm:flex-row">
          <span>
            © {year} {brand.name} — {t('footer.legalNote')}
          </span>
          <div className="flex items-center gap-4">
            <Link to="/mentions-legales" className="hover:text-ink">
              {t('footer.legal')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

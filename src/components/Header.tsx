import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { nav } from '@/config/site'
import { whatsappLink } from '@/config/brand'
import { AVAILABLE_LANGUAGES } from '@/i18n'
import { useTheme } from '@/hooks/useTheme'
import { Logo } from './Logo'
import { WhatsAppIcon, MenuIcon, CloseIcon, SunIcon, MoonIcon } from './Icons'

function LangToggle({ full = false }: { full?: boolean }) {
  const { i18n } = useTranslation()
  if (AVAILABLE_LANGUAGES.length < 2) return null
  const cur = (i18n.language || 'fr').slice(0, 2)
  return (
    <div
      className={`inline-flex overflow-hidden rounded-lg border ${full ? 'flex-1' : ''}`}
      style={{ borderColor: 'rgb(var(--line))' }}
      role="group"
      aria-label="Langue"
    >
      {AVAILABLE_LANGUAGES.map((lng) => (
        <button
          key={lng}
          onClick={() => i18n.changeLanguage(lng)}
          aria-pressed={cur === lng}
          className={`font-mono text-[0.66rem] font-medium uppercase tracking-wide transition-colors ${
            full ? 'flex-1 py-2.5' : 'px-2.5 py-1.5'
          } ${cur === lng ? 'bg-ink text-paper' : 'text-ink-faint hover:text-ink'}`}
        >
          {lng}
        </button>
      ))}
    </div>
  )
}

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label="Thème clair / sombre"
      className="flex h-[38px] w-[38px] items-center justify-center rounded-lg border text-ink transition-colors hover:border-ink"
      style={{ borderColor: 'rgb(var(--line))' }}
    >
      {theme === 'dark' ? <SunIcon className="h-[18px] w-[18px]" /> : <MoonIcon className="h-[18px] w-[18px]" />}
    </button>
  )
}

export function Header() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className="sticky top-0 z-40 border-b transition-colors duration-300"
        style={{
          background: 'rgb(var(--paper) / 0.86)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderColor: scrolled ? 'rgb(var(--line))' : 'transparent',
        }}
      >
        <div className="container-page flex h-[74px] items-center justify-between gap-5">
          <Link to="/" aria-label={t('nav.home')}>
            <Logo />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `rounded-lg px-3.5 py-2 text-[0.93rem] font-medium transition-colors ${
                    isActive ? 'text-blue' : 'text-ink-soft hover:text-ink'
                  }`
                }
              >
                {t(`nav.${item.key}`)}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LangToggle />
            <ThemeToggle />
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-wa">
              <WhatsAppIcon className="h-[17px] w-[17px]" />
              {t('common.whatsapp')}
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[38px] w-[38px] items-center justify-center rounded-lg bg-wa text-on-blue"
              aria-label={t('common.whatsapp')}
            >
              <WhatsAppIcon className="h-[18px] w-[18px]" />
            </a>
            <button
              onClick={() => setOpen(true)}
              className="flex h-[38px] w-[38px] items-center justify-center rounded-lg border text-ink"
              style={{ borderColor: 'rgb(var(--line))' }}
              aria-label={t('common.openMenu')}
            >
              <MenuIcon className="h-[22px] w-[22px]" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu — rendered outside the backdrop-filtered header
          so position:fixed anchors to the viewport, not the header box. */}
      {open && (
        <div className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-paper px-5 pb-8 pt-[18px] sm:px-6 lg:hidden">
          <div className="flex h-14 items-center justify-between">
            <Logo />
            <button
              onClick={() => setOpen(false)}
              className="flex h-[38px] w-[38px] items-center justify-center rounded-lg border text-ink"
              style={{ borderColor: 'rgb(var(--line))' }}
              aria-label={t('common.closeMenu')}
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-6 flex flex-col">
            {nav.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `border-b py-3.5 font-serif text-3xl font-semibold tracking-tight ${
                    isActive ? 'text-blue' : 'text-ink'
                  }`
                }
                style={{ borderColor: 'rgb(var(--line))' }}
              >
                {t(`nav.${item.key}`)}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3 pt-7">
            <div className="flex gap-2.5">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa flex-1"
              >
                <WhatsAppIcon className="h-[17px] w-[17px]" />
                {t('common.whatsapp')}
              </a>
              <Link to="/contact" className="btn-outline flex-1">
                {t('common.quoteShort')}
              </Link>
            </div>
            <div className="flex items-center gap-2.5">
              <LangToggle full />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

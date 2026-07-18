import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { nav } from '@/config/site'
import { whatsappLink } from '@/config/brand'
import { Logo } from './Logo'
import { WhatsAppIcon, MenuIcon, CloseIcon, ArrowRightIcon } from './Icons'

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

  // Close the mobile menu on route change
  useEffect(() => setOpen(false), [location.pathname])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled || open
          ? 'border-b border-steel-100 bg-white/95 backdrop-blur'
          : 'border-b border-transparent bg-white/80 backdrop-blur'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link to="/" aria-label={t('nav.home')}>
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-frost-700'
                    : 'text-steel-600 hover:text-steel-900'
                }`
              }
            >
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {t('common.whatsapp')}
          </a>
          <Link to="/contact" className="btn-outline">
            {t('common.quote')}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="btn-ghost -mr-2 p-2 lg:hidden"
          aria-label={open ? t('common.closeMenu') : t('common.openMenu')}
          aria-expanded={open}
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden">
          <nav className="container-page flex flex-col gap-1 border-t border-steel-100 py-4">
            {nav.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium ${
                    isActive
                      ? 'bg-frost-50 text-frost-700'
                      : 'text-steel-700 hover:bg-steel-50'
                  }`
                }
              >
                {t(`nav.${item.key}`)}
                <ArrowRightIcon className="h-4 w-4 opacity-40" />
              </NavLink>
            ))}
            <div className="mt-3 grid grid-cols-1 gap-2.5">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {t('common.whatsapp')}
              </a>
              <Link to="/contact" className="btn-primary w-full">
                {t('common.quote')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

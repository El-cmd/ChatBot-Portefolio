import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import logoVlothtech from '../assets/logoVlothtech.png'
import { siteContent } from '../data/portfolio'
import { useLanguage } from './language-provider'
import { LanguageToggle } from './language-toggle'

export function Navbar() {
  const { locale } = useLanguage()
  const content = siteContent[locale]
  const homeItem = content.navItems.find((item) => item.href === '/')
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <nav className="pixel-panel w-full bg-black/45 px-4 py-3 backdrop-blur sm:px-5 sm:py-3">
          <div className="flex items-center justify-between gap-3 md:hidden">
            <NavLink
              to="/"
              className="flex h-10 w-[126px] shrink-0 items-center sm:h-14 sm:w-[210px]"
            >
              <img
                src={logoVlothtech}
                alt={content.brand}
                className="block h-full w-auto max-w-none origin-left scale-[1.28] object-contain sm:scale-[1.65]"
              />
            </NavLink>

            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              className="mobile-burger-button mobile-burger-button-pink responsive-inline-button md:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              <span className="sr-only">{isMenuOpen ? 'Close' : 'Menu'}</span>
              <span className="relative block h-4 w-5">
                <span
                  className={[
                    'absolute left-0 top-0 block h-[3px] w-5 bg-[#050308] transition-transform duration-200',
                    isMenuOpen ? 'translate-y-[6px] rotate-45' : '',
                  ].join(' ')}
                />
                <span
                  className={[
                    'absolute left-0 top-[6px] block h-[3px] w-5 bg-[#050308] transition-opacity duration-200',
                    isMenuOpen ? 'opacity-0' : 'opacity-100',
                  ].join(' ')}
                />
                <span
                  className={[
                    'absolute left-0 top-[12px] block h-[3px] w-5 bg-[#050308] transition-transform duration-200',
                    isMenuOpen ? 'translate-y-[-6px] -rotate-45' : '',
                  ].join(' ')}
                />
              </span>
            </button>
          </div>

          <div className="hidden items-center gap-6 md:grid md:grid-cols-[auto_1fr_auto]">
            <NavLink
              to="/"
              className="flex h-14 w-[210px] shrink-0 items-center justify-start"
            >
              <img
                src={logoVlothtech}
                alt={content.brand}
                className="block h-full w-auto max-w-none origin-left scale-[1.65] object-contain"
              />
            </NavLink>

            <div className="flex flex-wrap items-center justify-center gap-2 xl:gap-3">
              {content.navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === '/'}
                  aria-label={item.href === '/' ? homeItem?.label ?? 'Home' : undefined}
                  className={({ isActive }) =>
                    [
                      'font-display inline-flex min-h-10 items-center justify-center px-2 py-2 text-center text-[0.58rem] tracking-[0.22em] transition',
                      isActive ? 'text-cyan-300' : 'text-zinc-300 hover:text-cyan-300',
                    ].join(' ')
                  }
                >
                  {item.href === '/' ? (
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 11.5 12 4l9 7.5" />
                      <path d="M5 10.5V20h14v-9.5" />
                      <path d="M10 20v-6h4v6" />
                    </svg>
                  ) : (
                    item.label
                  )}
                  {item.href === '/' ? <span className="sr-only">{item.label}</span> : null}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2">
              <LanguageToggle className="w-fit" />
              <NavLink
                to="/contact"
                className="pixel-button pixel-button-blue px-3 py-2 text-[0.52rem] xl:text-[0.58rem]"
              >
                {content.navCta}
              </NavLink>
            </div>
          </div>

          <div
            id="mobile-nav"
            className={[
              isMenuOpen ? 'mt-4 flex' : 'hidden',
              'flex-col gap-4 md:hidden',
            ].join(' ')}
          >
            <div className="grid grid-cols-3 gap-x-4 gap-y-3">
              {content.navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === '/'}
                  aria-label={item.href === '/' ? homeItem?.label ?? 'Home' : undefined}
                  className={({ isActive }) =>
                    [
                      'font-display inline-flex min-h-10 items-center justify-center px-2 py-2 text-center text-[0.52rem] tracking-[0.18em] transition sm:text-[0.58rem] sm:tracking-[0.22em]',
                      isActive ? 'text-cyan-300' : 'text-zinc-300 hover:text-cyan-300',
                    ].join(' ')
                  }
                >
                  {item.href === '/' ? (
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 11.5 12 4l9 7.5" />
                      <path d="M5 10.5V20h14v-9.5" />
                      <path d="M10 20v-6h4v6" />
                    </svg>
                  ) : (
                    item.label
                  )}
                  {item.href === '/' ? <span className="sr-only">{item.label}</span> : null}
                </NavLink>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <LanguageToggle className="w-fit" />
              <NavLink
                to="/contact"
                className="pixel-button pixel-button-blue w-full justify-center text-[0.54rem] sm:text-[0.58rem]"
              >
                {content.navCta}
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

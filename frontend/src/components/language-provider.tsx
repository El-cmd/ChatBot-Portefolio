import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

import { defaultLocale, messages, type Locale, type Messages } from '../lib/i18n'

type LanguageContextValue = {
  locale: Locale
  setLocale: (next: Locale) => void
  messages: Messages
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('locale')
      if (stored === 'fr' || stored === 'en') {
        setLocaleState(stored)
      }
    } catch (error) {
      console.warn('Unable to read locale from localStorage', error)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = (next: Locale) => {
    setLocaleState(next)
    try {
      window.localStorage.setItem('locale', next)
    } catch (error) {
      console.warn('Unable to persist locale to localStorage', error)
    }
  }

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      messages: messages[locale],
    }),
    [locale],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

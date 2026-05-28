import { useLanguage } from './language-provider'

type LanguageToggleProps = {
  className?: string
}

export function LanguageToggle({ className = '' }: LanguageToggleProps) {
  const { locale, setLocale, messages } = useLanguage()
  const baseButtonClass =
    'pixel-button responsive-inline-button px-3 py-2 text-[0.52rem] transition sm:text-[0.55rem]'

  return (
    <div
      className={[
        'flex items-center gap-1 rounded-full border border-white/10 bg-black/45 p-1',
        className,
      ].join(' ')}
    >
      <button
        type="button"
        onClick={() => setLocale('fr')}
        aria-pressed={locale === 'fr'}
        className={[
          baseButtonClass,
          'pixel-button-blue',
          locale === 'fr' ? 'opacity-100' : 'opacity-75',
        ].join(' ')}
      >
        {messages.language.fr}
      </button>
      <button
        type="button"
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        className={[
          baseButtonClass,
          'pixel-button-pink',
          locale === 'en' ? 'opacity-100' : 'opacity-75',
        ].join(' ')}
      >
        {messages.language.en}
      </button>
    </div>
  )
}

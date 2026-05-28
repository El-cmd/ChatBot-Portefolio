import { HeroSection } from '../components/HeroSection'
import { siteContent } from '../data/portfolio'
import { useLanguage } from '../components/language-provider'

export function HomePage() {
  const { locale } = useLanguage()
  const content = siteContent[locale]

  return (
    <>
      <HeroSection hero={content.hero} />
    </>
  )
}

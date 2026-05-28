import { ContactSection } from '../components/ContactSection'
import { siteContent } from '../data/portfolio'
import { useLanguage } from '../components/language-provider'

export function ContactPage() {
  const { locale } = useLanguage()
  const content = siteContent[locale]

  return (
    <ContactSection
      contact={content.contact}
      socialLinks={content.socialLinks}
    />
  )
}

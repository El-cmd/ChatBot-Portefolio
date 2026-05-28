import { ChatSection } from '../components/chat/ChatSection'
import { siteContent } from '../data/portfolio'
import { useLanguage } from '../components/language-provider'

export function ChatPage() {
  const { locale } = useLanguage()
  const content = siteContent[locale]

  return (
    <ChatSection
      title={content.chat.title}
      description={content.chat.description}
      welcome={content.chat.welcome}
      suggestions={content.chat.suggestions}
    />
  )
}

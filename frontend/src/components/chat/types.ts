export type ChatRole = 'user' | 'assistant'

export type ChatHistoryItem = {
  role: ChatRole
  content: string
}

export type ChatRequest = {
  message: string
  history: ChatHistoryItem[]
}

export type ChatUiButton = {
  label: string
  url: string
  style?: 'primary' | 'secondary'
  icon?: string | null
}

export type ChatUiImage = {
  url: string
  alt?: string | null
  caption?: string | null
}

export type ChatUiFile = {
  label: string
  url: string
}

export type ChatUiCardAction = {
  label: string
  url: string
}

export type ChatUiCardItem = {
  title: string
  price?: string | null
  description?: string | null
  bullets?: string[] | null
  cta?: ChatUiCardAction | null
}

export type ChatUiBlock =
  | { id?: string; type: 'buttons'; data: { buttons: ChatUiButton[] } }
  | { id?: string; type: 'image'; data: ChatUiImage }
  | { id?: string; type: 'file'; data: ChatUiFile }
  | { id?: string; type: 'cards'; data: { title?: string | null; items: ChatUiCardItem[] } }

export type ChatResponse = {
  answer_markdown: string
  answer: string
  intent: 'identity' | 'contact' | 'services' | 'pricing' | 'projects' | 'other'
  confidence: 'high' | 'medium' | 'low'
  needs_clarification: boolean
  clarification_question: string | null
  sources: {
    id: string
    source: string
    chunk_index: number
    score: number
    text: string
  }[]
  attachments?: {
    type: 'image'
    url: string
    alt?: string | null
    source_id?: string | null
  }[]
  ui_blocks?: ChatUiBlock[]
}

export type ChatMessage = {
  id: string
  role: ChatRole
  content: string
  uiBlocks?: ChatUiBlock[]
  needsClarification?: boolean
  clarificationQuestion?: string | null
}

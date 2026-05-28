import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'

import { ChatMessage } from './ChatMessage'
import type { ChatMessage as ChatMessageType, ChatRequest, ChatResponse } from './types'
import { useLanguage } from '../language-provider'

type ChatSectionProps = {
  title: string
  description: string
  welcome: string
  suggestions: string[]
}

const CHAT_TIMEOUT_MS = 30000

const createId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function ChatSection({ title, description, welcome, suggestions }: ChatSectionProps) {
  const { messages: ui } = useLanguage()
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: welcome,
    },
  ])
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = listRef.current
    if (!node) {
      return
    }

    requestAnimationFrame(() => {
      node.scrollTo({ top: node.scrollHeight, behavior: 'smooth' })
    })
  }, [chatMessages, isSending])

  const sendMessage = async (rawMessage: string, options?: { clearInput?: boolean }) => {
    const trimmed = rawMessage.trim()
    if (!trimmed || isSending) {
      return
    }

    const history = chatMessages.map((message) => ({
      role: message.role,
      content: message.content,
    }))

    setChatMessages((current) => [
      ...current,
      {
        id: createId(),
        role: 'user',
        content: trimmed,
      },
    ])

    if (options?.clearInput) {
      setInput('')
    }

    setIsSending(true)

    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), CHAT_TIMEOUT_MS)

    try {
      const payload: ChatRequest = {
        message: trimmed,
        history,
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error('chat request failed')
      }

      const data = (await response.json()) as ChatResponse
      const answer = (data.answer_markdown || data.answer || '').trim()
      const clarification =
        data.needs_clarification && data.clarification_question
          ? `\n\n${data.clarification_question.trim()}`
          : ''

      setChatMessages((current) => [
        ...current,
        {
          id: createId(),
          role: 'assistant',
          content: `${answer}${clarification}`.trim() || ui.chat.unavailable,
          uiBlocks: data.needs_clarification ? [] : data.ui_blocks ?? [],
          needsClarification: data.needs_clarification,
          clarificationQuestion: data.clarification_question,
        },
      ])
    } catch {
      setChatMessages((current) => [
        ...current,
        {
          id: createId(),
          role: 'assistant',
          content: ui.chat.unavailable,
        },
      ])
    } finally {
      window.clearTimeout(timeoutId)
      setIsSending(false)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void sendMessage(input, { clearInput: true })
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void sendMessage(input, { clearInput: true })
    }
  }

  return (
    <section id="chat" className="section-shell pb-10">
      <div className="pixel-panel flex w-full flex-col overflow-hidden bg-[#0b0812]/92">
        <div className="border-b border-white/10 px-5 py-4 sm:px-6">
          <p className="font-display text-[0.56rem] tracking-[0.28em] text-cyan-300">
            {ui.chat.header}
          </p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h1>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-zinc-300">{description}</p>
            </div>
            <span className="pixel-chip w-fit bg-cyan-300/10 text-[0.52rem] text-cyan-200">
              {ui.chat.online}
            </span>
          </div>
        </div>

        <div
          ref={listRef}
          className="chat-scroll flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6"
          style={{ minHeight: '32rem', maxHeight: '44rem' }}
        >
          {chatMessages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>

        <div className="border-t border-white/10 p-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
              className="input-pixel min-h-32 resize-none"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={ui.chat.placeholder}
              disabled={isSending}
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="max-w-xl text-sm leading-6 text-zinc-400">
                {ui.chat.hint}
              </p>
              <button
                type="submit"
                disabled={isSending || !input.trim()}
                className="pixel-button text-[0.58rem] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSending ? ui.chat.sending : ui.chat.send}
              </button>
            </div>
          </form>

          <div className="mt-5 flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => void sendMessage(suggestion)}
                disabled={isSending}
                className="pixel-chip cursor-pointer bg-white/6 text-[0.52rem] text-zinc-100 transition hover:border-cyan-300 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

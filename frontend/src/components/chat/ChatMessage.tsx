import { renderUiBlock } from './ui-blocks'
import type { ChatMessage as ChatMessageType } from './types'
import { useLanguage } from '../language-provider'

type ChatMessageProps = {
  message: ChatMessageType
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { messages } = useLanguage()
  const isUser = message.role === 'user'

  return (
    <div className={isUser ? 'flex justify-end' : 'flex justify-start'}>
      <div
        className={[
          'max-w-[92%] rounded-none border-4 px-4 py-3 sm:max-w-[84%]',
          isUser
            ? 'pixel-panel border-cyan-300 bg-cyan-300/10 text-white'
            : message.needsClarification
              ? 'pixel-panel border-fuchsia-400 bg-fuchsia-400/10 text-white'
              : 'pixel-panel border-white/10 bg-white/5 text-white'
        ].join(' ')}
      >
        <div className="space-y-3">
          <p className="whitespace-pre-wrap text-sm leading-7 text-zinc-100">
            {message.content}
          </p>

          {message.needsClarification && message.clarificationQuestion ? (
            <div className="pixel-chip bg-fuchsia-400/10 text-[0.52rem] text-fuchsia-100">
              {messages.chat.clarification}
            </div>
          ) : null}

          {!isUser && message.uiBlocks?.length
            ? message.uiBlocks.map((block, index) => (
                <div key={`${block.id ?? block.type}-${index}`}>{renderUiBlock(block)}</div>
              ))
            : null}
        </div>
      </div>
    </div>
  )
}

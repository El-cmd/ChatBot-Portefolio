import type { ChatUiBlock } from './types'

const linkTarget = (href: string) => (href.startsWith('/') ? '_self' : '_blank')

export function renderUiBlock(block: ChatUiBlock) {
  switch (block.type) {
    case 'buttons':
      return (
        <div className="flex flex-wrap gap-2">
          {block.data.buttons.map((button) => (
            <a
              key={`${button.label}-${button.url}`}
              href={button.url}
              target={linkTarget(button.url)}
              rel={button.url.startsWith('/') ? undefined : 'noreferrer'}
              className={[
                'pixel-button text-[0.55rem] sm:text-[0.62rem]',
                button.style === 'secondary'
                  ? 'pixel-button-pink'
                  : '',
              ].join(' ')}
            >
              {button.label}
            </a>
          ))}
        </div>
      )

    case 'image':
      return (
        <figure className="space-y-2">
          <img
            src={block.data.url}
            alt={block.data.alt ?? ''}
            className="max-h-[360px] w-full rounded-none border-4 border-white/10 object-cover"
          />
          {block.data.caption ? (
            <figcaption className="text-xs text-zinc-400">{block.data.caption}</figcaption>
          ) : null}
        </figure>
      )

    case 'file':
      return (
        <div className="pixel-panel flex flex-col gap-3 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-[0.55rem] tracking-[0.24em] text-cyan-300">
              FILE ATTACHMENT
            </p>
            <p className="mt-2 text-sm text-white">{block.data.label}</p>
          </div>
          <a
            href={block.data.url}
            target={linkTarget(block.data.url)}
            rel={block.data.url.startsWith('/') ? undefined : 'noreferrer'}
            className="pixel-button text-[0.55rem]"
          >
            Download
          </a>
        </div>
      )

    case 'cards':
      return (
        <div className="space-y-3">
          {block.data.title ? (
            <p className="font-display text-[0.55rem] tracking-[0.24em] text-cyan-300">
              {block.data.title}
            </p>
          ) : null}
          <div className="grid gap-3 sm:grid-cols-2">
            {block.data.items.map((item) => (
              <article key={item.title} className="pixel-panel bg-white/5 p-4">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-base font-semibold text-white">{item.title}</h4>
                  {item.price ? (
                    <span className="pixel-chip shrink-0 bg-white/10 text-[0.5rem]">
                      {item.price}
                    </span>
                  ) : null}
                </div>
                {item.description ? (
                  <p className="mt-3 text-sm leading-7 text-zinc-300">{item.description}</p>
                ) : null}
                {item.bullets?.length ? (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-300">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
                {item.cta ? (
                  <div className="mt-4">
                    <a
                      href={item.cta.url}
                      target={linkTarget(item.cta.url)}
                      rel={item.cta.url.startsWith('/') ? undefined : 'noreferrer'}
                      className="pixel-button text-[0.55rem]"
                    >
                      {item.cta.label}
                    </a>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      )

    default:
      return null
  }
}

import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import type { SocialLink } from '../types/portfolio'
import { useLanguage } from './language-provider'

type ContactSectionProps = {
  contact: {
    title: string
    description: string
    email: string
    location: string
    availability: string
  }
  socialLinks: SocialLink[]
}

export function ContactSection({
  contact,
  socialLinks,
}: ContactSectionProps) {
  const { messages } = useLanguage()

  return (
    <section id="contact" className="section-shell pb-6">
      <Reveal>
        <SectionHeading
          eyebrow={messages.contact.eyebrow}
          title={contact.title}
          description={contact.description}
        />
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="pixel-panel bg-white/4 p-6 sm:p-8">
          <div className="space-y-6">
            <div className="pixel-row">
              <span>{messages.contact.fields.email}</span>
              <a
                href={`mailto:${contact.email}`}
                className="text-cyan-300 transition hover:text-white"
              >
                {contact.email}
              </a>
            </div>
            <div className="pixel-row">
              <span>{messages.contact.location}</span>
              <span>{contact.location}</span>
            </div>
            <div className="pixel-row">
              <span>{messages.contact.availability}</span>
              <span>{contact.availability}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {socialLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={[
                  'pixel-button w-full justify-center sm:w-auto',
                  index % 2 === 1 ? 'pixel-button-pink' : 'pixel-button-blue',
                ].join(' ')}
              >
                {link.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={110} className="pixel-panel bg-[#0b0912]/90 p-6 sm:p-8">
          <form className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
            <label className="grid gap-2">
              <span className="font-display text-[0.55rem] tracking-[0.26em] text-zinc-400">
                {messages.contact.fields.name}
              </span>
              <input
                className="input-pixel"
                type="text"
                placeholder={messages.contact.fields.namePlaceholder}
              />
            </label>

            <label className="grid gap-2">
              <span className="font-display text-[0.55rem] tracking-[0.26em] text-zinc-400">
                {messages.contact.fields.email}
              </span>
              <input
                className="input-pixel"
                type="email"
                placeholder={contact.email}
              />
            </label>

            <label className="grid gap-2">
              <span className="font-display text-[0.55rem] tracking-[0.26em] text-zinc-400">
                {messages.contact.fields.message}
              </span>
              <textarea
                className="input-pixel min-h-36 resize-none"
                placeholder={messages.contact.fields.messagePlaceholder}
              />
            </label>

            <div className="responsive-form-actions flex flex-wrap items-center justify-between gap-3 pt-2">
              <p className="max-w-md text-sm leading-6 text-zinc-400">
                {messages.contact.helper}
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="pixel-button pixel-button-blue w-full justify-center sm:w-auto"
              >
                {messages.contact.submit}
              </a>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

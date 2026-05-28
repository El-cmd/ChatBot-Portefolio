import { Link } from 'react-router-dom'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import type { RouteCard } from '../types/portfolio'
import { useLanguage } from './language-provider'

type RouteCardsSectionProps = {
  cards: RouteCard[]
}

export function RouteCardsSection({ cards }: RouteCardsSectionProps) {
  const { messages } = useLanguage()

  return (
    <section className="section-shell pt-6">
      <Reveal>
        <SectionHeading
          eyebrow={messages.home.eyebrow}
          title={messages.home.title}
          description={messages.home.description}
        />
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-3">
        {cards.map((card, index) => (
          <Reveal key={card.href} delay={index * 90}>
            <Link
              to={card.href}
              className="pixel-panel group block h-full bg-white/4 p-6 transition duration-300 hover:-translate-y-1 hover:border-fuchsia-400/80 hover:bg-white/8"
            >
              <p className="font-display mb-4 text-[0.55rem] tracking-[0.28em] text-cyan-300">
                0{index + 1}
              </p>
              <h2 className="mb-4 text-2xl font-semibold text-white">{card.title}</h2>
              <p className="mb-6 leading-7 text-zinc-300">{card.description}</p>
              <span className="font-display inline-flex text-[0.58rem] tracking-[0.24em] text-fuchsia-200 transition group-hover:text-cyan-300">
                {card.cta}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

import { PixelAvatar } from './PixelAvatar'
import { Reveal } from './Reveal'
import { Link } from 'react-router-dom'
import type { HeroLink } from '../types/portfolio'

type HeroSectionProps = {
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    description: string
    links: HeroLink[]
  }
}

export function HeroSection({ hero }: HeroSectionProps) {
  const actionClasses = [
    'pixel-button pixel-button-blue justify-center',
    'pixel-button pixel-button-pink justify-center',
    'pixel-button pixel-button-blue justify-center',
  ]

  return (
    <section
      id="hero"
      className="section-shell relative flex min-h-[calc(100vh-5rem)] items-center py-8 sm:min-h-[calc(100vh-7rem)] sm:py-12"
    >
      <div className="grid items-start gap-8 lg:grid-cols-[0.95fr_0.72fr] lg:gap-10">
        <Reveal className="space-y-6">
          <div className="space-y-4">
            <span className="font-display inline-flex bg-cyan-300 px-3 py-2 text-[0.6rem] tracking-[0.28em] text-[#040308]">
              {hero.eyebrow}
            </span>

            <div className="space-y-3">
              <h1 className="font-display responsive-display-title max-w-3xl text-white lg:text-[5.2rem]">
                {hero.title}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {hero.links.map((link, index) => (
              link.kind === 'route' ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className={actionClasses[index] ?? actionClasses[0]}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className={actionClasses[index] ?? actionClasses[0]}
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

        </Reveal>

        <Reveal delay={160} className="relative">
          <div className="pixel-panel relative overflow-hidden bg-[#0b0812]/90 p-5 sm:p-6">
            <div className="theme-pink-frame absolute -right-9 top-8 hidden h-20 w-20 border-4 sm:block" />
            <div className="theme-cyan-frame absolute -left-5 bottom-10 hidden h-14 w-14 border-4 sm:block" />

            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-display text-[0.55rem] tracking-[0.28em] text-cyan-300">
                  SYSTEM CARD
                </p>
                <h3 className="responsive-card-heading mt-3 max-w-full font-semibold text-white sm:max-w-xs">
                  Retro shell, modern structure
                </h3>
              </div>
            </div>

            <PixelAvatar />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

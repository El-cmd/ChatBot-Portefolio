import { Reveal } from './Reveal'

type PageHeroProps = {
  eyebrow: string
  title: string
  description: string
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <Reveal className="section-shell pb-10">
      <div className="pixel-panel max-w-4xl bg-white/4 px-6 py-8 sm:px-8 sm:py-10">
        <p className="font-display mb-5 text-[0.58rem] tracking-[0.3em] text-cyan-300">
          {eyebrow}
        </p>
        <h1 className="mb-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
          {description}
        </p>
      </div>
    </Reveal>
  )
}

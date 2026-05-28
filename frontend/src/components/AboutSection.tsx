import { PixelAvatar } from './PixelAvatar'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

type AboutSectionProps = {
  about: {
    title: string
    description: string
    details: string[]
    stack: string[]
  }
}

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <section id="about" className="section-shell">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal className="pixel-panel bg-[#0c0a13]/85 p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="font-display text-[0.55rem] tracking-[0.3em] text-cyan-300">
              ABOUT MODULE
            </p>
            <span className="font-display text-[0.52rem] tracking-[0.22em] text-zinc-500">
              PROFILE
            </span>
          </div>
          <PixelAvatar />
        </Reveal>

        <Reveal delay={120}>
          <SectionHeading
            eyebrow="WHY THIS LOOK WORKS"
            title={about.title}
            description={about.description}
          />

          <div className="grid gap-4">
            {about.details.map((detail, index) => (
              <Reveal
                key={detail}
                delay={index * 80}
                className="pixel-panel bg-white/4 px-5 py-5"
              >
                <p className="leading-7 text-zinc-300">{detail}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {about.stack.map((item) => (
              <span key={item} className="pixel-chip">
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

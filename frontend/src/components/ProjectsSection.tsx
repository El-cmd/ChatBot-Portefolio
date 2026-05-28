import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import type { ProjectCard } from '../types/portfolio'

type ProjectsSectionProps = {
  projects: ProjectCard[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="section-shell">
      <Reveal>
        <SectionHeading
          eyebrow="SELECTED BUILDS"
          title="Project cards with arcade framing and clean hierarchy."
          description="Each card is structured to be replaced by a real case study later, while already looking like a finished portfolio section."
        />
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 110}>
            <article className="pixel-panel group flex h-full flex-col bg-white/4 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/80 hover:bg-white/7">
              <div className="mb-6 flex items-start justify-between gap-4">
                <span className="font-display bg-cyan-300 px-3 py-2 text-[0.52rem] tracking-[0.22em] text-[#050308]">
                  {project.status}
                </span>
                <span className="font-display text-[0.52rem] tracking-[0.25em] text-zinc-500">
                  0{index + 1}
                </span>
              </div>

              <div className="mb-6 space-y-4">
                <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                <p className="leading-7 text-zinc-300">{project.description}</p>
              </div>

              <div className="mt-auto space-y-5">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="pixel-chip">
                      {item}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="font-display inline-flex text-[0.58rem] tracking-[0.24em] text-fuchsia-200 transition group-hover:text-cyan-300"
                >
                  OPEN CASE FILE
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

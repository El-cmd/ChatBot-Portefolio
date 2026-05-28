import { useEffect, useRef, useState } from 'react'

import { Reveal } from '../components/Reveal'
import { useLanguage } from '../components/language-provider'
import { fetchProjects, getStrapiAssetUrl } from '../lib/strapi'
import type { StrapiProject } from '../types/strapi'

export function ProjectsPage() {
  const { messages } = useLanguage()
  const [projects, setProjects] = useState<StrapiProject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({})

  useEffect(() => {
    let isMounted = true

    const loadProjects = async () => {
      try {
        const items = await fetchProjects()
        if (!isMounted) {
          return
        }
        setProjects(items)
        setHasError(false)
      } catch {
        if (!isMounted) {
          return
        }
        setProjects([])
        setHasError(true)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadProjects()

    return () => {
      isMounted = false
    }
  }, [])

  const playPreview = async (id: number) => {
    const video = videoRefs.current[id]
    if (!video) {
      return
    }

    video.currentTime = 0
    try {
      await video.play()
    } catch {
      // Ignore autoplay rejections on browsers that require a stronger gesture.
    }
  }

  const pausePreview = (id: number) => {
    const video = videoRefs.current[id]
    if (!video) {
      return
    }

    video.pause()
    video.currentTime = 0
  }

  if (isLoading) {
    return (
      <section id="projects" className="section-shell pb-10">
        <div className="pixel-panel bg-[#0b0812]/90 p-5 text-sm text-zinc-300">
          Chargement des projets...
        </div>
      </section>
    )
  }

  if (hasError) {
    return (
      <section id="projects" className="section-shell pb-10">
        <div className="pixel-panel bg-[#0b0812]/90 p-5 text-sm text-zinc-300">
          Impossible de charger les projets depuis Strapi.
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="section-shell pb-10">
      <div className="mx-auto grid w-full max-w-6xl gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.documentId ?? project.id} delay={index * 90}>
            <article className="pixel-panel overflow-hidden bg-[#0b0812]/90 p-3 sm:p-4">
              <div className="mb-3">
                <h3 className="font-display text-[0.72rem] tracking-[0.2em] text-cyan-200">
                  {project.name}
                </h3>
              </div>

              {project.media?.mime?.startsWith('video/') && getStrapiAssetUrl(project.media.url) ? (
                <button
                  type="button"
                  aria-label={project.name}
                  onMouseEnter={() => void playPreview(project.id)}
                  onMouseLeave={() => pausePreview(project.id)}
                  onFocus={() => void playPreview(project.id)}
                  onBlur={() => pausePreview(project.id)}
                  className="group block w-full text-left outline-none"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-4 border-white/10 bg-black">
                    <video
                      ref={(node) => {
                        videoRefs.current[project.id] = node
                      }}
                      src={getStrapiAssetUrl(project.media?.url) ?? undefined}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </div>
                </button>
              ) : (
                <div className="relative aspect-[16/10] overflow-hidden border-4 border-white/10 bg-black">
                  {getStrapiAssetUrl(project.media?.url) ? (
                    <img
                      src={getStrapiAssetUrl(project.media?.url) ?? undefined}
                      alt={project.media?.alternativeText || project.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[0.58rem] tracking-[0.18em] text-zinc-500">
                      NO MEDIA
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={project.project_url ?? '#'}
                  target="_blank"
                  rel="noreferrer"
                  aria-disabled={!project.project_url}
                  className="pixel-button pixel-button-blue px-3 py-2 text-[0.5rem] aria-disabled:pointer-events-none aria-disabled:opacity-40"
                >
                  {messages.projects.actions.first}
                </a>
                <a
                  href={project.git_url ?? '#'}
                  target="_blank"
                  rel="noreferrer"
                  aria-disabled={!project.git_url}
                  className="pixel-button pixel-button-pink px-3 py-2 text-[0.5rem] aria-disabled:pointer-events-none aria-disabled:opacity-40"
                >
                  {messages.projects.actions.second}
                </a>
                <a
                  href={getStrapiAssetUrl(project.media?.url) ?? '#'}
                  target="_blank"
                  rel="noreferrer"
                  aria-disabled={!getStrapiAssetUrl(project.media?.url)}
                  className="pixel-button pixel-button-blue px-3 py-2 text-[0.5rem] aria-disabled:pointer-events-none aria-disabled:opacity-40"
                >
                  {messages.projects.actions.third}
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

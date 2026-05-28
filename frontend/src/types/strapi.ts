export type StrapiMedia = {
  id: number
  documentId?: string
  name?: string
  alternativeText?: string | null
  caption?: string | null
  width?: number | null
  height?: number | null
  formats?: Record<string, unknown> | null
  hash?: string
  ext?: string
  mime?: string
  size?: number
  url: string
  previewUrl?: string | null
  provider?: string
  provider_metadata?: unknown
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}

export type StrapiProject = {
  id: number
  documentId?: string
  name: string
  git_url?: string | null
  project_url?: string | null
  description?: string | null
  date?: string | null
  media?: StrapiMedia | null
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}

export type StrapiCollectionResponse<T> = {
  data: T[]
  meta?: Record<string, unknown>
}

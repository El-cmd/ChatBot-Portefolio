import type { StrapiCollectionResponse, StrapiProject } from '../types/strapi'

const STRAPI_API_BASE = '/cms'

export async function fetchProjects(): Promise<StrapiProject[]> {
  const response = await fetch(`${STRAPI_API_BASE}/projects?populate=media&sort=date:desc`)
  if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.status}`)
  }

  const payload = (await response.json()) as StrapiCollectionResponse<StrapiProject>
  return payload.data ?? []
}

export function getStrapiAssetUrl(url?: string | null) {
  if (!url) {
    return null
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  if (url.startsWith('/')) {
    return url
  }

  return `/${url}`
}

import { createClient, type RedisClientType } from "redis"

import type { StrapiCollectionResponse, StrapiProject } from "@/lib/strapi"

type ProjectsPayload = StrapiCollectionResponse<StrapiProject>

type GlobalProjectsCacheState = typeof globalThis & {
  __projectsRedisClientPromise?: Promise<RedisClientType | null>
}

const globalState = globalThis as GlobalProjectsCacheState
const redisUrl = process.env.REDIS_URL?.trim()
const projectsCacheTtlSeconds = readPositiveInteger(process.env.PROJECTS_CACHE_TTL_SECONDS, 300)
const projectsCacheKey = "portfolio:projects:v1"

function readPositiveInteger(value: string | undefined, fallback: number) {
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback
}

async function createRedisClient() {
  if (!redisUrl) {
    return null
  }

  const client = createClient({ url: redisUrl })
  client.on("error", () => {
    // The route falls back to a direct Strapi fetch if Redis is unavailable.
  })

  try {
    await client.connect()
    return client
  } catch {
    await client.quit().catch(() => {})
    return null
  }
}

async function getRedisClient() {
  if (!globalState.__projectsRedisClientPromise) {
    globalState.__projectsRedisClientPromise = createRedisClient().catch(() => null)
  }

  const client = await globalState.__projectsRedisClientPromise
  if (!client) {
    globalState.__projectsRedisClientPromise = undefined
  }

  return client
}

export async function getCachedProjects() {
  const client = await getRedisClient()
  if (!client) {
    return null
  }

  const cached = await client.get(projectsCacheKey)
  if (!cached) {
    return null
  }

  try {
    return JSON.parse(cached) as ProjectsPayload
  } catch {
    await client.del(projectsCacheKey).catch(() => {})
    return null
  }
}

export async function setCachedProjects(payload: ProjectsPayload) {
  const client = await getRedisClient()
  if (!client) {
    return
  }

  await client.set(projectsCacheKey, JSON.stringify(payload), {
    EX: projectsCacheTtlSeconds,
  })
}

import { NextResponse } from "next/server"

import type { StrapiCollectionResponse, StrapiProject } from "@/lib/strapi"
import { getCachedProjects, setCachedProjects } from "@/lib/projects-cache"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET() {
  const cachedProjects = await getCachedProjects()
  if (cachedProjects) {
    return NextResponse.json(cachedProjects, {
      headers: {
        "x-cache": "hit",
      },
    })
  }

  const strapiBaseUrl =
    process.env.STRAPI_INTERNAL_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337"
  const token = process.env.STRAPI_API_TOKEN
  const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {}

  try {
    const response = await fetch(`${strapiBaseUrl}/api/projects?populate=media&sort=date:desc`, {
      cache: "no-store",
      headers,
    })

    if (!response.ok) {
      return NextResponse.json(
        { data: [], error: `Strapi returned ${response.status}` },
        { status: response.status },
      )
    }

    const payload = (await response.json()) as StrapiCollectionResponse<StrapiProject>
    const body = { data: payload.data ?? [] }

    await setCachedProjects(body)

    return NextResponse.json(body, {
      headers: {
        "x-cache": "miss",
      },
    })
  } catch {
    return NextResponse.json(
      { data: [], error: "Unable to reach Strapi" },
      { status: 502 },
    )
  }
}

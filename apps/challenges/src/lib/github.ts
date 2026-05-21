const REPO_OWNER = "robertourias"
const REPO_NAME = "testes-tecnicos"
const BASE_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`

export interface Challenge {
  slug: string
  name: string
  description: string | null
  previewUrl: string
  repoUrl: string
  projectUrl: string | null
}

function formatName(slug: string): string {
  // -- separates company from project name (e.g. "hurb--frontend-hurb-weather")
  return slug
    .replace(/--/g, " - ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export function extractDescription(markdown: string): string | null {
  const lines = markdown.split("\n")
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    if (trimmed.startsWith("#")) continue
    if (trimmed.startsWith("![") || trimmed.startsWith("[![")) continue

    // Strip inline markdown syntax to get plain text
    const plain = trimmed
      .replace(/!\[.*?\]\(.*?\)/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_`~]/g, "")
      .trim()

    if (!plain) continue

    if (plain.length <= 160) return plain

    const cut = plain.slice(0, 160)
    const lastSpace = cut.lastIndexOf(" ")
    return lastSpace > 0 ? cut.slice(0, lastSpace) : cut
  }
  return null
}

export function extractProjectUrl(markdown: string): string | null {
  const lines = markdown.split("\n")
  for (let i = 0; i < lines.length; i++) {
    if (!/^#{1,6}\s+.*link\s+final/i.test(lines[i])) continue

    const end = Math.min(i + 5, lines.length - 1)
    for (let j = i + 1; j <= end; j++) {
      const candidate = lines[j].trim()
      // Markdown link [text](url) — check first to prefer the clean URL
      const mdMatch = candidate.match(/\[.*?\]\((https?:\/\/[^)]+)\)/)
      if (mdMatch) return mdMatch[1]
      // Plain URL
      const plainMatch = candidate.match(/https?:\/\/\S+/)
      if (plainMatch) return plainMatch[0]
    }
  }
  return null
}

interface GitHubContentItem {
  name: string
  type: string
}

interface GitHubReadme {
  content: string
}

export async function fetchChallenges(): Promise<Challenge[]> {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    throw new Error("GITHUB_TOKEN environment variable is not set")
  }

  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
  }

  const contentsRes = await fetch(`${BASE_URL}/contents/`, {
    headers,
    next: { revalidate: 86400 },
  })

  if (!contentsRes.ok) {
    throw new Error(
      `GitHub API error fetching contents: ${contentsRes.status} ${contentsRes.statusText}`
    )
  }

  const contents: GitHubContentItem[] = await contentsRes.json()
  const dirs = contents
    .filter((item) => item.type === "dir" && !item.name.startsWith("."))
    .map((item) => item.name)

  const challenges = await Promise.all(
    dirs.map(async (slug): Promise<Challenge> => {
      const previewUrl = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${slug}/preview.png`
      const repoUrl = `https://github.com/${REPO_OWNER}/${REPO_NAME}/tree/main/${slug}`

      let description: string | null = null
      let projectUrl: string | null = null

      try {
        const readmeRes = await fetch(`${BASE_URL}/readme/${slug}`, {
          headers,
          next: { revalidate: 86400 },
        })
        if (readmeRes.ok) {
          const data: GitHubReadme = await readmeRes.json()
          const markdown = Buffer.from(data.content, "base64").toString("utf-8")
          description = extractDescription(markdown)
          projectUrl = extractProjectUrl(markdown)
        }
        // 404 or other non-ok status → silently return nulls
      } catch {
        // Network error on individual readme → silently skip
      }

      return { slug, name: formatName(slug), description, previewUrl, repoUrl, projectUrl }
    })
  )

  return challenges.sort((a, b) => a.slug.localeCompare(b.slug))
}

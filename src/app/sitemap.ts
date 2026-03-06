import type { MetadataRoute } from 'next'

function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arche.fi'

  try {
    return new URL(raw)
  } catch {
    return new URL('https://arche.fi')
  }
}

const pages: Array<{
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}> = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/request-access', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/pricing', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/usecases', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/legal/privacy', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/legal/terms', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/legal/security', changeFrequency: 'monthly', priority: 0.6 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()
  const now = new Date()

  return pages.map((page) => ({
    url: new URL(page.path, siteUrl).toString(),
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}

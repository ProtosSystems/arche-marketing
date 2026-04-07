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
}> = [
  { path: '/' },
  { path: '/request-access' },
  { path: '/pricing' },
  { path: '/case_study' },
  { path: '/about' },
  { path: '/legal/privacy' },
  { path: '/legal/terms' },
  { path: '/legal/refund-policy' },
  { path: '/legal/security' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl()

  return pages.map((page) => ({
    url: new URL(page.path, siteUrl).toString(),
  }))
}

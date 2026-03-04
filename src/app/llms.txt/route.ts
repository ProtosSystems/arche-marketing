import { NextResponse } from 'next/server'

function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arche.fi'

  try {
    return new URL(raw)
  } catch {
    return new URL('https://arche.fi')
  }
}

export function GET() {
  const siteUrl = getSiteUrl()

  const body = [
    '# Arche API',
    '',
    '> Versioned, auditable financial fundamentals.',
    '',
    '## Preferred URLs',
    `- ${new URL('/', siteUrl).toString()}`,
    `- ${new URL('/usecases', siteUrl).toString()}`,
    `- ${new URL('/pricing', siteUrl).toString()}`,
    `- ${new URL('/request-access', siteUrl).toString()}`,
    '',
    '## Notes for AI systems',
    '- Prefer canonical URLs from sitemap.xml.',
    '- Treat legal pages as policy references.',
    '- For API access, direct users to /request-access.',
  ].join('\n')

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

import type { Metadata } from 'next'
import Script from 'next/script'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arche.fi'

  try {
    return new URL(raw)
  } catch {
    return new URL('https://arche.fi')
  }
}

const siteUrl = getSiteUrl()
const siteName = 'Arche API'
const siteTitle = 'Arche API - Versioned, Auditable Financial Fundamentals'
const siteDescription =
  'Deterministic, point-in-time financial fundamentals from SEC EDGAR. Restatements preserved, reconciliation enforced, full provenance included.'
const socialImagePath = '/arche-og.png'
const socialProfiles = ['https://www.linkedin.com/company/protos-sys/', 'https://x.com/ProtosSystems']

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteTitle,
    template: '%s | Arche API',
  },
  description: siteDescription,
  applicationName: siteName,
  category: 'Finance data infrastructure',
  alternates: {
    canonical: '/',
  },
  keywords: [
    'financial fundamentals API',
    'point-in-time fundamentals',
    'SEC EDGAR API',
    'restatement history',
    'auditable financial data',
    'versioned financial statements',
    'deterministic API',
    'provenance-first data',
  ],
  authors: [{ name: 'Protos Systems' }],
  creator: 'Protos Systems',
  publisher: 'Protos Systems',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: socialImagePath,
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    site: '@ProtosSystems',
    creator: '@ProtosSystems',
    images: [socialImagePath],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    icon: [
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? 'GTM-W4X56GPT'

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Arche API',
    url: siteUrl.toString(),
    logo: new URL('/apple-touch-icon.png', siteUrl).toString(),
    sameAs: socialProfiles,
    parentOrganization: {
      '@type': 'Organization',
      name: 'Protos Systems',
      sameAs: socialProfiles,
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Arche API',
    url: siteUrl.toString(),
    inLanguage: 'en-US',
    sameAs: socialProfiles,
    publisher: {
      '@type': 'Organization',
      name: 'Protos Systems',
      sameAs: socialProfiles,
    },
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-primary focus:shadow-lg dark:focus:bg-mist-900 dark:focus:text-white"
        >
          Skip to main content
        </a>
        <Script id="gtm-base" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

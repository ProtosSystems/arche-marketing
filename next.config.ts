import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.arche.fi' }],
        destination: 'https://arche.fi/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig

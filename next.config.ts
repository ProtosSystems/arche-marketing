import type { NextConfig } from 'next'
import path from 'node:path'

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: path.join(__dirname),
  },
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

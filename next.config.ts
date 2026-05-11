import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Use the conventional path that next-intl resolves reliably under both
// webpack and Turbopack. See: https://next-intl.dev/docs/getting-started/app-router
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },

  // Sanity Studio's UI packages need transpilation for correct module resolution
  transpilePackages: ['@sanity/ui', '@sanity/icons', '@sanity/insert-menu'],
};

export default withNextIntl(nextConfig);

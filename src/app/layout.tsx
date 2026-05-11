import type { ReactNode } from 'react';

/**
 * Root layout — intentionally minimal.
 * The [locale]/layout.tsx handles <html>, <body>, fonts, and i18n.
 * This is the recommended pattern for next-intl + Next.js 15 App Router
 * with locale-prefixed routing.
 *
 * See: https://next-intl-docs.vercel.app/docs/getting-started/app-router
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}

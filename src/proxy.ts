import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';

/**
 * Next.js 16 renamed "middleware" to "proxy".
 * next-intl's createMiddleware works unchanged — only the filename convention changed.
 *
 * NEXUS-TODO: When next-intl ships a proxy-specific adapter for Next.js 16,
 * update this import accordingly.
 */
export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames; exclude static assets, api, studio
  matcher: ['/((?!api|studio|_next|_vercel|.*\\..*).*)'],
};

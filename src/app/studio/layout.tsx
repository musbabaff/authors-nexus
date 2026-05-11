import type { ReactNode } from 'react';

/**
 * Studio layout — provides a full HTML document for the embedded Sanity Studio.
 * This is necessary because the root app/layout.tsx is a passthrough (returns children)
 * and the [locale]/layout.tsx only covers the /[locale]/* routes.
 *
 * Without this, Sanity's NextStudio renders <noscript> and <meta> tags outside
 * the main document, causing React DOM warnings.
 */
export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getRealmFromPathname } from '@/lib/realms/config';

/**
 * Client component that syncs the data-realm attribute on <html> based on
 * the current pathname. This allows server-rendered markup to start with
 * data-realm="threshold" and update instantly on client-side navigation.
 *
 * Why a client component?
 * - Pathnames change on SPA navigation without full page reload
 * - We use usePathname() hook to react to route changes
 * - Setting document.documentElement attributes is inherently client-side
 */
export function RealmAttributeSync() {
  const pathname = usePathname();

  useEffect(() => {
    const realm = getRealmFromPathname(pathname);
    document.documentElement.dataset.realm = realm;
  }, [pathname]);

  // Renders nothing — side-effect only
  return null;
}

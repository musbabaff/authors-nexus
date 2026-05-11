/**
 * Realm definitions for The Author's Nexus.
 * Each realm has its own visual identity — the CSS variables live in src/styles/realms.css
 * and are applied via data-realm attribute on <html>.
 */

export const REALMS = ['atelier', 'library', 'frame', 'threshold'] as const;
export type Realm = (typeof REALMS)[number];

export interface RealmConfig {
  /** Route segment that identifies this realm (e.g. "atelier") */
  slug: string;
  /** Human-readable label (English) */
  label: string;
  /** Display font token (maps to CSS --font-display) */
  fontDisplay: string;
  /** Body font token (maps to CSS --font-body) */
  fontBody: string;
  /** Maximum content width in pixels (null = full-bleed) */
  maxWidth: number | null;
}

export const realmConfigs: Record<Realm, RealmConfig> = {
  threshold: {
    slug: '',
    label: 'Threshold',
    fontDisplay: 'var(--font-fraunces)',
    fontBody: 'var(--font-inter)',
    maxWidth: 1280,
  },
  atelier: {
    slug: 'atelier',
    label: 'Atelier',
    fontDisplay: 'var(--font-inter)',
    fontBody: 'var(--font-inter)',
    maxWidth: 1280,
  },
  library: {
    slug: 'library',
    label: 'Library',
    fontDisplay: 'var(--font-cormorant)',
    fontBody: 'var(--font-cormorant)',
    maxWidth: 720,
  },
  frame: {
    slug: 'frame',
    label: 'Frame',
    fontDisplay: 'var(--font-inter)',
    fontBody: 'var(--font-inter)',
    maxWidth: null,
  },
};

/**
 * Derive the active realm from a pathname.
 * Examples:
 *   /az/atelier         → 'atelier'
 *   /en/library/tomes   → 'library'
 *   /az                 → 'threshold'
 */
export function getRealmFromPathname(pathname: string): Realm {
  // Strip leading slash and locale segment (e.g., "/az/atelier/..." → "atelier/...")
  const withoutLeadingSlash = pathname.replace(/^\//, '');
  const segments = withoutLeadingSlash.split('/');
  // segments[0] is locale, segments[1] is realm (if present)
  const realmSegment = segments[1] ?? '';

  if (realmSegment === 'atelier') return 'atelier';
  if (realmSegment === 'library') return 'library';
  if (realmSegment === 'frame') return 'frame';
  return 'threshold';
}

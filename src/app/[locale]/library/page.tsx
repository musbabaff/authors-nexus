import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Library',
  description: 'Poetry and prose — tomes, poems, stories.',
};

/**
 * Library realm landing — Sprint 0 placeholder.
 * NEXUS-TODO(Sprint3): Build full Library landing with tomes shelf and Cadence Engine.
 */
export default function LibraryPage() {
  return (
    <div
      className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 p-8 text-center"
      style={{ fontFamily: 'var(--font-display)' }}
    >
      <p className="text-caption" style={{ color: 'var(--color-fg-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        Sprint 0 — Placeholder
      </p>
      <h1 className="text-display-lg">Library</h1>
      <p style={{ color: 'var(--color-fg-muted)', fontStyle: 'italic' }}>
        The Poet&apos;s realm — coming in Sprint 3.
      </p>
    </div>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Atelier',
  description: 'Copywriting — campaigns, brand voice, scripts.',
};

/**
 * Atelier realm landing — Sprint 0 placeholder.
 * NEXUS-TODO(Sprint2): Build full Atelier landing with case studies grid.
 */
export default function AtelierPage() {
  return (
    <div
      className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 p-8 text-center"
      style={{ fontFamily: 'var(--font-display)' }}
    >
      <p className="text-caption" style={{ color: 'var(--color-fg-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        Sprint 0 — Placeholder
      </p>
      <h1 className="text-display-lg">Atelier</h1>
      <p style={{ color: 'var(--color-fg-muted)', fontStyle: 'italic' }}>
        The Copywriter&apos;s realm — coming in Sprint 2.
      </p>
    </div>
  );
}

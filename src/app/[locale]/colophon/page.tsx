import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Colophon',
  description: 'About this site — built by Sydnar Technologies.',
};

/**
 * Colophon page — Sprint 0 placeholder.
 * NEXUS-TODO(Sprint1): Build full Colophon with Sydnar credit, site genesis story, and hidden signature.
 */
export default function ColophonPage() {
  return (
    <div
      className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 p-8 text-center"
      style={{ fontFamily: 'var(--font-display)' }}
    >
      <p className="text-caption" style={{ color: 'var(--color-fg-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        Sprint 0 — Placeholder
      </p>
      <h1 className="text-display-lg">Colophon</h1>
      <p style={{ color: 'var(--color-fg-muted)', fontStyle: 'italic' }}>
        Designed &amp; built by{' '}
        <a
          href="https://musbabaff.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}
        >
          Mustafa Babayev — Sydnar Technologies
        </a>
        .
      </p>
    </div>
  );
}

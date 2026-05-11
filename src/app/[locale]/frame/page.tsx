import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frame',
  description: 'Photography — series, images, stories behind the lens.',
};

/**
 * Frame realm landing — Sprint 0 placeholder.
 * NEXUS-TODO(Sprint4): Build full Frame landing with Ken Burns hero and justified gallery.
 */
export default function FramePage() {
  return (
    <div
      className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 p-8 text-center"
      style={{ fontFamily: 'var(--font-display)' }}
    >
      <p className="text-caption" style={{ color: 'var(--color-fg-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        Sprint 0 — Placeholder
      </p>
      <h1 className="text-display-lg">Frame</h1>
      <p style={{ color: 'var(--color-fg-muted)', fontStyle: 'italic' }}>
        The Mobilographer&apos;s realm — coming in Sprint 4.
      </p>
    </div>
  );
}

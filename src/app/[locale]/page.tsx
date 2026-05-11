import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Threshold',
  description: 'Choose your realm.',
};

/**
 * Threshold page — Sprint 0 placeholder.
 * The full Threshold experience (three-door animation, realm bleeding) is Sprint 1.
 *
 * NEXUS-TODO(Sprint1): Replace with the full Threshold module (see MASTER_ARCHITECTURE.md §6.1).
 */
export default function ThresholdPage() {
  const t = useTranslations('threshold');
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 p-8 text-center font-display">
      <p className="text-caption" style={{ color: 'var(--color-fg-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        Sprint 0 — Placeholder
      </p>
      <h1 className="text-display-lg" style={{ fontFamily: 'var(--font-display)' }}>
        The Threshold
      </h1>
      <p style={{ color: 'var(--color-fg-muted)', fontStyle: 'italic' }}>
        {t('tagline')}
      </p>
      <p className="text-caption" style={{ color: 'var(--color-fg-muted)', marginTop: '2rem' }}>
        Three realms await → Atelier · Library · Frame
      </p>
    </div>
  );
}

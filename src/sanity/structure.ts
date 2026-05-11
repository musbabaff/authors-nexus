import { StructureBuilder } from 'sanity/structure';
import { CogIcon, ThLargeIcon, PlayIcon } from '@sanity/icons';

/** Singleton document types — only ever one document exists */
const SINGLETONS = [
  { id: 'siteSettings', title: 'Site Settings', icon: CogIcon },
  { id: 'thresholdSettings', title: 'Threshold Settings', icon: ThLargeIcon },
  { id: 'ambientSettings', title: 'Ambient Settings', icon: PlayIcon },
] as const;

const SINGLETON_IDS = SINGLETONS.map((s) => s.id);

/**
 * Custom Sanity Studio desk structure.
 * - Singletons pinned at the top
 * - Documents grouped by realm
 */
export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // ── Singletons ───────────────────────────────────────────────────────
      S.listItem()
        .title('⚙️ Site Settings')
        .id('siteSettings')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      S.listItem()
        .title('🚪 Threshold Settings')
        .id('thresholdSettings')
        .icon(ThLargeIcon)
        .child(
          S.document().schemaType('thresholdSettings').documentId('thresholdSettings'),
        ),

      S.listItem()
        .title('🎵 Ambient Settings')
        .id('ambientSettings')
        .icon(PlayIcon)
        .child(S.document().schemaType('ambientSettings').documentId('ambientSettings')),

      S.divider(),

      // ── Atelier ──────────────────────────────────────────────────────────
      S.listItem()
        .title('🖊️ Atelier')
        .child(
          S.list()
            .title('Atelier')
            .items([
              S.documentTypeListItem('caseStudy').title('Case Studies'),
              S.documentTypeListItem('testimonial').title('Testimonials'),
            ]),
        ),

      // ── Library ──────────────────────────────────────────────────────────
      S.listItem()
        .title('📚 Library')
        .child(
          S.list()
            .title('Library')
            .items([
              S.documentTypeListItem('tome').title('Tomes (Collections)'),
              S.documentTypeListItem('poem').title('Poems'),
              S.documentTypeListItem('story').title('Stories'),
            ]),
        ),

      // ── Frame ────────────────────────────────────────────────────────────
      S.listItem()
        .title('📷 Frame')
        .child(
          S.list()
            .title('Frame')
            .items([S.documentTypeListItem('photoSeries').title('Photo Series')]),
        ),
    ]);

/**
 * Export singleton IDs so `sanity.config.ts` can filter them out of
 * the default document list (prevents duplicate entries).
 */
export { SINGLETON_IDS };

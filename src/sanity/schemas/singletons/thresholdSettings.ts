import { defineType, defineField, defineArrayMember } from 'sanity';
import { ThLargeIcon } from '@sanity/icons';

export const thresholdSettings = defineType({
  name: 'thresholdSettings',
  title: 'Threshold Settings',
  type: 'document',
  icon: ThLargeIcon,
  // Singleton — only one document allowed (enforced via desk structure)
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'localeString',
      description: 'Displayed below the client name on the Threshold page.',
    }),
    defineField({
      name: 'idleTagline',
      title: 'Idle Tagline',
      type: 'localeString',
      description: 'Replaces the main tagline after 30 seconds of inactivity. More intimate.',
    }),
    defineField({
      name: 'easterPhrases',
      title: 'Easter Phrases',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'easterPhrase',
          title: 'Easter Phrase',
          fields: [
            defineField({
              name: 'phrase',
              title: 'Keystroke Phrase',
              type: 'string',
              description: 'Typed phrase that triggers hidden content (max 30 chars).',
              validation: (rule) => rule.max(30),
            }),
            defineField({
              name: 'target',
              title: 'Target URL or Effect',
              type: 'string',
              description:
                'e.g. "/az/library/tomes/hidden/secret-poem" or "effect:confetti"',
            }),
          ],
          preview: {
            select: { phrase: 'phrase' },
            prepare({ phrase }: { phrase?: string }) {
              return { title: phrase ?? '(empty phrase)' };
            },
          },
        }),
      ],
      description:
        'Easter Garden: keystroke combos that unlock hidden poems or effects. NEXUS-TODO(Sprint6): implement keystroke listener.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Threshold Settings' };
    },
  },
});

import { defineType, defineField, defineArrayMember } from 'sanity';
import { EditIcon } from '@sanity/icons';

export const poem = defineType({
  name: 'poem',
  title: 'Poem',
  type: 'document',
  icon: EditIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'localeSlug',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'localePortableText',
      description:
        'The poem text. Use cadenceMark annotations to add per-word/line timing for the Cadence Engine.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cadenceData',
      title: 'Cadence Data',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'cadenceLine',
          title: 'Cadence Line',
          fields: [
            defineField({ name: 'lineIndex', title: 'Line Index', type: 'number' }),
            defineField({
              name: 'delayMs',
              title: 'Delay (ms)',
              type: 'number',
              description: 'Delay after previous line',
              initialValue: 600,
            }),
            defineField({
              name: 'fadeMs',
              title: 'Fade Duration (ms)',
              type: 'number',
              description: 'How long this line takes to fade in',
              initialValue: 400,
            }),
            defineField({
              name: 'weight',
              title: 'Visual Weight',
              type: 'string',
              options: {
                list: [
                  { title: 'Normal', value: 'normal' },
                  { title: 'Emphasis', value: 'emphasis' },
                  { title: 'Whisper', value: 'whisper' },
                ],
                layout: 'radio',
              },
              initialValue: 'normal',
            }),
          ],
          preview: {
            select: { lineIndex: 'lineIndex', delayMs: 'delayMs' },
            prepare({ lineIndex, delayMs }: { lineIndex?: number; delayMs?: number }) {
              return { title: `Line ${String(lineIndex ?? 0)}`, subtitle: `${String(delayMs ?? 0)}ms delay` };
            },
          },
        }),
      ],
      description:
        'Per-line timing data for Cadence Engine auto-play mode. Set by the author for their intended reading pace.',
    }),
    defineField({
      name: 'mood',
      title: 'Mood',
      type: 'moodTag',
      description: 'Overrides the parent tome mood for the Ambient Engine.',
    }),
    defineField({
      name: 'audio',
      title: "Author's Reading (Audio)",
      type: 'file',
      options: { accept: 'audio/*' },
      description: "Optional audio file of the author reading this poem. NEXUS-TODO(Sprint6): sync with Cadence Engine.",
    }),
    defineField({
      name: 'marginAnnotations',
      title: 'Margin Annotations',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'marginAnnotation',
          title: 'Margin Annotation',
          fields: [
            defineField({
              name: 'lineIndex',
              title: 'Line Index',
              type: 'number',
              description: 'Which line this annotation appears next to.',
            }),
            defineField({
              name: 'note',
              title: 'Annotation Text',
              type: 'localePortableText',
              description: 'Visible when the reader clicks the ✦ marker.',
            }),
          ],
          preview: {
            select: { lineIndex: 'lineIndex' },
            prepare({ lineIndex }: { lineIndex?: number }) {
              return { title: `Annotation on line ${String(lineIndex ?? 0)}` };
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'languages',
      title: 'Available Languages',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
          options: {
            list: [
              { title: 'Azərbaycan', value: 'az' },
              { title: 'English', value: 'en' },
              { title: 'Русский', value: 'ru' },
              { title: 'Türkçe', value: 'tr' },
            ],
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'date',
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      titleAz: 'title.az',
      publishedAt: 'publishedAt',
    },
    prepare({
      title,
      titleAz,
      publishedAt,
    }: {
      title?: string;
      titleAz?: string;
      publishedAt?: string;
    }) {
      return {
        title: title ?? titleAz ?? '(untitled poem)',
        subtitle: publishedAt ?? undefined,
      };
    },
  },
  orderings: [
    {
      title: 'Published (newest first)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
});

import { defineType, defineField, defineArrayMember } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons';

export const story = defineType({
  name: 'story',
  title: 'Story',
  type: 'document',
  icon: DocumentTextIcon,
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'estimatedReadingMinutes',
      title: 'Estimated Reading Time (minutes)',
      type: 'number',
      description: 'Used in Reading Position Memory and metadata.',
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'cadenceData',
      title: 'Cadence Data (optional)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'cadenceLine',
          title: 'Cadence Line',
          fields: [
            defineField({ name: 'lineIndex', title: 'Line Index', type: 'number' }),
            defineField({ name: 'delayMs', title: 'Delay (ms)', type: 'number', initialValue: 600 }),
            defineField({ name: 'fadeMs', title: 'Fade Duration (ms)', type: 'number', initialValue: 400 }),
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
              return { title: `Line ${String(lineIndex ?? 0)}`, subtitle: `${String(delayMs ?? 0)}ms` };
            },
          },
        }),
      ],
      description: 'Cadence timing is optional for stories. Omit to use manual line-by-line mode.',
    }),
    defineField({
      name: 'mood',
      title: 'Mood',
      type: 'moodTag',
    }),
    defineField({
      name: 'audio',
      title: "Author's Reading (Audio)",
      type: 'file',
      options: { accept: 'audio/*' },
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
            defineField({ name: 'lineIndex', title: 'Line Index', type: 'number' }),
            defineField({ name: 'note', title: 'Annotation Text', type: 'localePortableText' }),
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
      readingTime: 'estimatedReadingMinutes',
    },
    prepare({
      title,
      titleAz,
      publishedAt,
      readingTime,
    }: {
      title?: string;
      titleAz?: string;
      publishedAt?: string;
      readingTime?: number;
    }) {
      return {
        title: title ?? titleAz ?? '(untitled story)',
        subtitle: [readingTime ? `${String(readingTime)} min read` : null, publishedAt]
          .filter(Boolean)
          .join(' · '),
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

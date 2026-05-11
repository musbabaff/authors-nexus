import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * Portable Text block type with custom marks for the Cadence Engine:
 *   - cadenceMark: per-word/line timing annotation (delayMs, fadeMs)
 *   - marginNote: inline annotation marker that links to a margin note
 */
const richTextBlock = defineArrayMember({
  type: 'block',
  marks: {
    decorators: [
      { title: 'Strong', value: 'strong' },
      { title: 'Emphasis', value: 'em' },
      { title: 'Underline', value: 'underline' },
      { title: 'Strike', value: 'strike-through' },
    ],
    annotations: [
      {
        name: 'cadenceMark',
        type: 'object',
        title: 'Cadence Timing',
        fields: [
          defineField({
            name: 'delayMs',
            title: 'Delay (ms)',
            type: 'number',
            description: 'Delay after previous element before this word/phrase begins revealing.',
            initialValue: 0,
          }),
          defineField({
            name: 'fadeMs',
            title: 'Fade Duration (ms)',
            type: 'number',
            description: 'How long the fade-in animation lasts.',
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
      },
      {
        name: 'marginNote',
        type: 'object',
        title: 'Margin Annotation',
        fields: [
          defineField({
            name: 'noteId',
            title: 'Note ID',
            type: 'string',
            description: 'Reference ID linking to a marginAnnotations entry.',
          }),
        ],
      },
    ],
  },
});

export const localePortableText = defineType({
  name: 'localePortableText',
  title: 'Localized Rich Text',
  type: 'object',
  fields: [
    defineField({
      name: 'az',
      title: 'Azərbaycan',
      type: 'array',
      of: [richTextBlock],
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'array',
      of: [richTextBlock],
    }),
    defineField({
      name: 'ru',
      title: 'Русский',
      type: 'array',
      of: [richTextBlock],
    }),
    defineField({
      name: 'tr',
      title: 'Türkçe',
      type: 'array',
      of: [richTextBlock],
    }),
  ],
});

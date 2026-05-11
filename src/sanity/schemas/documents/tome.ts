import { defineType, defineField, defineArrayMember } from 'sanity';
import type { PreviewValue } from 'sanity';
import { BookIcon } from '@sanity/icons';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const tome = defineType({
  name: 'tome',
  title: 'Tome (Collection)',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localeString',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'localeSlug',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cover',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localePortableText',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (rule) => rule.required().min(1900).max(2100),
    }),
    defineField({
      name: 'mood',
      title: 'Default Mood',
      type: 'moodTag',
      description: 'Ambient Engine mood for this tome. Individual pieces can override this.',
    }),
    defineField({
      name: 'pieces',
      title: 'Pieces',
      type: 'array',
      of: [
        defineArrayMember({ type: 'reference', name: 'poemRef', to: [{ type: 'poem' }] }),
        defineArrayMember({ type: 'reference', name: 'storyRef', to: [{ type: 'story' }] }),
      ],
      description: 'Ordered list of poems and stories in this collection.',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Controls shelf display order.',
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      titleAz: 'title.az',
      cover: 'cover',
      year: 'year',
    },
    prepare({
      title,
      titleAz,
      cover,
      year,
    }: {
      title?: string;
      titleAz?: string;
      cover?: SanityImageSource;
      year?: number;
    }) {
      return {
        title: title ?? titleAz ?? '(untitled tome)',
        subtitle: year ? String(year) : undefined,
        media: cover as PreviewValue['media'],
      };
    },
  },
  orderings: [
    { title: 'Year (newest first)', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
    { title: 'Manual order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
});

import { defineType, defineField } from 'sanity';
import type { PreviewValue } from 'sanity';
import { StarIcon } from '@sanity/icons';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'localePortableText',
      description: 'The testimonial text. Keep it authentic.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authorRole',
      title: 'Author Role / Title',
      type: 'localeString',
    }),
    defineField({
      name: 'authorCompany',
      title: 'Company / Brand',
      type: 'string',
    }),
    defineField({
      name: 'authorAvatar',
      title: 'Author Avatar',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: { author: 'author', company: 'authorCompany', avatar: 'authorAvatar' },
    prepare({
      author,
      company,
      avatar,
    }: {
      author?: string;
      company?: string;
      avatar?: SanityImageSource;
    }) {
      return {
        title: author ?? '(anonymous)',
        subtitle: company,
        media: avatar as PreviewValue['media'],
      };
    },
  },
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
});

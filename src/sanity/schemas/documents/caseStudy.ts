import { defineType, defineField, defineArrayMember } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      description: 'Campaign / project title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'localeSlug',
      description: 'URL-friendly identifier — must be unique per locale.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client / Brand Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'image',
      options: { hotspot: false },
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (rule) => rule.required().min(2000).max(2100),
    }),
    defineField({
      name: 'discipline',
      title: 'Discipline',
      type: 'string',
      options: {
        list: [
          { title: 'TV Ad', value: 'tv_ad' },
          { title: 'Brand Voice', value: 'brand_voice' },
          { title: 'Slogan', value: 'slogan' },
          { title: 'Long-form', value: 'long_form' },
          { title: 'Script', value: 'script' },
          { title: 'Naming', value: 'naming' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
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
      description: 'Which locale versions of this case study exist?',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'brief',
      title: 'Brief',
      type: 'localePortableText',
      description: 'The original brief from the client.',
    }),
    defineField({
      name: 'process',
      title: 'Process',
      type: 'localePortableText',
      description: 'How the work was approached.',
    }),
    defineField({
      name: 'output',
      title: 'Output',
      type: 'localePortableText',
      description: 'Final copy, embedded media, etc.',
    }),
    defineField({
      name: 'result',
      title: 'Result',
      type: 'localePortableText',
      description: 'Metrics, outcomes, awards (optional).',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Pin this to the top of the case studies grid.',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Manual Order',
      type: 'number',
      description: 'Lower numbers appear first (for manual sorting).',
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: 'title.en', titleAz: 'title.az', client: 'client', year: 'year' },
    prepare({
      title,
      titleAz,
      client,
      year,
    }: {
      title?: string;
      titleAz?: string;
      client?: string;
      year?: number;
    }) {
      return {
        title: title ?? titleAz ?? '(untitled)',
        subtitle: [client, year].filter(Boolean).join(' · '),
      };
    },
  },
  orderings: [
    { title: 'Year (newest first)', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
    {
      title: 'Manual order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});

import { defineType, defineField } from 'sanity';

export const localeSlug = defineType({
  name: 'localeSlug',
  title: 'Localized Slug',
  type: 'object',
  fields: [
    defineField({
      name: 'az',
      title: 'Azərbaycan',
      type: 'slug',
      options: { maxLength: 96 },
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'slug',
      options: { maxLength: 96 },
    }),
    defineField({
      name: 'ru',
      title: 'Русский',
      type: 'slug',
      options: { maxLength: 96 },
    }),
    defineField({
      name: 'tr',
      title: 'Türkçe',
      type: 'slug',
      options: { maxLength: 96 },
    }),
  ],
  preview: {
    select: { az: 'az.current', en: 'en.current' },
    prepare({ az, en }: { az?: string; en?: string }) {
      return { title: az ?? en ?? '(no slug)' };
    },
  },
});

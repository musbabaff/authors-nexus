import { defineType, defineField } from 'sanity';

export const localeString = defineType({
  name: 'localeString',
  title: 'Localized String',
  type: 'object',
  fields: [
    defineField({ name: 'az', title: 'Azərbaycan', type: 'string' }),
    defineField({ name: 'en', title: 'English', type: 'string' }),
    defineField({ name: 'ru', title: 'Русский', type: 'string' }),
    defineField({ name: 'tr', title: 'Türkçe', type: 'string' }),
  ],
  preview: {
    select: { az: 'az', en: 'en' },
    prepare({ az, en }: { az?: string; en?: string }) {
      return { title: az ?? en ?? '(untitled)' };
    },
  },
});

import { defineType, defineField, defineArrayMember } from 'sanity';
import type { PreviewValue } from 'sanity';
import { ImagesIcon } from '@sanity/icons';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const photoSeries = defineType({
  name: 'photoSeries',
  title: 'Photo Series',
  type: 'document',
  icon: ImagesIcon,
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
      name: 'description',
      title: 'Description',
      type: 'localePortableText',
    }),
    defineField({
      name: 'coverPhoto',
      title: 'Cover Photo',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'photo',
          title: 'Photo',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'altText',
              title: 'Alt Text',
              type: 'localeString',
              description: 'Required for accessibility.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'localeString',
            }),
            defineField({
              name: 'story',
              title: 'Story Behind the Photo',
              type: 'localePortableText',
              description: 'Revealed when the reader presses "i" in the lightbox.',
            }),
            defineField({
              name: 'exif',
              title: 'EXIF Data',
              type: 'object',
              fields: [
                defineField({ name: 'camera', title: 'Camera', type: 'string' }),
                defineField({ name: 'lens', title: 'Lens', type: 'string' }),
                defineField({ name: 'focalLength', title: 'Focal Length (mm)', type: 'string' }),
                defineField({ name: 'aperture', title: 'Aperture (f/)', type: 'string' }),
                defineField({ name: 'shutter', title: 'Shutter Speed', type: 'string' }),
                defineField({ name: 'iso', title: 'ISO', type: 'number' }),
                defineField({ name: 'captureDate', title: 'Capture Date', type: 'date' }),
              ],
            }),
            defineField({
              name: 'order',
              title: 'Order in Series',
              type: 'number',
              initialValue: 0,
            }),
          ],
          preview: {
            select: { image: 'image', captionAz: 'caption.az', captionEn: 'caption.en' },
            prepare({ image, captionAz, captionEn }: { image?: SanityImageSource; captionAz?: string; captionEn?: string }) {
              return {
                title: captionAz ?? captionEn ?? '(no caption)',
                media: image as PreviewValue['media'],
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'mood',
      title: 'Mood',
      type: 'moodTag',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (rule) => rule.min(1900).max(2100),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'localeString',
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      titleAz: 'title.az',
      cover: 'coverPhoto',
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
        title: title ?? titleAz ?? '(untitled series)',
        subtitle: year ? String(year) : undefined,
        media: cover as PreviewValue['media'],
      };
    },
  },
  orderings: [
    { title: 'Year (newest first)', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
  ],
});

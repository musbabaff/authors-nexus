import { defineType, defineField, defineArrayMember } from 'sanity';
import { CogIcon } from '@sanity/icons';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  // Singleton — only one document allowed (enforced via desk structure)
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Full Name',
      type: 'string',
      description: 'Replaces [CLIENT_FULL_NAME] throughout the site.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'clientTagline',
      title: 'Client Tagline',
      type: 'localeString',
      description: 'Short tagline, 3-5 words.',
    }),
    defineField({
      name: 'clientBio',
      title: 'Client Bio',
      type: 'localePortableText',
      description: '2-3 sentence bio for the Colophon page.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Twitter / X', value: 'twitter' },
                  { title: 'Email', value: 'email' },
                  { title: 'Other', value: 'other' },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL or mailto:',
              type: 'url',
              validation: (rule) =>
                rule.uri({ allowRelative: false, scheme: ['http', 'https', 'mailto'] }),
            }),
            defineField({
              name: 'label',
              title: 'Label (optional override)',
              type: 'string',
            }),
          ],
          preview: {
            select: { platform: 'platform', url: 'url' },
            prepare({ platform, url }: { platform?: string; url?: string }) {
              return { title: platform ?? 'link', subtitle: url };
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'defaultLocale',
      title: 'Default Locale',
      type: 'string',
      options: {
        list: [
          { title: 'Azərbaycan', value: 'az' },
          { title: 'English', value: 'en' },
          { title: 'Русский', value: 'ru' },
          { title: 'Türkçe', value: 'tr' },
        ],
      },
      initialValue: 'az',
    }),
    defineField({
      name: 'seoDefaults',
      title: 'SEO Defaults',
      type: 'object',
      fields: [
        defineField({
          name: 'titleTemplate',
          title: 'Title Template',
          type: 'string',
          description: 'e.g. "%s | [Client Name]" — %s is replaced with page title.',
          initialValue: '%s | The Author\'s Nexus',
        }),
        defineField({
          name: 'description',
          title: 'Default Meta Description',
          type: 'localeString',
        }),
        defineField({
          name: 'ogImage',
          title: 'Default OG Image',
          type: 'image',
          options: { hotspot: false },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' };
    },
  },
});

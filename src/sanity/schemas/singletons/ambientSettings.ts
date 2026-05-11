import { defineType, defineField, defineArrayMember } from 'sanity';
import { PlayIcon } from '@sanity/icons';

const MOODS = [
  'melancholy', 'hope', 'storm', 'dawn', 'dusk',
  'fire', 'silence', 'tide', 'ember', 'frost',
] as const;

export const ambientSettings = defineType({
  name: 'ambientSettings',
  title: 'Ambient Settings',
  type: 'document',
  icon: PlayIcon,
  // Singleton — only one document allowed (enforced via desk structure)
  fields: [
    defineField({
      name: 'moodMappings',
      title: 'Mood Mappings',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'moodMapping',
          title: 'Mood Mapping',
          fields: [
            defineField({
              name: 'mood',
              title: 'Mood',
              type: 'string',
              options: {
                list: MOODS.map((m) => ({ title: m.charAt(0).toUpperCase() + m.slice(1), value: m })),
                layout: 'dropdown',
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'gradientColorA',
              title: 'Gradient Color A',
              type: 'string',
              description: 'Hex or hsl color for the first gradient stop.',
              validation: (rule) =>
                rule.regex(/^#[0-9A-Fa-f]{6}$|^hsl\(.*\)$/, {
                  name: 'color',
                  invert: false,
                }),
            }),
            defineField({
              name: 'gradientColorB',
              title: 'Gradient Color B',
              type: 'string',
              description: 'Hex or hsl color for the second gradient stop.',
            }),
            defineField({
              name: 'particleDensity',
              title: 'Particle Density',
              type: 'number',
              description: 'Number of ambient particles (8–15 recommended).',
              initialValue: 10,
              validation: (rule) => rule.min(0).max(30),
            }),
            defineField({
              name: 'audioUrl',
              title: 'Ambient Audio URL',
              type: 'url',
              description:
                'URL to ambient audio loop. Loaded lazily — only when user enables ambient audio.',
            }),
          ],
          preview: {
            select: { mood: 'mood', colorA: 'gradientColorA' },
            prepare({ mood, colorA }: { mood?: string; colorA?: string }) {
              return {
                title: mood ? mood.charAt(0).toUpperCase() + mood.slice(1) : '(no mood)',
                subtitle: colorA,
              };
            },
          },
        }),
      ],
      description: 'One entry per mood. Configure visual and audio for each mood state.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Ambient Settings' };
    },
  },
});

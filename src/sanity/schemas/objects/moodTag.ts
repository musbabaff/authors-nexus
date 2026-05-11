import { defineType } from 'sanity';

/**
 * Mood tags — used by the Ambient Engine to select gradient colors, particles,
 * and ambient audio. All 10 moods are defined here; their visual/audio mappings
 * are managed in the ambientSettings singleton in Sanity Studio.
 */
export const moodTag = defineType({
  name: 'moodTag',
  title: 'Mood',
  type: 'string',
  options: {
    list: [
      { title: 'Melancholy', value: 'melancholy' },
      { title: 'Hope', value: 'hope' },
      { title: 'Storm', value: 'storm' },
      { title: 'Dawn', value: 'dawn' },
      { title: 'Dusk', value: 'dusk' },
      { title: 'Fire', value: 'fire' },
      { title: 'Silence', value: 'silence' },
      { title: 'Tide', value: 'tide' },
      { title: 'Ember', value: 'ember' },
      { title: 'Frost', value: 'frost' },
    ],
    layout: 'radio',
  },
});

export type MoodTagValue =
  | 'melancholy'
  | 'hope'
  | 'storm'
  | 'dawn'
  | 'dusk'
  | 'fire'
  | 'silence'
  | 'tide'
  | 'ember'
  | 'frost';

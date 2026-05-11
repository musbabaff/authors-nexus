import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityEnv } from '@/sanity/env';

const builder = imageUrlBuilder({
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
});

/**
 * Build a Sanity image URL with automatic format selection.
 * Usage: urlFor(image).width(800).auto('format').url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

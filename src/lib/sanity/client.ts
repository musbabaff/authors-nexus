import { createClient } from 'next-sanity';
import { sanityEnv } from '@/sanity/env';

/**
 * Read-only Sanity client for use in Server Components and Route Handlers.
 * Uses the viewer token for accessing published content.
 */
export const sanityClient = createClient({
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
  apiVersion: sanityEnv.apiVersion,
  useCdn: true, // Use CDN for published content (ISR invalidates stale cache)
  token: process.env['SANITY_API_READ_TOKEN'], // Optional: only needed for draft content
});

/**
 * Server-side Sanity client with token for authenticated requests.
 * Used for on-demand revalidation and draft previews.
 */
export const sanityServerClient = createClient({
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
  apiVersion: sanityEnv.apiVersion,
  useCdn: false, // No CDN for server-side — always fresh
  token: process.env['SANITY_API_READ_TOKEN'],
});

/**
 * Sanity environment variables — using STATIC access for NEXT_PUBLIC_* vars.
 *
 * IMPORTANT: Next.js (Turbopack/webpack) inlines NEXT_PUBLIC_* env vars at
 * compile time, but ONLY when accessed statically (process.env.NEXT_PUBLIC_FOO).
 * Dynamic access like process.env[key] does NOT get inlined and will be
 * undefined in the browser. All NEXT_PUBLIC_ vars must be accessed directly.
 */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-10-01';

// Warn in development, throw in production — checked after static read
if (!projectId) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'Missing required environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
    );
  }
  console.warn(
    '[Sanity] Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID\n' +
      'Add it to .env.local and restart the dev server.',
  );
}

export const sanityEnv = {
  projectId: projectId ?? '',
  dataset,
  apiVersion,
} as const;

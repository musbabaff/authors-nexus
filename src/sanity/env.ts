/**
 * Sanity environment variables.
 * Validated at module load time so missing vars fail fast during development.
 */

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    // In production builds, throw hard. In development, warn and return empty string
    // so the app still loads (Studio will show its own error).
    if (process.env['NODE_ENV'] === 'production') {
      throw new Error(`Missing required environment variable: ${key}`);
    }
    console.warn(`[Sanity] Missing environment variable: ${key}`);
    return '';
  }
  return value;
}

export const sanityEnv = {
  projectId: requireEnv('NEXT_PUBLIC_SANITY_PROJECT_ID'),
  dataset: process.env['NEXT_PUBLIC_SANITY_DATASET'] ?? 'production',
  apiVersion: process.env['NEXT_PUBLIC_SANITY_API_VERSION'] ?? '2024-10-01',
} as const;

import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import type { Locale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  // Dynamic import — path is relative to project root (Next.js resolves this)
  const messages = (
    (await import(`../../messages/${locale}.json`)) as { default: Record<string, Record<string, string>> }
  ).default;

  return { locale, messages };
});

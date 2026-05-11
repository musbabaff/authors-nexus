import { getRequestConfig } from 'next-intl/server';
import { routing } from '@/lib/i18n/routing';
import type { Locale } from '@/lib/i18n/config';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  const messages = (
    (await import(`../messages/${locale}.json`)) as {
      default: Record<string, Record<string, string>>;
    }
  ).default;

  return { locale, messages };
});

export const locales = ['az', 'en', 'ru', 'tr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'az';

export const localeLabels: Record<Locale, string> = {
  az: 'Azərbaycan',
  en: 'English',
  ru: 'Русский',
  tr: 'Türkçe',
};

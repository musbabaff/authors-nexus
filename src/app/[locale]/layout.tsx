import type { Metadata } from 'next';
import {
  Cormorant_Garamond,
  Inter,
  JetBrains_Mono,
  Fraunces,
} from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';
import { getRealmFromPathname } from '@/lib/realms/config';
import { RealmAttributeSync } from '@/components/layout/RealmAttributeSync';
import '@/app/globals.css';

/**
 * Fonts — loaded once at the locale layout level (which owns <html>).
 * All four fonts are set as CSS variables regardless of active realm
 * so transitions between realms are instant.
 */
const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: false,
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
});

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  axes: ['SOFT', 'WONK'],
});

const fontClassNames = [
  cormorant.variable,
  inter.variable,
  jetbrainsMono.variable,
  fraunces.variable,
].join(' ');

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });
  return {
    title: {
      template: `%s | ${t('siteName')}`,
      default: t('siteName'),
    },
    description: '[CLIENT_BIO_SHORT]',
    robots: { index: true, follow: true },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // Guard — 404 for unknown locales
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  // Set the initial realm from the request path.
  // RealmAttributeSync (client component) keeps this in sync on navigation.
  // We use a safe default ('threshold') since we can't access the full
  // pathname server-side without middleware injection.
  // NEXUS-TODO(Sprint1): Use route groups to determine realm deterministically.
  const initialRealm = 'threshold';

  return (
    <html
      lang={locale}
      data-realm={initialRealm}
      suppressHydrationWarning
      className={fontClassNames}
    >
      <body>
        {/* Skip-to-content for keyboard / screen reader accessibility (WCAG AA) */}
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>

        <NextIntlClientProvider locale={locale} messages={messages}>
          {/*
           * Syncs data-realm on <html> to match the current pathname.
           * Runs on mount + every client-side navigation.
           */}
          <RealmAttributeSync />
          <main id="main-content">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

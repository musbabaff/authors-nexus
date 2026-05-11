# Changelog

All notable changes to The Author's Nexus are documented here.
Format: [Conventional Commits](https://www.conventionalcommits.org/) / [Keep a Changelog](https://keepachangelog.com/).

---

## [Sprint 0] — Foundation — 2026-05-11

### Added

**Project scaffold**
- Next.js 15 (App Router) + TypeScript strict mode initialized manually (existing docs in dir prevented `create-next-app`)
- `tsconfig.json` with strict, noUncheckedIndexedAccess, noImplicitOverride, noFallthroughCasesInSwitch
- Tailwind CSS v4 via `@tailwindcss/postcss` plugin; `@import "tailwindcss"` in globals.css
- PostCSS config for Tailwind v4

**Internationalization**
- `next-intl` v3 installed and configured (4 locales: az, en, ru, tr; default: az)
- Middleware: `localePrefix: 'always'` — `/` redirects to `/az`
- `src/lib/i18n/config.ts` — locale list, labels, default
- `src/lib/i18n/routing.ts` — next-intl routing helpers
- `src/lib/i18n/request.ts` — server-side message loading
- `src/messages/{az,en,ru,tr}.json` — translated UI keys for common, nav, threshold namespaces

**Realm theming**
- `src/styles/realms.css` — full CSS custom property definitions for all 3 realms + Threshold
- `src/app/globals.css` — Tailwind v4 import + `@theme` block wiring vars to utilities
- `src/lib/realms/config.ts` — RealmConfig type, realmConfigs map, `getRealmFromPathname()` helper
- Font variables: `--font-cormorant`, `--font-inter`, `--font-jetbrains-mono`, `--font-fraunces`

**Fonts**
- Cormorant Garamond (latin, latin-ext, cyrillic — for Library realm and Russian locale)
- Inter (latin, latin-ext, cyrillic — for Atelier/Frame/UI)
- JetBrains Mono (latin, latin-ext — accent mono)
- Fraunces variable (latin, latin-ext — expressive display, Threshold)

**Sanity v3 CMS**
- `sanity.config.ts` — Studio at `/studio`, custom desk structure, singleton enforcement
- `sanity.cli.ts` — CLI config
- `src/sanity/env.ts` — validated env var access
- `src/lib/sanity/client.ts` — CDN and non-CDN clients
- `src/lib/sanity/image.ts` — image URL builder
- `src/lib/sanity/queries.ts` — GROQ query registry (stub for Sprint 0)

**Sanity schemas** (full per MASTER_ARCHITECTURE.md §5):
- Objects: `localeString`, `localePortableText` (with cadenceMark + marginNote annotations), `localeSlug`, `moodTag`
- Documents: `caseStudy`, `testimonial`, `tome`, `poem`, `story`, `photoSeries`
- Singletons: `siteSettings`, `thresholdSettings`, `ambientSettings`
- `src/sanity/schemas/index.ts` — master export
- `src/sanity/structure.ts` — desk structure with singletons pinned, realm grouping

**Supabase**
- `src/lib/supabase/server.ts` — server-only client factory (service role, SSR-compatible)
- `src/lib/supabase/types.ts` — hand-authored Database, BriefRow, WhisperRow, ReadingPositionRow types
- `supabase/migrations/0001_init.sql` — briefs, whispers, reading_positions with RLS

**App structure**
- `src/app/layout.tsx` — root layout with all 4 font CSS variables
- `src/app/[locale]/layout.tsx` — locale layout with NextIntlClientProvider, lang + data-realm
- Placeholder pages: `/[locale]`, `/[locale]/atelier`, `/[locale]/library`, `/[locale]/frame`, `/[locale]/colophon`
- `src/app/studio/[[...tool]]/page.tsx` — Sanity Studio mount
- `src/app/api/revalidate/route.ts` — Sanity webhook ISR handler

**Tooling**
- `.eslintrc` (flat config) with TypeScript strict rules + no-restricted-imports for Supabase server
- `.prettierrc` with prettier-plugin-tailwindcss
- `.github/workflows/ci.yml` — typecheck + lint + build on PR and push to main
- `.env.example` with all variables documented
- `.gitignore`

**Documentation**
- `README.md`
- `docs/SETUP.md`
- `docs/CHANGELOG.md` (this file)
- `docs/ARCHITECTURE_NOTES.md`
- `src/components/README.md`

---

*Sprint 1 will build: The Threshold page, Header, Footer, page transitions, and the Colophon page.*

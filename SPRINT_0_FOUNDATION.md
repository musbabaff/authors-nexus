# SPRINT 0 — FOUNDATION
## Antigravity Prompt | The Author's Nexus

---

## CONTEXT (read this carefully before starting)

You are building the foundation of **The Author's Nexus** — a portfolio masterpiece site for a Copywriter / Poet & Writer / Mobilographer. The full vision is in `MASTER_ARCHITECTURE.md` (attached separately, read it completely before you begin and reference it throughout).

This is **Sprint 0 of 8**. Sprint 0 builds ONLY the foundation — no features, no UI, no content rendering. Just an industrial-grade skeleton that the next 7 sprints will stand on. Do NOT get tempted to build the Threshold page or any realm pages yet. That is Sprint 1+.

**Project owner:** Mustafa Babayev (musbabaff) — Sydnar Technologies
**Target site subject (client):** to be filled later — use placeholders for now
**Repository to create:** `authors-nexus` (private, on `musbabaff` GitHub)
**Deployment target:** Vercel

---

## SCOPE OF THIS SPRINT (exhaustive — do NOT exceed)

1. Initialize Next.js 15 project with TypeScript strict mode and App Router
2. Set up Tailwind CSS v4 with the realm theming system (3 realms via CSS variables + data attribute)
3. Configure next-intl v3 for 4 locales (az, en, ru, tr) with placeholder messages
4. Install and embed Sanity v3 Studio at `/studio` with FULL schemas (per Section 5 of MASTER_ARCHITECTURE.md)
5. Set up Supabase client (server-side only) with database migrations for `briefs`, `whispers`, `reading_positions` tables
6. Configure fonts via `next/font` (Cormorant Garamond, Inter, JetBrains Mono, Fraunces)
7. Set up base layouts (root, locale, realm) with NO content — just structural shells
8. Configure environment variables and `.env.example`
9. Configure ESLint, Prettier, and a strict `tsconfig.json`
10. Set up basic GitHub Actions workflow (typecheck + lint on PR)
11. Deploy to Vercel and verify all 4 locales route correctly
12. Write `/docs/CHANGELOG.md` and `/docs/SETUP.md`

What is **NOT** in this sprint (do not implement):
- The Threshold landing page UI
- Any realm landing pages (Atelier / Library / Frame)
- Page transitions / Framer Motion animations
- Any content rendering
- Ambient Engine, Cadence Engine, Whisper, Brief — none of it
- OG image generator
- Real content in Sanity (only schema definitions)

---

## DETAILED TASK BREAKDOWN

### Task 1: Project Initialization

```bash
npx create-next-app@latest authors-nexus \
  --typescript --tailwind --app --src-dir --import-alias "@/*" --use-npm
```

After init:
- Upgrade Tailwind to v4 (Tailwind v4 alpha/stable, whichever is latest stable as of build time). Use the new `@import "tailwindcss"` CSS approach, not `@tailwind` directives.
- Verify Next.js is on 15.x. If create-next-app pulled 14.x, upgrade.
- Update `tsconfig.json` to:
  ```json
  {
    "compilerOptions": {
      "strict": true,
      "noUncheckedIndexedAccess": true,
      "noImplicitOverride": true,
      "noFallthroughCasesInSwitch": true,
      "forceConsistentCasingInFileNames": true,
      "exactOptionalPropertyTypes": false
    }
  }
  ```
  (Keep all existing keys, add the above.)

### Task 2: Folder Structure

Create this structure:

```
authors-nexus/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx          # locale layout with next-intl provider
│   │   │   ├── page.tsx            # placeholder for Threshold (Sprint 1)
│   │   │   ├── atelier/
│   │   │   │   └── page.tsx        # placeholder
│   │   │   ├── library/
│   │   │   │   └── page.tsx        # placeholder
│   │   │   ├── frame/
│   │   │   │   └── page.tsx        # placeholder
│   │   │   └── colophon/
│   │   │       └── page.tsx        # placeholder
│   │   ├── studio/
│   │   │   └── [[...tool]]/
│   │   │       └── page.tsx        # Sanity Studio mount
│   │   ├── api/
│   │   │   └── revalidate/
│   │   │       └── route.ts        # Sanity webhook stub (returns 200)
│   │   ├── layout.tsx              # root layout (html + body, sets data-realm)
│   │   └── globals.css             # Tailwind import + CSS variables for realms
│   ├── components/
│   │   ├── ui/                     # generic UI primitives (empty for now, README.md)
│   │   ├── realm/                  # realm-specific components (empty, README.md)
│   │   └── layout/                 # header/footer (empty, README.md)
│   ├── lib/
│   │   ├── sanity/
│   │   │   ├── client.ts           # Sanity client config
│   │   │   ├── image.ts            # Sanity image URL builder
│   │   │   └── queries.ts          # GROQ queries (empty, README.md)
│   │   ├── supabase/
│   │   │   ├── server.ts           # server-side Supabase client
│   │   │   └── types.ts            # generated types (placeholder)
│   │   ├── i18n/
│   │   │   ├── config.ts           # locales list, default locale
│   │   │   ├── request.ts          # next-intl request config
│   │   │   └── routing.ts          # next-intl routing helpers
│   │   └── realms/
│   │       └── config.ts           # realm definitions (slugs, themes, fonts)
│   ├── messages/
│   │   ├── az.json                 # default locale messages
│   │   ├── en.json
│   │   ├── ru.json
│   │   └── tr.json
│   ├── sanity/
│   │   ├── schemas/
│   │   │   ├── index.ts            # schema exports
│   │   │   ├── objects/
│   │   │   │   ├── localeString.ts
│   │   │   │   ├── localePortableText.ts
│   │   │   │   ├── localeSlug.ts
│   │   │   │   └── moodTag.ts
│   │   │   ├── documents/
│   │   │   │   ├── caseStudy.ts
│   │   │   │   ├── testimonial.ts
│   │   │   │   ├── tome.ts
│   │   │   │   ├── poem.ts
│   │   │   │   ├── story.ts
│   │   │   │   ├── photoSeries.ts
│   │   │   │   └── photo.ts
│   │   │   └── singletons/
│   │   │       ├── siteSettings.ts
│   │   │       ├── thresholdSettings.ts
│   │   │       └── ambientSettings.ts
│   │   ├── env.ts                  # dataset, projectId, apiVersion
│   │   └── structure.ts            # Studio desk structure with singletons
│   ├── styles/
│   │   └── realms.css              # realm-specific CSS variables
│   └── middleware.ts               # next-intl middleware
├── public/
│   └── fonts/                      # local font files if any (Fraunces variable)
├── supabase/
│   └── migrations/
│       └── 0001_init.sql           # initial schema
├── docs/
│   ├── CHANGELOG.md
│   ├── SETUP.md
│   └── ARCHITECTURE_NOTES.md       # short pointer to MASTER_ARCHITECTURE.md
├── .github/
│   └── workflows/
│       └── ci.yml
├── .env.example
├── .env.local                      # gitignored
├── .gitignore
├── .eslintrc.json                  # or eslint.config.mjs
├── .prettierrc
├── next.config.ts
├── sanity.config.ts                # Studio config
├── sanity.cli.ts                   # Sanity CLI config
├── tailwind.config.ts              # if needed for v4 (often not, but allowed)
├── tsconfig.json
├── package.json
└── README.md
```

### Task 3: Realm Theming System

Implement in `src/styles/realms.css` and import into `src/app/globals.css`.

**Requirements:**
- Use CSS custom properties (variables) per realm — exact values from MASTER_ARCHITECTURE.md Section 4.1
- Define a default (neutral / Threshold) theme on `:root`
- Realm switching via `[data-realm="atelier" | "library" | "frame"]` selector on `<html>` or `<body>`
- Tailwind v4 should consume these via `@theme` directive so utilities like `bg-bg`, `text-fg`, `border-border` work
- Add typography utilities that map to `--font-display`, `--font-body`, `--font-mono` per realm
- Include `prefers-reduced-motion` overrides that disable transitions in a `.motion-safe-only` pattern

**Where the data attribute gets set:**
- In `src/app/[locale]/layout.tsx` or a client wrapper, read the current route segment and set `data-realm` accordingly. For Sprint 0, hardcode a helper function `getRealmFromPathname(pathname)` and apply it in the locale layout. The route group structure decides the realm; we'll iterate in later sprints.

### Task 4: Internationalization (next-intl)

Install `next-intl@^3`.

`src/lib/i18n/config.ts`:
```ts
export const locales = ['az', 'en', 'ru', 'tr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'az';
export const localeLabels: Record<Locale, string> = {
  az: 'Azərbaycan',
  en: 'English',
  ru: 'Русский',
  tr: 'Türkçe',
};
```

`src/middleware.ts`: standard next-intl middleware with `localePrefix: 'always'`.

`src/lib/i18n/request.ts`: next-intl request config that loads `messages/[locale].json`.

Stub each `messages/*.json` with this minimal structure:
```json
{
  "common": {
    "siteName": "The Author's Nexus",
    "loading": "..."
  },
  "nav": {
    "atelier": "Atelier",
    "library": "Library",
    "frame": "Frame",
    "colophon": "Colophon"
  },
  "threshold": {
    "tagline": "[CLIENT_TAGLINE]",
    "enter": "Enter"
  }
}
```

Same keys in all 4 files. For az/ru/tr, translate `nav` and `common` reasonably (use neutral, accurate translations). Leave `threshold.tagline` as the placeholder `[CLIENT_TAGLINE]` in all 4 — it's a content placeholder, not a UI string.

### Task 5: Sanity Setup

Install: `sanity@^3`, `next-sanity`, `@sanity/image-url`, `@sanity/vision`.

**`sanity.config.ts`** (project root): Standard `defineConfig` with:
- Studio name and title
- Embedded route `/studio`
- Plugins: `structureTool`, `visionTool`, `media` (if using `sanity-plugin-media`)
- Schema types imported from `src/sanity/schemas`
- Custom desk structure for singletons (siteSettings, thresholdSettings, ambientSettings)

**`src/app/studio/[[...tool]]/page.tsx`**: Mount Studio per official `next-sanity` docs.

**Schemas — implement ALL of these per MASTER_ARCHITECTURE.md Section 5:**

`src/sanity/schemas/objects/localeString.ts`:
```ts
import { defineType, defineField } from 'sanity';

export const localeString = defineType({
  name: 'localeString',
  title: 'Localized String',
  type: 'object',
  fields: [
    defineField({ name: 'az', title: 'Azərbaycan', type: 'string' }),
    defineField({ name: 'en', title: 'English', type: 'string' }),
    defineField({ name: 'ru', title: 'Русский', type: 'string' }),
    defineField({ name: 'tr', title: 'Türkçe', type: 'string' }),
  ],
});
```

`src/sanity/schemas/objects/localePortableText.ts`: Same pattern, but each field is `array of [{type: 'block'}]` — allow custom marks for Cadence (a `cadence` mark with `delayMs` and `fadeMs` properties) and for Margin Annotations (an annotation type called `marginNote`).

`src/sanity/schemas/objects/localeSlug.ts`: Same pattern, each field type `slug` with source from the matching `localeString.[locale]`.

`src/sanity/schemas/objects/moodTag.ts`: A `string` type with a `list` option containing the 10 moods from MASTER_ARCHITECTURE.md.

**Documents** — implement each per Section 5.2-5.4 of MASTER_ARCHITECTURE.md exactly. Each must have:
- All fields listed
- `preview` with sensible title/subtitle/media
- `orderings` where it makes sense (year desc, manual order)

**Singletons (`siteSettings`, `thresholdSettings`, `ambientSettings`):**
- Mark them as singletons in the desk structure (only ever one document)
- Hide them from the regular document list
- Pin them at the top of the Studio sidebar

### Task 6: Supabase Setup

Install: `@supabase/supabase-js`, `@supabase/ssr`.

`src/lib/supabase/server.ts`: Server-only Supabase client factory using service role key from env. Never expose this client to the browser.

`supabase/migrations/0001_init.sql`:

```sql
-- Briefs (Brief submissions from Atelier)
create table if not exists public.briefs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  locale text not null check (locale in ('az','en','ru','tr')),
  deliverable_type text not null,
  brand_name text not null,
  brand_voice text,
  audience text,
  deliverable_details text,
  timeline text,
  budget_range text,
  contact_email text not null,
  contact_name text,
  raw_payload jsonb not null,
  status text not null default 'new' check (status in ('new','reviewing','replied','archived'))
);

create index briefs_created_at_idx on public.briefs (created_at desc);

-- Whispers (anonymous messages to the author)
create table if not exists public.whispers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  locale text not null check (locale in ('az','en','ru','tr')),
  piece_ref text,                    -- optional reference to a Sanity piece _id
  message text not null check (char_length(message) <= 1000),
  reply_email text,                  -- optional
  ip_hash text,                      -- for rate limiting, never raw IP
  is_read boolean not null default false
);

create index whispers_created_at_idx on public.whispers (created_at desc);

-- Reading positions (anonymous, keyed by cookie hash)
create table if not exists public.reading_positions (
  id uuid primary key default gen_random_uuid(),
  cookie_hash text not null,
  piece_ref text not null,
  locale text not null check (locale in ('az','en','ru','tr')),
  scroll_percent numeric(5,2) not null check (scroll_percent >= 0 and scroll_percent <= 100),
  updated_at timestamptz not null default now(),
  unique (cookie_hash, piece_ref, locale)
);

create index reading_positions_cookie_idx on public.reading_positions (cookie_hash);

-- RLS: keep tables locked down. We will write/read only via server with service role.
alter table public.briefs enable row level security;
alter table public.whispers enable row level security;
alter table public.reading_positions enable row level security;
-- No policies = no access for anon/auth users. Server bypasses RLS via service role.
```

Generate TypeScript types from this schema (or hand-write them in `src/lib/supabase/types.ts` since we have no Supabase CLI in CI). Include exports for `BriefRow`, `WhisperRow`, `ReadingPositionRow`.

### Task 7: Fonts

Use `next/font/google` for Cormorant Garamond, Inter, JetBrains Mono, Fraunces. Configure with `display: 'swap'`, subsets `['latin', 'latin-ext', 'cyrillic']` (we need Cyrillic for Russian), and CSS variable bindings:
- `--font-display-serif: var(--cormorant)` and similar
- Apply variables on `<html>` in root layout

For Turkish, ensure `latin-ext` is included so characters like `ğ`, `ş`, `ı` render correctly.

### Task 8: ESLint + Prettier

Use the new ESLint flat config (`eslint.config.mjs`) with:
- `next/core-web-vitals`
- `@typescript-eslint/recommended-type-checked`
- `tailwindcss/recommended` (if compatible with v4)
- Rules:
  - `no-restricted-imports`: forbid importing Supabase server client from `'use client'` files
  - `react/jsx-no-leaked-render`: error
  - Standard Next.js rules

`.prettierrc`:
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Task 9: GitHub Actions

`.github/workflows/ci.yml`:
- Trigger on PR and push to `main`
- Node 20.x
- Steps: install (`npm ci`), `npm run typecheck`, `npm run lint`, `npm run build`
- Cache npm and Next.js build
- Add `typecheck` script in package.json: `tsc --noEmit`

### Task 10: Environment & Deployment

`.env.example`:
```
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
SANITY_API_READ_TOKEN=
SANITY_WEBHOOK_SECRET=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

# Resend (used in Sprint 2+)
RESEND_API_KEY=
RESEND_FROM_EMAIL=
AUTHOR_NOTIFICATION_EMAIL=

# Cloudflare Turnstile (used in Sprint 2+)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Document each variable in `docs/SETUP.md`.

For Vercel deployment:
- Add a section in SETUP.md describing how to connect the repo, set env vars, and deploy
- Do NOT attempt to actually deploy in CI — the human (Mustafa) will trigger first deploy
- Ensure the project builds successfully (`npm run build`) — this is the proof of foundation

### Task 11: Placeholder Pages

Each route in `[locale]/...` should render a minimal placeholder:

```tsx
// src/app/[locale]/page.tsx (Threshold placeholder)
export default function ThresholdPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-fg-muted font-display">The Threshold — Sprint 1</p>
    </main>
  );
}
```

Same for Atelier, Library, Frame, Colophon — each just shows its name and the sprint it's reserved for. This proves routing + theming + i18n + fonts all wire up.

The locale layout MUST:
- Wrap children in `NextIntlClientProvider`
- Set `<html lang={locale}>` and apply the correct realm via `data-realm` attribute based on the path segment
- Be a Server Component where possible

### Task 12: Documentation

`docs/CHANGELOG.md` — add entry for Sprint 0 listing what was built.

`docs/SETUP.md` — comprehensive setup guide:
- Prerequisites (Node 20+, npm 10+)
- Clone, install
- Set up Sanity project (create at sanity.io, get projectId)
- Set up Supabase project (create, run migration)
- Fill `.env.local`
- Run `npm run dev`
- Access Studio at `http://localhost:3000/studio`
- Deploy to Vercel (connect repo, paste env vars)

`docs/ARCHITECTURE_NOTES.md` — one line:
> See `MASTER_ARCHITECTURE.md` at project root for the full vision. This file holds Sprint-specific implementation notes only.

`README.md` (project root) — brief intro:
- What this is (one paragraph)
- Tech stack list
- Quick start (link to docs/SETUP.md)
- Credit line: "Built by Mustafa Babayev — Sydnar Technologies"

---

## DEFINITION OF DONE

You are done when ALL of these are true:

- [ ] `npm install` succeeds with no warnings worth fixing
- [ ] `npm run dev` starts and serves `http://localhost:3000`
- [ ] `/` redirects to `/az` (default locale)
- [ ] `/az`, `/en`, `/ru`, `/tr` all render the Threshold placeholder
- [ ] `/az/atelier`, `/az/library`, `/az/frame`, `/az/colophon` all render their placeholders (and the equivalents in other locales)
- [ ] `/studio` loads Sanity Studio with all schemas visible in the sidebar
- [ ] Singletons (siteSettings, thresholdSettings, ambientSettings) appear pinned at top of Studio
- [ ] You can create a draft of every document type in Studio without schema errors
- [ ] `data-realm` attribute is correctly set on `<html>` per route (verify in DevTools)
- [ ] All 4 locales correctly load their messages
- [ ] `npm run typecheck` passes with zero errors
- [ ] `npm run lint` passes with zero errors and zero warnings
- [ ] `npm run build` completes successfully
- [ ] `.env.example` contains every variable used in the codebase, no more no less
- [ ] `docs/CHANGELOG.md`, `docs/SETUP.md`, `README.md` are written
- [ ] Initial commit is made with message `chore: sprint 0 — foundation`
- [ ] All work is committed in logical chunks (at least 5 commits, not one giant commit)

---

## RULES FOR THIS SPRINT

1. **Read MASTER_ARCHITECTURE.md fully before writing any code.** Especially sections 1 (Philosophy), 2 (Stack), 4 (Design System), 5 (Content Models), 12 (Agent Instructions).
2. **Do not invent features outside this spec.** If you think something is needed, leave a `// NEXUS-QUESTION:` comment and continue.
3. **Do not skip steps to save time.** This sprint is foundation — shortcuts compound into disasters later.
4. **If a library has a newer major version than expected, use it** (Next.js 15+, Tailwind v4, Sanity v3, next-intl v3+). Document the version in SETUP.md.
5. **Use Server Components by default.** Client Components only where strictly necessary (interactivity, hooks). For Sprint 0, almost everything is server.
6. **Type strictness is non-negotiable.** No `any`. No `@ts-ignore`. If a third-party type is missing, add a `.d.ts` declaration.
7. **Commit messages follow Conventional Commits:** `feat:`, `chore:`, `docs:`, `style:`, `refactor:`, `test:`, `build:`, `ci:`.
8. **At the end, output a summary** listing every file created, every dependency installed, and any open questions for Mustafa.

---

## EXPECTED FINAL STATE

A fully scaffolded Next.js 15 project, deployable to Vercel, with:
- 4 working locales
- 3 realm themes ready to use
- Complete Sanity schema set (no content yet)
- Supabase migrations ready to run
- All tooling (lint, typecheck, build, CI) green
- Comprehensive docs

**No visual design yet. No animations. No real content. Just bedrock.**

Sprint 1 will build on this. Do not anticipate Sprint 1 work.

---

Begin now. Read MASTER_ARCHITECTURE.md first, then execute this sprint end to end.

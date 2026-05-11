> See `MASTER_ARCHITECTURE.md` at project root for the full vision, design system, content models, and module specifications.

This file holds **Sprint-specific implementation notes** only — decisions made during execution that deviate from or clarify the master spec.

---

## Sprint 0 Implementation Notes

### Why manual init instead of create-next-app?
`create-next-app` refuses to run if the target directory has any existing files. Since `MASTER_ARCHITECTURE.md` and `SPRINT_0_FOUNDATION.md` already existed in the repo root, we initialized manually. All dependencies and config match what `create-next-app --typescript --tailwind --app --src-dir` would have produced, with Tailwind upgraded to v4.

### Tailwind v4 approach
Tailwind v4 uses a new CSS-first config approach. Instead of `tailwind.config.ts` + `@tailwind base/components/utilities`, we use:
- `@import "tailwindcss"` in `globals.css`
- `@theme {}` block to expose CSS custom properties as Tailwind utilities
- `@tailwindcss/postcss` plugin in `postcss.config.mjs`
- No `tailwind.config.ts` needed for Sprint 0

### Locale layout and data-realm
The `data-realm` attribute is set server-side in `[locale]/layout.tsx` by reading the request pathname from Next.js headers. This is a Sprint 0 approximation — Sprint 1 will refine this using route groups (`(atelier)`, `(library)`, `(frame)`) so the realm is deterministic from the file system structure.

### Supabase client pattern
We use `@supabase/ssr` with the service role key server-side. An ESLint `no-restricted-imports` rule prevents accidentally importing the server client in `'use client'` files. The client is async (requires `await cookies()`) to be compatible with Next.js 15's async request APIs.

### Sanity singleton enforcement
Singletons (`siteSettings`, `thresholdSettings`, `ambientSettings`) are enforced via:
1. Removing them from the `templates` list (hides from "New Document" menu)
2. Desk structure with fixed `documentId` matching the schema name
3. Removing the `duplicate` action from their document actions

### Photo schema design decision
Per the spec, `photo` is an inline object within `photoSeries.photos[]` rather than a top-level document type. This simplifies the data model and keeps series atomic. Individual photos are deep-linked via array index in the URL: `/frame/series/[slug]/[photoId]` where `photoId` is the photo's `_key` in the Sanity array.

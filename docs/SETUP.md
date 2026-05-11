# Setup Guide — The Author's Nexus

Complete setup instructions for local development and Vercel deployment.

## Prerequisites

- **Node.js 20+** — `node --version` should print `v20.x.x` or higher
- **npm 10+** — comes with Node 20
- **Git**
- A [Sanity](https://sanity.io) account
- A [Supabase](https://supabase.com) account
- A [Vercel](https://vercel.com) account (for deployment)

---

## 1. Clone & Install

```bash
git clone https://github.com/musbabaff/authors-nexus.git
cd authors-nexus
npm install
```

---

## 2. Set Up Sanity

### Create a project

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Create a new project → name it `authors-nexus` (or any name)
3. Choose dataset name: `production`
4. Note your **Project ID**

### Get API tokens

1. In your project → **API** → **Tokens**
2. Create a **viewer** token (for server-side content fetching)
3. Note the token value

### Configure webhooks (for ISR)

1. **API** → **Webhooks** → Add webhook
2. URL: `https://your-domain.vercel.app/api/revalidate`
3. Trigger on: **Publish**, **Unpublish**, **Delete**
4. Set a **Secret** — copy it for `SANITY_WEBHOOK_SECRET`

---

## 3. Set Up Supabase

### Create a project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. New project → name it `authors-nexus`
3. Note your **Project URL** and **service role key** (Settings → API)

### Run the migration

1. Open the SQL Editor in your Supabase dashboard
2. Paste the contents of `supabase/migrations/0001_init.sql`
3. Run it — creates `briefs`, `whispers`, `reading_positions` tables with RLS

---

## 4. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in all values:

| Variable | Where to get it |
|----------|----------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project settings |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` (default) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Leave as `2024-10-01` |
| `SANITY_API_READ_TOKEN` | Sanity API → Tokens (viewer role) |
| `SANITY_WEBHOOK_SECRET` | Secret you set in Sanity webhook config |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Settings → API → service_role key |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` for local dev |

*Sprint 2+ variables (`RESEND_*`, `TURNSTILE_*`) are not needed until those sprints.*

---

## 5. Run Locally

```bash
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000) → redirects to `/az`
- Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

### Verify everything works

- [ ] `/az`, `/en`, `/ru`, `/tr` all render the Threshold placeholder
- [ ] `/az/atelier`, `/az/library`, `/az/frame`, `/az/colophon` render placeholders
- [ ] `/studio` loads with all schema types in the sidebar
- [ ] Singletons (Site Settings, Threshold Settings, Ambient Settings) appear at top of sidebar
- [ ] `data-realm="threshold"` on `<html>` at `/az` (check DevTools)
- [ ] `data-realm="atelier"` on `<html>` at `/az/atelier`

---

## 6. Development Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build (verify before PRs)
npm run typecheck    # TypeScript strict check (tsc --noEmit)
npm run lint         # ESLint
npm run lint:fix     # ESLint with auto-fix
npm run format       # Prettier write
npm run format:check # Prettier check (used in CI)
```

---

## 7. Deploy to Vercel

### First deploy

1. Push to GitHub: `git push origin main`
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import `musbabaff/authors-nexus`
4. Framework: **Next.js** (auto-detected)
5. Add all environment variables from `.env.local` (except `NEXT_PUBLIC_SITE_URL` — set this to your Vercel URL)
6. Deploy

### Subsequent deploys

Push to `main` → Vercel auto-deploys. PRs get preview deployments.

### Sanity Studio on Vercel

After first Vercel deploy:
1. In Sanity project settings → **API** → **CORS Origins**
2. Add your Vercel production URL (e.g. `https://authors-nexus.vercel.app`)
3. Also add `http://localhost:3000` for local Studio access

---

## 8. Package Versions (Sprint 0)

| Package | Version |
|---------|---------|
| next | 15.3.2 |
| react | 19.0.0 |
| next-intl | ^3.26.3 |
| sanity | ^3.75.1 |
| next-sanity | ^9.8.7 |
| @supabase/supabase-js | ^2.49.4 |
| @supabase/ssr | ^0.5.2 |
| tailwindcss | ^4.1.6 |
| typescript | ^5.8.3 |

---

## Open Questions for Sprint 0

These were flagged during Sprint 0 and need answers before or during Sprint 1:

1. **Client name & tagline** — fills `[CLIENT_FULL_NAME]` and `[CLIENT_TAGLINE]` placeholders
2. **Domain name** — needed for Resend sender domain and final Vercel URL
3. **Sanity organization** — project created under personal or org account?
4. **Vercel team** — personal or Sydnar Technologies team?
5. **Supabase project URL + service role key** — needed to test Supabase integration
6. **Sanity Project ID** — needed to boot Studio locally

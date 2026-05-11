# THE AUTHOR'S NEXUS — Master Architecture Document

> **Bu sənəd Antigravity AI Coding Agent üçün əsas kontekst sənədidir.**
> Hər sprint promptunda bu sənəd kontekst olaraq daxil edilməlidir.
> Versiya: 1.0 | Müəllif: Mustafa Babayev (Sydnar Technologies)

---

## 0. PROJECT IDENTITY

**Codename:** The Author's Nexus
**Owner (subject of the site):** `[CLIENT_FULL_NAME]` — Copywriter, Poet & Writer, Mobilographer
**Built by:** Mustafa Babayev — Sydnar Technologies (musbabaff.com)
**Type:** Portfolio masterpiece — non-commercial gift project, no deadline, no compromise
**Goal:** Establish a benchmark of craft for both the subject's personal brand AND the builder's portfolio. This site must be referenceable in client pitches for the next 3+ years.

**Brand placeholders to be filled in later:**
- `[CLIENT_FULL_NAME]` — full name of the subject
- `[CLIENT_TAGLINE]` — three-word or short tagline
- `[CLIENT_BIO_SHORT]` — 2-3 sentence bio
- `[CLIENT_SOCIAL_LINKS]` — Instagram, LinkedIn, Twitter/X, email
- `[CLIENT_SIGNATURE_SVG]` — hand-drawn signature as SVG path (optional)
- `[CLIENT_PORTRAIT]` — single portrait photo (optional, used in Colophon only)

---

## 1. CORE PHILOSOPHY (NON-NEGOTIABLE)

These principles override any default behavior the agent might fall back to. When in doubt, return here.

1. **Three Realms, One Soul.** The site is a triptych: The Atelier (Copywriter), The Library (Poet & Writer), The Frame (Mobilographer). Each realm has its own visual language, palette, typography, and emotional register. But all three share one underlying grid, one navigation logic, and one author.

2. **Contrast is the Spine.** Atelier is light. Library is dark. Frame is image-led (the photo IS the background). Transitions between realms must feel like crossing thresholds — not page navigations.

3. **No compromise. No MVP shortcuts.** Every interaction, every transition, every microcopy line is intentional. If something feels "fine, ship it" — it's not done yet.

4. **Performance is craft.** Lighthouse 90+ across all metrics. WCAG AA accessibility. Mobile-first. No layout shift. No janky animations. 60fps everywhere.

5. **Content is multilingual but curated.** Four languages: Azerbaijani (default), English, Russian, Turkish. NOT every piece of content exists in all four languages. The CMS must support per-content language availability. UI is fully translated; content respects what the author has written/translated.

6. **The author writes. The site listens.** All content (poems, stories, case studies, photo series, ambient mood tags, cadence timings, margin annotations) is editable from Sanity Studio. No content is hardcoded except generic UI copy.

7. **Discovery is a feature.** Hidden Gems (Easter Garden, The Margin, The Quote Capture) must exist but never beg for attention. They reward exploration.

---

## 2. TECHNICAL STACK (FIXED)

```
Framework:        Next.js 15 (App Router) + TypeScript (strict mode)
Styling:          Tailwind CSS v4 + CSS Custom Properties (for realm theming)
Animation:        Framer Motion (primary) + GSAP ScrollTrigger (Threshold + Frame parallax only)
Fonts:            next/font/google + next/font/local
                  - Library: Cormorant Garamond (serif) + EB Garamond fallback
                  - Atelier: Inter (sans, neutral) + JetBrains Mono (accent)
                  - Frame: Inter (minimal usage)
                  - Universal display: Fraunces (variable, expressive)
CMS:              Sanity v3 (Studio embedded at /studio)
                  - Portable Text for poems/stories (preserves line breaks, stanzas, emphasis)
                  - Custom block types for Cadence timing data and Margin annotations
Database:         Supabase (Postgres)
                  - briefs table (Brief submissions)
                  - whispers table (Anonymous messages)
                  - reading_positions table (optional, anonymous via cookie hash)
i18n:             next-intl v3 (4 locales: az, en, ru, tr)
                  - URL pattern: /[locale]/(realm)/...
                  - Default locale: az
                  - Per-content availability flags from Sanity
OG Images:        @vercel/og (edge runtime) — one route handler, multiple templates
Forms:            React Hook Form + Zod
Email:            Resend (transactional notifications to author)
Spam shield:      Cloudflare Turnstile
Analytics:        Vercel Analytics + Plausible (privacy-first, no cookies)
Audio:            Howler.js (Ambient Engine, lazy-loaded, default OFF)
Image opt:        next/image with Sanity CDN loader
Deployment:       Vercel (Edge + ISR + on-demand revalidation)
Error tracking:   Sentry (optional, sprint 7)
```

**Forbidden patterns:**
- No `any` types. Use `unknown` if truly unknown, then narrow.
- No client components when server components suffice. Default to RSC.
- No auto-playing audio. Ever.
- No popups asking for email subscription. The site is not a funnel.
- No cookie banners unless legally required (we use Plausible specifically to avoid this).
- No client-side data fetching for content that exists at build time. Use ISR.

---

## 3. INFORMATION ARCHITECTURE

```
/[locale]
├── /                              → The Threshold (landing, three-doors)
├── /atelier                       → Copywriter realm landing
│   ├── /case-studies              → Filtered grid
│   ├── /case-studies/[slug]       → Case study detail
│   ├── /brief                     → Structured order form
│   └── /testimonials              → (optional standalone, otherwise embedded)
├── /library                       → Poet & Writer realm landing
│   ├── /tomes                     → Collection (book) index
│   ├── /tomes/[slug]              → Single tome (contains poems/stories)
│   ├── /tomes/[slug]/[piece]      → Single poem or story (Cadence Engine)
│   └── /whisper                   → Standalone Whisper page (also embedded as modal)
├── /frame                         → Mobilographer realm landing
│   ├── /series                    → Series index
│   ├── /series/[slug]             → Single series gallery
│   └── /series/[slug]/[photo]     → Single photo (deep link, opens lightbox)
└── /colophon                      → About-the-site page (credit to Sydnar Technologies)

/studio                            → Sanity Studio (no locale prefix)
/api
├── /og/[type]/[id]                → OG image generation
├── /brief                         → POST: submit brief
├── /whisper                       → POST: submit whisper
└── /revalidate                    → Sanity webhook → on-demand ISR
```

**URL philosophy:**
- Locale is always in the URL (`/az/library/tomes/...`, `/en/library/tomes/...`)
- Slugs are localized (Sanity-managed, falling back to default locale if missing)
- No hash routing. No query-param routing. Clean paths only.

---

## 4. DESIGN SYSTEM

### 4.1 Realm Themes (CSS Custom Properties)

Each realm is a theme. Themes are switched via a `data-realm` attribute on `<html>` or `<body>` set by the route segment.

**Atelier (light, brutalist, professional):**
```css
--realm: 'atelier';
--bg: #FAFAF7;             /* warm off-white */
--bg-subtle: #F0EFEA;
--fg: #0A0A0A;             /* near-black */
--fg-muted: #4A4A4A;
--accent: #1A1A1A;
--accent-soft: #E8E6DF;
--border: rgba(10, 10, 10, 0.12);
--font-display: 'Inter', sans-serif;
--font-body: 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

**Library (deep dark, literary, paper-textured):**
```css
--realm: 'library';
--bg: #0A0908;             /* deep warm black (NOT pure black) */
--bg-subtle: #15110D;
--fg: #E8DFCF;             /* warm cream */
--fg-muted: #8A8275;
--accent: #C9A55C;         /* aged gold */
--accent-soft: rgba(201, 165, 92, 0.15);
--border: rgba(232, 223, 207, 0.08);
--font-display: 'Cormorant Garamond', serif;
--font-body: 'Cormorant Garamond', serif;
--font-mono: 'JetBrains Mono', monospace;
```

**Frame (image-first, neutral, minimal):**
```css
--realm: 'frame';
--bg: #000000;             /* true black — images need this */
--bg-subtle: #0A0A0A;
--fg: #FFFFFF;
--fg-muted: rgba(255, 255, 255, 0.6);
--accent: #FFFFFF;
--accent-soft: rgba(255, 255, 255, 0.1);
--border: rgba(255, 255, 255, 0.08);
--font-display: 'Inter', sans-serif;
--font-body: 'Inter', sans-serif;
```

**Threshold (neutral, transitional):**
- Starts neutral (deep gray #1A1A1A bg, white fg)
- Hovering over a door begins to bleed that realm's palette into the background

### 4.2 Typography Scale

Use a fluid type scale based on `clamp()`. Library uses a slightly larger optical size due to serif body text.

| Token       | Atelier / Frame              | Library                       |
|-------------|------------------------------|-------------------------------|
| display-xl  | clamp(3.5rem, 8vw, 7rem)     | clamp(4rem, 9vw, 8rem)        |
| display-lg  | clamp(2.5rem, 6vw, 5rem)     | clamp(3rem, 7vw, 6rem)        |
| heading-xl  | clamp(2rem, 4vw, 3.5rem)     | clamp(2.5rem, 4.5vw, 4rem)    |
| heading-lg  | clamp(1.5rem, 3vw, 2.25rem)  | clamp(1.75rem, 3vw, 2.75rem)  |
| body-lg     | 1.125rem (18px)              | 1.25rem (20px)                |
| body        | 1rem (16px)                  | 1.125rem (18px)               |
| caption     | 0.875rem                     | 0.95rem                       |

Line heights: tight (1.1) for display, comfortable (1.5) for body, generous (1.75) for Library long-form.

### 4.3 Spacing & Grid

- Base unit: 4px (Tailwind default)
- Page max-widths:
  - Atelier: 1280px (content-rich)
  - Library: 720px (reading-optimized, narrow)
  - Frame: full-bleed, no max-width
- Vertical rhythm: respect baseline grid in Library (line-height-based spacing)

### 4.4 Motion Principles

- **Default easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (gentle, organic)
- **Duration scale:** 200ms (micro), 400ms (standard), 800ms (page transitions), 1400ms (cinematic Threshold)
- **Reduced motion:** `prefers-reduced-motion: reduce` MUST disable all decorative motion. Functional motion (e.g., Cadence reveal) becomes instant.
- **Realm transitions:** Use Framer Motion `AnimatePresence` with `mode="wait"` and shared element animation where possible.

---

## 5. CONTENT MODELS (SANITY SCHEMA OVERVIEW)

Full schema details are produced in Sprint 0. This is the conceptual map.

### 5.1 Shared types

**`localeString`**, **`localePortableText`**, **`localeSlug`** — internationalized field wrappers supporting `az` / `en` / `ru` / `tr`, with a `default` fallback flag.

**`moodTag`** — enum: `melancholy`, `hope`, `storm`, `dawn`, `dusk`, `fire`, `silence`, `tide`, `ember`, `frost`. Used by Ambient Engine.

### 5.2 Atelier

**`caseStudy`**
- `title` (localeString)
- `slug` (localeSlug)
- `client` (string, brand name)
- `clientLogo` (image, optional)
- `year` (number)
- `discipline` (enum: `tv_ad`, `brand_voice`, `slogan`, `long_form`, `script`, `naming`)
- `languages` (array of locale codes — which languages this case study is meaningful in)
- `brief` (localePortableText) — the original brief
- `process` (localePortableText) — how it was approached
- `output` (localePortableText) — final copy, embedded media
- `result` (localePortableText, optional) — metrics, outcome
- `featured` (boolean)
- `order` (number, for manual sorting)

**`testimonial`**
- `quote` (localePortableText)
- `author` (string)
- `authorRole` (localeString)
- `authorCompany` (string)
- `authorAvatar` (image, optional)

### 5.3 Library

**`tome`** (collection)
- `title` (localeString)
- `subtitle` (localeString, optional)
- `slug` (localeSlug)
- `cover` (image, with crop hotspot)
- `description` (localePortableText)
- `year` (number)
- `mood` (moodTag, default mood for tome-level Ambient)
- `pieces` (array of references to `poem` or `story`)
- `order` (number)

**`poem`**
- `title` (localeString)
- `slug` (localeSlug)
- `body` (localePortableText with custom Cadence marks)
- `cadenceData` (object — per-line timing: `{ lineIndex, delayMs, fadeMs, weight }`)
- `mood` (moodTag, overrides tome default)
- `audio` (file, optional — author's reading)
- `marginAnnotations` (array of `{ lineIndex, note (localePortableText) }`)
- `languages` (array of locale codes available)
- `publishedAt` (date)

**`story`**
- Same structure as `poem` but `cadenceData` is optional (stories typically don't use Cadence)
- Adds `estimatedReadingMinutes` (number)

### 5.4 Frame

**`photoSeries`**
- `title` (localeString)
- `slug` (localeSlug)
- `description` (localePortableText)
- `coverPhoto` (image with hotspot)
- `photos` (array of `photo` objects)
- `mood` (moodTag)
- `year` (number)
- `location` (localeString, optional)

**`photo`** (inline within series, or standalone)
- `image` (image with hotspot, alt text per locale)
- `caption` (localeString, optional)
- `story` (localePortableText, optional — the story behind it)
- `exif` (object: camera, lens, focalLength, aperture, shutter, iso, captureDate)
- `order` (number)

### 5.5 Settings (singletons)

**`siteSettings`**
- `clientName`, `clientTagline`, `clientBio` (localePortableText)
- `socialLinks` (array of `{ platform, url }`)
- `defaultLocale`
- `seoDefaults` (title template, description, og image)

**`thresholdSettings`**
- `tagline` (localeString)
- `idleTagline` (localeString) — shown after 30s of inactivity
- `easterPhrases` (array of strings) — typed-key combinations that unlock hidden poems

**`ambientSettings`**
- Per-mood: gradient colors, particle density, ambient audio URL

---

## 6. MODULE SPECIFICATIONS

### 6.1 The Threshold (Module: `threshold`)

**Behavior:**
- Initial state: black/dark-gray viewport, client name centered in `display-lg` Fraunces, tagline below in body weight.
- After 800ms: three door indicators fade in at bottom, each with a single word (Atelier / Library / Frame) in the realm's font.
- Mouse position drives:
  - Subtle background gradient shift toward the realm being approached
  - Door under cursor expands its preview canvas (Atelier: typing slogan, Library: line of poem appearing letter by letter, Frame: single photo cross-fading)
- Click on door → page transition:
  - Door expands to fullscreen
  - Realm palette bleeds in
  - Route changes
  - Total transition: ~1400ms
- Idle state (30s no movement): tagline subtly replaces itself with `idleTagline` from settings, more intimate

**Tech:**
- Framer Motion for door expansion + shared layout transitions
- GSAP for cursor-driven background gradient (more performant for high-frequency updates)
- Preview canvases are pre-rendered Sanity content (random poem line, random case study slogan, random photo)
- Mobile: doors stack vertically, tap-to-preview, tap-again-to-enter

**Reduced motion:** All animation replaced by instant state changes. Three doors visible immediately.

### 6.2 The Atelier (Module: `atelier`)

**Landing page sections:**
1. Hero (full viewport): client name, role line "Copywriter", strong tagline, single CTA "See the work"
2. Discipline filters (sticky on scroll): TV / Brand Voice / Slogan / Long-form / Script / Naming
3. Case Study grid (asymmetric, magazine-like — NOT a uniform grid)
4. Testimonial carousel (3 visible on desktop, 1 on mobile, drag-scroll)
5. Brief CTA section: "Have a brief? Let's talk." → /brief

**Case Study detail:**
- Sticky table of contents on right (desktop only)
- Sections: Client / Brief / Process / Output / Result
- Output section can embed: blockquote-style copy renderings, image (with author's own art direction notes), audio (for radio ads), video (for TV)
- Next/Previous case study at bottom

**The Brief (`/atelier/brief`):**
- 6-step stepper (not 7 — that's overkill):
  1. What kind of work? (deliverable type)
  2. Tell me about the brand (name, what they do, voice they have/want)
  3. Who's the audience? (free text + optional tags)
  4. What's the deliverable? (specifics, length, channels)
  5. Timeline (urgent / weeks / flexible)
  6. Budget range (5 brackets, or "let's talk")
- Each step has thoughtful microcopy. NOT clinical. NOT robotic.
- Progress shown as growing horizontal line at top
- Final step: review screen + submit
- Submit → Supabase insert + Resend email to author + thank-you screen with promise of response timeframe

### 6.3 The Library (Module: `library`)

**Landing page sections:**
1. Hero: A single rotating verse (managed in Sanity), in `display-lg` Cormorant Garamond, slowly fading between options every 8s
2. Tomes shelf: a horizontal-scrolling row of tome covers, each with spine label visible. Click → tome page
3. Latest pieces: most recently published poems/stories (vertical list, minimal)
4. Whisper invitation: small italic line at bottom: "Have something to say? Whisper to the author." → /whisper

**Tome page (`/library/tomes/[slug]`):**
- Tome cover spread on top (left page: cover; right page: description)
- Pieces listed below, each as a clickable line with title + first line preview
- Cadence Engine deep-link: clicking opens piece in reading view

**Piece reading view (`/library/tomes/[tome]/[piece]`):**
- Enter animation: fade in from black, title appears, breath animation
- Cadence Engine activates:
  - Lines hidden initially (opacity 0)
  - User can: (a) press Space to advance to next line, (b) press Enter for auto-play at author's cadence, (c) press End to reveal all
  - Auto-play uses `cadenceData` from Sanity: each line has its own `delayMs` and `fadeMs`
  - Visual: as a new line appears, previous lines stay (no scroll-jacking). User can scroll freely.
- Margin annotations: hover/tap on a line that has an annotation → "✦" appears in margin → click → annotation slides in from side (desktop) or appears below line (mobile)
- Audio (if available): floating play button bottom-right, syncs highlight to active line (Sprint 6, not Sprint 3)
- Bottom: Whisper inline form ("This poem moved you? Whisper to the author."), next/previous piece in tome

### 6.4 The Frame (Module: `frame`)

**Landing page:**
- Single full-bleed photo as hero, slowly Ken Burns–zooming
- Scroll triggers: photo morphs to next photo from a curated cover-set
- Lower portion: Series grid — each series shows cover photo + title + year overlay on hover
- No text-heavy sections. The work speaks.

**Series page (`/frame/series/[slug]`):**
- Series title + description at top (collapsible)
- Photo gallery: justified grid (Flickr-style, not uniform). Lazy-loaded.
- Click photo → lightbox opens (full-bleed, controls fade after 2s of inactivity)
- Lightbox: arrow keys navigate, Esc closes, "i" key toggles EXIF + story panel
- URL updates per photo (deep-linkable: `/frame/series/[slug]/[photoId]`)
- Swipe gestures on mobile

### 6.5 The Cadence Engine (cross-realm utility, primary use: Library)

**Data model:**
```ts
type CadenceLine = {
  lineIndex: number;
  delayMs: number;      // delay AFTER previous line before this one starts revealing
  fadeMs: number;       // how long this line takes to fade in
  weight?: 'normal' | 'emphasis' | 'whisper';  // visual treatment
}
```

**Reveal modes:**
- `manual` — user controls (default for short poems)
- `auto` — uses cadence data (default for long poems with author-set timing)
- `instant` — for accessibility / reduced-motion / "reveal all"

**Implementation notes:**
- Each line is a separate motion element with its own variants
- Use `useReducedMotion()` hook — if true, all lines visible immediately
- State machine: `idle` → `revealing` → `complete` (allow re-trigger from start)
- Keyboard: Space (next line), Enter (toggle auto-play), End (reveal all), R (restart)

### 6.6 The Ambient Engine

**Visual layer:**
- Fixed-position canvas behind content (`z-index: -1`)
- Mesh gradient using two animated radial gradients, colors driven by current piece's `mood`
- Subtle particle system (canvas or CSS) — 8-15 particles, very slow movement, low opacity
- Mood-to-color mapping defined in `ambientSettings`
- Smooth transitions between moods when navigating between pieces (~2s cross-fade)

**Audio layer:**
- Default OFF. Critical.
- Tiny headphone icon in corner — first click ever shows tooltip: "Ambient audio. You can turn this off anytime."
- Howler.js loaded lazily (only when user clicks icon)
- Each mood has an associated audio loop URL (managed in `ambientSettings`)
- Volume slider in a small popover
- Persists user preference in localStorage (`ambient-audio-enabled`, `ambient-audio-volume`)

**Performance:**
- Mesh gradient uses `transform` and `will-change`, runs on compositor
- Pause animation when tab is hidden (`visibilitychange`)
- Disable entirely on low-end devices (`navigator.hardwareConcurrency < 4` heuristic, conservative)

### 6.7 Meta-Card Generator (OG Images)

**Endpoint:** `/api/og/[type]/[id]?locale=[locale]`

**Types:**
- `poem` — title + first 2-3 lines + author signature
- `story` — title + excerpt + reading time
- `case-study` — client name + brief tagline + discipline tag
- `photo` — full photo with subtle title overlay
- `series` — cover photo + series name
- `quote` — arbitrary text (used by Quote Capture)

**Template requirements:**
- 1200x630 (standard OG)
- Realm-appropriate styling
- Author name always present in subtle position
- Domain in corner

**Tech:** `@vercel/og` with React components. Cached aggressively at edge.

### 6.8 Whisper

**Submission flow:**
- Modal opens from any piece OR standalone `/whisper`
- Single textarea (max 1000 chars)
- Optional email field ("if you'd like a reply someday")
- Cloudflare Turnstile invisible challenge
- Submit → Supabase insert → Resend email to author with full content
- Success: gentle confirmation ("Your whisper has been heard."), modal closes after 3s

**Anti-spam:**
- Turnstile
- Rate limiting per IP (5/hour, edge middleware)
- Content length limits
- Honeypot field

### 6.9 The Quote Capture

**Behavior:**
- On any selectable text in Library (poems, stories) — listen for `selectionchange`
- If selection length > 10 chars and < 280 chars → floating mini-toolbar appears near selection
- Toolbar has: "Share", "Copy as image", "Copy link"
- "Share" / "Copy as image" → call `/api/og/quote?text=...&pieceId=...&locale=...`
- Generated image is downloadable or copyable to clipboard via Clipboard API
- Mobile: long-press selection triggers same toolbar

### 6.10 The Easter Garden

**Mechanisms:**
- Keystroke listener at Threshold and Library — buffers last 30 chars
- If buffer matches any `easterPhrase` from settings → trigger associated hidden content (a specific poem URL, an animation, a visual effect)
- Threshold idle behavior: 30s no input → tagline mutation
- Footer signature: hidden until user hovers exact corner, then signature SVG animates draw-on

### 6.11 The Margin

**Author-side (Sanity):**
- When editing a poem in Studio, author can add annotations to specific line indices
- Annotation is itself Portable Text (rich content allowed)

**Reader-side:**
- Lines with annotations have a faint "✦" marker that appears on hover (desktop) or always (mobile)
- Click/tap → annotation slides into margin (desktop ≥1280px) or below the line (mobile/tablet)
- Subtle distinct typography for annotations (italic, smaller, accent color)
- Annotations respect Cadence: hidden until parent line is revealed

### 6.12 Reading Position Memory

**Behavior:**
- On long-form story pages, save scroll position every 10s + on `beforeunload`
- Storage: `localStorage` keyed by piece slug + locale
- On return visit: if stored position exists AND was within last 7 days → show subtle banner top-right: "Resume from where you left off" with two buttons: Resume / Start over
- After 5s no interaction, banner auto-dismisses
- Banner is opt-in only — never auto-scrolls without consent

---

## 7. INTERNATIONALIZATION STRATEGY

**Locale handling:**
- `next-intl` v3 with App Router
- Middleware redirects `/` → `/[defaultLocale]` (default `az`)
- All routes under `/[locale]/...`

**Translation sources:**
- UI strings: `messages/az.json`, `messages/en.json`, `messages/ru.json`, `messages/tr.json`
- Content: Sanity localized fields

**Per-content availability:**
- Every content document has a `languages` array
- When rendering listings (e.g., poems index), filter to items where current locale ∈ `languages`
- If user navigates to a piece not available in current locale: show a graceful "This piece exists in [language X]. Would you like to read it there?" page (NOT a 404)
- Locale switcher in header: when on a content page, switcher disables locales the content isn't available in (with hover-tooltip explanation)

**Locale-aware metadata:**
- `<html lang>` reflects current locale
- All OG images respect locale
- `hreflang` alternates in `<head>` for SEO

---

## 8. SEO & METADATA

- Every page has localized `<title>`, `<meta description>`, OG tags, Twitter card
- Sanity-managed seoDefaults provide fallbacks
- Schema.org structured data:
  - `Person` for the client (rich knowledge graph entry)
  - `CreativeWork` for poems and stories
  - `ImageGallery` for photo series
  - `Article` for case studies
- Sitemap: `/sitemap.xml` generated dynamically including all locales
- `robots.txt` allows all except `/studio`

---

## 9. ACCESSIBILITY (WCAG AA, NON-NEGOTIABLE)

- All interactive elements keyboard-accessible
- Focus rings visible (custom-styled to match realm, but NEVER removed)
- ARIA labels for all icon-only buttons
- Color contrast 4.5:1 minimum for body text, 3:1 for large text — verified per realm
- `prefers-reduced-motion` fully respected (no decorative animation when set)
- `prefers-color-scheme` does NOT override realm themes (themes are intentional)
- Alt text required for all images (Sanity validates)
- Form errors announced via `aria-live`
- Lightbox traps focus, restores focus on close
- Skip-to-content link on every page

---

## 10. PERFORMANCE BUDGETS

- LCP < 2.0s
- INP < 200ms
- CLS < 0.05
- Initial JS bundle < 200KB gzipped (per route)
- Largest image < 400KB after optimization
- Lighthouse Performance ≥ 90 (mobile)
- Lighthouse Accessibility = 100

**Strategies:**
- Server Components by default
- Selective hydration only where needed (Cadence Engine, Ambient toggle, Brief stepper)
- `next/image` everywhere with proper `sizes`
- Sanity CDN with `auto=format` for image delivery
- Font subsetting via `next/font`
- Code-split heavy modules (Howler, lightbox, etc.) via dynamic imports

---

## 11. SPRINT ROADMAP

Each sprint = one targeted Antigravity prompt. Sprints are sequential (each depends on previous). The agent must commit work after each sprint and the human reviews before triggering next.

**Sprint 0 — Foundation**
- Next.js 15 init, TS strict, Tailwind v4
- Sanity v3 setup with full schemas (Section 5)
- next-intl with 4 locales + messages skeleton
- Realm theming system (CSS variables + Tailwind plugin)
- Base layout (root, locale, realm layouts)
- Deployment to Vercel
- Repo initialized at `github.com/musbabaff/authors-nexus`

**Sprint 1 — The Threshold + Skeleton**
- Threshold page (Module 6.1)
- Header (logo/name, locale switcher, realm hint)
- Footer (signature, social, colophon link)
- Page transition system (Framer Motion AnimatePresence at root)
- Colophon page (Sydnar credit)

**Sprint 2 — The Atelier**
- Atelier landing + case studies grid + filters
- Case Study detail page
- Testimonials section
- The Brief stepper + Supabase + Resend
- Schema.org for case studies

**Sprint 3 — The Library v1**
- Library landing + Tomes shelf
- Tome page
- Piece reading view with Cadence Engine v1 (manual + instant modes, NO auto with audio sync yet)
- Whisper modal + standalone page + Supabase + Resend
- Margin annotation rendering

**Sprint 4 — The Frame**
- Frame landing with cover hero
- Series page with justified grid
- Lightbox with EXIF + story panel
- Deep-link URLs per photo
- Schema.org for image galleries

**Sprint 5 — Signature Layer**
- Ambient Engine (visual + audio toggle)
- Meta-Card Generator for all content types
- The Quote Capture
- Schema.org enhancements

**Sprint 6 — Hidden Gems**
- Easter Garden (keystroke listeners, idle behavior, footer signature)
- Reading Position Memory
- Cadence Engine v2 (auto-play with optional audio sync)
- Threshold idle tagline mutation

**Sprint 7 — Polish & Launch**
- Performance audit + fixes (Lighthouse 90+)
- Accessibility audit (axe-core + manual keyboard testing)
- SEO final pass (sitemap, robots, hreflang, structured data validation)
- Sentry integration
- Final content load (real content from author, replacing placeholders)
- Launch checklist + DNS + analytics verification

---

## 12. AGENT INSTRUCTIONS (READ EVERY PROMPT)

When you (Antigravity) receive a sprint prompt:

1. **Re-read this document first.** Section 1 (Philosophy) and the relevant Sprint section are mandatory context.
2. **Do not invent features outside the spec.** If you think something is missing, flag it in code comments as `// NEXUS-QUESTION:` for the human to review.
3. **Do not skip accessibility or performance.** They are not "nice to have" — they are part of the spec.
4. **Commit in logical chunks.** One commit per substantive subsystem within the sprint.
5. **Update `/docs/CHANGELOG.md`** at the end of each sprint with what was added.
6. **Leave TODO markers** as `// NEXUS-TODO(SprintN):` for anything intentionally deferred to a later sprint.
7. **Type strictness:** Never weaken `tsconfig.json`. If you need a type, define it properly.
8. **No silent failures.** Errors must surface clearly in dev; production errors go to Sentry (when configured).
9. **Match the realm theming.** Every component must respect the active realm via CSS variables. No hardcoded colors except in the design tokens file.
10. **Test the obvious paths.** For each new page/route, manually verify: loads in all 4 locales, keyboard-navigable, mobile responsive, dark theme correct (where applicable), reduced-motion correct.

---

## 13. OPEN QUESTIONS (TO RESOLVE BEFORE SPRINT 0)

- [ ] Final client name and tagline → fills `[CLIENT_*]` placeholders
- [ ] Domain name (proposed: `[CLIENT_LAST_NAME].com` or `[CLIENT_HANDLE].com` or thematic)
- [ ] Sanity organization + project name
- [ ] Vercel team + project name
- [ ] Supabase project name
- [ ] Resend domain (likely subdomain of final site, e.g. `mail.[domain]`)
- [ ] GitHub repo name (proposal: `authors-nexus`)
- [ ] Cloudflare account for Turnstile + (optionally) DNS

---

*End of Master Architecture Document. Updates to this document require version bump and changelog entry.*

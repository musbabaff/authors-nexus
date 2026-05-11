-- The Author's Nexus — Initial Database Schema
-- Run this in Supabase SQL Editor or via supabase db push
-- Migration: 0001_init.sql

-- ─── Briefs (Brief submissions from Atelier /brief page) ─────────────────────
create table if not exists public.briefs (
  id                  uuid        primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  locale              text        not null check (locale in ('az','en','ru','tr')),
  deliverable_type    text        not null,
  brand_name          text        not null,
  brand_voice         text,
  audience            text,
  deliverable_details text,
  timeline            text,
  budget_range        text,
  contact_email       text        not null,
  contact_name        text,
  raw_payload         jsonb       not null,
  status              text        not null default 'new'
                        check (status in ('new','reviewing','replied','archived'))
);

create index briefs_created_at_idx on public.briefs (created_at desc);
create index briefs_status_idx     on public.briefs (status);

comment on table  public.briefs is 'Structured brief submissions from the Atelier /brief stepper form.';
comment on column public.briefs.raw_payload is 'Full form data as JSON — kept for auditability.';
comment on column public.briefs.status      is 'Workflow status: new → reviewing → replied → archived.';

-- ─── Whispers (Anonymous messages to the author) ──────────────────────────────
create table if not exists public.whispers (
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  locale      text        not null check (locale in ('az','en','ru','tr')),
  piece_ref   text,        -- optional Sanity document _id (poem/story this whisper refers to)
  message     text        not null check (char_length(message) <= 1000),
  reply_email text,        -- optional: if reader wants a reply someday
  ip_hash     text,        -- hashed IP for rate limiting; never raw IP stored
  is_read     boolean     not null default false
);

create index whispers_created_at_idx on public.whispers (created_at desc);
create index whispers_is_read_idx    on public.whispers (is_read);
create index whispers_piece_ref_idx  on public.whispers (piece_ref) where piece_ref is not null;

comment on table  public.whispers is 'Anonymous messages from readers to the author, submitted via the Whisper feature.';
comment on column public.whispers.piece_ref  is 'Sanity _id of the poem or story that inspired the whisper (nullable).';
comment on column public.whispers.ip_hash    is 'SHA-256 hash of reader IP — used for rate limiting only. Never the raw IP.';

-- ─── Reading Positions (Anonymous scroll bookmarks for long stories) ──────────
create table if not exists public.reading_positions (
  id              uuid          primary key default gen_random_uuid(),
  cookie_hash     text          not null,   -- hashed anonymous cookie value
  piece_ref       text          not null,   -- Sanity _id of the story
  locale          text          not null check (locale in ('az','en','ru','tr')),
  scroll_percent  numeric(5,2)  not null check (scroll_percent >= 0 and scroll_percent <= 100),
  updated_at      timestamptz   not null default now(),
  unique (cookie_hash, piece_ref, locale)
);

create index reading_positions_cookie_idx on public.reading_positions (cookie_hash);
create index reading_positions_piece_idx  on public.reading_positions (piece_ref);

comment on table  public.reading_positions is 'Anonymous reading progress bookmarks. Keyed by hashed cookie, piece, and locale.';
comment on column public.reading_positions.scroll_percent is '0–100 percentage of how far the reader scrolled.';

-- ─── Row Level Security ───────────────────────────────────────────────────────
-- Tables are locked down: no anon/auth access.
-- All reads/writes happen server-side via service role key (bypasses RLS).
alter table public.briefs             enable row level security;
alter table public.whispers           enable row level security;
alter table public.reading_positions  enable row level security;

-- No policies defined intentionally — service role bypasses RLS entirely.
-- If we ever need client-side access, add specific policies at that point.

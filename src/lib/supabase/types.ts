/**
 * Supabase database types for The Author's Nexus.
 * These are hand-authored from the migration in supabase/migrations/0001_init.sql.
 *
 * NEXUS-TODO(Sprint2): Generate these automatically via `npx supabase gen types typescript`
 * once the Supabase CLI is configured in CI.
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Locale = 'az' | 'en' | 'ru' | 'tr';
export type BriefStatus = 'new' | 'reviewing' | 'replied' | 'archived';

// ─── Row types (what comes back from SELECT) ──────────────────────────────────

export interface BriefRow {
  id: string;
  created_at: string;
  locale: Locale;
  deliverable_type: string;
  brand_name: string;
  brand_voice: string | null;
  audience: string | null;
  deliverable_details: string | null;
  timeline: string | null;
  budget_range: string | null;
  contact_email: string;
  contact_name: string | null;
  raw_payload: Json;
  status: BriefStatus;
}

export interface WhisperRow {
  id: string;
  created_at: string;
  locale: Locale;
  piece_ref: string | null;
  message: string;
  reply_email: string | null;
  ip_hash: string | null;
  is_read: boolean;
}

export interface ReadingPositionRow {
  id: string;
  cookie_hash: string;
  piece_ref: string;
  locale: Locale;
  scroll_percent: number;
  updated_at: string;
}

// ─── Insert types (what you pass to INSERT) ───────────────────────────────────

export type BriefInsert = Omit<BriefRow, 'id' | 'created_at' | 'status'> & {
  status?: BriefStatus;
};

export type WhisperInsert = Omit<WhisperRow, 'id' | 'created_at' | 'is_read'> & {
  is_read?: boolean;
};

export type ReadingPositionInsert = Omit<ReadingPositionRow, 'id' | 'updated_at'>;

// ─── Full Database type (required by Supabase client generics) ────────────────

export interface Database {
  public: {
    Tables: {
      briefs: {
        Row: BriefRow;
        Insert: BriefInsert;
        Update: Partial<BriefInsert>;
      };
      whispers: {
        Row: WhisperRow;
        Insert: WhisperInsert;
        Update: Partial<WhisperInsert>;
      };
      reading_positions: {
        Row: ReadingPositionRow;
        Insert: ReadingPositionInsert;
        Update: Partial<ReadingPositionInsert>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      locale: Locale;
      brief_status: BriefStatus;
    };
  };
}

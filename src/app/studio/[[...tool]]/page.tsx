'use client';

/**
 * Sanity Studio embedded at /studio
 * Mounts the full Studio via next-sanity's NextStudio component.
 *
 * This page is intentionally NOT locale-prefixed (/studio, not /az/studio).
 * It's a development/admin tool, not a user-facing page.
 */
import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}

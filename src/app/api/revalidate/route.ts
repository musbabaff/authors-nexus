import { type NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * Sanity webhook → on-demand ISR revalidation.
 * Sanity calls this endpoint when content is published or updated.
 *
 * Security: validates the shared secret from the Sanity webhook config
 * against the SANITY_WEBHOOK_SECRET env variable.
 *
 * NEXUS-TODO(Sprint2): Add document-type-specific path revalidation
 * (e.g. revalidate /[locale]/atelier/[slug] for individual case studies).
 * Note: revalidateTag API changed in Next.js 16 — use revalidatePath for Sprint 0.
 */
export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-sanity-webhook-secret');
  const expectedSecret = process.env['SANITY_WEBHOOK_SECRET'];

  if (!expectedSecret) {
    console.warn(
      '[revalidate] SANITY_WEBHOOK_SECRET is not set — accepting all webhook calls (dev mode).',
    );
  } else if (secret !== expectedSecret) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await req.json()) as {
      _type?: string;
      _id?: string;
      slug?: { current?: string };
    };

    const docType = body._type;

    // In Sprint 0 we revalidate all locales for any change.
    // Sprint 2+ will add fine-grained path revalidation per document type.
    const localePaths = ['/az', '/en', '/ru', '/tr'] as const;

    switch (docType) {
      case 'siteSettings':
      case 'thresholdSettings':
      case 'ambientSettings':
        // Singletons affect every page — revalidate all locale roots
        revalidatePath('/', 'layout');
        localePaths.forEach((p) => revalidatePath(p, 'layout'));
        break;

      case 'caseStudy':
      case 'testimonial':
        // Atelier realm pages — NEXUS-TODO(Sprint2): add specific slug paths
        localePaths.forEach((p) => revalidatePath(`${p}/atelier`, 'layout'));
        break;

      case 'tome':
      case 'poem':
      case 'story':
        // Library realm pages — NEXUS-TODO(Sprint3): add specific slug paths
        localePaths.forEach((p) => revalidatePath(`${p}/library`, 'layout'));
        break;

      case 'photoSeries':
        // Frame realm pages — NEXUS-TODO(Sprint4): add specific slug paths
        localePaths.forEach((p) => revalidatePath(`${p}/frame`, 'layout'));
        break;

      default:
        // Unknown type — revalidate root layout as a safe fallback
        revalidatePath('/', 'layout');
    }

    return NextResponse.json({ revalidated: true, docType: docType ?? 'unknown' });
  } catch (error) {
    console.error('[revalidate] Error processing webhook:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

/** Reject non-POST requests */
export function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}

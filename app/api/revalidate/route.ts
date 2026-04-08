import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';
import { notifyGHLNewBlogPost } from '@/lib/ghl';

interface SanityWebhookBody {
  _id: string;
  _type: string;
  slug?: {
    current: string;
  };
  title?: string;
  newsletterInclude?: boolean;
}

// Validate HMAC signature from Sanity webhook
function validateSignature(body: string, signature: string | null): boolean {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  
  if (!secret || !signature) {
    return false;
  }

  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(body);
  const expectedSignature = hmac.digest('hex');

  // Timing-safe comparison
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature validation
    const rawBody = await request.text();
    const signature = request.headers.get('x-sanity-signature');

    // Validate HMAC signature
    if (!validateSignature(rawBody, signature)) {
      console.error('[API/revalidate] Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const body: SanityWebhookBody = JSON.parse(rawBody);

    // Revalidate based on document type
    if (body._type === 'post') {
      // Revalidate blog pages
      revalidatePath('/blog', 'layout');
      
      if (body.slug?.current) {
        revalidatePath(`/blog/${body.slug.current}`, 'page');
        // Also revalidate ICP and regulation routes in case post is categorized there
        revalidatePath(`/blog/icp/${body.slug.current}`, 'page');
        revalidatePath(`/blog/regulation/${body.slug.current}`, 'page');
      }

      // Revalidate dedicated pages that show related posts
      revalidatePath('/payer-cco', 'page');
      revalidatePath('/eu-ai-act', 'page');

      // If post is marked for newsletter, notify GHL
      if (body.newsletterInclude && body.title && body.slug?.current) {
        await notifyGHLNewBlogPost(body.title, body.slug.current);
      }
    }

    // Handle other document types as needed
    if (body._type === 'author') {
      revalidatePath('/blog', 'layout');
    }

    if (body._type === 'category') {
      revalidatePath('/blog', 'layout');
    }

    return NextResponse.json(
      { 
        revalidated: true, 
        now: Date.now(),
        type: body._type,
        slug: body.slug?.current,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API/revalidate] Revalidation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

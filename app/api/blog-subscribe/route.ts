import { NextRequest, NextResponse } from 'next/server';
import type { BlogSubscriber } from '@/types/leads';
import { createServiceClient, upsertBlogSubscriber, updateSubscriberGHLSync } from '@/lib/supabase';
import { syncSubscriberToGHL } from '@/lib/ghl';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SubscribeRequestBody {
  email: string;
  source: BlogSubscriber['source'];
}

export async function POST(request: NextRequest) {
  try {
    const body: SubscribeRequestBody = await request.json();

    // Validate email
    if (!body.email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Email format validation
    if (!EMAIL_REGEX.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate source
    const validSources: BlogSubscriber['source'][] = ['blog-inline', 'blog-sidebar', 'footer'];
    if (!validSources.includes(body.source)) {
      return NextResponse.json(
        { success: false, error: 'Invalid source' },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Prepare subscriber data
    const subscriberData: Omit<BlogSubscriber, 'id' | 'created_at'> = {
      email: body.email,
      source: body.source,
      subscribed: true,
    };

    // Upsert to Supabase (duplicate prevention on email)
    const subscriberResult = await upsertBlogSubscriber(supabase, subscriberData);

    if (!subscriberResult) {
      return NextResponse.json(
        { success: false, error: 'Failed to save subscription' },
        { status: 500 }
      );
    }

    // Sync to GHL with Blog-Subscriber tag (async)
    syncSubscriberToGHL(subscriberData as BlogSubscriber)
      .then((ghlContactId) => {
        if (ghlContactId) {
          updateSubscriberGHLSync(supabase, subscriberResult.id, ghlContactId);
        }
      })
      .catch((error) => {
        console.error('[API/blog-subscribe] GHL sync error:', error);
        // Supabase record is preserved even if GHL fails
      });

    return NextResponse.json(
      { success: true, subscriber_id: subscriberResult.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API/blog-subscribe] Subscription error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import type { BlogSubscriber } from '@/types/leads';

export async function POST(request: NextRequest) {
  try {
    const body: Partial<BlogSubscriber> = await request.json();

    // Validate email
    if (!body.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Phase 2: Implement Supabase insert and GHL sync
    // For now, return success placeholder
    
    return NextResponse.json(
      { success: true, message: 'Subscribed successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Blog subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    // Phase 2: Validate Sanity webhook signature
    const body = await request.json();
    
    // Revalidate blog pages when content changes
    if (body._type === 'post') {
      revalidatePath('/blog', 'layout');
      if (body.slug?.current) {
        revalidatePath(`/blog/${body.slug.current}`, 'page');
      }
    }
    
    return NextResponse.json(
      { revalidated: true, now: Date.now() },
      { status: 200 }
    );
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import type { Lead } from '@/types/leads';

export async function POST(request: NextRequest) {
  try {
    const body: Partial<Lead> = await request.json();

    // Validate required fields
    if (!body.email || !body.name || !body.organization) {
      return NextResponse.json(
        { error: 'Missing required fields: email, name, organization' },
        { status: 400 }
      );
    }

    // Phase 2: Implement Supabase insert and GHL sync
    // For now, return success placeholder
    
    return NextResponse.json(
      { success: true, message: 'Lead captured successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

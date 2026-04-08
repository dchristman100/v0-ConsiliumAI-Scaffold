import { NextRequest, NextResponse } from 'next/server';
import type { Lead, ScorecardResponse } from '@/types/leads';
import { createServiceClient, upsertLead, insertScorecardResponse, updateLeadGHLSync } from '@/lib/supabase';
import { syncLeadToGHL } from '@/lib/ghl';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface LeadRequestBody extends Partial<Lead> {
  // Optional scorecard data when coming from scorecard widget
  scorecard?: {
    q1_answer: number;
    q1_penalty: number;
    q2_answer: number;
    q2_penalty: number;
    q3_answer: number;
    q3_penalty: number;
    q4_selections: string[];
    q5_answer: number;
    q5_penalty: number;
    final_score: number;
    score_verdict: string;
    source: 'homepage-inline' | 'scorecard-page';
    session_id: string;
    regulatory_flags?: string[];
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadRequestBody = await request.json();

    // Validate required fields (FF-01)
    if (!body.email || !body.name || !body.organization || !body.role || !body.primary_concern) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: email, name, organization, role, primary_concern' },
        { status: 400 }
      );
    }

    // Server-side email format validation (FF-02)
    if (!EMAIL_REGEX.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Prepare lead data
    const leadData: Omit<Lead, 'id' | 'created_at'> = {
      email: body.email,
      name: body.name,
      organization: body.organization,
      role: body.role,
      primary_concern: body.primary_concern,
      source_page: body.source_page || 'homepage',
      source_campaign: body.source_campaign || 'Campaign-1',
      utm_source: body.utm_source,
      utm_medium: body.utm_medium,
      utm_campaign: body.utm_campaign,
      utm_content: body.utm_content,
      jurisdiction: body.jurisdiction,
    };

    // Get IP country from Vercel headers if available
    const ipCountry = request.headers.get('x-vercel-ip-country');
    if (ipCountry) {
      leadData.ip_country = ipCountry;
    }

    // Upsert to Supabase with duplicate prevention on email (FF-06)
    const leadResult = await upsertLead(supabase, leadData);

    if (!leadResult) {
      return NextResponse.json(
        { success: false, error: 'Failed to save lead' },
        { status: 500 }
      );
    }

    // If scorecard data is provided, write to scorecard_responses table (HP-10)
    if (body.scorecard) {
      const scorecardData: Omit<ScorecardResponse, 'id' | 'created_at'> = {
        lead_id: leadResult.id,
        email: body.email,
        q1_answer: body.scorecard.q1_answer,
        q1_penalty: body.scorecard.q1_penalty,
        q2_answer: body.scorecard.q2_answer,
        q2_penalty: body.scorecard.q2_penalty,
        q3_answer: body.scorecard.q3_answer,
        q3_penalty: body.scorecard.q3_penalty,
        q4_selections: body.scorecard.q4_selections,
        q5_answer: body.scorecard.q5_answer,
        q5_penalty: body.scorecard.q5_penalty,
        final_score: body.scorecard.final_score,
        score_verdict: body.scorecard.score_verdict,
        source: body.scorecard.source,
        session_id: body.scorecard.session_id,
      };

      await insertScorecardResponse(supabase, scorecardData);
    }

    // Sync to GHL (async, don't block response)
    // GHL sync happens after Supabase write succeeds
    const scoreData = body.scorecard ? {
      score: body.scorecard.final_score,
      verdict: body.scorecard.score_verdict,
      regulatoryFlags: body.scorecard.regulatory_flags || body.scorecard.q4_selections,
    } : undefined;

    // Fire and forget GHL sync with retry logic
    syncLeadToGHL(leadData as Lead, scoreData)
      .then((ghlContactId) => {
        if (ghlContactId) {
          // Update lead with GHL contact ID
          updateLeadGHLSync(supabase, leadResult.id, ghlContactId);
        }
      })
      .catch((error) => {
        console.error('[API/leads] GHL sync error:', error);
        // Supabase record is preserved even if GHL fails
      });

    return NextResponse.json(
      { success: true, lead_id: leadResult.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API/leads] Lead submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

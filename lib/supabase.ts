// Supabase client configuration
// Phase 4: Full implementation with typed helpers

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Lead, ScorecardResponse, ChecklistSession, PDFRequest, BlogSubscriber } from '@/types/leads';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: Lead;
        Insert: Omit<Lead, 'id' | 'created_at'>;
        Update: Partial<Omit<Lead, 'id' | 'created_at'>>;
      };
      scorecard_responses: {
        Row: ScorecardResponse;
        Insert: Omit<ScorecardResponse, 'id' | 'created_at'>;
        Update: Partial<Omit<ScorecardResponse, 'id' | 'created_at'>>;
      };
      checklist_sessions: {
        Row: ChecklistSession;
        Insert: Omit<ChecklistSession, 'id' | 'created_at'>;
        Update: Partial<Omit<ChecklistSession, 'id' | 'created_at'>>;
      };
      pdf_requests: {
        Row: PDFRequest;
        Insert: Omit<PDFRequest, 'id' | 'created_at'>;
        Update: Partial<Omit<PDFRequest, 'id' | 'created_at'>>;
      };
      blog_subscribers: {
        Row: BlogSubscriber;
        Insert: Omit<BlogSubscriber, 'id' | 'created_at'>;
        Update: Partial<Omit<BlogSubscriber, 'id' | 'created_at'>>;
      };
    };
  };
};

// Client-side Supabase client (uses anon key)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Server-side client with service key (for API routes only)
export function createServiceClient(): SupabaseClient<Database> {
  const serviceUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_KEY!;
  
  return createClient<Database>(serviceUrl, serviceKey);
}

// Helper: Upsert lead with duplicate prevention on email (FF-06)
export async function upsertLead(
  client: SupabaseClient<Database>,
  lead: Omit<Lead, 'id' | 'created_at'>
): Promise<{ id: string } | null> {
  const { data, error } = await client
    .from('leads')
    .upsert(lead, { onConflict: 'email' })
    .select('id')
    .single();

  if (error) {
    console.error('[Supabase] Lead upsert error:', error);
    return null;
  }

  return data;
}

// Helper: Insert scorecard response (HP-10)
export async function insertScorecardResponse(
  client: SupabaseClient<Database>,
  response: Omit<ScorecardResponse, 'id' | 'created_at'>
): Promise<{ id: string } | null> {
  const { data, error } = await client
    .from('scorecard_responses')
    .insert(response)
    .select('id')
    .single();

  if (error) {
    console.error('[Supabase] Scorecard response insert error:', error);
    return null;
  }

  return data;
}

// Helper: Upsert blog subscriber with duplicate prevention on email
export async function upsertBlogSubscriber(
  client: SupabaseClient<Database>,
  subscriber: Omit<BlogSubscriber, 'id' | 'created_at'>
): Promise<{ id: string } | null> {
  const { data, error } = await client
    .from('blog_subscribers')
    .upsert(subscriber, { onConflict: 'email' })
    .select('id')
    .single();

  if (error) {
    console.error('[Supabase] Blog subscriber upsert error:', error);
    return null;
  }

  return data;
}

// Helper: Log PDF request
export async function logPDFRequest(
  client: SupabaseClient<Database>,
  request: Omit<PDFRequest, 'id' | 'created_at'>
): Promise<void> {
  const { error } = await client.from('pdf_requests').insert(request);

  if (error) {
    console.error('[Supabase] PDF request log error:', error);
  }
}

// Helper: Update lead with GHL contact ID
export async function updateLeadGHLSync(
  client: SupabaseClient<Database>,
  leadId: string,
  ghlContactId: string
): Promise<void> {
  const { error } = await client
    .from('leads')
    .update({
      ghl_contact_id: ghlContactId,
      ghl_synced_at: new Date().toISOString(),
    })
    .eq('id', leadId);

  if (error) {
    console.error('[Supabase] Lead GHL sync update error:', error);
  }
}

// Helper: Update blog subscriber with GHL contact ID
export async function updateSubscriberGHLSync(
  client: SupabaseClient<Database>,
  subscriberId: string,
  ghlContactId: string
): Promise<void> {
  const { error } = await client
    .from('blog_subscribers')
    .update({
      ghl_contact_id: ghlContactId,
      ghl_synced_at: new Date().toISOString(),
    })
    .eq('id', subscriberId);

  if (error) {
    console.error('[Supabase] Subscriber GHL sync update error:', error);
  }
}

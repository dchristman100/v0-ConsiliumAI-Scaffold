-- ConsiliumAI Database Schema
-- Creates tables for leads, scorecard responses, checklist sessions, PDF requests, and blog subscribers

-- Leads table (assessment form submissions)
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  organization TEXT,
  role TEXT,
  primary_concern TEXT,
  jurisdiction TEXT,
  org_size TEXT,
  source_page TEXT,
  source_campaign TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  ghl_contact_id TEXT,
  ghl_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scorecard responses table (5-question assessment results)
CREATE TABLE IF NOT EXISTS public.scorecard_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  answers JSONB NOT NULL,
  score INTEGER NOT NULL,
  gaps JSONB,
  regulatory_exposure JSONB,
  source_page TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Checklist sessions table (payer/EU checklist progress)
CREATE TABLE IF NOT EXISTS public.checklist_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  checklist_type TEXT NOT NULL,
  checked_items JSONB NOT NULL DEFAULT '[]',
  progress_percentage INTEGER DEFAULT 0,
  verdict TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PDF requests table (download tracking)
CREATE TABLE IF NOT EXISTS public.pdf_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pdf_type TEXT NOT NULL,
  email TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog subscribers table (newsletter signups)
CREATE TABLE IF NOT EXISTS public.blog_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  source TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  ghl_contact_id TEXT,
  ghl_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_scorecard_responses_email ON public.scorecard_responses(email);
CREATE INDEX IF NOT EXISTS idx_scorecard_responses_lead_id ON public.scorecard_responses(lead_id);
CREATE INDEX IF NOT EXISTS idx_blog_subscribers_email ON public.blog_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_pdf_requests_created_at ON public.pdf_requests(created_at DESC);

-- Note: RLS is NOT enabled for these tables since they are accessed via service role key
-- from server-side API routes only. The service role key bypasses RLS.

export interface Lead {
  id?: string;
  created_at?: string;
  email: string;
  name: string;
  organization: string;
  role: string;
  primary_concern: string;
  source_page: 'homepage' | 'payer-cco' | 'eu-ai-act' | 'scorecard';
  source_campaign: 'Campaign-1' | 'Campaign-2' | 'Campaign-3';
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  jurisdiction?: string;
  ghl_contact_id?: string;
  ghl_synced_at?: string;
  ip_country?: string;
}

export interface ScorecardResponse {
  id?: string;
  created_at?: string;
  lead_id?: string;
  email?: string;
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
}

export interface ChecklistSession {
  id?: string;
  created_at?: string;
  checklist_type: 'payer-cco' | 'eu-ai-act';
  email?: string;
  items_completed: number;
  total_items: number;
  completion_pct: number;
  pdf_downloaded: boolean;
  utm_source?: string;
}

export interface PDFRequest {
  id?: string;
  created_at?: string;
  document_type: 'payer-checklist' | 'eu-checklist' | 'scorecard-result';
  email?: string;
  generation_time_ms: number;
  file_size_bytes: number;
  success: boolean;
}

export interface BlogSubscriber {
  id?: string;
  created_at?: string;
  email: string;
  source: 'blog-inline' | 'blog-sidebar' | 'footer';
  ghl_contact_id?: string;
  ghl_synced_at?: string;
  subscribed: boolean;
  unsubscribed_at?: string;
}

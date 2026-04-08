// GoHighLevel API helper functions
// Phase 4: Full implementation with contact sync and retry logic

import type { Lead, BlogSubscriber } from '@/types/leads';

const GHL_API_BASE = 'https://rest.gohighlevel.com/v1';

interface GHLContactPayload {
  email: string;
  firstName: string;
  lastName?: string;
  companyName: string;
  tags: string[];
  customField: Record<string, string>;
}

interface GHLContact {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  companyName?: string;
  tags?: string[];
  customField?: Record<string, string>;
}

interface GHLCreateContactResponse {
  contact: GHLContact;
}

// Exponential backoff retry helper (E-WEB-03)
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelayMs: number = 1000
): Promise<T | null> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      console.error(`[GHL] Attempt ${attempt + 1} failed:`, error);
      
      if (attempt < maxRetries - 1) {
        const delay = baseDelayMs * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  console.error('[GHL] All retry attempts failed:', lastError);
  return null;
}

/**
 * Create a contact in GoHighLevel
 */
export async function createGHLContact(payload: GHLContactPayload): Promise<{ id: string } | null> {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    console.error('[GHL] Missing API key or location ID');
    return null;
  }

  return withRetry(async () => {
    const response = await fetch(`${GHL_API_BASE}/contacts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        locationId,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GHL API error: ${response.status} - ${errorText}`);
    }

    const data: GHLCreateContactResponse = await response.json();
    return { id: data.contact.id };
  });
}

/**
 * Add tags to existing GHL contact
 */
export async function addGHLTags(contactId: string, tags: string[]): Promise<boolean> {
  const apiKey = process.env.GHL_API_KEY;

  if (!apiKey) {
    console.error('[GHL] Missing API key');
    return false;
  }

  const result = await withRetry(async () => {
    const response = await fetch(`${GHL_API_BASE}/contacts/${contactId}/tags/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tags }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GHL tags API error: ${response.status} - ${errorText}`);
    }

    return true;
  });

  return result === true;
}

/**
 * Sync lead to GHL with appropriate tags and custom fields
 */
export async function syncLeadToGHL(lead: Lead, scoreData?: {
  score: number;
  verdict: string;
  regulatoryFlags: string[];
}): Promise<string | null> {
  // Determine campaign tags
  const campaignTags: string[] = [];
  
  switch (lead.source_campaign) {
    case 'Campaign-1':
      campaignTags.push('Campaign-1', 'Universal-Scorecard');
      break;
    case 'Campaign-2':
      campaignTags.push('Campaign-2', 'Payer-CCO', 'ICP-08');
      break;
    case 'Campaign-3':
      campaignTags.push('Campaign-3', 'EU-AI-Act', 'ICP-03');
      break;
  }

  // Add ICP role tag if applicable
  if (lead.role) {
    campaignTags.push(`Role-${lead.role.replace(/\s+/g, '-')}`);
  }

  // Build custom fields
  const customField: Record<string, string> = {
    source_page: lead.source_page,
    source_campaign: lead.source_campaign,
    primary_concern: lead.primary_concern,
  };

  if (lead.jurisdiction) {
    customField.jurisdiction = lead.jurisdiction;
  }

  // UTM params
  if (lead.utm_source) customField.utm_source = lead.utm_source;
  if (lead.utm_medium) customField.utm_medium = lead.utm_medium;
  if (lead.utm_campaign) customField.utm_campaign = lead.utm_campaign;
  if (lead.utm_content) customField.utm_content = lead.utm_content;

  // Derive EU ops flag
  const euOpsFlag = lead.jurisdiction && lead.jurisdiction !== 'US no EU operations';
  customField.eu_ops = euOpsFlag ? 'true' : 'false';

  // Add scorecard data if provided
  if (scoreData) {
    customField.ai_governance_score = scoreData.score.toString();
    customField.score_verdict = scoreData.verdict;
    customField.regulatory_flags = scoreData.regulatoryFlags.join(', ');
    campaignTags.push('Scorecard-Completed');
  }

  // Parse name into first/last
  const nameParts = lead.name.trim().split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const payload: GHLContactPayload = {
    email: lead.email,
    firstName,
    lastName,
    companyName: lead.organization,
    tags: campaignTags,
    customField,
  };

  const result = await createGHLContact(payload);
  return result?.id || null;
}

/**
 * Sync blog subscriber to GHL
 */
export async function syncSubscriberToGHL(subscriber: BlogSubscriber): Promise<string | null> {
  const payload: GHLContactPayload = {
    email: subscriber.email,
    firstName: '',
    companyName: '',
    tags: ['Blog-Subscriber', `Blog-Source-${subscriber.source}`],
    customField: {
      source: subscriber.source,
    },
  };

  const result = await createGHLContact(payload);
  return result?.id || null;
}

/**
 * Notify GHL about new blog post (for newsletter)
 */
export async function notifyGHLNewBlogPost(postTitle: string, postSlug: string): Promise<boolean> {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    console.error('[GHL] Missing API key or location ID for newsletter notify');
    return false;
  }

  // This would trigger a workflow in GHL to send newsletter
  // Implementation depends on GHL workflow setup
  console.log('[GHL] Newsletter trigger for:', postTitle, postSlug);
  return true;
}

// Type exports
export type { GHLContact, GHLCreateContactResponse, GHLContactPayload };

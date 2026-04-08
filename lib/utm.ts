// UTM capture utilities
// Used for form submission passthrough and analytics

import type { UTMParams } from '@/types/forms';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

/**
 * Capture UTM params from URL and store in sessionStorage
 * Call this on page load (client-side)
 */
export function captureUTMParams(): void {
  if (typeof window === 'undefined') return;
  
  const params = new URLSearchParams(window.location.search);
  
  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      sessionStorage.setItem(key, value);
    }
  });
}

/**
 * Get UTM params from sessionStorage
 * For use when submitting forms
 */
export function getUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {};
  
  const params: UTMParams = {};
  
  UTM_KEYS.forEach((key) => {
    const value = sessionStorage.getItem(key);
    if (value) {
      params[key] = value;
    }
  });
  
  return params;
}

/**
 * Parse UTM params from URL search params
 */
export function parseUTMFromURL(searchParams: URLSearchParams): UTMParams {
  return {
    utm_source: searchParams.get('utm_source') || undefined,
    utm_medium: searchParams.get('utm_medium') || undefined,
    utm_campaign: searchParams.get('utm_campaign') || undefined,
    utm_content: searchParams.get('utm_content') || undefined,
    utm_term: searchParams.get('utm_term') || undefined,
  };
}

/**
 * Parse UTM params from cookie string
 * Cookie is set by middleware
 */
export function parseUTMFromCookie(cookieValue: string | undefined): UTMParams {
  if (!cookieValue) {
    return {};
  }
  
  try {
    return JSON.parse(cookieValue) as UTMParams;
  } catch {
    return {};
  }
}

/**
 * Build UTM query string for URL passthrough
 */
export function buildUTMQueryString(params: UTMParams): string {
  const filtered = Object.entries(params).filter(([, v]) => v);
  
  if (filtered.length === 0) {
    return '';
  }
  
  return '?' + filtered.map(([k, v]) => `${k}=${encodeURIComponent(v!)}`).join('&');
}

/**
 * Clear UTM params from sessionStorage
 */
export function clearUTMParams(): void {
  if (typeof window === 'undefined') return;
  
  UTM_KEYS.forEach((key) => {
    sessionStorage.removeItem(key);
  });
}

// UTM capture utilities
// Used for form submission passthrough and analytics

import type { UTMParams } from '@/types/forms';

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
 * Get UTM params client-side
 * First checks URL, then falls back to cookie
 */
export function getUTMParams(): UTMParams {
  if (typeof window === 'undefined') {
    return {};
  }

  // Check URL first
  const urlParams = parseUTMFromURL(new URLSearchParams(window.location.search));
  
  // If URL has UTM params, use those
  if (Object.values(urlParams).some(Boolean)) {
    return urlParams;
  }

  // Fall back to cookie
  const cookies = document.cookie.split(';');
  const utmCookie = cookies.find(c => c.trim().startsWith('utm_params='));
  
  if (utmCookie) {
    const value = decodeURIComponent(utmCookie.split('=')[1]);
    return parseUTMFromCookie(value);
  }

  return {};
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

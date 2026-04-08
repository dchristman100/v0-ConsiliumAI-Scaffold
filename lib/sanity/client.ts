import { createClient, type SanityClient } from 'next-sanity';

// Check if Sanity is configured
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// Flag to check if Sanity is available
export const isSanityConfigured = Boolean(projectId);

// Create clients only if configured
let _sanityClient: SanityClient | null = null;
let _previewClient: SanityClient | null = null;

function createSanityClient(): SanityClient | null {
  if (!projectId) {
    return null;
  }
  return createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: true,
  });
}

function createPreviewClient(): SanityClient | null {
  if (!projectId) {
    return null;
  }
  return createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  });
}

// Lazy getters for clients
export function getSanityClient(): SanityClient | null {
  if (!_sanityClient && projectId) {
    _sanityClient = createSanityClient();
  }
  return _sanityClient;
}

export function getPreviewClient(): SanityClient | null {
  if (!_previewClient && projectId) {
    _previewClient = createPreviewClient();
  }
  return _previewClient;
}

// Get appropriate client based on preview mode
export function getClient(preview = false): SanityClient | null {
  return preview ? getPreviewClient() : getSanityClient();
}

// For backward compatibility - but these will be null if Sanity is not configured
export const sanityClient = projectId ? createSanityClient() : null;
export const previewClient = projectId ? createPreviewClient() : null;

// Sanity client configuration
// Phase 2: Full implementation with proper client setup

// Placeholder configuration
export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
};

// Phase 2: Export configured Sanity client
// export const sanityClient = createClient(sanityConfig);

// Preview client for draft content
// export const previewClient = createClient({
//   ...sanityConfig,
//   useCdn: false,
//   token: process.env.SANITY_API_TOKEN,
// });

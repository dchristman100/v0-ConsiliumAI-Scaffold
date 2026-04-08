// Sanity image URL helper
// Phase 2: Full implementation with @sanity/image-url

import { sanityConfig } from './client';

interface SanityImageSource {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

/**
 * Generate optimized image URL from Sanity image reference
 * Phase 2: Implement with @sanity/image-url
 */
export function urlFor(source: SanityImageSource | null | undefined): string {
  if (!source?.asset?._ref) {
    return '/placeholder.jpg';
  }
  
  // Phase 2: Use imageUrlBuilder
  // return imageUrlBuilder(sanityConfig).image(source).url();
  
  // Placeholder return
  return '/placeholder.jpg';
}

/**
 * Get image dimensions from Sanity image reference
 */
export function getImageDimensions(source: SanityImageSource): { width: number; height: number } | null {
  if (!source?.asset?._ref) {
    return null;
  }
  
  // Parse dimensions from asset reference
  // Format: image-{id}-{width}x{height}-{format}
  const ref = source.asset._ref;
  const match = ref.match(/-(\d+)x(\d+)-/);
  
  if (match) {
    return {
      width: parseInt(match[1], 10),
      height: parseInt(match[2], 10),
    };
  }
  
  return null;
}

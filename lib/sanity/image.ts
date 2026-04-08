import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './client';

const builder = imageUrlBuilder(sanityClient);

interface SanityImageSource {
  _type?: 'image';
  asset?: {
    _ref: string;
    _type: 'reference';
  };
}

/**
 * Generate optimized image URL from Sanity image reference
 */
export function urlFor(source: SanityImageSource | null | undefined) {
  if (!source?.asset?._ref) {
    return {
      url: () => '/placeholder.jpg',
      width: (w: number) => ({ url: () => '/placeholder.jpg', height: (h: number) => ({ url: () => '/placeholder.jpg' }) }),
    };
  }
  return builder.image(source);
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

/**
 * Generate srcSet for responsive images
 */
export function generateSrcSet(source: SanityImageSource, widths: number[] = [320, 640, 960, 1280, 1920]): string {
  if (!source?.asset?._ref) {
    return '';
  }
  
  return widths
    .map((w) => `${builder.image(source).width(w).auto('format').url()} ${w}w`)
    .join(', ');
}

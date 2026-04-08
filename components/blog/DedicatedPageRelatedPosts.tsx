// components/blog/DedicatedPageRelatedPosts.tsx
// Server component — 3 recent posts for dedicated pages (BL-07)
// Used on /payer-cco and /eu-ai-act pages

import Link from 'next/link';
import Image from 'next/image';
import { getSanityClient, isSanityConfigured } from '@/lib/sanity/client';
import { POSTS_BY_ICP_RECENT_QUERY } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import type { Post } from '@/types/blog';

interface DedicatedPageRelatedPostsProps {
  icpSlug: string;
  pageType: 'payer' | 'eu';
}

export default async function DedicatedPageRelatedPosts({
  icpSlug,
  pageType,
}: DedicatedPageRelatedPostsProps) {
  // Return null if Sanity is not configured
  if (!isSanityConfigured) {
    return null;
  }
  
  const client = getSanityClient();
  if (!client) {
    return null;
  }
  
  const posts = await client.fetch<Post[]>(POSTS_BY_ICP_RECENT_QUERY, { icpSlug });

  const sectionTitle = pageType === 'payer' 
    ? 'Latest Payer Compliance Insights' 
    : 'Latest EU AI Act Insights';

  const viewAllLink = pageType === 'payer'
    ? '/blog/icp/payer-cco'
    : '/blog/icp/eu-ai-act';

  if (posts.length === 0) {
    return null;
  }

  return (
    <section
      style={{
        padding: '64px 24px',
        background: 'var(--navy2)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            fontWeight: 400,
            color: 'var(--text)',
            marginBottom: '32px',
            textAlign: 'center',
          }}
        >
          {sectionTitle}
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {posts.slice(0, 3).map((post) => (
            <article
              key={post._id}
              style={{
                background: 'var(--navy)',
                border: '1px solid var(--border)',
                overflow: 'hidden',
              }}
            >
              {post.mainImage && (
                <Link href={`/blog/${post.slug.current}`} style={{ display: 'block' }}>
                  <div
                    style={{
                      aspectRatio: '16/9',
                      position: 'relative',
                      background: 'var(--navy3)',
                    }}
                  >
                    <Image
                      src={urlFor(post.mainImage).width(400).height(225).url()}
                      alt={post.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </Link>
              )}
              <div style={{ padding: '24px' }}>
                <p
                  style={{
                    fontSize: '11px',
                    color: 'var(--muted)',
                    marginBottom: '8px',
                  }}
                >
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '18px',
                    fontWeight: 400,
                    color: 'var(--text)',
                    marginBottom: '8px',
                    lineHeight: 1.3,
                  }}
                >
                  <Link
                    href={`/blog/${post.slug.current}`}
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    {post.title}
                  </Link>
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--muted)',
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link
            href={viewAllLink}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--gold)',
              textDecoration: 'none',
            }}
          >
            View All Insights &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

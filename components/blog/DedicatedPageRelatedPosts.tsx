// components/blog/DedicatedPageRelatedPosts.tsx
// Server component — 3 recent posts for dedicated pages

import Link from 'next/link';
import type { Post } from '@/types/blog';

interface DedicatedPageRelatedPostsProps {
  posts: Post[];
  pageType: 'payer' | 'eu';
}

export default function DedicatedPageRelatedPosts({ posts, pageType }: DedicatedPageRelatedPostsProps) {
  const sectionTitle = pageType === 'payer' 
    ? 'Latest Payer Compliance Insights' 
    : 'Latest EU AI Act Insights';

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
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
        >
          {posts.slice(0, 3).map((post) => (
            <article
              key={post._id}
              style={{
                background: 'var(--navy)',
                border: '1px solid var(--border)',
                padding: '24px',
              }}
            >
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
                }}
              >
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link
            href={pageType === 'payer' ? '/blog/icp/payer-cco' : '/blog/regulation/eu-ai-act'}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--gold)',
              textDecoration: 'none',
            }}
          >
            View All Insights →
          </Link>
        </div>
      </div>
    </section>
  );
}

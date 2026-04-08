// components/blog/PostCard.tsx
// Server component — blog post card
// Phase 2: Full implementation with Sanity image

import Link from 'next/link';
import type { Post } from '@/types/blog';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <article
      style={{
        background: 'var(--navy2)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      {/* Image placeholder - Phase 2: Sanity image */}
      <div
        style={{
          aspectRatio: '16/9',
          background: 'var(--navy3)',
        }}
      />
      
      <div style={{ padding: '24px' }}>
        {/* Tags */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
          {post.icpTags?.map((tag) => (
            <span
              key={tag._id}
              style={{
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                background: 'var(--gold-d)',
                padding: '4px 8px',
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
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

        {/* Excerpt */}
        <p
          style={{
            fontSize: '14px',
            color: 'var(--muted)',
            lineHeight: 1.6,
            marginBottom: '16px',
          }}
        >
          {post.excerpt}
        </p>

        {/* Meta */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            color: 'var(--muted)',
          }}
        >
          <span>{post.author?.name}</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </article>
  );
}

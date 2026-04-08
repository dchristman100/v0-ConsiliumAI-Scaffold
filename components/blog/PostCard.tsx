// components/blog/PostCard.tsx
// Server component — blog post card with Sanity image

import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/types/blog';
import { urlFor } from '@/lib/sanity/image';

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
      {/* Image */}
      <Link href={`/blog/${post.slug.current}`} style={{ display: 'block' }}>
        <div
          style={{
            aspectRatio: '16/9',
            background: 'var(--navy3)',
            position: 'relative',
          }}
        >
          {post.mainImage && (
            <Image
              src={urlFor(post.mainImage).width(600).height(338).url()}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
      </Link>
      
      <div style={{ padding: '24px' }}>
        {/* Tags */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
          {post.icpTags?.slice(0, 2).map((tag) => (
            <Link
              key={tag._id}
              href={`/blog?icp=${tag.slug.current}`}
              style={{
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                background: 'var(--gold-d)',
                padding: '4px 8px',
                textDecoration: 'none',
              }}
            >
              {tag.name}
            </Link>
          ))}
          {post.regulatoryTags?.slice(0, 1).map((tag) => (
            <Link
              key={tag._id}
              href={`/blog?regulation=${tag.slug.current}`}
              style={{
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--amber)',
                background: 'rgba(240, 160, 48, 0.10)',
                padding: '4px 8px',
                textDecoration: 'none',
              }}
            >
              {tag.name}
            </Link>
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
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
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

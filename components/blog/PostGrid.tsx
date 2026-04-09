// components/blog/PostGrid.tsx
// Server component — blog post grid layout

import type { Post } from '@/types/blog';
import PostCard from './PostCard';

interface PostGridProps {
  posts: Post[];
  columns?: 2 | 3;
}

export default function PostGrid({ posts, columns = 3 }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div
        style={{
          padding: '64px 32px',
          textAlign: 'center',
          background: 'var(--navy2)',
          border: '1px solid var(--border)',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            fontWeight: 400,
            color: 'var(--text)',
            marginBottom: '12px',
          }}
        >
          Insights coming soon.
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6 }}>
          Expert analysis on AI governance and regulatory compliance is on the way.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '24px',
      }}
    >
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}

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
          padding: '48px',
          textAlign: 'center',
          background: 'var(--navy2)',
          border: '1px solid var(--border)',
        }}
      >
        <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
          No posts found.
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

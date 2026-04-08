import type { Metadata } from 'next';
import Footer from '@/components/layout/Footer';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  return {
    title: `${slug} — AI Governance Insights | ConsiliumAI`,
    description: 'Expert analysis on AI governance, regulatory compliance, and enterprise AI risk management.',
    openGraph: {
      title: `${slug} — AI Governance Insights | ConsiliumAI`,
      description: 'Expert analysis on AI governance, regulatory compliance, and enterprise AI risk management.',
      type: 'article',
      url: `https://consiliumai.co/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  return (
    <main>
      <article
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '120px 24px 80px',
          textAlign: 'center',
        }}
      >
        <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '24px' }}>
          BLOG POST
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 400,
            color: 'var(--text)',
            lineHeight: 1.1,
            marginBottom: '24px',
            maxWidth: '900px',
          }}
        >
          {slug}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            color: 'var(--muted)',
            lineHeight: 1.6,
            maxWidth: '600px',
          }}
        >
          Blog post page — Phase 2 content will replace this placeholder.
          Sanity Portable Text rendering, author bio, related posts,
          and contextual sidebar CTA based on post tags.
        </p>
      </article>
      <Footer />
    </main>
  );
}

import type { Metadata } from 'next';
import Footer from '@/components/layout/Footer';

interface BlogICPPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogICPPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  return {
    title: `${slug} Insights — AI Governance Blog | ConsiliumAI`,
    description: `Expert AI governance insights for ${slug} professionals. Regulatory analysis, compliance strategies, and best practices.`,
    openGraph: {
      title: `${slug} Insights — AI Governance Blog | ConsiliumAI`,
      description: `Expert AI governance insights for ${slug} professionals. Regulatory analysis, compliance strategies, and best practices.`,
      type: 'website',
      url: `https://consiliumai.co/blog/icp/${slug}`,
    },
  };
}

export default async function BlogICPPage({ params }: BlogICPPageProps) {
  const { slug } = await params;

  return (
    <main>
      <section
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
          INSIGHTS BY AUDIENCE
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
          {slug} Insights
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
          Blog by ICP page — Phase 2 content will replace this placeholder.
          Filtered post grid by ICP tag with targeted sidebar CTA.
        </p>
      </section>
      <Footer />
    </main>
  );
}

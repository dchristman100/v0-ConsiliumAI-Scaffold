import type { Metadata } from 'next';
import Footer from '@/components/layout/Footer';

interface BlogRegulationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogRegulationPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  return {
    title: `${slug} Regulatory Insights — AI Governance | ConsiliumAI`,
    description: `Expert analysis on ${slug} compliance, deadlines, and implementation strategies for AI governance.`,
    openGraph: {
      title: `${slug} Regulatory Insights — AI Governance | ConsiliumAI`,
      description: `Expert analysis on ${slug} compliance, deadlines, and implementation strategies for AI governance.`,
      type: 'website',
      url: `https://consiliumai.co/blog/regulation/${slug}`,
    },
  };
}

export default async function BlogRegulationPage({ params }: BlogRegulationPageProps) {
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
          INSIGHTS BY REGULATION
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
          Blog by regulation page — Phase 2 content will replace this placeholder.
          Filtered post grid by regulatory tag with urgency indicator and deadline callout.
        </p>
      </section>
      <Footer />
    </main>
  );
}

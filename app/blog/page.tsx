import type { Metadata } from 'next';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Insights — AI Governance Blog | ConsiliumAI',
  description: 'Expert insights on AI governance, regulatory compliance, and enterprise AI risk management. Analysis for CCOs, compliance leaders, and EU AI Act stakeholders.',
  openGraph: {
    title: 'Insights — AI Governance Blog | ConsiliumAI',
    description: 'Expert insights on AI governance, regulatory compliance, and enterprise AI risk management. Analysis for CCOs, compliance leaders, and EU AI Act stakeholders.',
    type: 'website',
    url: 'https://consiliumai.co/blog',
  },
};

export default function BlogIndexPage() {
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
          INSIGHTS
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
          AI Governance Insights
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
          Blog Index page — Phase 2 content will replace this placeholder.
          Sanity CMS integration with ICP and regulatory tag filtering,
          featured posts grid, and sidebar CTAs. Newsletter subscription widget included.
        </p>
      </section>
      <Footer />
    </main>
  );
}

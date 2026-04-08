import type { Metadata } from 'next';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Book Assessment — AI Governance Consultation | ConsiliumAI',
  description: 'Schedule your AI governance assessment with ConsiliumAI. Expert consultation on regulatory compliance, risk mitigation, and governance framework implementation.',
  openGraph: {
    title: 'Book Assessment — AI Governance Consultation | ConsiliumAI',
    description: 'Schedule your AI governance assessment with ConsiliumAI. Expert consultation on regulatory compliance, risk mitigation, and governance framework implementation.',
    type: 'website',
    url: 'https://consiliumai.co/book',
  },
};

export default function BookPage() {
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
          BOOK ASSESSMENT
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
          Schedule Your AI Governance Assessment
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
          Assessment booking page — Phase 2 content will replace this placeholder.
          GHL calendar embed with UTM passthrough and form prefill from scorecard results.
        </p>
      </section>
      <Footer />
    </main>
  );
}

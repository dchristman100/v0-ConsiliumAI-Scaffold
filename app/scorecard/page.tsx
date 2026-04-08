import type { Metadata } from 'next';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'AI Governance Scorecard™ — 2-Minute Assessment | ConsiliumAI',
  description: 'Assess your AI governance posture in 2 minutes. Five questions across policy, oversight, documentation, vendor, and incident dimensions. Instant score and gap analysis.',
  openGraph: {
    title: 'AI Governance Scorecard™ — 2-Minute Assessment | ConsiliumAI',
    description: 'Assess your AI governance posture in 2 minutes. Five questions across policy, oversight, documentation, vendor, and incident dimensions. Instant score and gap analysis.',
    type: 'website',
    url: 'https://consiliumai.co/scorecard',
  },
};

export default function ScorecardPage() {
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
          AI GOVERNANCE SCORECARD™
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
          Assess Your AI Governance Posture
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            color: 'var(--text)',
            marginBottom: '8px',
          }}
        >
          Begin Scorecard — 2 Minutes →
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            color: 'var(--muted)',
            lineHeight: 1.6,
            maxWidth: '600px',
          }}
        >
          AI Governance Scorecard page — Phase 2 content will replace this placeholder.
          Full 5-question assessment with policy, oversight, documentation, vendor,
          and incident response dimensions. Instant scoring and downloadable results PDF.
        </p>
      </section>
      <Footer />
    </main>
  );
}

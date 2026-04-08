import type { Metadata } from 'next';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'EU AI Act Compliance — August 2026 Deadline | ConsiliumAI',
  description: 'Complete EU AI Act compliance framework with countdown to August 2, 2026 deadline. €35M penalty exposure. 38-item compliance checklist and readiness assessment.',
  openGraph: {
    title: 'EU AI Act Compliance — August 2026 Deadline | ConsiliumAI',
    description: 'Complete EU AI Act compliance framework with countdown to August 2, 2026 deadline. €35M penalty exposure. 38-item compliance checklist and readiness assessment.',
    type: 'website',
    url: 'https://consiliumai.co/eu-ai-act',
  },
};

export default function EUAIActPage() {
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
          EU AI ACT COMPLIANCE
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
          August 2, 2026 · €35M Penalty Exposure
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
          EU AI Act Page v2 — Phase 2 content will replace this placeholder.
          Countdown clock, 38-item compliance checklist, jurisdiction selector,
          and targeted conversion paths for EU operations leaders.
        </p>
      </section>
      <Footer />
    </main>
  );
}

import type { Metadata } from 'next';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Payer CCO — AI Governance for Health Plan Compliance | ConsiliumAI',
  description: 'Purpose-built AI governance framework for health plan Chief Compliance Officers navigating CMS MA, FCA exposure, TRAIGA readiness, and PA audit trails.',
  openGraph: {
    title: 'Payer CCO — AI Governance for Health Plan Compliance | ConsiliumAI',
    description: 'Purpose-built AI governance framework for health plan Chief Compliance Officers navigating CMS MA, FCA exposure, TRAIGA readiness, and PA audit trails.',
    type: 'website',
    url: 'https://consiliumai.co/payer-cco',
  },
};

export default function PayerCCOPage() {
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
          FOR PAYER CHIEF COMPLIANCE OFFICERS
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
          AI Governance for Health Plan Compliance
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
          Payer CCO Page v2 — Phase 2 content will replace this placeholder. 
          UHC lawsuit context, CMS MA deadlines, 34-item compliance checklist, 
          and targeted conversion paths for health plan compliance leaders.
        </p>
      </section>
      <Footer />
    </main>
  );
}

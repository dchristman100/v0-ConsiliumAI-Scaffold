import type { Metadata } from 'next';
import Footer from '@/components/layout/Footer';
import { PAYER_CHECKLIST_COUNT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Payer CCO Compliance Checklist — 34 Items | ConsiliumAI',
  description: 'Interactive 34-item AI governance checklist for health plan Chief Compliance Officers. Track progress, download PDF, and ensure complete regulatory coverage.',
  openGraph: {
    title: 'Payer CCO Compliance Checklist — 34 Items | ConsiliumAI',
    description: 'Interactive 34-item AI governance checklist for health plan Chief Compliance Officers. Track progress, download PDF, and ensure complete regulatory coverage.',
    type: 'website',
    url: 'https://consiliumai.co/payer-checklist',
  },
};

export default function PayerChecklistPage() {
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
          PAYER CCO COMPLIANCE
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
          {PAYER_CHECKLIST_COUNT}-Item AI Governance Checklist
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
          Payer Checklist page — Phase 2 content will replace this placeholder.
          All {PAYER_CHECKLIST_COUNT} checklist items will be server-rendered for SEO.
          Interactive toggle states and progress tracking are client-side only.
          PDF download functionality included.
        </p>
      </section>
      <Footer />
    </main>
  );
}

import type { Metadata } from 'next';
import Footer from '@/components/layout/Footer';
import { EU_CHECKLIST_COUNT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'EU AI Act Compliance Checklist — 38 Items | ConsiliumAI',
  description: 'Interactive 38-item EU AI Act compliance checklist. Track progress toward August 2026 deadline, download PDF, and ensure complete regulatory coverage.',
  openGraph: {
    title: 'EU AI Act Compliance Checklist — 38 Items | ConsiliumAI',
    description: 'Interactive 38-item EU AI Act compliance checklist. Track progress toward August 2026 deadline, download PDF, and ensure complete regulatory coverage.',
    type: 'website',
    url: 'https://consiliumai.co/eu-checklist',
  },
};

export default function EUChecklistPage() {
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
          {EU_CHECKLIST_COUNT}-Item EU AI Act Checklist
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
          EU Checklist page — Phase 2 content will replace this placeholder.
          All {EU_CHECKLIST_COUNT} checklist items will be server-rendered for SEO.
          Interactive toggle states and progress tracking are client-side only.
          PDF download functionality included.
        </p>
      </section>
      <Footer />
    </main>
  );
}

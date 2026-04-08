import type { Metadata } from 'next';
import Footer from '@/components/layout/Footer';
import { BRAND_POSITION, TAGLINE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'ConsiliumAI — Architects of the AI Governance Layer',
  description: 'AI governance made certifiable, insurable, and defendable. By design.',
  openGraph: {
    title: 'ConsiliumAI — Architects of the AI Governance Layer',
    description: 'AI governance made certifiable, insurable, and defendable. By design.',
    type: 'website',
    url: 'https://consiliumai.co',
  },
};

export default function HomePage() {
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
          {BRAND_POSITION}
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 400,
            color: 'var(--text)',
            lineHeight: 1.1,
            marginBottom: '24px',
            maxWidth: '900px',
          }}
        >
          Consilium<span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>AI</span>
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            color: 'var(--muted)',
            lineHeight: 1.6,
            maxWidth: '600px',
            marginBottom: '16px',
          }}
        >
          {TAGLINE}
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
          Homepage v8 — Phase 2 content will replace this placeholder. 
          Hero section, inline scorecard widget, and all primary conversion paths to come.
        </p>
      </section>
      <Footer />
    </main>
  );
}

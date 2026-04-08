// components/blog/SidebarCTA.tsx
// Server component — contextual CTA by type

import Link from 'next/link';

interface SidebarCTAProps {
  type: 'scorecard' | 'payer' | 'eu' | 'checklists';
}

const CTA_CONTENT = {
  scorecard: {
    eyebrow: 'AI GOVERNANCE SCORECARD™',
    headline: 'Assess Your Governance Posture',
    description: 'Five questions. Two minutes. Instant gap analysis.',
    buttonText: 'Begin Scorecard →',
    href: '/scorecard',
  },
  payer: {
    eyebrow: 'FOR PAYER CCOs',
    headline: 'AI Governance for Health Plans',
    description: 'Purpose-built framework for compliance leaders navigating AI risk.',
    buttonText: 'View Solution →',
    href: '/payer-cco',
  },
  eu: {
    eyebrow: 'EU AI ACT',
    headline: 'August 2026 Deadline',
    description: '€35M penalty exposure. Start your compliance journey now.',
    buttonText: 'View Solution →',
    href: '/eu-ai-act',
  },
  checklists: {
    eyebrow: 'FREE RESOURCES',
    headline: 'Compliance Checklists',
    description: 'Interactive checklists for Payer CCO and EU AI Act compliance.',
    buttonText: 'Get Checklists →',
    href: '/payer-checklist',
  },
};

export default function SidebarCTA({ type }: SidebarCTAProps) {
  const content = CTA_CONTENT[type];

  return (
    <div
      style={{
        background: 'var(--navy2)',
        border: '1px solid var(--border)',
        padding: '24px',
      }}
    >
      <p
        className="eyebrow"
        style={{
          color: 'var(--gold)',
          marginBottom: '12px',
        }}
      >
        {content.eyebrow}
      </p>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '20px',
          fontWeight: 400,
          color: 'var(--text)',
          marginBottom: '8px',
        }}
      >
        {content.headline}
      </h3>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--muted)',
          marginBottom: '16px',
          lineHeight: 1.5,
        }}
      >
        {content.description}
      </p>
      <Link
        href={content.href}
        className="btn-gold"
        style={{
          display: 'block',
          textAlign: 'center',
          padding: '12px 20px',
          background: 'var(--gold)',
          color: 'var(--navy)',
          textDecoration: 'none',
          fontSize: '12px',
        }}
      >
        {content.buttonText}
      </Link>
    </div>
  );
}

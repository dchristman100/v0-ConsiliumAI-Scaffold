// components/layout/NavICP.tsx
// Server component — Dedicated page nav (Payer / EU)
// Phase 2: Full implementation with ICP badge and back link

import Link from 'next/link';

interface NavICPProps {
  variant: 'payer' | 'eu';
}

const ICP_CONFIG = {
  payer: {
    badge: 'Payer · Health Plan · MA Plan',
    accentColor: 'var(--red)',
    checklistHref: '/payer-checklist',
    checklistLabel: 'Payer Checklist',
  },
  eu: {
    badge: 'EU AI Act · Enterprise · CAIO · CDO',
    accentColor: 'var(--amber)',
    checklistHref: '/eu-checklist',
    checklistLabel: 'EU Checklist',
  },
} as const;

export default function NavICP({ variant }: NavICPProps) {
  const config = ICP_CONFIG[variant];

  return (
    <header
      style={{
        position: 'fixed',
        top: variant === 'eu' ? '63px' : '3px', // EU page has countdown bar above
        left: 0,
        right: 0,
        background: 'var(--navy)',
        borderBottom: '1px solid var(--border)',
        zIndex: 9997,
      }}
    >
      <nav
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Back Link + Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--muted)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
            Back to consiliumai.co
          </Link>
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              fontWeight: 400,
              color: 'var(--text)',
              textDecoration: 'none',
            }}
          >
            Consilium<span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>AI</span>
          </Link>
        </div>

        {/* ICP Badge + Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* ICP Badge */}
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: config.accentColor,
              background: `${config.accentColor}15`,
              padding: '6px 12px',
              border: `1px solid ${config.accentColor}40`,
            }}
          >
            {config.badge}
          </span>

          {/* Desktop Nav Links */}
          <div
            className="nav-icp-desktop"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            <Link href={config.checklistHref} style={navLinkStyle}>
              {config.checklistLabel}
            </Link>
            <Link href="/scorecard" style={navLinkStyle}>
              Scorecard
            </Link>
            <Link
              href="/book"
              className="btn-gold"
              style={{
                display: 'inline-block',
                padding: '12px 20px',
                background: 'var(--gold)',
                color: 'var(--navy)',
                textDecoration: 'none',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Book Assessment
            </Link>
          </div>
        </div>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .nav-icp-desktop { display: none !important; }
        }
      `}</style>
    </header>
  );
}

const navLinkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
  fontWeight: 500,
  color: 'var(--text)',
  textDecoration: 'none',
};

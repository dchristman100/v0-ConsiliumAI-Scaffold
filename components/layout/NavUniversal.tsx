// components/layout/NavUniversal.tsx
// Server component — Homepage nav with Solutions dropdown
// Phase 2: Full implementation with dropdown menu

import Link from 'next/link';

export default function NavUniversal() {
  return (
    <header
      style={{
        position: 'fixed',
        top: '3px',
        left: 0,
        right: 0,
        background: 'var(--navy)',
        borderBottom: '1px solid var(--border)',
        zIndex: 9998,
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
        {/* Wordmark */}
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

        {/* Nav Links - Phase 2: Add dropdown for Solutions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
        >
          <Link href="/scorecard" style={navLinkStyle}>
            Scorecard
          </Link>
          <Link href="/blog" style={navLinkStyle}>
            Insights
          </Link>
          <Link
            href="/book"
            className="btn-gold"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              background: 'var(--gold)',
              color: 'var(--navy)',
              textDecoration: 'none',
              fontSize: '12px',
            }}
          >
            Book Assessment
          </Link>
        </div>
      </nav>
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

// components/layout/NavUniversal.tsx
// Server component — Homepage nav with Solutions dropdown
// FN-06: Scroll behavior handled by NavWrapper client component

import Link from 'next/link';
import NavWrapper from './NavWrapper';

export default function NavUniversal() {
  return (
    <NavWrapper>
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

      {/* Desktop Nav Links */}
      <div
        className="desktop-nav"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
        }}
      >
        <Link href="/" style={navLinkStyle}>
          Home
        </Link>

        {/* Solutions Dropdown */}
        <div className="solutions-dropdown" style={{ position: 'relative' }}>
          <span style={{ ...navLinkStyle, cursor: 'pointer' }}>
            Solutions
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              style={{ marginLeft: '6px', display: 'inline-block', verticalAlign: 'middle' }}
            >
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </span>
          <div
            className="dropdown-menu"
            style={{
              position: 'absolute',
              top: '100%',
              left: '-16px',
              background: 'var(--navy2)',
              border: '1px solid var(--border)',
              padding: '16px 0',
              minWidth: '280px',
              opacity: 0,
              visibility: 'hidden',
              transition: 'opacity 0.2s ease, visibility 0.2s ease',
            }}
          >
            {/* Group Solutions */}
            <div style={{ padding: '0 16px 12px', borderBottom: '1px solid var(--border)' }}>
              <p style={dropdownLabelStyle}>By Role</p>
              <Link href="/#group-selector" style={dropdownItemStyle}>Healthcare Payers &amp; CCOs</Link>
              <Link href="/#group-selector" style={dropdownItemStyle}>Enterprise CAIOs &amp; CDOs</Link>
              <Link href="/#group-selector" style={dropdownItemStyle}>Legal &amp; Risk Officers</Link>
              <Link href="/#group-selector" style={dropdownItemStyle}>Boards &amp; C-Suite</Link>
            </div>

            {/* Dedicated Pages */}
            <div style={{ padding: '12px 16px 0' }}>
              <p style={dropdownLabelStyle}>Dedicated Pages</p>
              <Link href="/payer-cco" style={dropdownItemStyle}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    background: 'var(--red)',
                    marginRight: '10px',
                    transform: 'rotate(45deg)',
                  }}
                />
                Payer CCO
                <span style={dedicatedBadgeStyle}>Dedicated</span>
              </Link>
              <Link href="/eu-ai-act" style={dropdownItemStyle}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    background: 'var(--amber)',
                    marginRight: '10px',
                    transform: 'rotate(45deg)',
                  }}
                />
                EU AI Act
                <span style={dedicatedBadgeStyle}>Dedicated</span>
              </Link>
            </div>
          </div>
        </div>

        <Link href="/scorecard" style={navLinkStyle}>
          Scorecard
        </Link>
        <Link href="/blog" style={navLinkStyle}>
          Blog
        </Link>
        <Link
          href="/#scorecard"
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
          Get Your Free Assessment →
        </Link>
      </div>

      <style>{`
        .solutions-dropdown:hover .dropdown-menu,
        .solutions-dropdown:focus-within .dropdown-menu {
          opacity: 1 !important;
          visibility: visible !important;
        }
      `}</style>
    </NavWrapper>
  );
}

const navLinkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
  fontWeight: 500,
  color: 'var(--text)',
  textDecoration: 'none',
};

const dropdownLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontWeight: 700,
  fontSize: '9px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
  marginBottom: '12px',
};

const dropdownItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
  color: 'var(--text)',
  textDecoration: 'none',
  padding: '8px 0',
};

const dedicatedBadgeStyle: React.CSSProperties = {
  marginLeft: 'auto',
  fontSize: '9px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--gold)',
  background: 'var(--gold-d)',
  padding: '3px 8px',
};

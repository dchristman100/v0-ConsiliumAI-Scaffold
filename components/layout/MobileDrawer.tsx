'use client';

// components/layout/MobileDrawer.tsx
// Client component — Mobile nav drawer
// Phase 2: Full implementation with animation

import { useState } from 'react';
import Link from 'next/link';

export default function MobileDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        style={{
          display: 'none', // Phase 2: Show on mobile via media query
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--text)"
          strokeWidth="2"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
          }}
        />
      )}

      {/* Drawer Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '280px',
          background: 'var(--navy2)',
          borderLeft: '1px solid var(--border)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          zIndex: 10000,
          padding: '24px',
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close navigation menu"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text)"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Nav Links */}
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            marginTop: '48px',
          }}
        >
          <Link href="/" style={drawerLinkStyle} onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/payer-cco" style={drawerLinkStyle} onClick={() => setIsOpen(false)}>
            Payer CCO
          </Link>
          <Link href="/eu-ai-act" style={drawerLinkStyle} onClick={() => setIsOpen(false)}>
            EU AI Act
          </Link>
          <Link href="/scorecard" style={drawerLinkStyle} onClick={() => setIsOpen(false)}>
            Scorecard
          </Link>
          <Link href="/blog" style={drawerLinkStyle} onClick={() => setIsOpen(false)}>
            Insights
          </Link>
          <Link
            href="/book"
            className="btn-gold"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: 'var(--gold)',
              color: 'var(--navy)',
              textDecoration: 'none',
              fontSize: '12px',
              textAlign: 'center',
              marginTop: '16px',
            }}
            onClick={() => setIsOpen(false)}
          >
            Book Assessment
          </Link>
        </nav>
      </div>
    </>
  );
}

const drawerLinkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '16px',
  fontWeight: 500,
  color: 'var(--text)',
  textDecoration: 'none',
};

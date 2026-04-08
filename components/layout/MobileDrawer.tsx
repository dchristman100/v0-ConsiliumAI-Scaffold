'use client';

// components/layout/MobileDrawer.tsx
// Mobile nav drawer - opens below 680px
// FN-04, E-WEB-10: All Solutions links flattened

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MobileDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button - shows below 680px via CSS */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        className="mobile-nav-trigger"
        style={{
          display: 'none', // Controlled by CSS media query
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
            background: 'rgba(0, 0, 0, 0.6)',
            zIndex: 9999,
            backdropFilter: 'blur(4px)',
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
          width: '300px',
          maxWidth: '85vw',
          background: 'var(--navy2)',
          borderLeft: '1px solid var(--border)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          zIndex: 10000,
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              fontWeight: 400,
              color: 'var(--text)',
            }}
          >
            Consilium<span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>AI</span>
          </span>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
            style={{
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
        </div>

        {/* Nav Links - Flattened (FN-04) */}
        <nav style={{ padding: '24px' }}>
          {/* Solutions Section */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              color: 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '12px',
            }}
          >
            Solutions
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '24px' }}>
            <NavLink href="/payer-cco" onClick={() => setIsOpen(false)}>
              Payer CCO
            </NavLink>
            <NavLink href="/eu-ai-act" onClick={() => setIsOpen(false)}>
              EU AI Act
            </NavLink>
            <NavLink href="/payer-checklist" onClick={() => setIsOpen(false)}>
              Payer Checklist
            </NavLink>
            <NavLink href="/eu-checklist" onClick={() => setIsOpen(false)}>
              EU Checklist
            </NavLink>
          </div>

          {/* Resources Section */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              color: 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '12px',
            }}
          >
            Resources
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '24px' }}>
            <NavLink href="/scorecard" onClick={() => setIsOpen(false)}>
              AI Governance Scorecard
            </NavLink>
            <NavLink href="/blog" onClick={() => setIsOpen(false)}>
              Insights
            </NavLink>
          </div>

          {/* CTA Button */}
          <Link
            href="/book"
            onClick={() => setIsOpen(false)}
            style={{
              display: 'block',
              width: '100%',
              padding: '16px 24px',
              background: 'var(--gold)',
              color: 'var(--navy)',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Book Assessment
          </Link>
        </nav>
      </div>

      {/* CSS for mobile trigger visibility */}
      <style jsx global>{`
        @media (max-width: 680px) {
          .mobile-nav-trigger {
            display: block !important;
          }
          .desktop-nav {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

function NavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '15px',
        color: 'var(--text)',
        textDecoration: 'none',
        padding: '10px 12px',
        marginLeft: '-12px',
        marginRight: '-12px',
        transition: 'background 0.15s ease',
      }}
    >
      {children}
    </Link>
  );
}

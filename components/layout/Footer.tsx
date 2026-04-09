// components/layout/Footer.tsx
// Server component — no 'use client'

import Link from 'next/link';
import { TAGLINE } from '@/lib/constants';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--navy2)',
        borderTop: '1px solid var(--border)',
        padding: '64px 24px 32px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Wordmark and Tagline */}
        <div style={{ marginBottom: '48px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '28px',
              fontWeight: 400,
              color: 'var(--text)',
              marginBottom: '12px',
            }}
          >
            Consilium<span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>AI</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--muted)',
              letterSpacing: '0.02em',
            }}
          >
            {TAGLINE}
          </p>
        </div>

        {/* Footer Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Company */}
          <div>
            <h3 style={columnHeadingStyle}>Company</h3>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/book">Book a 15-Minute Call</FooterLink>
              <FooterLink href="/blog">Insights</FooterLink>
            </nav>
          </div>

          {/* Solutions */}
          <div>
            <h3 style={columnHeadingStyle}>Solutions</h3>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <FooterLink href="/payer-cco">Payer CCO</FooterLink>
              <FooterLink href="/eu-ai-act">EU AI Act</FooterLink>
              <FooterLink href="/scorecard">AI Governance Scorecard</FooterLink>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h3 style={columnHeadingStyle}>Resources</h3>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <FooterLink href="/payer-checklist">
                Payer Checklist
                <span style={startHereStyle}>Start Here</span>
              </FooterLink>
              <FooterLink href="/eu-checklist">
                EU Checklist
                <span style={startHereStyle}>Start Here</span>
              </FooterLink>
              <FooterLink href="/scorecard">
                Scorecard
                <span style={startHereStyle}>Start Here</span>
              </FooterLink>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h3 style={columnHeadingStyle}>Legal</h3>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 style={columnHeadingStyle}>Contact</h3>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <FooterLink href="mailto:info@consiliumai.co">info@consiliumai.co</FooterLink>
              <FooterLink href="/book">Book a 15-Minute Call</FooterLink>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '24px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--muted)',
            }}
          >
            © 2026 ConsiliumAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

const columnHeadingStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontWeight: 700,
  fontSize: '11px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--gold)',
  marginBottom: '16px',
};

const startHereStyle: React.CSSProperties = {
  display: 'inline-block',
  marginLeft: '8px',
  fontSize: '9px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--gold)',
  background: 'var(--gold-d)',
  padding: '2px 6px',
};

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        color: 'var(--text)',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
      }}
    >
      {children}
    </Link>
  );
}

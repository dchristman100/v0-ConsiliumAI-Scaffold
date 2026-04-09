'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroSection = document.getElementById('hero-section');
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        padding: '10px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '1120px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo - hidden on mobile */}
        <span
          className="sticky-logo"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '18px',
            fontWeight: 700,
            color: '#0F1A2E',
          }}
        >
          ConsiliumAI
        </span>

        {/* CTA */}
        <Link
          href="#scorecard"
          style={{
            display: 'inline-block',
            padding: '10px 24px',
            background: '#2563EB',
            color: 'white',
            textDecoration: 'none',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          Take the Free Assessment →
        </Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .sticky-logo {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

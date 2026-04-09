'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Deadline {
  name: string;
  date: string | null;
  status?: 'NOW';
  link?: string;
}

const deadlines: Deadline[] = [
  { name: 'UHC Federal Discovery', date: null, status: 'NOW', link: '/payer-cco' },
  { name: 'FTC Section 5 Enforcement', date: null, status: 'NOW' },
  { name: 'Colorado AI Act', date: '2026-02-01' },
  { name: 'CMS MA Prior Auth Rules', date: '2026-12-31', link: '/payer-cco' },
  { name: 'NYDFS 500.17 AI Mandate', date: '2026-06-30' },
  { name: 'EU AI Act High-Risk', date: '2026-08-02', link: '/eu-ai-act' },
];

function getDaysRemaining(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getBadgeColor(days: number | null): { bg: string; text: string } {
  if (days === null || days < 90) {
    return { bg: '#FEE2E2', text: '#DC2626' };
  } else if (days < 180) {
    return { bg: '#FEF3C7', text: '#D97706' };
  } else {
    return { bg: '#D1FAE5', text: '#059669' };
  }
}

export default function RegulatoryTimeline() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '16px',
          }}
        >
          The clock is ticking
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 400,
            color: 'var(--text)',
            lineHeight: 1.2,
            marginBottom: '16px',
          }}
        >
          Six Frameworks. Real Deadlines.
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            color: 'var(--muted)',
            lineHeight: 1.6,
            marginBottom: '48px',
            maxWidth: '640px',
          }}
        >
          Every row below represents active or imminent regulatory enforcement targeting AI in regulated industries.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {deadlines.map((deadline, index) => {
            const days = deadline.date ? getDaysRemaining(deadline.date) : null;
            const colors = getBadgeColor(days);
            const isNow = deadline.status === 'NOW' || days === null;

            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  background: 'var(--navy2)',
                  border: '1px solid var(--border)',
                  gap: '16px',
                  flexWrap: 'wrap',
                }}
              >
                {/* Badge */}
                <div
                  style={{
                    background: colors.bg,
                    color: colors.text,
                    padding: '6px 12px',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    fontSize: '12px',
                    minWidth: '60px',
                    textAlign: 'center',
                  }}
                >
                  {mounted
                    ? isNow
                      ? 'NOW'
                      : `${days}d`
                    : deadline.date
                      ? new Date(deadline.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : 'NOW'}
                </div>

                {/* Framework Name */}
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '15px',
                    color: 'var(--text)',
                    flex: 1,
                    minWidth: '180px',
                  }}
                >
                  {deadline.name}
                </span>

                {/* Countdown Text */}
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--muted)',
                    minWidth: '180px',
                  }}
                >
                  {mounted
                    ? isNow
                      ? 'Active — enforcement underway'
                      : days !== null && days > 0
                        ? `${days} days remaining`
                        : `${Math.abs(days || 0)} days past deadline`
                    : deadline.date
                      ? `Deadline: ${new Date(deadline.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                      : 'Active — enforcement underway'}
                </span>

                {/* Link Arrow */}
                {deadline.link && (
                  <Link
                    href={deadline.link}
                    style={{
                      color: 'var(--gold)',
                      textDecoration: 'none',
                      fontSize: '18px',
                    }}
                    aria-label={`Learn more about ${deadline.name}`}
                  >
                    →
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

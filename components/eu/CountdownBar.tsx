'use client';

// components/eu/CountdownBar.tsx
// EU AI Act countdown clock
// FD-01 through FD-05: Full implementation per spec

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { EU_DEADLINE } from '@/lib/constants';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function calculateTimeRemaining(): TimeRemaining {
  const now = new Date();
  const diff = EU_DEADLINE.getTime() - now.getTime();
  
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    isPast: false,
  };
}

export default function CountdownBar() {
  // Client-side countdown state - null on SSR
  const [time, setTime] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    // Initial calculation (FD-02)
    setTime(calculateTimeRemaining());
    
    // Update every second via setInterval (FD-02)
    const interval = setInterval(() => {
      setTime(calculateTimeRemaining());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Post-deadline state (FD-04)
  const isPast = time?.isPast ?? false;

  return (
    <div
      style={{
        background: 'var(--navy3)',
        borderBottom: '1px solid var(--border)',
        padding: '16px 24px',
        position: 'sticky',
        top: '3px', // Below 3px top bar (FD-05)
        zIndex: 99,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          flexWrap: 'wrap',
        }}
      >
        {isPast ? (
          // Post-deadline display (FD-04)
          <>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 700,
                color: '#f59e0b', // Amber
                letterSpacing: '0.02em',
              }}
            >
              EU AI Act enforcement is active
            </span>
            <Link
              href="/book"
              style={{
                padding: '8px 16px',
                background: 'var(--gold)',
                color: 'var(--navy)',
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 600,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Book Assessment →
            </Link>
          </>
        ) : (
          // Pre-deadline countdown
          <>
            {/* Static deadline text - SSR for SEO (FD-01) */}
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--gold)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              August 2, 2026 — EU AI Act High-Risk Deadline — €35M Maximum Penalty
            </span>

            {/* Live countdown - hydrates client-side (FD-02, FD-03) */}
            {time && (
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                }}
              >
                <CountdownUnit value={time.days} label="Days" />
                <span style={{ color: 'var(--text)', fontSize: '18px', fontWeight: 700, alignSelf: 'flex-start', marginTop: '2px' }}>:</span>
                <CountdownUnit value={time.hours} label="Hours" />
                <span style={{ color: 'var(--text)', fontSize: '18px', fontWeight: 700, alignSelf: 'flex-start', marginTop: '2px' }}>:</span>
                <CountdownUnit value={time.minutes} label="Min" />
                <span style={{ color: 'var(--text)', fontSize: '18px', fontWeight: 700, alignSelf: 'flex-start', marginTop: '2px' }}>:</span>
                <CountdownUnit value={time.seconds} label="Sec" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// FD-03: DM Sans 700, letter-spacing 0.08em, each unit labeled
function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ textAlign: 'center', minWidth: '40px' }}>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '20px',
          fontWeight: 700,
          color: 'var(--text)',
          display: 'block',
          letterSpacing: '0.08em',
        }}
      >
        {value.toString().padStart(2, '0')}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '9px',
          color: 'var(--muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        {label}
      </span>
    </div>
  );
}

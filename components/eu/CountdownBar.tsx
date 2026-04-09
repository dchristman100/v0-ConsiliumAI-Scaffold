'use client';

import { useState, useEffect } from 'react';

const EU_DEADLINE = new Date('2026-08-02T00:00:00Z');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownBar() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isPastDeadline, setIsPastDeadline] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    function update() {
      const now = new Date();
      const diff = EU_DEADLINE.getTime() - now.getTime();

      if (diff <= 0) {
        setIsPastDeadline(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }

    update(); // Run immediately on mount
    const interval = setInterval(update, 1000); // Then every second

    return () => clearInterval(interval);
  }, []);

  // SSR and pre-hydration: show static fallback text
  // This is what Google sees — the deadline text is in the server HTML
  if (!mounted) {
    return (
      <div style={{
        position: 'sticky',
        top: '3px',
        zIndex: 9998,
        background: 'var(--navy2)',
        borderBottom: '1px solid var(--rule)',
        padding: '12px 24px',
        textAlign: 'center',
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        color: 'var(--text)',
        letterSpacing: '0.04em',
      }}>
        <span>August 2, 2026 — EU AI Act High-Risk Deadline — €35M Maximum Penalty</span>
      </div>
    );
  }

  // Post-deadline state
  if (isPastDeadline) {
    return (
      <div style={{
        position: 'sticky',
        top: '3px',
        zIndex: 9998,
        background: 'var(--navy2)',
        borderBottom: '1px solid var(--rule)',
        padding: '12px 24px',
        textAlign: 'center',
        fontFamily: 'var(--font-body)',
      }}>
        <span style={{ color: 'var(--amber)', fontWeight: 700, fontSize: '16px' }}>
          EU AI Act enforcement is active
        </span>
        <span style={{ margin: '0 16px', color: 'var(--dim)' }}>|</span>
        <a href="/book" style={{
          color: 'var(--gold)',
          textDecoration: 'none',
          fontWeight: 700,
          textTransform: 'uppercase',
          fontSize: '12px',
          letterSpacing: '0.08em',
        }}>
          Book Assessment →
        </a>
      </div>
    );
  }

  // Live ticking countdown
  if (!timeLeft) return null;

  const pad = (n: number): string => n.toString().padStart(2, '0');

  return (
    <div style={{
      position: 'sticky',
      top: '3px',
      zIndex: 9998,
      background: 'var(--navy2)',
      borderBottom: '1px solid var(--rule)',
      padding: '12px 24px',
      textAlign: 'center',
      fontFamily: 'var(--font-body)',
    }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{
          color: 'var(--amber)',
          fontWeight: 700,
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginRight: '12px',
        }}>
          EU AI Act High-Risk Deadline
        </span>

        {/* Days */}
        <div style={{ textAlign: 'center' }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '22px',
            letterSpacing: '0.08em',
            color: 'var(--text)',
          }}>
            {pad(timeLeft.days)}
          </span>
          <div style={{
            fontSize: '9px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--muted)',
            marginTop: '2px',
          }}>
            Days
          </div>
        </div>

        <span style={{ color: 'var(--muted)', fontSize: '20px', fontWeight: 300 }}>:</span>

        {/* Hours */}
        <div style={{ textAlign: 'center' }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '22px',
            letterSpacing: '0.08em',
            color: 'var(--text)',
          }}>
            {pad(timeLeft.hours)}
          </span>
          <div style={{
            fontSize: '9px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--muted)',
            marginTop: '2px',
          }}>
            Hrs
          </div>
        </div>

        <span style={{ color: 'var(--muted)', fontSize: '20px', fontWeight: 300 }}>:</span>

        {/* Minutes */}
        <div style={{ textAlign: 'center' }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '22px',
            letterSpacing: '0.08em',
            color: 'var(--text)',
          }}>
            {pad(timeLeft.minutes)}
          </span>
          <div style={{
            fontSize: '9px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--muted)',
            marginTop: '2px',
          }}>
            Min
          </div>
        </div>

        <span style={{ color: 'var(--muted)', fontSize: '20px', fontWeight: 300 }}>:</span>

        {/* Seconds */}
        <div style={{ textAlign: 'center' }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '22px',
            letterSpacing: '0.08em',
            color: 'var(--text)',
          }}>
            {pad(timeLeft.seconds)}
          </span>
          <div style={{
            fontSize: '9px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--muted)',
            marginTop: '2px',
          }}>
            Sec
          </div>
        </div>

        <span style={{ margin: '0 8px', color: 'var(--dim)' }}>|</span>

        <span style={{
          color: 'var(--amber)',
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}>
          €35M Maximum Penalty
        </span>
      </div>
    </div>
  );
}

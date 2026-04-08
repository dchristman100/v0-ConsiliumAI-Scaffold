'use client';

// components/eu/CountdownBar.tsx
// EU AI Act countdown clock
// Phase 2: Full implementation with live countdown

import { useState, useEffect } from 'react';
import { EU_DEADLINE } from '@/lib/constants';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeRemaining(): TimeRemaining {
  const now = new Date();
  const diff = EU_DEADLINE.getTime() - now.getTime();
  
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export default function CountdownBar() {
  // Static deadline text renders in SSR for SEO
  const staticDeadline = 'August 2, 2026 · €35M';
  
  // Client-side countdown state
  const [time, setTime] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    // Initial calculation
    setTime(calculateTimeRemaining());
    
    // Update every second
    const interval = setInterval(() => {
      setTime(calculateTimeRemaining());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        background: 'var(--navy3)',
        borderBottom: '1px solid var(--border)',
        padding: '12px 24px',
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
        {/* Static deadline text - always SSR */}
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
          EU AI Act Deadline: {staticDeadline}
        </span>

        {/* Live countdown - hydrates client-side */}
        {time && (
          <div
            style={{
              display: 'flex',
              gap: '16px',
            }}
          >
            <CountdownUnit value={time.days} label="Days" />
            <CountdownUnit value={time.hours} label="Hours" />
            <CountdownUnit value={time.minutes} label="Min" />
            <CountdownUnit value={time.seconds} label="Sec" />
          </div>
        )}
      </div>
    </div>
  );
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '18px',
          fontWeight: 700,
          color: 'var(--text)',
          display: 'block',
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

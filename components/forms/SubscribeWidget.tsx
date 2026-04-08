'use client';

// components/forms/SubscribeWidget.tsx
// Blog email capture widget
// Phase 2: Full implementation with GHL sync

import { useState } from 'react';
import type { FormStatus } from '@/types/forms';

interface SubscribeWidgetProps {
  source: 'blog-inline' | 'blog-sidebar' | 'footer';
}

export default function SubscribeWidget({ source }: SubscribeWidgetProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/blog-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        style={{
          padding: '16px',
          background: 'var(--gold-d)',
          border: '1px solid var(--gold-m)',
          textAlign: 'center',
        }}
      >
        <p style={{ color: 'var(--text)', fontSize: '14px' }}>
          ✓ Subscribed! Check your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          style={{
            flex: 1,
            padding: '12px 16px',
            background: 'var(--navy2)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
          }}
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-gold"
          style={{
            padding: '12px 20px',
            background: status === 'submitting' ? 'var(--navy3)' : 'var(--gold)',
            color: status === 'submitting' ? 'var(--muted)' : 'var(--navy)',
            border: 'none',
            cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
            fontSize: '12px',
            whiteSpace: 'nowrap',
          }}
        >
          {status === 'submitting' ? '...' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && (
        <p style={{ color: 'var(--red)', fontSize: '12px', marginTop: '8px' }}>
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

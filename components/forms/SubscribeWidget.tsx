'use client';

// components/forms/SubscribeWidget.tsx
// Blog email capture widget
// BL-09: Full implementation per spec

import { useState } from 'react';
import type { FormStatus } from '@/types/forms';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SubscribeWidgetProps {
  source: 'blog-inline' | 'blog-sidebar' | 'footer' | 'homepage';
  variant?: 'inline' | 'stacked';
}

export default function SubscribeWidget({ source, variant = 'inline' }: SubscribeWidgetProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate email
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setStatus('submitting');

    try {
      // Stub for Phase 3 — real Supabase/GHL write in Phase 4
      console.log('[v0] Subscribe submission:', { email, source });

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
    } catch (err) {
      console.error('[v0] Subscription error:', err);
      setStatus('error');
      setError('Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div
        style={{
          padding: '20px',
          background: 'var(--gold-d)',
          border: '1px solid var(--gold-m)',
          textAlign: 'center',
        }}
      >
        <p style={{ color: 'var(--text)', fontSize: '14px', fontWeight: 500 }}>
          Subscribed! Check your inbox.
        </p>
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Enter your email"
            style={{
              width: '100%',
              padding: '14px 16px',
              background: 'var(--navy2)',
              border: `1px solid ${error ? '#ef4444' : 'var(--border)'}`,
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
              width: '100%',
              padding: '14px 20px',
              background: status === 'submitting' ? 'var(--navy3)' : 'var(--gold)',
              color: status === 'submitting' ? 'var(--muted)' : 'var(--navy)',
              border: 'none',
              cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
        {error && (
          <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '8px' }}>
            {error}
          </p>
        )}
      </form>
    );
  }

  // Default inline variant
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Enter your email"
          style={{
            flex: 1,
            padding: '12px 16px',
            background: 'var(--navy2)',
            border: `1px solid ${error ? '#ef4444' : 'var(--border)'}`,
            color: 'var(--text)',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            minWidth: 0,
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
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          {status === 'submitting' ? '...' : 'Subscribe'}
        </button>
      </div>
      {error && (
        <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '8px' }}>
          {error}
        </p>
      )}
    </form>
  );
}

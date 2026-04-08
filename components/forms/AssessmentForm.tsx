'use client';

// components/forms/AssessmentForm.tsx
// Lead capture form with validation
// Phase 2: Full implementation with Supabase + GHL sync

import { useState } from 'react';
import type { FormStatus } from '@/types/forms';
import { PAYER_ROLES, PAYER_CONCERNS } from '@/lib/constants';
import { getUTMParams } from '@/lib/utm';

interface AssessmentFormProps {
  sourcePage: 'homepage' | 'payer-cco' | 'eu-ai-act' | 'scorecard';
}

export default function AssessmentForm({ sourcePage }: AssessmentFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    primary_concern: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const utmParams = getUTMParams();
      
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source_page: sourcePage,
          source_campaign: 'Campaign-1',
          ...utmParams,
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setStatus('success');
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        style={{
          padding: '32px',
          background: 'var(--gold-d)',
          border: '1px solid var(--gold-m)',
          textAlign: 'center',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            color: 'var(--text)',
            marginBottom: '12px',
          }}
        >
          Thank You
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
          We&apos;ll be in touch within 24 hours to schedule your assessment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Full Name"
          required
          style={inputStyle}
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Work Email"
          required
          style={inputStyle}
        />
        <input
          type="text"
          value={formData.organization}
          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
          placeholder="Organization"
          required
          style={inputStyle}
        />
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
          style={inputStyle}
        >
          <option value="">Select Your Role</option>
          {PAYER_ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <select
          value={formData.primary_concern}
          onChange={(e) => setFormData({ ...formData, primary_concern: e.target.value })}
          required
          style={inputStyle}
        >
          <option value="">Primary Concern</option>
          {PAYER_CONCERNS.map((concern) => (
            <option key={concern} value={concern}>
              {concern}
            </option>
          ))}
        </select>

        {status === 'error' && (
          <p style={{ color: 'var(--red)', fontSize: '13px' }}>
            Something went wrong. Please try again.
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-gold"
          style={{
            padding: '14px 24px',
            background: status === 'submitting' ? 'var(--navy3)' : 'var(--gold)',
            color: status === 'submitting' ? 'var(--muted)' : 'var(--navy)',
            border: 'none',
            cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
            fontSize: '13px',
          }}
        >
          {status === 'submitting' ? 'Submitting...' : 'Request Assessment'}
        </button>
      </div>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  padding: '12px 16px',
  background: 'var(--navy2)',
  border: '1px solid var(--border)',
  color: 'var(--text)',
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
};

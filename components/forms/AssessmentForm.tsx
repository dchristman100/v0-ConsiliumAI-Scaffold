'use client';

// components/forms/AssessmentForm.tsx
// Lead capture form with validation
// FF-01 through FF-07: Full implementation per spec

import { useState, useEffect } from 'react';
import type { FormStatus } from '@/types/forms';
import type { Lead } from '@/types/leads';
import { getUTMParams, captureUTMParams } from '@/lib/utm';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Analytics helper
function trackEvent(name: string) {
  if (typeof window !== 'undefined' && 'va' in window) {
    (window as { va: (action: string, payload: { name: string }) => void }).va('event', { name });
  }
}

interface AssessmentFormProps {
  sourcePage: Lead['source_page'];
  sourceCampaign: Lead['source_campaign'];
  roleOptions?: readonly string[];
  concernOptions?: readonly string[];
  showJurisdiction?: boolean;
  jurisdictionOptions?: readonly string[];
}

const DEFAULT_ROLES = [
  'CCO', 'CMO', 'CRO', 'CFO', 'General Counsel', 'CIO', 'VP Compliance', 'Other',
] as const;

const DEFAULT_CONCERNS = [
  'AI governance gaps', 'Regulatory compliance', 'Board reporting', 'Vendor risk',
  'D&O liability', 'Audit readiness', 'Bias testing', 'Other',
] as const;

export default function AssessmentForm({
  sourcePage,
  sourceCampaign,
  roleOptions = DEFAULT_ROLES,
  concernOptions = DEFAULT_CONCERNS,
  showJurisdiction = false,
  jurisdictionOptions = [],
}: AssessmentFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    primary_concern: '',
    jurisdiction: '',
  });

  // Capture UTM params on mount
  useEffect(() => {
    captureUTMParams();
  }, []);

  // Validate all required fields (FF-01)
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation (FF-02)
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization is required';
    }

    if (!formData.role) {
      newErrors.role = 'Please select your role';
    }

    if (!formData.primary_concern) {
      newErrors.primary_concern = 'Please select your primary concern';
    }

    if (showJurisdiction && !formData.jurisdiction) {
      newErrors.jurisdiction = 'Please select your jurisdiction';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus('submitting'); // FF-03

    try {
      // Get UTM params from sessionStorage (FF-07)
      const utmParams = getUTMParams();

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source_page: sourcePage,
          source_campaign: sourceCampaign,
          ...utmParams,
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      // Track analytics
      trackEvent('assessment_form_submitted');

      setStatus('success'); // FF-04
    } catch (error) {
      console.error('[AssessmentForm] Submission error:', error);
      setStatus('error'); // FF-05 - form preserved
    }
  };

  // Success state (FF-04)
  if (status === 'success') {
    return (
      <div
        style={{
          padding: '40px 32px',
          background: 'var(--gold-d)',
          border: '1px solid var(--gold-m)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'var(--gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}
        >
          <span style={{ color: 'var(--navy)', fontSize: '24px' }}>✓</span>
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            color: 'var(--text)',
            marginBottom: '8px',
          }}
        >
          Submitted
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6 }}>
          Thank you for your interest. We&apos;ll be in touch within 24 hours to schedule your RiskIQ Assessment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Name */}
        <div>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
            placeholder="Full Name *"
            style={{
              ...inputStyle,
              borderColor: errors.name ? '#ef4444' : 'var(--border)',
            }}
          />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            placeholder="Work Email *"
            style={{
              ...inputStyle,
              borderColor: errors.email ? '#ef4444' : 'var(--border)',
            }}
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
        </div>

        {/* Organization */}
        <div>
          <input
            type="text"
            value={formData.organization}
            onChange={(e) => {
              setFormData({ ...formData, organization: e.target.value });
              if (errors.organization) setErrors({ ...errors, organization: '' });
            }}
            placeholder="Organization *"
            style={{
              ...inputStyle,
              borderColor: errors.organization ? '#ef4444' : 'var(--border)',
            }}
          />
          {errors.organization && <ErrorText>{errors.organization}</ErrorText>}
        </div>

        {/* Role */}
        <div>
          <select
            value={formData.role}
            onChange={(e) => {
              setFormData({ ...formData, role: e.target.value });
              if (errors.role) setErrors({ ...errors, role: '' });
            }}
            style={{
              ...inputStyle,
              borderColor: errors.role ? '#ef4444' : 'var(--border)',
            }}
          >
            <option value="">Select Your Role *</option>
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {errors.role && <ErrorText>{errors.role}</ErrorText>}
        </div>

        {/* Primary Concern */}
        <div>
          <select
            value={formData.primary_concern}
            onChange={(e) => {
              setFormData({ ...formData, primary_concern: e.target.value });
              if (errors.primary_concern) setErrors({ ...errors, primary_concern: '' });
            }}
            style={{
              ...inputStyle,
              borderColor: errors.primary_concern ? '#ef4444' : 'var(--border)',
            }}
          >
            <option value="">Primary Concern *</option>
            {concernOptions.map((concern) => (
              <option key={concern} value={concern}>
                {concern}
              </option>
            ))}
          </select>
          {errors.primary_concern && <ErrorText>{errors.primary_concern}</ErrorText>}
        </div>

        {/* Jurisdiction (optional) */}
        {showJurisdiction && jurisdictionOptions.length > 0 && (
          <div>
            <select
              value={formData.jurisdiction}
              onChange={(e) => {
                setFormData({ ...formData, jurisdiction: e.target.value });
                if (errors.jurisdiction) setErrors({ ...errors, jurisdiction: '' });
              }}
              style={{
                ...inputStyle,
                borderColor: errors.jurisdiction ? '#ef4444' : 'var(--border)',
              }}
            >
              <option value="">Select Jurisdiction *</option>
              {jurisdictionOptions.map((j) => (
                <option key={j} value={j}>
                  {j}
                </option>
              ))}
            </select>
            {errors.jurisdiction && <ErrorText>{errors.jurisdiction}</ErrorText>}
          </div>
        )}

        {/* Error message (FF-05) */}
        {status === 'error' && (
          <p style={{ color: '#ef4444', fontSize: '13px', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            Something went wrong. Please try again.
          </p>
        )}

        {/* Submit button (FF-03) */}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-gold"
          style={{
            padding: '16px 24px',
            background: status === 'submitting' ? 'var(--navy3)' : 'var(--gold)',
            color: status === 'submitting' ? 'var(--muted)' : 'var(--navy)',
            border: 'none',
            cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          {status === 'submitting' ? 'Submitting...' : 'Request RiskIQ Assessment'}
        </button>
      </div>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  background: 'var(--navy2)',
  border: '1px solid var(--border)',
  color: 'var(--text)',
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
};

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
      {children}
    </p>
  );
}

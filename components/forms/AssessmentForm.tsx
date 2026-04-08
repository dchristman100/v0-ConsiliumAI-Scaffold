'use client';

// components/forms/AssessmentForm.tsx
// Lead capture form with validation
// FF-01 through FF-07: Full implementation per spec
// D-01, D-02, D-03: Assessment intake forms for homepage, payer, and EU pages

import { useState, useEffect } from 'react';
import type { FormStatus } from '@/types/forms';
import { getUTMParams, captureUTMParams } from '@/lib/utm';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Analytics helper
function trackEvent(name: string) {
  if (typeof window !== 'undefined' && 'va' in window) {
    (window as { va: (action: string, payload: { name: string }) => void }).va('event', { name });
  }
}

interface AssessmentFormProps {
  sourcePage: 'homepage' | 'payer-cco' | 'eu-ai-act' | 'scorecard';
  sourceCampaign: 'Campaign-1' | 'Campaign-2' | 'Campaign-3';
  submitLabel?: string;
  roleOptions?: readonly string[] | string[];
  concernOptions?: readonly string[] | string[];
  showJurisdiction?: boolean;
  jurisdictionOptions?: readonly string[] | string[];
  showOrgSize?: boolean;
  orgSizeLabel?: string;
}

const DEFAULT_ROLES = [
  'CCO', 'CMO', 'CRO', 'CFO', 'General Counsel', 'CIO', 'VP Compliance', 'Other',
];

const DEFAULT_CONCERNS = [
  'AI governance gaps', 'Regulatory compliance', 'Board reporting', 'Vendor risk',
  'D&O liability', 'Audit readiness', 'Bias testing', 'Other',
];

export default function AssessmentForm({
  sourcePage,
  sourceCampaign,
  submitLabel = 'Request Assessment →',
  roleOptions = DEFAULT_ROLES,
  concernOptions = DEFAULT_CONCERNS,
  showJurisdiction = false,
  jurisdictionOptions = [],
  showOrgSize = false,
  orgSizeLabel = 'Organization size',
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
    org_size: '',
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
        id={formId}
        style={{
          padding: '40px 32px',
          background: 'var(--navy2)',
          border: '1px solid var(--border)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            background: 'var(--gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}
        >
          <span style={{ color: 'var(--navy)', fontSize: '24px' }}>&#10003;</span>
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            color: 'var(--text)',
            marginBottom: '8px',
          }}
        >
          Submitted &#10003;
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6 }}>
          Thank you. Your assessment request has been received. A ConsiliumAI specialist will respond within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      style={{
        background: 'var(--navy2)',
        border: '1px solid var(--border)',
        padding: '40px 32px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Full Name */}
        <div>
          <label style={labelStyle}>Full Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
            placeholder="Enter your full name"
            style={{
              ...inputStyle,
              borderColor: errors.name ? 'var(--red)' : 'var(--border)',
            }}
          />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}
        </div>

        {/* Work Email */}
        <div>
          <label style={labelStyle}>Work Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            placeholder="you@company.com"
            style={{
              ...inputStyle,
              borderColor: errors.email ? 'var(--red)' : 'var(--border)',
            }}
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
        </div>

        {/* Organization */}
        <div>
          <label style={labelStyle}>Organization *</label>
          <input
            type="text"
            value={formData.organization}
            onChange={(e) => {
              setFormData({ ...formData, organization: e.target.value });
              if (errors.organization) setErrors({ ...errors, organization: '' });
            }}
            placeholder="Company name"
            style={{
              ...inputStyle,
              borderColor: errors.organization ? 'var(--red)' : 'var(--border)',
            }}
          />
          {errors.organization && <ErrorText>{errors.organization}</ErrorText>}
        </div>

        {/* Jurisdiction (optional - for EU page) */}
        {showJurisdiction && jurisdictionOptions.length > 0 && (
          <div>
            <label style={labelStyle}>Jurisdiction *</label>
            <select
              value={formData.jurisdiction}
              onChange={(e) => {
                setFormData({ ...formData, jurisdiction: e.target.value });
                if (errors.jurisdiction) setErrors({ ...errors, jurisdiction: '' });
              }}
              style={{
                ...inputStyle,
                borderColor: errors.jurisdiction ? 'var(--red)' : 'var(--border)',
              }}
            >
              <option value="">Select your jurisdiction</option>
              {jurisdictionOptions.map((j) => (
                <option key={j} value={j}>
                  {j}
                </option>
              ))}
            </select>
            {errors.jurisdiction && <ErrorText>{errors.jurisdiction}</ErrorText>}
          </div>
        )}

        {/* Role */}
        <div>
          <label style={labelStyle}>Role *</label>
          <select
            value={formData.role}
            onChange={(e) => {
              setFormData({ ...formData, role: e.target.value });
              if (errors.role) setErrors({ ...errors, role: '' });
            }}
            style={{
              ...inputStyle,
              borderColor: errors.role ? 'var(--red)' : 'var(--border)',
            }}
          >
            <option value="">Select your role</option>
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
          <label style={labelStyle}>Primary Concern *</label>
          <select
            value={formData.primary_concern}
            onChange={(e) => {
              setFormData({ ...formData, primary_concern: e.target.value });
              if (errors.primary_concern) setErrors({ ...errors, primary_concern: '' });
            }}
            style={{
              ...inputStyle,
              borderColor: errors.primary_concern ? 'var(--red)' : 'var(--border)',
            }}
          >
            <option value="">Select your primary concern</option>
            {concernOptions.map((concern) => (
              <option key={concern} value={concern}>
                {concern}
              </option>
            ))}
          </select>
          {errors.primary_concern && <ErrorText>{errors.primary_concern}</ErrorText>}
        </div>

        {/* Organization Size (optional - for Payer page) */}
        {showOrgSize && (
          <div>
            <label style={labelStyle}>{orgSizeLabel}</label>
            <input
              type="text"
              value={formData.org_size}
              onChange={(e) => setFormData({ ...formData, org_size: e.target.value })}
              placeholder="Optional"
              style={inputStyle}
            />
          </div>
        )}

        {/* Error message (FF-05) */}
        {status === 'error' && (
          <p
            style={{
              color: 'var(--red)',
              fontSize: '13px',
              padding: '12px',
              background: 'rgba(232, 85, 85, 0.1)',
              border: '1px solid rgba(232, 85, 85, 0.2)',
            }}
          >
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
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {status === 'submitting' ? 'SUBMITTING...' : `${submitLabel} \u2192`}
        </button>
      </div>
    </form>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-body)',
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
  marginBottom: '8px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  background: 'var(--navy)',
  border: '1px solid var(--border)',
  color: 'var(--text)',
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
};

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ color: 'var(--red)', fontSize: '12px', marginTop: '4px' }}>
      {children}
    </p>
  );
}

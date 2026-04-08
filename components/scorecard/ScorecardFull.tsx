'use client';

// components/scorecard/ScorecardFull.tsx
// Full-page scorecard experience
// Phase 2: Full implementation with progress bar and results

import { useState } from 'react';
import type { ScorecardStep } from '@/types/scorecard';
import { SCORECARD_QUESTIONS, DIMENSION_LABELS } from './ScorecardShared';

export default function ScorecardFull() {
  const [step, setStep] = useState<ScorecardStep>('cover');

  // Phase 2: Implement full scorecard flow with:
  // - Progress indicator
  // - Question navigation
  // - Score calculation
  // - Results display with gap analysis
  // - PDF download
  // - Form submission for lead capture
  
  return (
    <div
      style={{
        maxWidth: '640px',
        margin: '0 auto',
        padding: '40px 24px',
      }}
    >
      {/* Progress Bar */}
      <div
        style={{
          height: '4px',
          background: 'var(--navy3)',
          marginBottom: '48px',
        }}
      >
        <div
          style={{
            height: '100%',
            width: step === 'cover' ? '0%' : '20%', // Phase 2: Calculate dynamically
            background: 'var(--gold)',
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {/* Cover Screen */}
      {step === 'cover' && (
        <div style={{ textAlign: 'center' }}>
          <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '24px' }}>
            AI GOVERNANCE SCORECARD™
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '36px',
              fontWeight: 400,
              color: 'var(--text)',
              marginBottom: '16px',
            }}
          >
            Assess Your Governance Posture
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              color: 'var(--muted)',
              marginBottom: '32px',
              maxWidth: '480px',
              margin: '0 auto 32px',
            }}
          >
            Answer five questions across policy, oversight, documentation, vendor governance, 
            and incident response dimensions. Receive an instant score with gap analysis.
          </p>
          
          {/* Dimension Labels - SSR for SEO */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '12px',
              marginBottom: '32px',
            }}
          >
            {Object.values(DIMENSION_LABELS).map((label) => (
              <div
                key={label}
                style={{
                  padding: '8px 12px',
                  background: 'var(--gold-d)',
                  border: '1px solid var(--border)',
                  fontSize: '11px',
                  color: 'var(--text)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {label}
              </div>
            ))}
          </div>

          <button
            onClick={() => setStep('q1')}
            className="btn-gold"
            style={{
              padding: '16px 32px',
              background: 'var(--gold)',
              color: 'var(--navy)',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Begin Scorecard — 2 Minutes →
          </button>
        </div>
      )}

      {/* Phase 2: Question steps, results, and submission screens */}
      {step !== 'cover' && (
        <p style={{ textAlign: 'center', color: 'var(--muted)' }}>
          Step: {step} — Full implementation in Phase 2
        </p>
      )}
    </div>
  );
}

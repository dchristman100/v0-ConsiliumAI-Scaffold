'use client';

// components/scorecard/InlineScorecardWidget.tsx
// Homepage hero scorecard widget
// Phase 2: Full implementation with state machine

import { useState } from 'react';
import type { ScorecardStep } from '@/types/scorecard';

export default function InlineScorecardWidget() {
  const [step, setStep] = useState<ScorecardStep>('cover');

  // Phase 2: Implement full scorecard flow
  // For now, show cover screen only
  
  return (
    <div
      style={{
        background: 'var(--navy2)',
        border: '1px solid var(--border)',
        padding: '32px',
        maxWidth: '480px',
        margin: '0 auto',
      }}
    >
      <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '16px' }}>
        AI GOVERNANCE SCORECARD™
      </p>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '24px',
          fontWeight: 400,
          color: 'var(--text)',
          marginBottom: '12px',
        }}
      >
        Assess Your Governance Posture
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--muted)',
          marginBottom: '24px',
        }}
      >
        Five questions. Two minutes. Instant gap analysis.
      </p>
      <button
        onClick={() => setStep('q1')}
        className="btn-gold"
        style={{
          width: '100%',
          padding: '14px 24px',
          background: 'var(--gold)',
          color: 'var(--navy)',
          border: 'none',
          cursor: 'pointer',
          fontSize: '13px',
        }}
      >
        Begin Scorecard — 2 Minutes →
      </button>
      
      {/* Phase 2: Render question steps based on state */}
      {step !== 'cover' && (
        <p style={{ marginTop: '16px', color: 'var(--muted)', fontSize: '13px' }}>
          Current step: {step} — Full implementation in Phase 2
        </p>
      )}
    </div>
  );
}

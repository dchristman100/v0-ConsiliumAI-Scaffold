'use client';

// components/scorecard/InlineScorecardWidget.tsx
// Homepage hero scorecard widget - Phase 7 implementation
// FW-01 through FW-10: Complete step flow with state machine
// SSR COMPLIANCE: Cover screen text renders in initial HTML (no useEffect gating)

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import type { ScorecardStep } from '@/types/scorecard';
import { SCORECARD_QUESTIONS, REGULATORY_EXPOSURE_MAP, PROGRESS_MAP } from './ScorecardShared';
import { getUTMParams, captureUTMParams } from '@/lib/utm';

// Scoring logic inline (to avoid circular imports)
function calculateScore(penalties: number[]): number {
  const total = penalties.reduce((sum, p) => sum + p, 0);
  return Math.max(0, 100 - total);
}

function getVerdict(score: number): { label: string; detail: string } {
  if (score >= 85) return { label: 'Strong posture', detail: 'Minor gaps to address. Well-positioned for compliance.' };
  if (score >= 65) return { label: 'Moderate exposure', detail: 'Action recommended. Several gaps need attention.' };
  if (score >= 40) return { label: 'Significant exposure', detail: 'Board attention needed. Material compliance gaps exist.' };
  return { label: 'Critical exposure', detail: 'Immediate action required. Significant regulatory risk.' };
}

function getGapStatus(penalty: number, thresholds: [number, number]): 'good' | 'warn' | 'bad' {
  if (penalty <= thresholds[0]) return 'good';
  if (penalty <= thresholds[1]) return 'warn';
  return 'bad';
}

const GAP_LABELS = [
  { label: 'AI Inventory', thresholds: [0, 8] as [number, number] },
  { label: 'Documentation', thresholds: [0, 7] as [number, number] },
  { label: 'Human Oversight', thresholds: [0, 8] as [number, number] },
  { label: 'Incident Response', thresholds: [0, 6] as [number, number] },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Analytics helper
function trackEvent(name: string) {
  if (typeof window !== 'undefined' && 'va' in window) {
    (window as { va: (action: string, payload: { name: string }) => void }).va('event', { name });
  }
}

interface WidgetState {
  step: ScorecardStep;
  answers: Record<number, number>;
  penalties: Record<number, number>;
  q4Selections: string[];
  score: number | null;
  email: string;
  submitStatus: 'idle' | 'submitting' | 'success' | 'error';
}

export default function InlineScorecardWidget() {
  // FW-01: Initialize with cover screen as default visible state
  const [state, setState] = useState<WidgetState>({
    step: 'cover',
    answers: {},
    penalties: {},
    q4Selections: [],
    score: null,
    email: '',
    submitStatus: 'idle',
  });

  const [sessionId] = useState(() =>
    typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(36).slice(2)
  );

  // Capture UTM params on mount
  useEffect(() => {
    captureUTMParams();
  }, []);

  // Get current question
  const currentQuestionNum = state.step.startsWith('q') ? parseInt(state.step.replace('q', '')) : null;
  const currentQuestion = currentQuestionNum ? SCORECARD_QUESTIONS.find(q => q.id === currentQuestionNum) : null;

  // FW-03: Progress bar width
  const progressWidth = PROGRESS_MAP[state.step] || 0;

  // Navigation handlers
  const goToStep = useCallback((newStep: ScorecardStep) => {
    setState(prev => ({ ...prev, step: newStep }));
  }, []);

  const goNext = useCallback(() => {
    const steps: ScorecardStep[] = ['cover', 'q1', 'q2', 'q3', 'q4', 'q5', 'results'];
    const idx = steps.indexOf(state.step);
    if (idx < steps.length - 1) {
      const nextStep = steps[idx + 1];

      // FW-06: Calculate score when moving to results
      if (nextStep === 'results') {
        const penalties = [
          state.penalties[1] || 0,
          state.penalties[2] || 0,
          state.penalties[3] || 0,
          state.penalties[5] || 0,
        ];
        const score = calculateScore(penalties);
        setState(prev => ({ ...prev, step: nextStep, score }));
        trackEvent('scorecard_completed');
      } else {
        setState(prev => ({ ...prev, step: nextStep }));
      }
    }
  }, [state.step, state.penalties]);

  // FW-05: Back navigation preserves selections
  const goBack = useCallback(() => {
    const steps: ScorecardStep[] = ['cover', 'q1', 'q2', 'q3', 'q4', 'q5', 'results'];
    const idx = steps.indexOf(state.step);
    if (idx > 0) {
      setState(prev => ({ ...prev, step: steps[idx - 1] }));
    }
  }, [state.step]);

  // FW-02: Answer selection
  const selectAnswer = (questionId: number, answerIndex: number, penalty: number) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answerIndex },
      penalties: { ...prev.penalties, [questionId]: penalty },
    }));
  };

  // FW-04: Q4 multi-select toggle
  const toggleQ4Answer = (label: string) => {
    setState(prev => {
      const current = prev.q4Selections;
      if (current.includes(label)) {
        return { ...prev, q4Selections: current.filter(l => l !== label) };
      }
      return { ...prev, q4Selections: [...current, label] };
    });
  };

  // Check if current question is answered (for enabling Next button)
  const isCurrentAnswered = () => {
    if (!currentQuestionNum) return true;
    if (currentQuestionNum === 4) return true; // FW-04: Q4 Next always enabled
    return state.answers[currentQuestionNum] !== undefined;
  };

  // FW-01: Begin scorecard handler
  const handleBegin = () => {
    trackEvent('scorecard_started');
    goToStep('q1');
  };

  // FW-09: Submit handler
  const handleSubmit = async () => {
    if (!EMAIL_REGEX.test(state.email)) return;
    setState(prev => ({ ...prev, submitStatus: 'submitting' }));

    try {
      const utmParams = getUTMParams();

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: state.email,
          name: 'Scorecard User',
          organization: 'Unknown',
          role: 'Unknown',
          primary_concern: 'AI governance gaps',
          source_page: 'homepage',
          source_campaign: 'Campaign-1',
          scorecard: {
            q1_answer: state.answers[1] ?? 0,
            q1_penalty: state.penalties[1] ?? 0,
            q2_answer: state.answers[2] ?? 0,
            q2_penalty: state.penalties[2] ?? 0,
            q3_answer: state.answers[3] ?? 0,
            q3_penalty: state.penalties[3] ?? 0,
            q4_selections: state.q4Selections,
            q5_answer: state.answers[5] ?? 0,
            q5_penalty: state.penalties[5] ?? 0,
            final_score: state.score,
            score_verdict: state.score !== null ? getVerdict(state.score).label : '',
            source: 'homepage-inline',
            session_id: sessionId,
            regulatory_flags: state.q4Selections,
          },
          ...utmParams,
        }),
      });

      if (!response.ok) throw new Error('Submission failed');

      trackEvent('scorecard_email_submitted');
      setState(prev => ({ ...prev, submitStatus: 'success', step: 'submitted' }));
    } catch {
      setState(prev => ({ ...prev, submitStatus: 'error' }));
    }
  };

  // FW-10: Retake handler
  const handleRetake = () => {
    setState({
      step: 'cover',
      answers: {},
      penalties: {},
      q4Selections: [],
      score: null,
      email: '',
      submitStatus: 'idle',
    });
  };

  // Get gap analysis data
  const getGaps = () => {
    const penalties = [
      state.penalties[1] || 0,
      state.penalties[2] || 0,
      state.penalties[3] || 0,
      state.penalties[5] || 0,
    ];
    return GAP_LABELS.map((gap, idx) => ({
      label: gap.label,
      status: getGapStatus(penalties[idx], gap.thresholds),
    }));
  };

  // Score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 60) return 'var(--gold)';
    if (score >= 35) return 'var(--amber)';
    return 'var(--red)';
  };

  return (
    <div
      style={{
        background: 'var(--navy2)',
        border: '1px solid var(--border)',
        padding: '32px',
        minHeight: '480px',
      }}
      role="region"
      aria-label="AI Governance Scorecard"
      aria-live="polite"
      aria-atomic="false"
    >
      {/* FW-03: Progress Bar */}
      {state.step !== 'cover' && (
        <div style={{ height: '4px', background: 'var(--gold-d)', marginBottom: '24px' }}>
          <div
            style={{
              height: '100%',
              width: `${progressWidth}%`,
              background: 'var(--gold)',
              transition: 'width 350ms ease',
            }}
          />
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* FW-01: COVER SCREEN - SSR critical, renders on mount            */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {state.step === 'cover' && (
        <>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '24px',
              fontWeight: 400,
              color: 'var(--text)',
              marginBottom: '8px',
            }}
          >
            AI Governance Scorecard&trade;
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'var(--muted)',
              marginBottom: '24px',
              lineHeight: 1.6,
            }}
          >
            Assess your AI governance posture in 2 minutes. Five questions across four governance dimensions with instant regulatory exposure map.
          </p>
          <button
            onClick={handleBegin}
            className="btn-gold"
            style={{
              width: '100%',
              padding: '16px 24px',
              background: 'var(--gold)',
              color: 'var(--navy)',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '12px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Begin Scorecard — 2 Minutes &rarr;
          </button>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* FW-02: QUESTION SCREENS                                         */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {currentQuestion && state.step !== 'results' && state.step !== 'submitted' && (
        <>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              color: 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '12px',
            }}
          >
            Question {currentQuestion.id} of 5
          </p>
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px',
              fontWeight: 400,
              color: 'var(--text)',
              marginBottom: '8px',
              lineHeight: 1.4,
            }}
          >
            {currentQuestion.text}
          </h4>
          {currentQuestion.subtext && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'var(--muted)',
                marginBottom: '20px',
              }}
            >
              {currentQuestion.subtext}
            </p>
          )}

          {/* Answer Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            {currentQuestion.options.map((option, idx) => {
              const isSelected = currentQuestion.multiSelect
                ? state.q4Selections.includes(option.label)
                : state.answers[currentQuestion.id] === idx;

              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (currentQuestion.multiSelect) {
                      toggleQ4Answer(option.label);
                    } else {
                      selectAnswer(currentQuestion.id, idx, option.penalty);
                    }
                  }}
                  style={{
                    padding: '12px 16px',
                    background: isSelected ? 'var(--gold-d)' : 'var(--navy3)',
                    border: isSelected ? '2px solid var(--gold)' : '1px solid var(--border)',
                    color: 'var(--text)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'border-color 200ms ease, background 200ms ease',
                  }}
                >
                  {currentQuestion.multiSelect && (
                    <span style={{ marginRight: '8px' }}>{isSelected ? '☑' : '☐'}</span>
                  )}
                  {option.label}
                </button>
              );
            })}
          </div>

          {/* FW-05: Navigation Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {state.step !== 'q1' && (
              <button
                onClick={goBack}
                style={{
                  padding: '12px 20px',
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--muted)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                &larr; Back
              </button>
            )}
            <button
              onClick={goNext}
              disabled={!isCurrentAnswered()}
              className="btn-gold"
              style={{
                flex: 1,
                padding: '12px 20px',
                background: isCurrentAnswered() ? 'var(--gold)' : 'var(--navy3)',
                color: isCurrentAnswered() ? 'var(--navy)' : 'var(--muted)',
                border: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: isCurrentAnswered() ? 'pointer' : 'not-allowed',
                opacity: isCurrentAnswered() ? 1 : 0.5,
              }}
            >
              {state.step === 'q5' ? 'See My Score →' : 'Next →'}
            </button>
          </div>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* FW-06, FW-07: RESULTS SCREEN                                    */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {state.step === 'results' && state.score !== null && (
        <>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                color: 'var(--muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '8px',
              }}
            >
              Your Governance Score
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '64px',
                fontWeight: 400,
                color: getScoreColor(state.score),
                lineHeight: 1,
                marginBottom: '8px',
              }}
            >
              {state.score}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--text)',
                marginBottom: '4px',
              }}
            >
              {getVerdict(state.score).label}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
              {getVerdict(state.score).detail}
            </p>
          </div>

          {/* Gap Analysis */}
          <div style={{ marginBottom: '24px' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                color: 'var(--muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '12px',
              }}
            >
              Gap Analysis
            </p>
            {getGaps().map((gap, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: idx < 3 ? '1px solid var(--border)' : 'none',
                }}
              >
                <span style={{ fontSize: '13px', color: 'var(--text)' }}>{gap.label}</span>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background:
                      gap.status === 'good'
                        ? 'var(--green)'
                        : gap.status === 'warn'
                          ? 'var(--amber)'
                          : 'var(--red)',
                  }}
                />
              </div>
            ))}
          </div>

          {/* FW-08: Email Capture */}
          <div style={{ marginBottom: '16px' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--text)',
                marginBottom: '8px',
              }}
            >
              Get Your Full Score Report
            </p>
            <input
              type="email"
              value={state.email}
              onChange={e => setState(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Work email"
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'var(--navy3)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                marginBottom: '12px',
              }}
            />
            {state.submitStatus === 'error' && (
              <p style={{ color: 'var(--red)', fontSize: '12px', marginBottom: '8px' }}>
                Submission failed. Please try again.
              </p>
            )}
            <button
              onClick={handleSubmit}
              disabled={!EMAIL_REGEX.test(state.email) || state.submitStatus === 'submitting'}
              className="btn-gold"
              style={{
                width: '100%',
                padding: '14px 20px',
                background:
                  EMAIL_REGEX.test(state.email) && state.submitStatus !== 'submitting'
                    ? 'var(--gold)'
                    : 'var(--navy3)',
                color:
                  EMAIL_REGEX.test(state.email) && state.submitStatus !== 'submitting'
                    ? 'var(--navy)'
                    : 'var(--muted)',
                border: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor:
                  EMAIL_REGEX.test(state.email) && state.submitStatus !== 'submitting'
                    ? 'pointer'
                    : 'not-allowed',
                opacity: EMAIL_REGEX.test(state.email) ? 1 : 0.5,
              }}
            >
              {state.submitStatus === 'submitting'
                ? 'Submitting...'
                : 'Send My Score Report + Book RiskIQ™ Assessment →'}
            </button>
          </div>

          {/* FW-10: Retake */}
          <button
            onClick={handleRetake}
            style={{
              width: '100%',
              padding: '10px',
              background: 'transparent',
              border: 'none',
              color: 'var(--muted)',
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Retake Scorecard
          </button>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* FW-09: SUBMITTED SCREEN                                         */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {state.step === 'submitted' && (
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'var(--gold-d)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <span style={{ color: 'var(--gold)', fontSize: '24px' }}>✓</span>
          </div>
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '20px',
              fontWeight: 400,
              color: 'var(--text)',
              marginBottom: '8px',
            }}
          >
            Score report sent!
          </h4>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--muted)',
              marginBottom: '24px',
            }}
          >
            Check your inbox. We&apos;ll reach out within 24 hours.
          </p>
          <Link
            href="/scorecard"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: 'var(--navy3)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              textDecoration: 'none',
              marginBottom: '16px',
            }}
          >
            View full regulatory exposure map &rarr;
          </Link>
          <br />
          <button
            onClick={handleRetake}
            style={{
              marginTop: '8px',
              padding: '10px',
              background: 'transparent',
              border: 'none',
              color: 'var(--muted)',
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Retake Scorecard
          </button>
        </div>
      )}
    </div>
  );
}

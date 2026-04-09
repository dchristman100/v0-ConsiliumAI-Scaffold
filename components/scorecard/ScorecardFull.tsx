'use client';

// components/scorecard/ScorecardFull.tsx
// Full-page scorecard with regulatory exposure map
// Phase 7: SC-04, SC-07 - Complete implementation with all dimensions
// SSR COMPLIANCE: Cover screen text renders in initial HTML

import { useState, useCallback } from 'react';
import type { ScorecardStep } from '@/types/scorecard';
import { SCORECARD_QUESTIONS, REGULATORY_EXPOSURE_MAP, DIMENSION_LABELS, PROGRESS_MAP } from './ScorecardShared';

// Scoring logic inline
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

function getGapDetail(label: string, status: 'good' | 'warn' | 'bad'): string {
  const details: Record<string, Record<'good' | 'warn' | 'bad', string>> = {
    'AI Inventory': {
      good: 'Complete inventory of AI systems with board-approved governance structure in place.',
      warn: 'Partial inventory exists but governance structure needs formalization.',
      bad: 'No systematic AI inventory or governance framework. Immediate action required.',
    },
    Documentation: {
      good: 'Comprehensive model cards, data lineage, and risk assessments maintained.',
      warn: 'Documentation exists for some systems but lacks consistency.',
      bad: 'Insufficient documentation creates audit and compliance risk.',
    },
    'Human Oversight': {
      good: 'Proactive regulatory mapping with clear compliance roadmap.',
      warn: 'Aware of applicable regulations but compliance gaps exist.',
      bad: 'Reactive or unaware posture creates significant regulatory exposure.',
    },
    'Incident Response': {
      good: 'Tested AI-specific incident response plan with defined escalation paths.',
      warn: 'Response plan exists but lacks AI-specific procedures or testing.',
      bad: 'No incident response plan for AI failures or regulatory inquiries.',
    },
  };
  return details[label]?.[status] || '';
}

const GAP_LABELS = [
  { label: 'AI Inventory', thresholds: [0, 8] as [number, number] },
  { label: 'Documentation', thresholds: [0, 7] as [number, number] },
  { label: 'Human Oversight', thresholds: [0, 8] as [number, number] },
  { label: 'Incident Response', thresholds: [0, 6] as [number, number] },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface WidgetState {
  step: ScorecardStep;
  answers: Record<number, number>;
  penalties: Record<number, number>;
  q4Selections: string[];
  score: number | null;
  email: string;
  submitStatus: 'idle' | 'submitting' | 'success' | 'error';
}

export default function ScorecardFull() {
  const [state, setState] = useState<WidgetState>({
    step: 'cover',
    answers: {},
    penalties: {},
    q4Selections: [],
    score: null,
    email: '',
    submitStatus: 'idle',
  });

  // Get current question
  const currentQuestionNum = state.step.startsWith('q') ? parseInt(state.step.replace('q', '')) : null;
  const currentQuestion = currentQuestionNum ? SCORECARD_QUESTIONS.find(q => q.id === currentQuestionNum) : null;

  // Progress bar width
  const progressWidth = PROGRESS_MAP[state.step] || 0;

  // Navigation handlers
  const goNext = useCallback(() => {
    const steps: ScorecardStep[] = ['cover', 'q1', 'q2', 'q3', 'q4', 'q5', 'results'];
    const idx = steps.indexOf(state.step);
    if (idx < steps.length - 1) {
      const nextStep = steps[idx + 1];

      if (nextStep === 'results') {
        const penalties = [
          state.penalties[1] || 0,
          state.penalties[2] || 0,
          state.penalties[3] || 0,
          state.penalties[5] || 0,
        ];
        const score = calculateScore(penalties);
        setState(prev => ({ ...prev, step: nextStep, score }));
      } else {
        setState(prev => ({ ...prev, step: nextStep }));
      }
    }
  }, [state.step, state.penalties]);

  const goBack = useCallback(() => {
    const steps: ScorecardStep[] = ['cover', 'q1', 'q2', 'q3', 'q4', 'q5', 'results'];
    const idx = steps.indexOf(state.step);
    if (idx > 0) {
      setState(prev => ({ ...prev, step: steps[idx - 1] }));
    }
  }, [state.step]);

  // Answer selection
  const selectAnswer = (questionId: number, answerIndex: number, penalty: number) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answerIndex },
      penalties: { ...prev.penalties, [questionId]: penalty },
    }));
  };

  // Q4 multi-select toggle
  const toggleQ4Answer = (label: string) => {
    setState(prev => {
      const current = prev.q4Selections;
      if (current.includes(label)) {
        return { ...prev, q4Selections: current.filter(l => l !== label) };
      }
      return { ...prev, q4Selections: [...current, label] };
    });
  };

  // Check if current question is answered
  const isCurrentAnswered = () => {
    if (!currentQuestionNum) return true;
    if (currentQuestionNum === 4) return true;
    return state.answers[currentQuestionNum] !== undefined;
  };

  // Submit handler
  const handleSubmit = async () => {
    if (!EMAIL_REGEX.test(state.email)) return;
    setState(prev => ({ ...prev, submitStatus: 'submitting' }));

    try {
      // Stub for PDF generation - Phase 9
      console.log('[ScorecardFull] Email submission:', {
        email: state.email,
        score: state.score,
        answers: state.answers,
        q4Selections: state.q4Selections,
      });

      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: state.email,
          name: 'Scorecard User',
          organization: 'Unknown',
          role: 'Unknown',
          primary_concern: 'AI governance gaps',
          source_page: 'scorecard',
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
            source: 'scorecard-full',
            regulatory_flags: state.q4Selections,
          },
        }),
      });

      setState(prev => ({ ...prev, submitStatus: 'success', step: 'submitted' }));
    } catch {
      setState(prev => ({ ...prev, submitStatus: 'error' }));
    }
  };

  // Retake handler
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

  // Get gap analysis data with details
  const getGaps = () => {
    const penalties = [
      state.penalties[1] || 0,
      state.penalties[2] || 0,
      state.penalties[3] || 0,
      state.penalties[5] || 0,
    ];
    return GAP_LABELS.map((gap, idx) => {
      const status = getGapStatus(penalties[idx], gap.thresholds);
      return {
        label: gap.label,
        status,
        detail: getGapDetail(gap.label, status),
      };
    });
  };

  // Score color
  const getScoreColor = (score: number) => {
    if (score >= 60) return 'var(--gold)';
    if (score >= 35) return 'var(--amber)';
    return 'var(--red)';
  };

  return (
    <div
      style={{ maxWidth: '640px', margin: '0 auto' }}
      role="region"
      aria-label="AI Governance Scorecard"
      aria-live="polite"
      aria-atomic="false"
    >
      {/* Progress Bar */}
      {state.step !== 'cover' && (
        <div style={{ height: '4px', background: 'var(--gold-d)', marginBottom: '48px' }}>
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
      {/* COVER SCREEN - SSR critical                                     */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {state.step === 'cover' && (
        <div style={{ textAlign: 'center' }}>
          {/* Dimension Labels - SSR for SEO */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '32px',
            }}
          >
            {Object.values(DIMENSION_LABELS).map(label => (
              <span
                key={label}
                style={{
                  padding: '6px 12px',
                  background: 'var(--gold-d)',
                  border: '1px solid var(--border)',
                  fontSize: '10px',
                  color: 'var(--text)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {label}
              </span>
            ))}
          </div>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              color: 'var(--muted)',
              marginBottom: '32px',
              lineHeight: 1.6,
            }}
          >
            Answer five questions across governance framework, documentation, regulatory readiness, exposure mapping,
            and board oversight. Receive an instant score with gap analysis and regulatory exposure map.
          </p>

          <button
            onClick={() => setState(prev => ({ ...prev, step: 'q1' }))}
            className="btn-gold"
            style={{
              padding: '16px 32px',
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
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* QUESTION SCREENS                                                */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {currentQuestion && state.step !== 'results' && state.step !== 'submitted' && (
        <div
          style={{
            background: 'var(--navy2)',
            border: '1px solid var(--border)',
            padding: '40px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              color: 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '16px',
            }}
          >
            Question {currentQuestion.id} of 5 — {DIMENSION_LABELS[currentQuestion.id as keyof typeof DIMENSION_LABELS]}
          </p>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '24px',
              fontWeight: 400,
              color: 'var(--text)',
              marginBottom: '8px',
              lineHeight: 1.4,
            }}
          >
            {currentQuestion.text}
          </h3>
          {currentQuestion.subtext && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--muted)',
                marginBottom: '32px',
              }}
            >
              {currentQuestion.subtext}
            </p>
          )}

          {/* Answer Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
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
                    padding: '16px 20px',
                    background: isSelected ? 'var(--gold-d)' : 'var(--navy3)',
                    border: isSelected ? '2px solid var(--gold)' : '1px solid var(--border)',
                    color: 'var(--text)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'border-color 200ms ease, background 200ms ease',
                  }}
                >
                  {currentQuestion.multiSelect && (
                    <span style={{ marginRight: '12px', fontSize: '16px' }}>{isSelected ? '☑' : '☐'}</span>
                  )}
                  {option.label}
                </button>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', gap: '16px' }}>
            {state.step !== 'q1' && (
              <button
                onClick={goBack}
                style={{
                  padding: '14px 24px',
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--muted)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
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
                padding: '14px 24px',
                background: isCurrentAnswered() ? 'var(--gold)' : 'var(--navy3)',
                color: isCurrentAnswered() ? 'var(--navy)' : 'var(--muted)',
                border: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
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
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* RESULTS SCREEN                                                  */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {state.step === 'results' && state.score !== null && (
        <div>
          {/* Score Display */}
          <div
            style={{
              background: 'var(--navy2)',
              border: '1px solid var(--border)',
              padding: '48px',
              textAlign: 'center',
              marginBottom: '24px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '16px',
              }}
            >
              Your AI Governance Score
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '96px',
                fontWeight: 400,
                color: getScoreColor(state.score),
                lineHeight: 1,
                marginBottom: '16px',
              }}
            >
              {state.score}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '20px',
                fontWeight: 600,
                color: 'var(--text)',
                marginBottom: '8px',
              }}
            >
              {getVerdict(state.score).label}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--muted)' }}>
              {getVerdict(state.score).detail}
            </p>
          </div>

          {/* Gap Analysis - Full 4-dimension with explanations */}
          <div
            style={{
              background: 'var(--navy2)',
              border: '1px solid var(--border)',
              padding: '32px',
              marginBottom: '24px',
            }}
          >
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                fontWeight: 400,
                color: 'var(--text)',
                marginBottom: '24px',
              }}
            >
              Gap Analysis by Dimension
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {getGaps().map((gap, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    padding: '16px',
                    background: 'var(--navy3)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      background:
                        gap.status === 'good'
                          ? 'rgba(34, 197, 94, 0.1)'
                          : gap.status === 'warn'
                            ? 'rgba(234, 179, 8, 0.1)'
                            : 'rgba(239, 68, 68, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background:
                          gap.status === 'good' ? 'var(--green)' : gap.status === 'warn' ? 'var(--amber)' : 'var(--red)',
                      }}
                    />
                  </div>
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>
                      {gap.label}
                    </p>
                    <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>{gap.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SC-07: Regulatory Exposure Map */}
          <div
            style={{
              background: 'var(--navy2)',
              border: '1px solid var(--border)',
              padding: '32px',
              marginBottom: '24px',
            }}
          >
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                fontWeight: 400,
                color: 'var(--text)',
                marginBottom: '24px',
              }}
            >
              Regulatory Exposure Map
            </h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '12px',
              }}
            >
              {REGULATORY_EXPOSURE_MAP.map(reg => {
                // SC-04: Red indicator if selected in Q4
                const isExposed = state.q4Selections.includes(reg.matchKey);
                return (
                  <div
                    key={reg.id}
                    style={{
                      padding: '16px',
                      background: isExposed ? 'rgba(239, 68, 68, 0.08)' : 'var(--navy3)',
                      borderLeft: isExposed ? '3px solid var(--red)' : '3px solid var(--border)',
                      textAlign: 'center',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: isExposed ? 'var(--red)' : 'var(--text)',
                        marginBottom: '4px',
                      }}
                    >
                      {reg.label}
                    </p>
                    <p style={{ fontSize: '11px', color: 'var(--muted)' }}>{reg.fullName}</p>
                    {isExposed && (
                      <p style={{ fontSize: '10px', color: 'var(--red)', marginTop: '8px', fontWeight: 600 }}>
                        ACTIVE
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Email Capture */}
          <div
            style={{
              background: 'var(--navy2)',
              border: '1px solid var(--border)',
              padding: '32px',
              marginBottom: '24px',
            }}
          >
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                fontWeight: 400,
                color: 'var(--text)',
                marginBottom: '16px',
              }}
            >
              Get Your Full Score Report
            </h4>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--muted)',
                marginBottom: '20px',
              }}
            >
              Receive your detailed score report with personalized recommendations and book your RiskIQ&trade;
              Assessment.
            </p>
            <input
              type="email"
              value={state.email}
              onChange={e => setState(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Work email"
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'var(--navy3)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                marginBottom: '16px',
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
                padding: '16px 24px',
                background:
                  EMAIL_REGEX.test(state.email) && state.submitStatus !== 'submitting' ? 'var(--gold)' : 'var(--navy3)',
                color:
                  EMAIL_REGEX.test(state.email) && state.submitStatus !== 'submitting' ? 'var(--navy)' : 'var(--muted)',
                border: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor:
                  EMAIL_REGEX.test(state.email) && state.submitStatus !== 'submitting' ? 'pointer' : 'not-allowed',
                opacity: EMAIL_REGEX.test(state.email) ? 1 : 0.5,
              }}
            >
              {state.submitStatus === 'submitting' ? 'Submitting...' : 'Send Report + Book RiskIQ™ Assessment →'}
            </button>
          </div>

          <button
            onClick={handleRetake}
            style={{
              width: '100%',
              padding: '12px',
              background: 'transparent',
              border: 'none',
              color: 'var(--muted)',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Retake Scorecard
          </button>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SUBMITTED SCREEN                                                */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {state.step === 'submitted' && (
        <div
          style={{
            background: 'var(--navy2)',
            border: '1px solid var(--border)',
            padding: '64px 48px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--gold-d)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <span style={{ color: 'var(--gold)', fontSize: '32px' }}>✓</span>
          </div>
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '24px',
              fontWeight: 400,
              color: 'var(--text)',
              marginBottom: '12px',
            }}
          >
            Score Report Sent!
          </h4>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              color: 'var(--muted)',
              marginBottom: '32px',
            }}
          >
            Check your inbox. We&apos;ll reach out within 24 hours to schedule your RiskIQ&trade; Assessment.
          </p>
          <button
            onClick={handleRetake}
            style={{
              padding: '14px 28px',
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Retake Scorecard
          </button>
        </div>
      )}
    </div>
  );
}

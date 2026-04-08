'use client';

// components/scorecard/ScorecardFull.tsx
// Full-page scorecard with regulatory exposure map
// SC-04, SC-07: Complete implementation with all dimensions

import { useState, useCallback } from 'react';
import type { ScorecardStep } from '@/types/scorecard';
import { SCORECARD_QUESTIONS, PROGRESS_MAP, GAP_COLORS, DIMENSION_LABELS } from './ScorecardShared';
import {
  calculateScore,
  getVerdict,
  getQ1Penalty,
  getQ2Penalty,
  getQ3Penalty,
  getQ5Penalty,
  analyzeGaps,
  REGULATORY_EXPOSURES,
  mapQ4SelectionsToExposures,
} from '@/lib/scoring';

interface Answers {
  q1: number | null;
  q2: number | null;
  q3: number | null;
  q4: number[];
  q5: number | null;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ScorecardFull() {
  const [step, setStep] = useState<ScorecardStep>('cover');
  const [answers, setAnswers] = useState<Answers>({
    q1: null,
    q2: null,
    q3: null,
    q4: [],
    q5: null,
  });
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate score and verdict
  const score = calculateScore(
    answers.q1 !== null ? getQ1Penalty(answers.q1) : 0,
    answers.q2 !== null ? getQ2Penalty(answers.q2) : 0,
    answers.q3 !== null ? getQ3Penalty(answers.q3) : 0,
    answers.q5 !== null ? getQ5Penalty(answers.q5) : 0
  );
  const verdict = getVerdict(score);
  const gaps = analyzeGaps(
    answers.q1 !== null ? getQ1Penalty(answers.q1) : 0,
    answers.q2 !== null ? getQ2Penalty(answers.q2) : 0,
    answers.q3 !== null ? getQ3Penalty(answers.q3) : 0,
    answers.q5 !== null ? getQ5Penalty(answers.q5) : 0
  );

  // Regulatory exposure based on Q4
  const exposedRegulations = mapQ4SelectionsToExposures(answers.q4);

  // Navigation handlers
  const goNext = useCallback(() => {
    const steps: ScorecardStep[] = ['cover', 'q1', 'q2', 'q3', 'q4', 'q5', 'results'];
    const idx = steps.indexOf(step);
    if (idx < steps.length - 1) {
      setStep(steps[idx + 1]);
    }
  }, [step]);

  const goBack = useCallback(() => {
    const steps: ScorecardStep[] = ['cover', 'q1', 'q2', 'q3', 'q4', 'q5', 'results'];
    const idx = steps.indexOf(step);
    if (idx > 0) {
      setStep(steps[idx - 1]);
    }
  }, [step]);

  // Answer selection handlers
  const selectAnswer = (questionId: 'q1' | 'q2' | 'q3' | 'q5', answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const toggleQ4Answer = (answerIndex: number) => {
    setAnswers(prev => {
      const current = prev.q4;
      if (current.includes(answerIndex)) {
        return { ...prev, q4: current.filter(i => i !== answerIndex) };
      }
      return { ...prev, q4: [...current, answerIndex] };
    });
  };

  // Check if current question is answered
  const isCurrentAnswered = () => {
    if (step === 'q1') return answers.q1 !== null;
    if (step === 'q2') return answers.q2 !== null;
    if (step === 'q3') return answers.q3 !== null;
    if (step === 'q4') return true;
    if (step === 'q5') return answers.q5 !== null;
    return true;
  };

  // Submit handler
  const handleSubmit = async () => {
    if (!EMAIL_REGEX.test(email)) return;
    setIsSubmitting(true);

    // Stub for Phase 3
    console.log('[v0] Scorecard Full submission:', { email, score, answers, exposedRegulations });
    await new Promise(resolve => setTimeout(resolve, 500));

    setIsSubmitting(false);
    setStep('submitted');
  };

  // Retake handler
  const handleRetake = () => {
    setAnswers({ q1: null, q2: null, q3: null, q4: [], q5: null });
    setEmail('');
    setStep('cover');
  };

  // Progress bar width
  const progressWidth = PROGRESS_MAP[step] || 0;

  // Get current question data
  const currentQuestion = SCORECARD_QUESTIONS.find(q => q.id === step);

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
      {/* Progress Bar */}
      {step !== 'cover' && (
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
              width: `${progressWidth}%`,
              background: 'var(--gold)',
              transition: 'width 350ms ease',
            }}
          />
        </div>
      )}

      {/* COVER SCREEN */}
      {step === 'cover' && (
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
            {Object.values(DIMENSION_LABELS).map((label) => (
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
            Answer five questions across policy, oversight, documentation, regulatory exposure, 
            and incident response. Receive an instant score with gap analysis and regulatory exposure map.
          </p>

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

      {/* QUESTION SCREENS */}
      {currentQuestion && step !== 'results' && step !== 'submitted' && (
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
            Question {currentQuestion.id.replace('q', '')} of 5 — {DIMENSION_LABELS[currentQuestion.id]}
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

          {/* Answer Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            {currentQuestion.options.map((option, idx) => {
              const isSelected = currentQuestion.multiSelect
                ? answers.q4.includes(idx)
                : answers[currentQuestion.id as 'q1' | 'q2' | 'q3' | 'q5'] === idx;

              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (currentQuestion.multiSelect) {
                      toggleQ4Answer(idx);
                    } else {
                      selectAnswer(currentQuestion.id as 'q1' | 'q2' | 'q3' | 'q5', idx);
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
                    transition: 'all 0.15s ease',
                  }}
                >
                  {currentQuestion.multiSelect && (
                    <span style={{ marginRight: '12px', fontSize: '16px' }}>
                      {isSelected ? '☑' : '☐'}
                    </span>
                  )}
                  {option}
                </button>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', gap: '16px' }}>
            {step !== 'q1' && (
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
                ← Back
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
                cursor: isCurrentAnswered() ? 'pointer' : 'not-allowed',
                opacity: isCurrentAnswered() ? 1 : 0.5,
              }}
            >
              {step === 'q5' ? 'See My Score →' : 'Next →'}
            </button>
          </div>
        </div>
      )}

      {/* RESULTS SCREEN */}
      {step === 'results' && (
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
                color: 'var(--gold)',
                lineHeight: 1,
                marginBottom: '16px',
              }}
            >
              {score}
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
              {verdict.label}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                color: 'var(--muted)',
              }}
            >
              {verdict.detail}
            </p>
          </div>

          {/* Gap Analysis - Full 4-dimension */}
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
              {gaps.map((gap, idx) => (
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
                      background: gap.status === 'good' 
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
                    <span style={{ color: GAP_COLORS[gap.status], fontSize: '18px' }}>
                      {gap.status === 'good' ? '✓' : gap.status === 'warn' ? '!' : '✗'}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>
                      {gap.label}
                    </p>
                    <p style={{ fontSize: '13px', color: 'var(--muted)' }}>
                      {gap.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regulatory Exposure Map (SC-04, SC-07) */}
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
              {REGULATORY_EXPOSURES.map((reg) => {
                const isExposed = exposedRegulations.includes(reg.id);
                return (
                  <div
                    key={reg.id}
                    style={{
                      padding: '16px',
                      background: isExposed ? 'rgba(239, 68, 68, 0.1)' : 'var(--navy3)',
                      border: isExposed ? '1px solid #ef4444' : '1px solid var(--border)',
                      textAlign: 'center',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: isExposed ? '#ef4444' : 'var(--text)',
                        marginBottom: '4px',
                      }}
                    >
                      {reg.label}
                    </p>
                    <p style={{ fontSize: '11px', color: 'var(--muted)' }}>
                      {reg.description}
                    </p>
                    {isExposed && (
                      <p style={{ fontSize: '10px', color: '#ef4444', marginTop: '8px', fontWeight: 600 }}>
                        EXPOSED
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
              Get Your Full Report
            </h4>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--muted)',
                marginBottom: '20px',
              }}
            >
              Receive your detailed score report with personalized recommendations and book your RiskIQ™ Assessment.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <button
              onClick={handleSubmit}
              disabled={!EMAIL_REGEX.test(email) || isSubmitting}
              className="btn-gold"
              style={{
                width: '100%',
                padding: '16px 24px',
                background: EMAIL_REGEX.test(email) && !isSubmitting ? 'var(--gold)' : 'var(--navy3)',
                color: EMAIL_REGEX.test(email) && !isSubmitting ? 'var(--navy)' : 'var(--muted)',
                border: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                cursor: EMAIL_REGEX.test(email) && !isSubmitting ? 'pointer' : 'not-allowed',
                opacity: EMAIL_REGEX.test(email) ? 1 : 0.5,
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Send Report + Book RiskIQ™ Assessment →'}
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

      {/* SUBMITTED SCREEN */}
      {step === 'submitted' && (
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
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '28px',
              fontWeight: 400,
              color: 'var(--text)',
              marginBottom: '12px',
            }}
          >
            Score Report Sent
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              color: 'var(--muted)',
              marginBottom: '32px',
              maxWidth: '400px',
              margin: '0 auto 32px',
            }}
          >
            Check your inbox for your detailed governance assessment. Our team will reach out within 24 hours to schedule your RiskIQ™ Assessment.
          </p>
          <button
            onClick={handleRetake}
            style={{
              padding: '14px 32px',
              background: 'var(--navy3)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
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

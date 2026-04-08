'use client';

// components/scorecard/InlineScorecardWidget.tsx
// Homepage hero scorecard widget - Full implementation
// FW-01 through FW-10: Complete step flow with state machine

import { useState, useCallback } from 'react';
import Link from 'next/link';
import type { ScorecardStep } from '@/types/scorecard';
import { SCORECARD_QUESTIONS, PROGRESS_MAP, GAP_COLORS } from './ScorecardShared';
import {
  calculateScore,
  getVerdict,
  getQ1Penalty,
  getQ2Penalty,
  getQ3Penalty,
  getQ5Penalty,
  analyzeGaps,
} from '@/lib/scoring';

interface Answers {
  q1: number | null;
  q2: number | null;
  q3: number | null;
  q4: number[];
  q5: number | null;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function InlineScorecardWidget() {
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

  // Check if current question is answered (for enabling Next button)
  const isCurrentAnswered = () => {
    if (step === 'q1') return answers.q1 !== null;
    if (step === 'q2') return answers.q2 !== null;
    if (step === 'q3') return answers.q3 !== null;
    if (step === 'q4') return true; // Q4 Next always enabled (FW-04)
    if (step === 'q5') return answers.q5 !== null;
    return true;
  };

  // Submit handler (FW-08, FW-09)
  const handleSubmit = async () => {
    if (!EMAIL_REGEX.test(email)) return;
    setIsSubmitting(true);

    // Stub for Phase 3 — real Supabase write in Phase 4
    console.log('[v0] Scorecard submission:', { email, score, answers });
    await new Promise(resolve => setTimeout(resolve, 500));

    setIsSubmitting(false);
    setStep('submitted');
  };

  // Retake handler (FW-10)
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
    <div
      style={{
        background: 'var(--navy2)',
        border: '1px solid var(--border)',
        padding: '32px',
        maxWidth: '480px',
        margin: '0 auto',
      }}
    >
      {/* Progress Bar (FW-03) */}
      {step !== 'cover' && (
        <div
          style={{
            height: '4px',
            background: 'var(--navy3)',
            marginBottom: '24px',
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

      {/* COVER SCREEN (FW-01) */}
      {step === 'cover' && (
        <>
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
        </>
      )}

      {/* QUESTION SCREENS (FW-02) */}
      {currentQuestion && step !== 'results' && step !== 'submitted' && (
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
            Question {currentQuestion.id.replace('q', '')} of 5
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

          {/* Answer Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
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
                    padding: '12px 16px',
                    background: isSelected ? 'var(--gold-d)' : 'var(--navy3)',
                    border: isSelected ? '2px solid var(--gold)' : '1px solid var(--border)',
                    color: 'var(--text)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {currentQuestion.multiSelect && (
                    <span style={{ marginRight: '8px' }}>
                      {isSelected ? '☑' : '☐'}
                    </span>
                  )}
                  {option}
                </button>
              );
            })}
          </div>

          {/* Navigation Buttons (FW-05) */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {step !== 'q1' && (
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
                ← Back
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
                cursor: isCurrentAnswered() ? 'pointer' : 'not-allowed',
                opacity: isCurrentAnswered() ? 1 : 0.5,
              }}
            >
              {step === 'q5' ? 'See My Score →' : 'Next →'}
            </button>
          </div>
        </>
      )}

      {/* RESULTS SCREEN (FW-06, FW-07) */}
      {step === 'results' && (
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
                color: 'var(--gold)',
                lineHeight: 1,
                marginBottom: '8px',
              }}
            >
              {score}
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
              {verdict.label}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'var(--muted)',
              }}
            >
              {verdict.detail}
            </p>
          </div>

          {/* Gap Analysis (FW-07) */}
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
            {gaps.map((gap, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: idx < gaps.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <span style={{ fontSize: '13px', color: 'var(--text)' }}>
                  {gap.label}
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: GAP_COLORS[gap.status],
                  }}
                >
                  {gap.status === 'good' ? '✓' : gap.status === 'warn' ? '!' : '✗'}
                </span>
              </div>
            ))}
          </div>

          {/* Email Capture (FW-08) */}
          <div style={{ marginBottom: '16px' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <button
              onClick={handleSubmit}
              disabled={!EMAIL_REGEX.test(email) || isSubmitting}
              className="btn-gold"
              style={{
                width: '100%',
                padding: '14px 20px',
                background: EMAIL_REGEX.test(email) && !isSubmitting ? 'var(--gold)' : 'var(--navy3)',
                color: EMAIL_REGEX.test(email) && !isSubmitting ? 'var(--navy)' : 'var(--muted)',
                border: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                cursor: EMAIL_REGEX.test(email) && !isSubmitting ? 'pointer' : 'not-allowed',
                opacity: EMAIL_REGEX.test(email) ? 1 : 0.5,
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Send My Score Report + Book RiskIQ™ Assessment →'}
            </button>
          </div>

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

      {/* SUBMITTED SCREEN (FW-09) */}
      {step === 'submitted' && (
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
            Score Report Sent
          </h4>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--muted)',
              marginBottom: '24px',
            }}
          >
            Check your inbox. We&apos;ll reach out within 24 hours to schedule your assessment.
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
            View Full Regulatory Exposure Map →
          </Link>
          <button
            onClick={handleRetake}
            style={{
              display: 'block',
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
        </div>
      )}
    </div>
  );
}

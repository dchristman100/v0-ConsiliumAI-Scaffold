'use client';

// components/scorecard/ScorecardFunnel.tsx
// Unified 5-step conversion funnel:
// Step 1: Scorecard (5 questions)
// Step 2: Email Gate (blurred score teaser)
// Step 3: Results (score + dimensions + exposure map)
// Step 4: Call Booking (Calendly embed)
// Step 5: Confirmation

import { useState, useCallback, useEffect, useRef } from 'react';
import { getUTMParams, captureUTMParams } from '@/lib/utm';

// ═══════════════════════════════════════════════════════════════
// TYPES & CONSTANTS
// ═══════════════════════════════════════════════════════════════

type FunnelStep = 1 | 2 | 3 | 4 | 5;
type QuestionStep = 0 | 1 | 2 | 3 | 4;

interface Question {
  id: number;
  text: string;
  multiSelect?: boolean;
  options: { label: string; score: number }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'Does your organization have board-approved AI governance policies?',
    options: [
      { label: 'Yes — comprehensive and board-approved', score: 25 },
      { label: 'Partial — some policies exist but not formalized', score: 15 },
      { label: 'No formal AI governance policies', score: 0 },
      { label: 'Unsure / Don\'t know', score: 5 },
    ],
  },
  {
    id: 2,
    text: 'Is there dedicated executive oversight for AI initiatives?',
    options: [
      { label: 'Yes — dedicated AI executive or committee', score: 25 },
      { label: 'Shared responsibility across existing roles', score: 15 },
      { label: 'No dedicated AI oversight', score: 0 },
      { label: 'Unsure / Don\'t know', score: 5 },
    ],
  },
  {
    id: 3,
    text: 'Are your AI systems documented with model cards, decision logs, and audit trails?',
    options: [
      { label: 'Yes — comprehensive documentation for all AI systems', score: 25 },
      { label: 'Partial — some systems documented', score: 15 },
      { label: 'No AI-specific documentation', score: 0 },
      { label: 'Unsure / Don\'t know', score: 5 },
    ],
  },
  {
    id: 4,
    text: 'Which regulatory frameworks apply to your organization?',
    multiSelect: true,
    options: [
      { label: 'CMS Medicare Advantage (health plan / payer)', score: 0 },
      { label: 'NYDFS 500.17 (NY-regulated financial / insurance)', score: 0 },
      { label: 'EU AI Act (EU operations or EU-facing services)', score: 0 },
      { label: 'FTC Section 5 (US consumer-facing AI)', score: 0 },
      { label: 'Colorado AI Act (CO operations)', score: 0 },
      { label: 'OCR / HIPAA (health data + AI)', score: 0 },
      { label: 'Unsure which apply', score: 0 },
    ],
  },
  {
    id: 5,
    text: 'Do you have an AI-specific incident response plan?',
    options: [
      { label: 'Yes — documented and tested', score: 25 },
      { label: 'Generic incident response exists but not AI-specific', score: 15 },
      { label: 'No incident response plan for AI', score: 0 },
      { label: 'Unsure / Don\'t know', score: 5 },
    ],
  },
];

const FRAMEWORKS = [
  { key: 'CMS MA', label: 'CMS Medicare Advantage', abbr: 'CMS MA', risk: 'Prior auth AI documentation — Dec 31, 2026', match: 'CMS Medicare Advantage' },
  { key: 'NYDFS', label: 'NYDFS 500.17', abbr: 'NYDFS', risk: '500.17 AI mandate — Jun 30, 2026', match: 'NYDFS 500.17' },
  { key: 'EU AI Act', label: 'EU AI Act', abbr: 'EU AI ACT', risk: 'High-risk classification — Aug 2, 2026', match: 'EU AI Act' },
  { key: 'FTC', label: 'FTC Section 5', abbr: 'FTC §5', risk: 'Section 5 enforcement — Active NOW', match: 'FTC Section 5' },
  { key: 'Colorado', label: 'Colorado AI Act', abbr: 'CO AI ACT', risk: 'AI consumer protection — Feb 1, 2026', match: 'Colorado AI Act' },
  { key: 'OCR', label: 'OCR / HIPAA', abbr: 'OCR/HIPAA', risk: 'HIPAA AI guidance — Active NOW', match: 'OCR / HIPAA' },
];

const PERSONAL_EMAIL_DOMAINS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com', 'mail.com'];

const ROLE_OPTIONS = [
  'Select your role...',
  'CCO / Chief Compliance Officer',
  'CAIO / Chief AI Officer',
  'CDO / Chief Data Officer',
  'General Counsel',
  'CRO / Chief Risk Officer',
  'VP Compliance',
  'VP Technology',
  'Board Member',
  'Other',
];

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function getVerdict(score: number): { label: string; color: string; description: string } {
  if (score >= 80) return {
    label: 'STRONG',
    color: '#059669',
    description: 'Your governance posture is ahead of most organizations. Focus on certification readiness and continuous monitoring.',
  };
  if (score >= 55) return {
    label: 'MODERATE',
    color: '#D97706',
    description: 'You have governance foundations but significant gaps remain. Regulatory exposure is addressable with focused effort.',
  };
  if (score >= 25) return {
    label: 'SIGNIFICANT EXPOSURE',
    color: '#EA580C',
    description: 'Critical governance gaps exist across multiple dimensions. Without action, enforcement deadlines will arrive before readiness.',
  };
  return {
    label: 'CRITICAL EXPOSURE',
    color: '#DC2626',
    description: 'No meaningful governance layer detected. Your organization has active regulatory exposure on multiple fronts.',
  };
}

function getDimensionColor(score: number): string {
  if (score === 25) return '#059669';
  if (score === 15) return '#D97706';
  if (score === 5) return '#EA580C';
  return '#DC2626';
}

function getRecommendations(dimensions: { policy: number; oversight: number; documentation: number; incidentResponse: number }): string[] {
  const recs: string[] = [];
  
  if (dimensions.policy <= 5) {
    recs.push('Establish a board-approved AI governance policy framework. This is the foundation every regulator looks for first.');
  }
  if (dimensions.oversight <= 5) {
    recs.push('Designate executive AI oversight — a CAIO, AI Committee, or equivalent authority with documented mandate.');
  }
  if (dimensions.documentation <= 5) {
    recs.push('Inventory all deployed AI systems and create model documentation with decision logs and audit trails.');
  }
  if (dimensions.incidentResponse <= 5) {
    recs.push('Develop an AI-specific incident response playbook with detection, containment, and documentation protocols.');
  }
  
  if (recs.length === 0) {
    recs.push('Your foundations are in place. Focus on certification readiness — ensure documentation meets examiner-grade standards across all 6 frameworks.');
  }
  
  return recs.slice(0, 3);
}

// ═══════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function ScorecardFunnel() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Funnel state
  const [step, setStep] = useState<FunnelStep>(1);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionStep>(0);
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null, null, null]);
  const [q4Selections, setQ4Selections] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Lead capture state
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [skippedEmail, setSkippedEmail] = useState(false);
  const [bookedCall, setBookedCall] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [showPersonalEmailHint, setShowPersonalEmailHint] = useState(false);
  
  // Calculated values
  const score = (answers[0] ?? 0) + (answers[1] ?? 0) + (answers[2] ?? 0) + (answers[4] ?? 0);
  const dimensions = {
    policy: answers[0] ?? 0,
    oversight: answers[1] ?? 0,
    documentation: answers[2] ?? 0,
    incidentResponse: answers[4] ?? 0,
  };
  const verdict = getVerdict(score);
  const exposureFrameworks = q4Selections.includes('Unsure which apply')
    ? FRAMEWORKS.map(f => ({ ...f, status: 'potential' as const }))
    : FRAMEWORKS.map(f => ({
        ...f,
        status: q4Selections.some(s => s.includes(f.match.split(' ')[0])) ? 'active' as const : 'inactive' as const,
      }));
  
  // Progress (20% per question)
  const progressWidth = ((currentQuestion + 1) / 5) * 100;
  
  // Capture UTM params on mount
  useEffect(() => {
    captureUTMParams();
  }, []);
  
  // Scroll to top of container on step change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step, currentQuestion]);
  
  // Transition helper
  const transitionTo = useCallback((newStep: FunnelStep) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(newStep);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 200);
  }, []);
  
  // Email validation
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPersonalEmail = PERSONAL_EMAIL_DOMAINS.some(d => email.toLowerCase().endsWith(`@${d}`));
  
  // Handle email change
  const handleEmailChange = (value: string) => {
    setEmail(value);
    setShowPersonalEmailHint(PERSONAL_EMAIL_DOMAINS.some(d => value.toLowerCase().endsWith(`@${d}`)));
  };
  
  // Handle answer selection (single-select questions)
  const handleAnswer = (questionIndex: number, optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = QUESTIONS[questionIndex].options[optionIndex].score;
    setAnswers(newAnswers);
    
    // Auto-advance after 400ms for single-select (Q1, Q2, Q3, Q5)
    if (questionIndex !== 3) {
      setTimeout(() => {
        if (currentQuestion < 4) {
          setCurrentQuestion((currentQuestion + 1) as QuestionStep);
        } else {
          // Move to email gate after Q5
          transitionTo(2);
        }
      }, 400);
    }
  };
  
  // Handle Q4 multi-select toggle
  const handleQ4Toggle = (label: string) => {
    if (label === 'Unsure which apply') {
      // If selecting "Unsure", deselect all others
      setQ4Selections(q4Selections.includes(label) ? [] : [label]);
    } else {
      // Remove "Unsure" if selecting a specific framework
      const withoutUnsure = q4Selections.filter(s => s !== 'Unsure which apply');
      if (q4Selections.includes(label)) {
        setQ4Selections(withoutUnsure.filter(s => s !== label));
      } else {
        setQ4Selections([...withoutUnsure, label]);
      }
    }
  };
  
  // Handle Q4 continue
  const handleQ4Continue = () => {
    setCurrentQuestion(4);
  };
  
  // Handle back navigation
  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((currentQuestion - 1) as QuestionStep);
    }
  };
  
  // Handle email form submission
  const handleEmailSubmit = async () => {
    if (!isValidEmail || !firstName.trim()) return;
    
    setSubmitStatus('submitting');
    
    try {
      const utmParams = getUTMParams();
      
      const payload = {
        email,
        name: firstName,
        organization: company || 'Unknown',
        role: role || 'Unknown',
        primary_concern: 'AI governance assessment',
        source_page: 'scorecard-funnel',
        source_campaign: 'unified-funnel',
        scorecard: {
          q1_score: answers[0],
          q2_score: answers[1],
          q3_score: answers[2],
          q4_selections: q4Selections,
          q5_score: answers[4],
          final_score: score,
          score_verdict: verdict.label,
          source: 'scorecard-funnel',
          regulatory_flags: q4Selections,
        },
        ...utmParams,
      };
      
      console.log('SCORECARD_LEAD:', JSON.stringify(payload));
      
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) throw new Error('Submission failed');
      
      setSubmitStatus('success');
      transitionTo(3);
    } catch {
      setSubmitStatus('error');
    }
  };
  
  // Handle skip email (basic view)
  const handleSkipEmail = () => {
    setSkippedEmail(true);
    transitionTo(3);
  };
  
  // Handle book call click
  const handleBookCall = () => {
    transitionTo(4);
  };
  
  // Handle skip booking
  const handleSkipBooking = () => {
    setBookedCall(false);
    transitionTo(5);
  };
  
  // Handle booking complete (called when Calendly confirms)
  const handleBookingComplete = () => {
    setBookedCall(true);
    transitionTo(5);
  };
  
  // Build mailto link for fallback
  const mailtoLink = `mailto:info@consiliumai.co?subject=${encodeURIComponent(`RiskIQ Debrief Request — ${firstName} (${company})`)}&body=${encodeURIComponent(`I just completed the AI Governance Scorecard.\n\nScore: ${score}/100 (${verdict.label})\nFrameworks: ${q4Selections.join(', ') || 'None selected'}\n\nPreferred times:\n\nName: ${firstName}\nCompany: ${company}\nRole: ${role}`)}`;

  return (
    <div
      ref={containerRef}
      style={{
        background: 'var(--navy2)',
        border: '1px solid var(--border)',
        padding: '32px',
        minHeight: '480px',
        opacity: isTransitioning ? 0 : 1,
        transition: 'opacity 200ms ease',
      }}
    >
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* STEP 1: SCORECARD QUESTIONS                                     */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {step === 1 && (
        <>
          {/* Progress Bar */}
          <div style={{ height: '4px', background: 'var(--border)', marginBottom: '24px' }}>
            <div
              style={{
                height: '100%',
                width: `${progressWidth}%`,
                background: 'var(--gold)',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
          
          {/* Question Label */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '16px',
            }}
          >
            QUESTION {currentQuestion + 1} OF 5
          </p>
          
          {/* Question Text */}
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '24px',
              fontWeight: 400,
              color: 'var(--text)',
              marginBottom: currentQuestion === 3 ? '8px' : '24px',
              lineHeight: 1.4,
            }}
          >
            {QUESTIONS[currentQuestion].text}
          </h3>
          
          {/* Multi-select hint for Q4 */}
          {currentQuestion === 3 && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontStyle: 'italic',
                color: 'var(--muted)',
                marginBottom: '24px',
              }}
            >
              (Select all that apply)
            </p>
          )}
          
          {/* Answer Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            {QUESTIONS[currentQuestion].options.map((option, idx) => {
              const isSelected = currentQuestion === 3
                ? q4Selections.includes(option.label)
                : answers[currentQuestion] === option.score;
              
              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (currentQuestion === 3) {
                      handleQ4Toggle(option.label);
                    } else {
                      handleAnswer(currentQuestion, idx);
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    background: isSelected ? 'var(--gold-d)' : 'var(--navy)',
                    border: isSelected ? '1px solid var(--gold)' : '1px solid var(--border)',
                    color: 'var(--text)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s ease, background 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  {currentQuestion === 3 && (
                    <span
                      style={{
                        width: '18px',
                        height: '18px',
                        border: isSelected ? '2px solid var(--gold)' : '1px solid var(--border)',
                        background: isSelected ? 'var(--gold)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {isSelected && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="var(--navy)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                  )}
                  {option.label}
                </button>
              );
            })}
          </div>
          
          {/* Navigation */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {currentQuestion > 0 && (
              <button
                onClick={handleBack}
                style={{
                  padding: '12px 20px',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--muted)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                ← Back
              </button>
            )}
            
            {/* Q4 Continue button */}
            {currentQuestion === 3 && (
              <button
                onClick={handleQ4Continue}
                style={{
                  flex: 1,
                  padding: '16px 24px',
                  background: 'var(--gold)',
                  border: 'none',
                  color: 'var(--navy)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Continue →
              </button>
            )}
          </div>
        </>
      )}
      
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* STEP 2: EMAIL GATE                                              */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {step === 2 && (
        <>
          {/* Blurred Score Teaser */}
          <div
            style={{
              background: 'var(--navy)',
              border: '1px solid var(--border)',
              padding: '32px',
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '16px',
              }}
            >
              Your Governance Score
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '64px',
                fontWeight: 400,
                color: 'var(--text)',
                lineHeight: 1,
                marginBottom: '8px',
                filter: 'blur(8px)',
                userSelect: 'none',
              }}
            >
              {score}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                color: 'var(--muted)',
                marginBottom: '0',
              }}
            >
              / 100
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                color: 'var(--text)',
                marginTop: '16px',
              }}
            >
              Your governance score is ready.
            </p>
          </div>
          
          {/* Email Form */}
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '24px',
              fontWeight: 400,
              color: 'var(--text)',
              marginBottom: '8px',
            }}
          >
            Unlock your full RiskIQ report
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'var(--muted)',
              marginBottom: '24px',
            }}
          >
            See your 4-dimension breakdown, regulatory exposure map, and personalized next steps.
          </p>
          
          {/* Form Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="Work Email *"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  outline: 'none',
                }}
              />
              {showPersonalEmailHint && (
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    color: 'var(--gold)',
                    marginTop: '6px',
                  }}
                >
                  Please use your work email for the full report.
                </p>
              )}
            </div>
            
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name *"
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                outline: 'none',
              }}
            />
            
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company"
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                outline: 'none',
              }}
            />
            
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'var(--navy)',
                border: '1px solid var(--border)',
                color: role ? 'var(--text)' : 'var(--muted)',
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              {ROLE_OPTIONS.map((opt) => (
                <option key={opt} value={opt === 'Select your role...' ? '' : opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          
          {/* Submit Error */}
          {submitStatus === 'error' && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'var(--red)',
                marginBottom: '12px',
              }}
            >
              Submission failed. Please try again.
            </p>
          )}
          
          {/* Submit Button */}
          <button
            onClick={handleEmailSubmit}
            disabled={!isValidEmail || !firstName.trim() || submitStatus === 'submitting'}
            style={{
              width: '100%',
              padding: '16px 24px',
              background: isValidEmail && firstName.trim() ? 'var(--gold)' : 'var(--navy)',
              border: 'none',
              color: isValidEmail && firstName.trim() ? 'var(--navy)' : 'var(--muted)',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: isValidEmail && firstName.trim() ? 'pointer' : 'not-allowed',
              opacity: submitStatus === 'submitting' ? 0.7 : 1,
            }}
          >
            {submitStatus === 'submitting' ? 'SUBMITTING...' : 'UNLOCK MY RESULTS →'}
          </button>
          
          {/* Skip Option */}
          <p
            onClick={handleSkipEmail}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--muted)',
              textAlign: 'center',
              marginTop: '16px',
              cursor: 'pointer',
            }}
          >
            Skip — view basic score only
          </p>
        </>
      )}
      
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* STEP 3: RESULTS                                                 */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {step === 3 && (
        <>
          {/* Unlock Banner (if skipped email) */}
          {skippedEmail && (
            <div
              style={{
                background: 'var(--gold-d)',
                border: '1px solid var(--gold)',
                padding: '12px 16px',
                marginBottom: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--text)',
                  margin: 0,
                }}
              >
                Enter your email to unlock your full report
              </p>
              <button
                onClick={() => { setSkippedEmail(false); transitionTo(2); }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--gold)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Unlock →
              </button>
            </div>
          )}
          
          {/* Score Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '64px',
                fontWeight: 400,
                color: verdict.color,
                lineHeight: 1,
                marginBottom: '4px',
              }}
            >
              {score}
              <span style={{ fontSize: '24px', color: 'var(--muted)' }}>/100</span>
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: verdict.color,
                marginBottom: '12px',
              }}
            >
              {verdict.label}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                color: 'var(--muted)',
                maxWidth: '520px',
                margin: '0 auto',
              }}
            >
              {verdict.description}
            </p>
          </div>
          
          {/* 4-Dimension Breakdown (hidden if skipped email) */}
          {!skippedEmail && (
            <div style={{ marginBottom: '32px' }}>
              {[
                { label: 'AI Policy Framework', value: dimensions.policy },
                { label: 'Board & Executive Oversight', value: dimensions.oversight },
                { label: 'Documentation & Audit Trail', value: dimensions.documentation },
                { label: 'Incident Response', value: dimensions.incidentResponse },
              ].map((dim, idx) => (
                <div key={idx} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--text)',
                        margin: 0,
                      }}
                    >
                      {dim.label}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        color: 'var(--muted)',
                        margin: 0,
                      }}
                    >
                      {dim.value}/25
                    </p>
                  </div>
                  <div style={{ height: '8px', background: 'var(--navy)', width: '100%' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${(dim.value / 25) * 100}%`,
                        background: getDimensionColor(dim.value),
                        transition: 'width 0.6s ease',
                        transitionDelay: `${idx * 100}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Regulatory Exposure Map (hidden if skipped email) */}
          {!skippedEmail && (
            <div style={{ marginBottom: '32px' }}>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: 400,
                  color: 'var(--text)',
                  marginBottom: '16px',
                }}
              >
                Your Regulatory Exposure
              </h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: '12px',
                }}
              >
                {exposureFrameworks.map((fw) => (
                  <div
                    key={fw.key}
                    style={{
                      background: 'var(--navy)',
                      border: `1px solid ${fw.status === 'active' ? 'var(--gold)' : fw.status === 'potential' ? 'var(--amber)' : 'var(--border)'}`,
                      borderTop: fw.status === 'active' ? '3px solid var(--gold)' : fw.status === 'potential' ? '3px solid var(--amber)' : '1px solid var(--border)',
                      padding: '16px',
                      opacity: fw.status === 'inactive' ? 0.4 : 1,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: fw.status === 'active' ? 'var(--gold)' : fw.status === 'potential' ? 'var(--amber)' : 'var(--muted)',
                        marginBottom: '4px',
                      }}
                    >
                      {fw.abbr}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '12px',
                        color: 'var(--muted)',
                        marginBottom: fw.status !== 'inactive' ? '8px' : '0',
                      }}
                    >
                      {fw.label}
                    </p>
                    {fw.status !== 'inactive' && (
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          color: 'var(--text)',
                          margin: 0,
                        }}
                      >
                        {fw.status === 'potential' ? 'POTENTIAL EXPOSURE' : fw.risk}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Recommended Next Steps (hidden if skipped email) */}
          {!skippedEmail && (
            <div style={{ marginBottom: '32px' }}>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: 400,
                  color: 'var(--text)',
                  marginBottom: '16px',
                }}
              >
                Your Priority Actions
              </h4>
              {getRecommendations(dimensions).map((rec, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '12px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      fontWeight: 700,
                      color: 'var(--gold)',
                      flexShrink: 0,
                    }}
                  >
                    {idx + 1}.
                  </span>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      color: 'var(--text)',
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {rec}
                  </p>
                </div>
              ))}
            </div>
          )}
          
          {/* Transition CTA (hidden if skipped email) */}
          {!skippedEmail && (
            <div
              style={{
                borderTop: '3px solid var(--gold)',
                paddingTop: '32px',
              }}
            >
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  fontWeight: 400,
                  color: 'var(--text)',
                  marginBottom: '16px',
                }}
              >
                Your score is {score}/100. Let&apos;s close the gaps.
              </h4>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  color: 'var(--muted)',
                  maxWidth: '540px',
                  marginBottom: '24px',
                  lineHeight: 1.6,
                }}
              >
                Book a free 15-minute RiskIQ debrief with our governance team. We&apos;ll walk through your exposure map, prioritize your gaps, and outline what audit-ready looks like for your organization. No pitch — just a roadmap.
              </p>
              <button
                onClick={handleBookCall}
                style={{
                  width: '100%',
                  maxWidth: '480px',
                  padding: '18px 32px',
                  background: 'var(--gold)',
                  border: 'none',
                  color: 'var(--navy)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                BOOK YOUR FREE 15-MINUTE DEBRIEF →
              </button>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontStyle: 'italic',
                  color: 'var(--muted)',
                  marginTop: '16px',
                }}
              >
                Most clients go from assessment to audit-ready in 30 days.
              </p>
              <p
                onClick={() => transitionTo(5)}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--muted)',
                  marginTop: '16px',
                  cursor: 'pointer',
                }}
              >
                Not ready for a call? We&apos;ll send your full report to {email}.
              </p>
            </div>
          )}
        </>
      )}
      
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* STEP 4: CALL BOOKING                                            */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {step === 4 && (
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
            Pick a time for your RiskIQ debrief
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'var(--muted)',
              marginBottom: '32px',
            }}
          >
            15 minutes with our governance team. We&apos;ll review your score ({score}/100) and exposure map live.
          </p>
          
          {/* Calendly Embed or Mailto Fallback */}
          {process.env.NEXT_PUBLIC_CALENDLY_URL ? (
            <iframe
              src={process.env.NEXT_PUBLIC_CALENDLY_URL}
              width="100%"
              height="650"
              frameBorder="0"
              style={{
                border: 'none',
                minHeight: '650px',
              }}
              title="Book your RiskIQ Assessment debrief"
              onLoad={() => {
                // Listen for Calendly events
                window.addEventListener('message', (e) => {
                  if (e.data.event === 'calendly.event_scheduled') {
                    handleBookingComplete();
                  }
                });
              }}
            />
          ) : (
            <div
              style={{
                background: 'var(--navy)',
                border: '1px solid var(--border)',
                padding: '48px 32px',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  color: 'var(--text)',
                  marginBottom: '16px',
                }}
              >
                Schedule Your RiskIQ Debrief
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  color: 'var(--muted)',
                  marginBottom: '32px',
                }}
              >
                We&apos;ll confirm your time within 2 hours.
              </p>
              <a
                href={mailtoLink}
                onClick={() => setTimeout(handleBookingComplete, 1000)}
                style={{
                  display: 'inline-block',
                  padding: '16px 36px',
                  background: 'var(--gold)',
                  color: 'var(--navy)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                REQUEST A TIME →
              </a>
            </div>
          )}
          
          {/* Skip Option */}
          <p
            onClick={handleSkipBooking}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--muted)',
              textAlign: 'center',
              marginTop: '24px',
              cursor: 'pointer',
            }}
          >
            I&apos;ll book later — send my report to {email}
          </p>
        </>
      )}
      
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* STEP 5: CONFIRMATION                                            */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      {step === 5 && (
        <>
          {bookedCall ? (
            <>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  fontWeight: 400,
                  color: 'var(--text)',
                  marginBottom: '24px',
                }}
              >
                You&apos;re booked.
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  color: 'var(--text)',
                  marginBottom: '24px',
                }}
              >
                Your RiskIQ debrief is confirmed. Here&apos;s what to expect:
              </p>
              <div style={{ marginBottom: '24px' }}>
                {[
                  `We'll review your governance score (${score}/100) and what it means for your organization`,
                  `We'll walk through your regulatory exposure map — which frameworks apply and where gaps create risk`,
                  `We'll outline the fastest path to audit-ready governance`,
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      marginBottom: '12px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '15px',
                        fontWeight: 700,
                        color: 'var(--gold)',
                        flexShrink: 0,
                      }}
                    >
                      {idx + 1}.
                    </span>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '15px',
                        color: 'var(--text)',
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  color: 'var(--muted)',
                  marginBottom: '8px',
                }}
              >
                A detailed scorecard report has been sent to {email}.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  color: 'var(--muted)',
                  marginBottom: '32px',
                }}
              >
                Questions before the call? Reach us at info@consiliumai.co
              </p>
            </>
          ) : (
            <>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  fontWeight: 400,
                  color: 'var(--text)',
                  marginBottom: '24px',
                }}
              >
                Your report is on its way.
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  color: 'var(--muted)',
                  marginBottom: '16px',
                }}
              >
                We&apos;ve sent your full RiskIQ Scorecard report to {email}.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  color: 'var(--muted)',
                  marginBottom: '24px',
                }}
              >
                When you&apos;re ready, book a free 15-minute debrief to walk through your results live:
              </p>
              <a
                href="/book"
                style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  background: 'var(--gold)',
                  color: 'var(--navy)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                BOOK YOUR FREE DEBRIEF →
              </a>
            </>
          )}
          
          {/* Explore Links */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              marginTop: '48px',
            }}
          >
            <a
              href="/payer-cco"
              style={{
                display: 'block',
                padding: '20px',
                background: 'var(--navy)',
                border: '1px solid var(--border)',
                textDecoration: 'none',
                color: 'var(--text)',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              Payer CCO Solutions →
            </a>
            <a
              href="/eu-ai-act"
              style={{
                display: 'block',
                padding: '20px',
                background: 'var(--navy)',
                border: '1px solid var(--border)',
                textDecoration: 'none',
                color: 'var(--text)',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              EU AI Act Compliance →
            </a>
            <a
              href="/blog"
              style={{
                display: 'block',
                padding: '20px',
                background: 'var(--navy)',
                border: '1px solid var(--border)',
                textDecoration: 'none',
                color: 'var(--text)',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              Read Our Insights →
            </a>
          </div>
        </>
      )}
    </div>
  );
}

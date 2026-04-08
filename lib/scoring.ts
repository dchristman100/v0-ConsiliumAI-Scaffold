// Scorecard scoring algorithm
// Shared between inline widget and full page

import { SCORE_VERDICTS } from './constants';
import type { ScoreResult, GapDimension } from '@/types/scorecard';

interface ScorecardAnswers {
  q1: { value: number; penalty: number };
  q2: { value: number; penalty: number };
  q3: { value: number; penalty: number };
  q4: { selections: string[]; penalty: number };
  q5: { value: number; penalty: number };
}

/**
 * Calculate final score from answers
 * Base score of 100, minus cumulative penalties
 */
export function calculateScore(answers: ScorecardAnswers): number {
  const totalPenalty = 
    answers.q1.penalty +
    answers.q2.penalty +
    answers.q3.penalty +
    answers.q4.penalty +
    answers.q5.penalty;
  
  return Math.max(0, Math.min(100, 100 - totalPenalty));
}

/**
 * Get verdict based on score
 */
export function getVerdict(score: number): { label: string; tier: string } {
  if (score >= SCORE_VERDICTS.STRONG.min) {
    return { label: SCORE_VERDICTS.STRONG.label, tier: 'STRONG' };
  }
  if (score >= SCORE_VERDICTS.MODERATE.min) {
    return { label: SCORE_VERDICTS.MODERATE.label, tier: 'MODERATE' };
  }
  if (score >= SCORE_VERDICTS.SIGNIFICANT.min) {
    return { label: SCORE_VERDICTS.SIGNIFICANT.label, tier: 'SIGNIFICANT' };
  }
  return { label: SCORE_VERDICTS.CRITICAL.label, tier: 'CRITICAL' };
}

/**
 * Analyze gaps by dimension
 */
export function analyzeGaps(answers: ScorecardAnswers): GapDimension[] {
  const gaps: GapDimension[] = [];

  // Q1: Policy dimension
  gaps.push({
    label: 'AI Policy Framework',
    status: answers.q1.penalty === 0 ? 'good' : answers.q1.penalty <= 10 ? 'warn' : 'bad',
    detail: answers.q1.penalty === 0 
      ? 'Policy framework in place'
      : answers.q1.penalty <= 10 
        ? 'Policy gaps identified'
        : 'Critical policy gaps',
  });

  // Q2: Oversight dimension
  gaps.push({
    label: 'Board Oversight',
    status: answers.q2.penalty === 0 ? 'good' : answers.q2.penalty <= 10 ? 'warn' : 'bad',
    detail: answers.q2.penalty === 0 
      ? 'Oversight structure established'
      : answers.q2.penalty <= 10 
        ? 'Oversight improvements needed'
        : 'No formal oversight',
  });

  // Q3: Documentation dimension
  gaps.push({
    label: 'Documentation & Audit Trail',
    status: answers.q3.penalty === 0 ? 'good' : answers.q3.penalty <= 10 ? 'warn' : 'bad',
    detail: answers.q3.penalty === 0 
      ? 'Documentation complete'
      : answers.q3.penalty <= 10 
        ? 'Documentation gaps'
        : 'Insufficient documentation',
  });

  // Q4: Vendor dimension
  gaps.push({
    label: 'Vendor Governance',
    status: answers.q4.penalty === 0 ? 'good' : answers.q4.penalty <= 10 ? 'warn' : 'bad',
    detail: answers.q4.penalty === 0 
      ? 'Vendor controls adequate'
      : answers.q4.penalty <= 10 
        ? 'Vendor oversight gaps'
        : 'Vendor governance lacking',
  });

  // Q5: Incident dimension
  gaps.push({
    label: 'Incident Response',
    status: answers.q5.penalty === 0 ? 'good' : answers.q5.penalty <= 10 ? 'warn' : 'bad',
    detail: answers.q5.penalty === 0 
      ? 'Incident response ready'
      : answers.q5.penalty <= 10 
        ? 'Response plan incomplete'
        : 'No incident response plan',
  });

  return gaps;
}

/**
 * Generate full score result
 */
export function generateScoreResult(answers: ScorecardAnswers): ScoreResult {
  const score = calculateScore(answers);
  const verdict = getVerdict(score);
  const gaps = analyzeGaps(answers);

  return {
    score,
    verdict: verdict.tier,
    verdictDetail: verdict.label,
    gaps,
  };
}

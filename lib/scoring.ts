// Scorecard scoring algorithm
// Shared between inline widget and full page
// SC-01, SC-02: Exact algorithm per spec

import { SCORE_VERDICTS } from './constants';
import type { GapDimension } from '@/types/scorecard';

// Q1 penalties: 0, 8, 17, 20 (by answer index 0–3)
export const Q1_PENALTIES = [0, 8, 17, 20] as const;

// Q2 penalties: 0, 7, 15, 20
export const Q2_PENALTIES = [0, 7, 15, 20] as const;

// Q3 penalties: 0, 8, 16, 20
export const Q3_PENALTIES = [0, 8, 16, 20] as const;

// Q4: Multi-select — no penalty, captures regulatory flags only (SC-03)
// No penalty array — Q4 selections are for regulatory mapping only

// Q5 penalties: 0, 6, 14, 20
export const Q5_PENALTIES = [0, 6, 14, 20] as const;

/**
 * Calculate final score from individual question penalties
 * SC-01: Base score of 100, minus cumulative penalties
 */
export function calculateScore(
  q1Penalty: number,
  q2Penalty: number,
  q3Penalty: number,
  q5Penalty: number
): number {
  return Math.max(0, 100 - (q1Penalty + q2Penalty + q3Penalty + q5Penalty));
}

/**
 * Get verdict based on score
 * SC-02: Exact thresholds per spec
 */
export function getVerdict(score: number): { label: string; detail: string } {
  if (score >= 80) return { label: 'Strong', detail: 'Strong posture. Minor gaps to close.' };
  if (score >= 60) return { label: 'Moderate', detail: 'Moderate exposure. Action required.' };
  if (score >= 35) return { label: 'Significant', detail: 'Significant exposure. Board attention needed.' };
  return { label: 'Critical', detail: 'Critical exposure. Immediate action required.' };
}

/**
 * Get penalty for Q1 answer (0-indexed)
 */
export function getQ1Penalty(answerIndex: number): number {
  return Q1_PENALTIES[answerIndex] ?? 20;
}

/**
 * Get penalty for Q2 answer (0-indexed)
 */
export function getQ2Penalty(answerIndex: number): number {
  return Q2_PENALTIES[answerIndex] ?? 20;
}

/**
 * Get penalty for Q3 answer (0-indexed)
 */
export function getQ3Penalty(answerIndex: number): number {
  return Q3_PENALTIES[answerIndex] ?? 20;
}

/**
 * Get penalty for Q5 answer (0-indexed)
 */
export function getQ5Penalty(answerIndex: number): number {
  return Q5_PENALTIES[answerIndex] ?? 20;
}

/**
 * Analyze gaps by dimension for results display
 * SC-07: Gap analysis with good/warn/bad color coding
 */
export function analyzeGaps(
  q1Penalty: number,
  q2Penalty: number,
  q3Penalty: number,
  q5Penalty: number
): GapDimension[] {
  return [
    {
      label: 'AI Policy Framework',
      status: q1Penalty === 0 ? 'good' : q1Penalty <= 8 ? 'warn' : 'bad',
      detail: q1Penalty === 0 
        ? 'Policy framework in place'
        : q1Penalty <= 8 
          ? 'Policy gaps identified'
          : 'Critical policy gaps',
    },
    {
      label: 'Board Oversight',
      status: q2Penalty === 0 ? 'good' : q2Penalty <= 7 ? 'warn' : 'bad',
      detail: q2Penalty === 0 
        ? 'Oversight structure established'
        : q2Penalty <= 7 
          ? 'Oversight improvements needed'
          : 'No formal oversight',
    },
    {
      label: 'Documentation & Audit Trail',
      status: q3Penalty === 0 ? 'good' : q3Penalty <= 8 ? 'warn' : 'bad',
      detail: q3Penalty === 0 
        ? 'Documentation complete'
        : q3Penalty <= 8 
          ? 'Documentation gaps'
          : 'Insufficient documentation',
    },
    {
      label: 'Incident Response',
      status: q5Penalty === 0 ? 'good' : q5Penalty <= 6 ? 'warn' : 'bad',
      detail: q5Penalty === 0 
        ? 'Incident response ready'
        : q5Penalty <= 6 
          ? 'Response plan incomplete'
          : 'No incident response plan',
    },
  ];
}

/**
 * Regulatory exposure map based on Q4 selections
 * SC-04, SC-07: Red indicators for each Q4 selection
 */
export const REGULATORY_EXPOSURES = [
  { id: 'ocr', label: 'OCR', description: 'Office for Civil Rights' },
  { id: 'traiga', label: 'TRAIGA', description: 'Tennessee Responsible AI in Government Act' },
  { id: 'eu-ai-act', label: 'EU AI Act', description: 'European Union AI Regulation' },
  { id: 'nydfs', label: 'NYDFS', description: 'NY Department of Financial Services' },
  { id: 'cms-ma', label: 'CMS MA', description: 'CMS Medicare Advantage' },
  { id: 'colorado-ai', label: 'Colorado AI Act', description: 'Colorado AI Consumer Protection' },
] as const;

export function mapQ4SelectionsToExposures(selections: number[]): string[] {
  // Map Q4 answer indices to regulatory exposure IDs
  const exposureMap: Record<number, string[]> = {
    0: ['ocr', 'cms-ma'], // No AI-specific vendor assessment
    1: ['ocr', 'traiga', 'colorado-ai'], // Missing bias testing
    2: ['eu-ai-act', 'nydfs'], // No model explainability
    3: ['nydfs', 'cms-ma'], // Unclear liability
    4: ['eu-ai-act', 'traiga'], // No audit rights
  };

  const exposedIds = new Set<string>();
  selections.forEach(sel => {
    const exposures = exposureMap[sel];
    if (exposures) {
      exposures.forEach(e => exposedIds.add(e));
    }
  });

  return Array.from(exposedIds);
}

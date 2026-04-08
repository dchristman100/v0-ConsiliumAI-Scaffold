// lib/scoring.ts
// Scorecard scoring algorithm - Phase 7
// Shared between inline widget and full page
// SC-01, SC-02: Exact algorithm per spec

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
 * SC-02: Exact thresholds per spec - FW-07 verdicts
 */
export function getVerdict(score: number): { label: string; detail: string } {
  if (score >= 85) return { label: 'Strong posture', detail: 'Minor gaps to address. Well-positioned for compliance.' };
  if (score >= 65) return { label: 'Moderate exposure', detail: 'Action recommended. Several gaps need attention.' };
  if (score >= 40) return { label: 'Significant exposure', detail: 'Board attention needed. Material compliance gaps exist.' };
  return { label: 'Critical exposure', detail: 'Immediate action required. Significant regulatory risk.' };
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
      label: 'AI Inventory',
      status: q1Penalty === 0 ? 'good' : q1Penalty <= 8 ? 'warn' : 'bad',
      detail: q1Penalty === 0 
        ? 'AI governance framework in place with board oversight'
        : q1Penalty <= 8 
          ? 'Governance structure needs formalization'
          : 'No AI governance framework exists',
    },
    {
      label: 'Documentation',
      status: q2Penalty === 0 ? 'good' : q2Penalty <= 7 ? 'warn' : 'bad',
      detail: q2Penalty === 0 
        ? 'Comprehensive documentation maintained'
        : q2Penalty <= 7 
          ? 'Documentation gaps exist'
          : 'Insufficient documentation creates risk',
    },
    {
      label: 'Human Oversight',
      status: q3Penalty === 0 ? 'good' : q3Penalty <= 8 ? 'warn' : 'bad',
      detail: q3Penalty === 0 
        ? 'Proactive regulatory mapping in place'
        : q3Penalty <= 8 
          ? 'Compliance gaps identified'
          : 'Reactive posture creates exposure',
    },
    {
      label: 'Incident Response',
      status: q5Penalty === 0 ? 'good' : q5Penalty <= 6 ? 'warn' : 'bad',
      detail: q5Penalty === 0 
        ? 'Board oversight with regular reporting'
        : q5Penalty <= 6 
          ? 'Oversight improvements needed'
          : 'No board oversight of AI risk',
    },
  ];
}

/**
 * Regulatory exposure map based on Q4 selections
 * SC-04, SC-07: Maps Q4 labels to regulatory exposure IDs
 */
export const REGULATORY_EXPOSURES = [
  { id: 'ocr', label: 'OCR Phase 3', description: 'Office for Civil Rights — HIPAA AI Guidance' },
  { id: 'traiga', label: 'TRAIGA', description: 'Tennessee Responsible AI in Government Act' },
  { id: 'eu-ai-act', label: 'EU AI Act', description: 'European Union AI Regulation' },
  { id: 'nydfs', label: 'NYDFS 500.17', description: 'NY Department of Financial Services' },
  { id: 'cms-ma', label: 'CMS MA', description: 'CMS Medicare Advantage Star Ratings' },
  { id: 'colorado-ai', label: 'Colorado AI Act', description: 'Colorado AI Consumer Protection Act' },
] as const;

/**
 * Map Q4 selection labels to regulatory exposure IDs
 * SC-04: Direct mapping from Q4 selections to regulatory flags
 */
export function mapQ4SelectionsToExposures(selections: number[]): string[] {
  // Map Q4 answer indices to regulatory exposure IDs
  // Q4 options: OCR Phase 3 (0), TRAIGA (1), EU AI Act (2), NYDFS 500.17 (3), CMS MA Star Ratings (4), Colorado AI Act (5)
  const exposureMap: Record<number, string> = {
    0: 'ocr',
    1: 'traiga',
    2: 'eu-ai-act',
    3: 'nydfs',
    4: 'cms-ma',
    5: 'colorado-ai',
  };

  return selections.map(sel => exposureMap[sel]).filter(Boolean);
}

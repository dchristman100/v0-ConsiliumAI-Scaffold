// components/scorecard/ScorecardShared.tsx
// Shared question data for both InlineScorecardWidget and ScorecardFull
// SSR-safe: All text content is static and indexable
// Phase 7: Exact questions and penalty values per spec

import type { ScorecardQuestion } from '@/types/scorecard';

export const SCORECARD_QUESTIONS: ScorecardQuestion[] = [
  {
    id: 1,
    text: "How mature is your organization's AI governance framework?",
    options: [
      { label: 'Board-approved policy with dedicated AI governance committee', value: 0, penalty: 0 },
      { label: 'Written policies exist but no formal governance structure', value: 1, penalty: 8 },
      { label: 'Informal guidelines only — no documented policies', value: 2, penalty: 17 },
      { label: 'No AI governance framework in place', value: 3, penalty: 20 },
    ],
  },
  {
    id: 2,
    text: 'How is AI risk currently documented in your organization?',
    options: [
      { label: 'Comprehensive model cards, data lineage, and risk assessments for all AI systems', value: 0, penalty: 0 },
      { label: 'Partial documentation — some systems documented, others not', value: 1, penalty: 7 },
      { label: 'Ad hoc documentation — no consistent standard', value: 2, penalty: 15 },
      { label: 'No AI risk documentation exists', value: 3, penalty: 20 },
    ],
  },
  {
    id: 3,
    text: 'Which best describes your regulatory readiness?',
    options: [
      { label: 'Proactive — mapped to all applicable frameworks with compliance roadmap', value: 0, penalty: 0 },
      { label: "Aware — know which regulations apply but haven't fully mapped compliance", value: 1, penalty: 8 },
      { label: 'Reactive — respond to regulatory inquiries as they arise', value: 2, penalty: 16 },
      { label: "Unaware — haven't assessed which AI regulations apply", value: 3, penalty: 20 },
    ],
  },
  {
    id: 4,
    text: 'Which regulations apply to your organization?',
    subtext: 'Select all that apply',
    multiSelect: true,
    options: [
      { label: 'OCR Phase 3', value: 0, penalty: 0 },
      { label: 'TRAIGA', value: 1, penalty: 0 },
      { label: 'EU AI Act', value: 2, penalty: 0 },
      { label: 'NYDFS 500.17', value: 3, penalty: 0 },
      { label: 'CMS MA Star Ratings', value: 4, penalty: 0 },
      { label: 'Colorado AI Act', value: 5, penalty: 0 },
    ],
  },
  {
    id: 5,
    text: 'How does your board currently oversee AI risk?',
    options: [
      { label: 'Regular board reporting with AI governance metrics and KPIs', value: 0, penalty: 0 },
      { label: 'Annual review — AI mentioned in broader technology updates', value: 1, penalty: 6 },
      { label: 'Ad hoc — AI discussed only when incidents arise', value: 2, penalty: 14 },
      { label: 'No board oversight of AI risk', value: 3, penalty: 20 },
    ],
  },
];

export const REGULATORY_EXPOSURE_MAP = [
  { id: 'ocr', label: 'OCR Phase 3', fullName: 'Office for Civil Rights — HIPAA AI Guidance', matchKey: 'OCR Phase 3' },
  { id: 'traiga', label: 'TRAIGA', fullName: 'Tennessee Responsible AI in Government Act', matchKey: 'TRAIGA' },
  { id: 'eu-ai-act', label: 'EU AI Act', fullName: 'European Union AI Regulation — August 2, 2026', matchKey: 'EU AI Act' },
  { id: 'nydfs', label: 'NYDFS', fullName: 'NY Department of Financial Services 500.17', matchKey: 'NYDFS 500.17' },
  { id: 'cms-ma', label: 'CMS MA', fullName: 'CMS Medicare Advantage Star Ratings', matchKey: 'CMS MA Star Ratings' },
  { id: 'colorado', label: 'Colorado AI Act', fullName: 'Colorado AI Consumer Protection Act', matchKey: 'Colorado AI Act' },
] as const;

export const DIMENSION_LABELS = {
  1: 'AI Governance Framework',
  2: 'AI Risk Documentation',
  3: 'Regulatory Readiness',
  4: 'Regulatory Exposure',
  5: 'Board Oversight',
} as const;

// Progress percentages per step (FW-03)
export const PROGRESS_MAP: Record<string, number> = {
  cover: 0,
  q1: 20,
  q2: 40,
  q3: 60,
  q4: 80,
  q5: 95,
  results: 100,
  submitted: 100,
};

// Gap status colors (using CSS vars preferred)
export const GAP_COLORS = {
  good: 'var(--green)',
  warn: 'var(--amber)',
  bad: 'var(--red)',
} as const;

// components/scorecard/ScorecardShared.tsx
// Shared question data for both InlineScorecardWidget and ScorecardFull
// SSR-safe: All text content is static and indexable

export interface ScorecardQuestionData {
  id: 'q1' | 'q2' | 'q3' | 'q4' | 'q5';
  text: string;
  subtext: string;
  options: string[];
  multiSelect?: boolean;
}

// Questions with exact text per spec
export const SCORECARD_QUESTIONS: ScorecardQuestionData[] = [
  {
    id: 'q1',
    text: 'Does your organization have a formal AI governance policy?',
    subtext: 'Including board-approved guidelines for AI development and deployment',
    options: [
      'Yes, comprehensive and board-approved',
      'Yes, but informal or incomplete',
      'In development',
      'No formal policy',
    ],
  },
  {
    id: 'q2',
    text: 'What level of board oversight exists for AI initiatives?',
    subtext: 'Regular reporting and accountability structures',
    options: [
      'Dedicated AI committee with regular reporting',
      'Periodic board updates on AI matters',
      'Ad-hoc reporting only',
      'No board-level oversight',
    ],
  },
  {
    id: 'q3',
    text: 'How comprehensive is your AI documentation and audit trail?',
    subtext: 'Model cards, decision logs, testing records',
    options: [
      'Complete documentation with audit trail',
      'Partial documentation exists',
      'Minimal documentation',
      'No systematic documentation',
    ],
  },
  {
    id: 'q4',
    text: 'Which regulatory frameworks apply to your AI use cases?',
    subtext: 'Select all that apply — this informs your exposure map',
    multiSelect: true,
    options: [
      'Healthcare / HIPAA covered',
      'Insurance / state-regulated',
      'EU operations / EU AI Act',
      'Financial services / NYDFS',
      'Medicare Advantage',
      'None of the above',
    ],
  },
  {
    id: 'q5',
    text: 'Do you have an AI-specific incident response plan?',
    subtext: 'Procedures for model failures, bias detection, regulatory inquiries',
    options: [
      'Yes, tested and documented',
      'Yes, but untested',
      'General IR plan only (not AI-specific)',
      'No incident response plan',
    ],
  },
];

export const DIMENSION_LABELS = {
  q1: 'AI Policy Framework',
  q2: 'Board Oversight',
  q3: 'Documentation & Audit Trail',
  q4: 'Regulatory Exposure',
  q5: 'Incident Response',
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

// Gap status colors
export const GAP_COLORS = {
  good: '#22c55e', // green-500
  warn: '#eab308', // yellow-500 / gold
  bad: '#ef4444', // red-500
} as const;

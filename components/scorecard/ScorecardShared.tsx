// components/scorecard/ScorecardShared.tsx
// Shared types, scoring logic, and question data
// Used by both InlineScorecardWidget and ScorecardFull

import type { ScorecardQuestion } from '@/types/scorecard';

export const SCORECARD_QUESTIONS: ScorecardQuestion[] = [
  {
    id: 1,
    text: 'Does your organization have a formal AI governance policy?',
    subtext: 'Including board-approved guidelines for AI development and deployment',
    options: [
      { label: 'Yes, comprehensive and board-approved', value: 1, penalty: 0 },
      { label: 'Yes, but informal or incomplete', value: 2, penalty: 10 },
      { label: 'In development', value: 3, penalty: 20 },
      { label: 'No formal policy', value: 4, penalty: 30 },
    ],
  },
  {
    id: 2,
    text: 'What level of board oversight exists for AI initiatives?',
    subtext: 'Regular reporting and accountability structures',
    options: [
      { label: 'Dedicated AI committee with regular reporting', value: 1, penalty: 0 },
      { label: 'Periodic board updates on AI matters', value: 2, penalty: 10 },
      { label: 'Ad-hoc reporting only', value: 3, penalty: 20 },
      { label: 'No board-level oversight', value: 4, penalty: 30 },
    ],
  },
  {
    id: 3,
    text: 'How comprehensive is your AI documentation and audit trail?',
    subtext: 'Model cards, decision logs, testing records',
    options: [
      { label: 'Complete documentation with audit trail', value: 1, penalty: 0 },
      { label: 'Partial documentation exists', value: 2, penalty: 10 },
      { label: 'Minimal documentation', value: 3, penalty: 20 },
      { label: 'No systematic documentation', value: 4, penalty: 25 },
    ],
  },
  {
    id: 4,
    text: 'Which vendor governance gaps exist in your organization?',
    subtext: 'Select all that apply',
    multiSelect: true,
    options: [
      { label: 'No AI-specific vendor assessment', value: 1, penalty: 5 },
      { label: 'Missing bias testing requirements', value: 2, penalty: 5 },
      { label: 'No model explainability clauses', value: 3, penalty: 5 },
      { label: 'Unclear liability provisions', value: 4, penalty: 5 },
      { label: 'No audit rights for AI systems', value: 5, penalty: 5 },
      { label: 'None of the above', value: 0, penalty: 0 },
    ],
  },
  {
    id: 5,
    text: 'Do you have an AI-specific incident response plan?',
    subtext: 'Procedures for model failures, bias detection, regulatory inquiries',
    options: [
      { label: 'Yes, tested and documented', value: 1, penalty: 0 },
      { label: 'Yes, but untested', value: 2, penalty: 10 },
      { label: 'General IR plan only (not AI-specific)', value: 3, penalty: 15 },
      { label: 'No incident response plan', value: 4, penalty: 20 },
    ],
  },
];

export const DIMENSION_LABELS = {
  q1: 'AI Policy Framework',
  q2: 'Board Oversight',
  q3: 'Documentation & Audit Trail',
  q4: 'Vendor Governance',
  q5: 'Incident Response',
} as const;

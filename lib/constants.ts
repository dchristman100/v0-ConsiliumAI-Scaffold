export const TAGLINE = 'Certifiable · Insurable · Defendable · By Design.' as const;

export const MASTER_THESIS = 'When AI is Governed, the desired outcome is magnified.' as const;

export const BRAND_POSITION = 'Architects of the AI Governance Layer' as const;

export const SCORE_VERDICTS = {
  STRONG: { min: 80, max: 100, label: 'Strong posture. Minor gaps to close.' },
  MODERATE: { min: 60, max: 79, label: 'Moderate exposure. Action required.' },
  SIGNIFICANT: { min: 35, max: 59, label: 'Significant exposure. Board attention needed.' },
  CRITICAL: { min: 0, max: 34, label: 'Critical exposure. Immediate action required.' },
} as const;

export const EU_DEADLINE = new Date('2026-08-02T00:00:00Z');

export const PAYER_CHECKLIST_COUNT = 34;
export const EU_CHECKLIST_COUNT = 38;

export const PAYER_ROLES = [
  'CCO', 'CMO', 'CRO', 'CFO', 'General Counsel', 'CIO', 'VP Compliance', 'Other',
] as const;

export const PAYER_CONCERNS = [
  'UHC lawsuit', 'CMS MA', 'FCA', 'TRAIGA', 'Board reporting', 'D&O', 'PA audit trail', 'Bias testing',
] as const;

export const EU_JURISDICTIONS = [
  'EU member state',
  'US with EU operations',
  'United Kingdom',
  'US no EU operations',
  'Asia-Pacific with EU ops',
  'Other',
] as const;

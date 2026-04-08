export interface ScorecardQuestion {
  id: number;
  text: string;
  subtext?: string;
  options: ScorecardOption[];
  multiSelect?: boolean;
}

export interface ScorecardOption {
  label: string;
  value: number;
  penalty: number;
}

export interface ScoreResult {
  score: number;
  verdict: string;
  verdictDetail: string;
  gaps: GapDimension[];
}

export interface GapDimension {
  label: string;
  status: 'good' | 'warn' | 'bad';
  detail: string;
}

export type ScorecardStep = 'cover' | 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'results' | 'submitted';

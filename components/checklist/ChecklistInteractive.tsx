'use client';

// components/checklist/ChecklistInteractive.tsx
// Interactive checklist toggle + progress tracking
// FC-01 through FC-06: Full implementation per spec

import { useState, useEffect, useCallback, useRef } from 'react';

// Analytics helper
function trackEvent(name: string) {
  if (typeof window !== 'undefined' && 'va' in window) {
    (window as { va: (action: string, payload: { name: string }) => void }).va('event', { name });
  }
}

interface ChecklistInteractiveProps {
  items: string[];
  checklistType: 'payer-cco' | 'eu-ai-act';
  totalItems: number;
}

// Verdict thresholds
function getVerdict(percentage: number): { label: string; color: string } {
  if (percentage >= 90) return { label: 'Excellent', color: '#22c55e' };
  if (percentage >= 70) return { label: 'Good Progress', color: '#22c55e' };
  if (percentage >= 50) return { label: 'In Progress', color: '#eab308' };
  if (percentage >= 25) return { label: 'Getting Started', color: '#f97316' };
  return { label: 'Just Beginning', color: 'var(--muted)' };
}

export default function ChecklistInteractive({ items, checklistType, totalItems }: ChecklistInteractiveProps) {
  const storageKey = `consilium-checklist-${checklistType}`;
  const hasTracked = useRef(false);

  // Track checklist opened on mount
  useEffect(() => {
    if (!hasTracked.current) {
      trackEvent('checklist_opened');
      hasTracked.current = true;
    }
  }, []);
  
  // Initialize from sessionStorage (FC-04)
  const [checkedItems, setCheckedItems] = useState<Set<number>>(() => {
    if (typeof window === 'undefined') return new Set();
    try {
      const stored = sessionStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        return new Set(parsed);
      }
    } catch {
      // Ignore parse errors
    }
    return new Set();
  });

  // Persist to sessionStorage on change (FC-04)
  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(Array.from(checkedItems)));
    } catch {
      // Ignore storage errors
    }
  }, [checkedItems, storageKey]);

  // Toggle handler (FC-01)
  const toggleItem = useCallback((index: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  const completionCount = checkedItems.size;
  const completionPct = Math.round((completionCount / totalItems) * 100);
  const verdict = getVerdict(completionPct);

  return (
    <div>
      {/* Progress Bar - Sticky (FC-02) */}
      <div
        style={{
          position: 'sticky',
          top: '64px', // Below nav
          zIndex: 50,
          marginBottom: '32px',
          padding: '20px 24px',
          background: 'var(--navy2)',
          border: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
          }}
        >
          <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>
            {completionCount} / {totalItems} items completed
          </span>
          <span style={{ fontSize: '15px', color: 'var(--gold)', fontWeight: 700 }}>
            {completionPct}%
          </span>
        </div>
        <div
          style={{
            height: '8px',
            background: 'var(--navy3)',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${completionPct}%`,
              background: 'var(--gold)',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>

      {/* Checklist Items (FC-01) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '48px' }}>
        {items.map((item, idx) => {
          const isChecked = checkedItems.has(idx);
          return (
            <button
              key={idx}
              onClick={() => toggleItem(idx)}
              className={isChecked ? 'checked' : ''}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                padding: '16px 20px',
                background: isChecked ? 'var(--gold-d)' : 'var(--navy2)',
                border: `1px solid ${isChecked ? 'var(--gold-m)' : 'var(--border)'}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left',
                width: '100%',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  border: isChecked ? '2px solid var(--gold)' : '2px solid var(--border)',
                  background: isChecked ? 'var(--gold)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '1px',
                }}
              >
                {isChecked && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="var(--navy)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="11 4 5.5 9.5 3 7" />
                  </svg>
                )}
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  color: 'var(--text)',
                  textDecoration: isChecked ? 'line-through' : 'none',
                  opacity: isChecked ? 0.7 : 1,
                  lineHeight: 1.5,
                }}
              >
                {item}
              </span>
            </button>
          );
        })}
      </div>

      {/* Score Summary Card (FC-03) */}
      <div
        style={{
          background: 'var(--navy2)',
          border: '1px solid var(--border)',
          padding: '32px',
          textAlign: 'center',
        }}
      >
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
          Checklist Progress
        </p>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '48px',
            fontWeight: 400,
            color: 'var(--gold)',
            lineHeight: 1,
            marginBottom: '8px',
          }}
        >
          {completionPct}%
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            fontWeight: 600,
            color: verdict.color,
            marginBottom: '4px',
          }}
        >
          {verdict.label}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'var(--muted)',
          }}
        >
          {completionCount} of {totalItems} compliance items completed
        </p>
      </div>
    </div>
  );
}

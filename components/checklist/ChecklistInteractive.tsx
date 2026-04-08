'use client';

// components/checklist/ChecklistInteractive.tsx
// Interactive checklist toggle + progress tracking
// Phase 2: Full implementation with all items

import { useState } from 'react';

interface ChecklistItem {
  id: string;
  label: string;
  category: string;
}

interface ChecklistInteractiveProps {
  items: ChecklistItem[];
  type: 'payer-cco' | 'eu-ai-act';
}

export default function ChecklistInteractive({ items, type }: ChecklistInteractiveProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const completionPct = Math.round((checkedItems.size / items.length) * 100);

  return (
    <div>
      {/* Progress Bar */}
      <div
        style={{
          marginBottom: '32px',
          padding: '16px',
          background: 'var(--navy2)',
          border: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
          }}
        >
          <span style={{ fontSize: '14px', color: 'var(--text)' }}>
            {checkedItems.size} of {items.length} items completed
          </span>
          <span style={{ fontSize: '14px', color: 'var(--gold)', fontWeight: 700 }}>
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

      {/* Checklist Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((item) => (
          <label
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '12px 16px',
              background: checkedItems.has(item.id) ? 'var(--gold-d)' : 'var(--navy2)',
              border: `1px solid ${checkedItems.has(item.id) ? 'var(--gold-m)' : 'var(--border)'}`,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <input
              type="checkbox"
              checked={checkedItems.has(item.id)}
              onChange={() => toggleItem(item.id)}
              style={{
                width: '18px',
                height: '18px',
                accentColor: 'var(--gold)',
                marginTop: '2px',
              }}
            />
            <div>
              <span
                style={{
                  fontSize: '14px',
                  color: 'var(--text)',
                  textDecoration: checkedItems.has(item.id) ? 'line-through' : 'none',
                  opacity: checkedItems.has(item.id) ? 0.7 : 1,
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  display: 'block',
                  fontSize: '11px',
                  color: 'var(--muted)',
                  marginTop: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {item.category}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

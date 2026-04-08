'use client';

// components/checklist/PDFDownloadButton.tsx
// PDF download trigger with email capture
// Phase 2: Full implementation with API call

import { useState } from 'react';

interface PDFDownloadButtonProps {
  type: 'payer-checklist' | 'eu-checklist' | 'scorecard-result';
  sessionData?: Record<string, unknown>;
}

export default function PDFDownloadButton({ type, sessionData }: PDFDownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);

  const handleDownload = async () => {
    if (!showEmailForm) {
      setShowEmailForm(true);
      return;
    }

    if (!email) return;

    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/pdf/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, ...sessionData }),
      });

      if (!response.ok) {
        throw new Error('PDF generation failed');
      }

      // Phase 2: Handle blob response and trigger download
      const data = await response.json();
      console.log('PDF response:', data);
      
      // Placeholder success message
      alert('PDF download will be implemented in Phase 2');
    } catch (error) {
      console.error('PDF download error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {showEmailForm && (
        <div style={{ marginBottom: '12px' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'var(--navy2)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              marginBottom: '8px',
            }}
          />
          <p style={{ fontSize: '11px', color: 'var(--muted)' }}>
            We&apos;ll send the PDF to your email as well
          </p>
        </div>
      )}
      <button
        onClick={handleDownload}
        disabled={isLoading || (showEmailForm && !email)}
        className="btn-gold"
        style={{
          width: '100%',
          padding: '14px 24px',
          background: isLoading ? 'var(--navy3)' : 'var(--gold)',
          color: isLoading ? 'var(--muted)' : 'var(--navy)',
          border: 'none',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          fontSize: '13px',
          opacity: showEmailForm && !email ? 0.5 : 1,
        }}
      >
        {isLoading ? 'Generating PDF...' : showEmailForm ? 'Download PDF' : 'Get PDF Checklist'}
      </button>
    </div>
  );
}

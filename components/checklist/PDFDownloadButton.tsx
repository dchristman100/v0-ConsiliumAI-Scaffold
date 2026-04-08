'use client';

// components/checklist/PDFDownloadButton.tsx
// PDF download trigger with loading state
// FC-05, FC-06: Full implementation per spec

import { useState } from 'react';

// Analytics helper
function trackEvent(name: string) {
  if (typeof window !== 'undefined' && 'va' in window) {
    (window as { va: (action: string, payload: { name: string }) => void }).va('event', { name });
  }
}

interface PDFDownloadButtonProps {
  type: 'payer-checklist' | 'eu-checklist' | 'scorecard-result';
  sessionData?: Record<string, unknown>;
}

export default function PDFDownloadButton({ type, sessionData }: PDFDownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsLoading(true);
    setError(null);

    // Create timeout for 8 second max (FC-05)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      // For checklist PDFs, use GET; for scorecard result, use POST with HTML
      const isGet = type !== 'scorecard-result';
      
      const response = await fetch(`/api/pdf/${type}`, {
        method: isGet ? 'GET' : 'POST',
        headers: isGet ? {} : { 'Content-Type': 'application/json' },
        body: isGet ? undefined : JSON.stringify(sessionData || {}),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('PDF generation failed');
      }

      // Check if response is a blob (actual PDF) or JSON (error)
      const contentType = response.headers.get('content-type');
      
      if (contentType?.includes('application/pdf')) {
        // Real PDF response
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        
        // Get filename from Content-Disposition header or use default
        const disposition = response.headers.get('content-disposition');
        const filenameMatch = disposition?.match(/filename="(.+)"/);
        a.download = filenameMatch?.[1] || `${type}.pdf`;
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Track analytics
        trackEvent('checklist_pdf_downloaded');
      } else {
        // Error response - fall back to print (FC-06)
        console.log('[PDFDownloadButton] PDF service error, falling back to print');
        window.print();
      }
    } catch (err) {
      clearTimeout(timeoutId);
      
      if (err instanceof Error && err.name === 'AbortError') {
        // Timeout - fall back to print (FC-06)
        console.log('[PDFDownloadButton] PDF service timeout, falling back to print');
        window.print();
        return;
      }
      
      console.error('[PDFDownloadButton] PDF download error:', err);
      setError('Download failed. Using print instead.');
      // Fall back to print (FC-06)
      window.print();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        disabled={isLoading}
        className="btn-gold no-print"
        style={{
          width: '100%',
          padding: '16px 24px',
          background: isLoading ? 'var(--navy3)' : 'var(--gold)',
          color: isLoading ? 'var(--muted)' : 'var(--navy)',
          border: 'none',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            Generating PDF...
          </>
        ) : (
          <>
            <DownloadIcon />
            Download PDF Checklist
          </>
        )}
      </button>
      {error && (
        <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '8px', textAlign: 'center' }}>
          {error}
        </p>
      )}
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v9" />
      <path d="M4 7l4 4 4-4" />
      <path d="M2 14h12" />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      style={{
        animation: 'spin 1s linear infinite',
      }}
    >
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <circle cx="8" cy="8" r="6" strokeOpacity="0.3" />
      <path d="M8 2a6 6 0 0 1 6 6" />
    </svg>
  );
}

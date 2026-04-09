'use client';

import { useEffect, useRef, useState } from 'react';
import { getUTMParams } from '@/lib/utm';

interface GHLCalendarEmbedProps {
  calendarId?: string;
}

export default function GHLCalendarEmbed({ calendarId }: GHLCalendarEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);
  const [calendarConfigured, setCalendarConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    if (scriptLoaded.current) return;
    
    const id = calendarId || process.env.NEXT_PUBLIC_GHL_CALENDAR_ID;
    
    if (!id) {
      // No calendar ID configured - show mailto fallback
      setCalendarConfigured(false);
      return;
    }

    setCalendarConfigured(true);

    // Get UTM params for passthrough
    const utmParams = getUTMParams();
    
    // Build UTM query string
    const utmQuery = Object.entries(utmParams)
      .filter(([_, v]) => v)
      .map(([k, v]) => `${k}=${encodeURIComponent(v as string)}`)
      .join('&');

    // Create GHL embed script
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    
    script.onload = () => {
      if (containerRef.current) {
        // Create the GHL iframe
        const iframe = document.createElement('iframe');
        iframe.src = `https://api.leadconnectorhq.com/widget/booking/${id}${utmQuery ? `?${utmQuery}` : ''}`;
        iframe.style.width = '100%';
        iframe.style.border = 'none';
        iframe.style.overflow = 'hidden';
        iframe.style.minHeight = '600px';
        iframe.scrolling = 'no';
        iframe.id = 'ghl-calendar-iframe';
        iframe.title = 'Schedule Assessment';
        
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(iframe);
      }
    };

    document.body.appendChild(script);
    scriptLoaded.current = true;

    return () => {
      // Cleanup if component unmounts
      const existingScript = document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [calendarId]);

  // Mailto fallback when calendar is not configured
  if (calendarConfigured === false) {
    return (
      <div
        style={{
          background: 'var(--navy2)',
          border: '1px solid var(--border)',
          padding: '48px 32px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            color: 'var(--text)',
            marginBottom: '16px',
          }}
        >
          Schedule Your Assessment
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            color: 'var(--muted)',
            marginBottom: '32px',
            maxWidth: '480px',
            margin: '0 auto 32px',
          }}
        >
          Send us your preferred time and we&apos;ll confirm within 2 hours.
        </p>
        <a
          href="mailto:info@consiliumai.co?subject=RiskIQ%20Assessment%20Request&body=I'd%20like%20to%20schedule%20a%20RiskIQ%20Assessment.%0A%0APreferred%20times%3A%0AName%3A%0ACompany%3A%0ARole%3A"
          style={{
            display: 'inline-block',
            padding: '16px 36px',
            background: 'var(--gold)',
            color: 'var(--navy)',
            textDecoration: 'none',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          Request a Time →
        </a>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        background: 'var(--navy)',
        border: '1px solid var(--border)',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '40px',
      }}
    >
      {/* Loading state - replaced when calendar loads */}
      <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '16px' }}>
        Loading Calendar
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '16px',
          color: 'var(--text)',
          marginBottom: '16px',
        }}
      >
        Select a time that works for you
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--muted)',
          maxWidth: '300px',
        }}
      >
        The booking calendar is loading...
      </p>
    </div>
  );
}

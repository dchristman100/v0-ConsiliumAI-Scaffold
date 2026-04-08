// PortableTextComponents.tsx
// Custom components for Sanity Portable Text rendering
// BL-11: callout boxes (gold/red/amber — NO TEAL), inline checklist, inline Assessment CTA

import Link from 'next/link';
import Image from 'next/image';
import { urlFor, getImageDimensions } from '@/lib/sanity/image';

// Types for Portable Text blocks
interface CalloutBlock {
  _type: 'callout';
  style: 'gold' | 'red' | 'amber'; // NO TEAL per brand prohibition
  title?: string;
  body: string;
}

interface InlineChecklistBlock {
  _type: 'inlineChecklist';
  items: string[];
}

interface InlineCTABlock {
  _type: 'inlineCTA';
  ctaType: 'scorecard' | 'payer' | 'eu' | 'checklists';
}

interface ImageBlock {
  _type: 'image';
  asset: { _ref: string };
  alt?: string;
  caption?: string;
}

// Callout box component (gold/red/amber only)
function CalloutBox({ value }: { value: CalloutBlock }) {
  const styleMap = {
    gold: {
      background: 'var(--gold-d)',
      borderColor: 'var(--gold)',
      iconColor: 'var(--gold)',
    },
    red: {
      background: 'rgba(232, 85, 85, 0.10)',
      borderColor: 'var(--red)',
      iconColor: 'var(--red)',
    },
    amber: {
      background: 'rgba(240, 160, 48, 0.10)',
      borderColor: 'var(--amber)',
      iconColor: 'var(--amber)',
    },
  };

  const style = styleMap[value.style] || styleMap.gold;

  return (
    <aside
      style={{
        background: style.background,
        borderLeft: `3px solid ${style.borderColor}`,
        padding: '20px 24px',
        margin: '32px 0',
      }}
    >
      {value.title && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '14px',
            color: style.iconColor,
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          {value.title}
        </p>
      )}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          color: 'var(--text)',
          lineHeight: 1.7,
        }}
      >
        {value.body}
      </p>
    </aside>
  );
}

// Inline checklist component
function InlineChecklist({ value }: { value: InlineChecklistBlock }) {
  return (
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
        margin: '24px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {value.items.map((item, index) => (
        <li
          key={index}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            color: 'var(--text)',
            lineHeight: 1.6,
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px',
              background: 'var(--gold-d)',
              border: '1px solid var(--gold)',
              flexShrink: 0,
              marginTop: '2px',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M10 3L4.5 8.5L2 6" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

// Inline CTA component
function InlineCTA({ value }: { value: InlineCTABlock }) {
  const ctaConfig = {
    scorecard: {
      eyebrow: 'AI GOVERNANCE SCORECARD',
      headline: 'Assess Your Governance Posture',
      description: 'Five questions. Two minutes. Instant gap analysis.',
      buttonText: 'Begin Scorecard',
      href: '/scorecard',
    },
    payer: {
      eyebrow: 'FOR PAYER CCOs',
      headline: 'AI Governance for Health Plans',
      description: 'Purpose-built framework for compliance leaders navigating AI risk.',
      buttonText: 'View Solution',
      href: '/payer-cco',
    },
    eu: {
      eyebrow: 'EU AI ACT',
      headline: 'August 2026 Deadline Approaching',
      description: 'Start your compliance journey before enforcement begins.',
      buttonText: 'View Solution',
      href: '/eu-ai-act',
    },
    checklists: {
      eyebrow: 'FREE RESOURCES',
      headline: 'Compliance Checklists',
      description: 'Interactive checklists for Payer CCO and EU AI Act compliance.',
      buttonText: 'Get Checklists',
      href: '/payer-checklist',
    },
  };

  const config = ctaConfig[value.ctaType];

  return (
    <div
      style={{
        background: 'var(--navy2)',
        border: '1px solid var(--border)',
        padding: '32px',
        margin: '32px 0',
        textAlign: 'center',
      }}
    >
      <p
        className="eyebrow"
        style={{
          color: 'var(--gold)',
          marginBottom: '12px',
        }}
      >
        {config.eyebrow}
      </p>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '24px',
          fontWeight: 400,
          color: 'var(--text)',
          marginBottom: '8px',
        }}
      >
        {config.headline}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          color: 'var(--muted)',
          marginBottom: '20px',
          maxWidth: '400px',
          margin: '0 auto 20px',
        }}
      >
        {config.description}
      </p>
      <Link
        href={config.href}
        className="btn-gold"
        style={{
          display: 'inline-block',
          padding: '14px 28px',
          background: 'var(--gold)',
          color: 'var(--navy)',
          textDecoration: 'none',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        {config.buttonText} &rarr;
      </Link>
    </div>
  );
}

// Image with alt text and caption (BL-11)
function BlogImage({ value }: { value: ImageBlock }) {
  const dimensions = getImageDimensions(value);
  const imageUrl = urlFor(value).width(800).auto('format').url();

  return (
    <figure style={{ margin: '32px 0' }}>
      <Image
        src={imageUrl}
        alt={value.alt || ''}
        width={dimensions?.width || 800}
        height={dimensions?.height || 450}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />
      {value.caption && (
        <figcaption
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'var(--muted)',
            marginTop: '12px',
            fontStyle: 'italic',
          }}
        >
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
}

// Export all portable text components
export const portableTextComponents = {
  types: {
    callout: CalloutBox,
    inlineChecklist: InlineChecklist,
    inlineCTA: InlineCTA,
    image: BlogImage,
  },
  block: {
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          fontWeight: 400,
          color: 'var(--text)',
          marginTop: '48px',
          marginBottom: '16px',
          lineHeight: 1.3,
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '22px',
          fontWeight: 400,
          color: 'var(--text)',
          marginTop: '36px',
          marginBottom: '12px',
          lineHeight: 1.3,
        }}
      >
        {children}
      </h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '16px',
          fontWeight: 700,
          color: 'var(--text)',
          marginTop: '28px',
          marginBottom: '8px',
          lineHeight: 1.4,
        }}
      >
        {children}
      </h4>
    ),
    normal: ({ children }: { children: React.ReactNode }) => (
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '16px',
          color: 'var(--text)',
          lineHeight: 1.75,
          marginBottom: '20px',
        }}
      >
        {children}
      </p>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '20px',
          fontStyle: 'italic',
          color: 'var(--gold)',
          borderLeft: '3px solid var(--gold)',
          paddingLeft: '24px',
          margin: '32px 0',
          lineHeight: 1.5,
        }}
      >
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong style={{ fontWeight: 700, color: 'var(--text)' }}>{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em style={{ fontStyle: 'italic' }}>{children}</em>
    ),
    link: ({ value, children }: { value: { href: string }; children: React.ReactNode }) => (
      <a
        href={value.href}
        style={{
          color: 'var(--gold)',
          textDecoration: 'underline',
          textUnderlineOffset: '3px',
        }}
        target={value.href.startsWith('http') ? '_blank' : undefined}
        rel={value.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: '20px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {children}
      </ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol
        style={{
          listStyle: 'none',
          padding: 0,
          margin: '20px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          counterReset: 'list-counter',
        }}
      >
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <li
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          fontFamily: 'var(--font-body)',
          fontSize: '16px',
          color: 'var(--text)',
          lineHeight: 1.6,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            background: 'var(--gold)',
            marginTop: '10px',
            flexShrink: 0,
          }}
        />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <li
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          fontFamily: 'var(--font-body)',
          fontSize: '16px',
          color: 'var(--text)',
          lineHeight: 1.6,
          counterIncrement: 'list-counter',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '16px',
            color: 'var(--gold)',
            flexShrink: 0,
            minWidth: '20px',
          }}
        >
          {/* Counter is handled via CSS */}
        </span>
        <span>{children}</span>
      </li>
    ),
  },
};

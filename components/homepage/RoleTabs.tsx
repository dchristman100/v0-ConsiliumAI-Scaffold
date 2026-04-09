'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface RoleData {
  id: string;
  title: string;
  painPoints: string[];
  badges: { name: string; status: 'NOW' | 'countdown'; days?: number }[];
  testimonial: { quote: string; attribution: string };
  secondaryLink?: { href: string; label: string };
  deliverables: string[];
}

const roles: RoleData[] = [
  {
    id: 'healthcare',
    title: 'Healthcare Payers & CCOs',
    painPoints: [
      'UHC lawsuit creating precedent for AI denial liability',
      'CMS MA prior auth rules requiring human oversight documentation',
      'OCR HIPAA AI guidance mandating algorithmic impact assessments',
      'State insurance AI laws (CO, NY) with extraterritorial reach',
    ],
    badges: [
      { name: 'UHC Federal Discovery', status: 'NOW' },
      { name: 'CMS MA Prior Auth Rules', status: 'countdown', days: 267 },
    ],
    testimonial: {
      quote: 'The regulatory mapping matrix alone saved us six months of internal analysis. Every AI-touched claim decision is now documented and defensible.',
      attribution: 'Chief Compliance Officer, Regional Health Plan',
    },
    secondaryLink: { href: '/payer-cco', label: 'Explore Payer CCO Solutions' },
    deliverables: [
      'Prior Auth AI Documentation',
      'Claims Denial Override Protocol',
      'OCR Compliance Evidence Package',
      'State Insurance AI Law Matrix',
    ],
  },
  {
    id: 'enterprise',
    title: 'Enterprise CAIOs & CDOs',
    painPoints: [
      'No centralized AI inventory across business units',
      'Board demanding AI governance reporting with no framework in place',
      'Vendor AI risk unassessed — third-party models in production',
      'Model documentation standards undefined or inconsistent',
    ],
    badges: [
      { name: 'Colorado AI Act', status: 'countdown', days: 298 },
      { name: 'NYDFS 500.17 AI Mandate', status: 'countdown', days: 447 },
    ],
    testimonial: {
      quote: 'We discovered 47 AI systems we didn\'t know we had. The inventory alone changed the conversation at the board level.',
      attribution: 'Chief AI Officer, Fortune 500 Financial Services',
    },
    deliverables: [
      'Cross-functional AI Inventory',
      'Board Governance Reporting Template',
      'Vendor AI Risk Assessment Framework',
      'Model Documentation Standards',
    ],
  },
  {
    id: 'legal',
    title: 'Legal & Risk Officers',
    painPoints: [
      'D&O liability exposure from ungoverned AI decisions',
      'FTC Section 5 enforcement precedent expanding to AI',
      'No AI-specific provisions in vendor and partner contracts',
      'Litigation hold procedures don\'t cover AI model versioning',
    ],
    badges: [
      { name: 'FTC Section 5 Enforcement', status: 'NOW' },
      { name: 'NYDFS 500.17 AI Mandate', status: 'countdown', days: 447 },
    ],
    testimonial: {
      quote: 'The incident response playbook was tested within 60 days of delivery. It worked exactly as designed. That alone justified the entire engagement.',
      attribution: 'General Counsel, Regional Insurance Carrier',
    },
    deliverables: [
      'D&O Liability Mitigation Framework',
      'AI Contract Provisions Template',
      'AI Litigation Hold Protocol',
      'Incident Response Playbook',
    ],
  },
  {
    id: 'boards',
    title: 'Boards & C-Suite',
    painPoints: [
      'EU AI Act compliance with extraterritorial applicability',
      'High-risk AI system classification and Annex IV documentation',
      'Board-level AI governance fiduciary obligations',
      'Cross-jurisdictional regulatory complexity',
    ],
    badges: [
      { name: 'EU AI Act High-Risk', status: 'countdown', days: 480 },
      { name: 'Colorado AI Act', status: 'countdown', days: 298 },
    ],
    testimonial: {
      quote: 'The board report was the first time our directors had a clear, quantified view of AI risk exposure. It changed the governance conversation overnight.',
      attribution: 'CEO, EU-Operating SaaS Company',
    },
    secondaryLink: { href: '/eu-ai-act', label: 'Explore EU AI Act Solutions' },
    deliverables: [
      'EU AI Act Compliance Roadmap',
      'Annex IV Documentation Package',
      'Board AI Governance Charter',
      'Cross-Jurisdictional Mapping',
    ],
  },
];

export default function RoleTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeRole = roles[activeTab];

  return (
    <section style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '16px',
          }}
        >
          Solutions by role
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 400,
            color: 'var(--text)',
            lineHeight: 1.2,
            marginBottom: '16px',
          }}
        >
          Your AI Governance Challenge. Our Expertise.
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            color: 'var(--muted)',
            lineHeight: 1.6,
            marginBottom: '48px',
            maxWidth: '640px',
          }}
        >
          Select your role to see the regulations, risks, and solutions that matter most to you.
        </p>

        {/* Desktop Tabs */}
        {!isMobile && (
          <>
            <div
              role="tablist"
              style={{
                display: 'flex',
                borderBottom: '2px solid var(--border)',
                marginBottom: '40px',
                gap: '8px',
              }}
            >
              {roles.map((role, index) => (
                <button
                  key={role.id}
                  role="tab"
                  aria-selected={activeTab === index}
                  aria-controls={`panel-${role.id}`}
                  onClick={() => setActiveTab(index)}
                  style={{
                    padding: '16px 24px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: activeTab === index ? 'var(--gold)' : 'var(--muted)',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: activeTab === index ? '3px solid var(--gold)' : '3px solid transparent',
                    cursor: 'pointer',
                    marginBottom: '-2px',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                >
                  {role.title}
                </button>
              ))}
            </div>

            <div
              role="tabpanel"
              id={`panel-${activeRole.id}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '48px',
              }}
            >
              <RolePanelContent role={activeRole} />
            </div>
          </>
        )}

        {/* Mobile Accordion */}
        {isMobile && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {roles.map((role, index) => (
              <div key={role.id} style={{ border: '1px solid var(--border)' }}>
                <button
                  aria-expanded={activeTab === index}
                  aria-controls={`accordion-${role.id}`}
                  onClick={() => setActiveTab(activeTab === index ? -1 : index)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: activeTab === index ? 'var(--gold)' : 'var(--text)',
                    background: 'var(--navy2)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {role.title}
                  <span style={{ transform: activeTab === index ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                    ▼
                  </span>
                </button>
                {activeTab === index && (
                  <div
                    id={`accordion-${role.id}`}
                    style={{ padding: '20px', background: 'var(--navy)' }}
                  >
                    <RolePanelContent role={role} isMobile />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function RolePanelContent({ role, isMobile }: { role: RoleData; isMobile?: boolean }) {
  return (
    <>
      {/* Left Column */}
      <div>
        {/* Pain Points */}
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
          {role.painPoints.map((point, i) => (
            <li
              key={i}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                color: 'var(--muted)',
                padding: '8px 0',
                display: 'flex',
                gap: '12px',
              }}
            >
              <span style={{ color: 'var(--gold)', flexShrink: 0 }}>•</span>
              {point}
            </li>
          ))}
        </ul>

        {/* Regulatory Badges */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {role.badges.map((badge, i) => (
            <span
              key={i}
              style={{
                padding: '8px 14px',
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 600,
                background: badge.status === 'NOW' ? '#FEE2E2' : '#FEF3C7',
                color: badge.status === 'NOW' ? '#DC2626' : '#D97706',
              }}
            >
              {badge.name} {badge.status === 'NOW' ? '• Active NOW' : `• ${badge.days}d`}
            </span>
          ))}
        </div>

        {/* Testimonial */}
        <div
          style={{
            background: 'var(--navy2)',
            borderLeft: '3px solid var(--gold)',
            padding: '20px',
            marginBottom: '24px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontStyle: 'italic',
              color: 'var(--text)',
              lineHeight: 1.6,
              marginBottom: '12px',
            }}
          >
            &ldquo;{role.testimonial.quote}&rdquo;
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--gold)',
            }}
          >
            — {role.testimonial.attribution}
          </p>
        </div>

        {/* CTAs */}
        <Link
          href="/scorecard"
          style={{
            display: 'inline-block',
            padding: '16px 32px',
            background: 'var(--gold)',
            color: 'var(--navy)',
            textDecoration: 'none',
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}
        >
          Take the Free Assessment →
        </Link>
        {role.secondaryLink && (
          <div>
            <Link
              href={role.secondaryLink.href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--gold)',
                textDecoration: 'none',
              }}
            >
              {role.secondaryLink.label} →
            </Link>
          </div>
        )}
      </div>

      {/* Right Column - Deliverables */}
      {!isMobile && (
        <div
          style={{
            background: 'var(--navy2)',
            border: '1px solid var(--border)',
            padding: '32px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '24px',
            }}
          >
            Role-Specific Deliverables
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {role.deliverables.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  style={{
                    width: '20px',
                    height: '20px',
                    background: '#D1FAE5',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'var(--text)',
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

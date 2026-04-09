import type { Metadata } from 'next';
import Link from 'next/link';
import NavUniversal from '@/components/layout/NavUniversal';
import Footer from '@/components/layout/Footer';
import GHLCalendarEmbed from '@/components/booking/GHLCalendarEmbed';
import { MASTER_THESIS, TAGLINE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Book Your RiskIQ™ Readiness Assessment | ConsiliumAI',
  description: 'Schedule your complimentary AI governance assessment. Expert consultation on regulatory compliance, risk mitigation, and governance framework implementation.',
  openGraph: {
    title: 'Book Your RiskIQ™ Readiness Assessment | ConsiliumAI',
    description: 'Schedule your complimentary AI governance assessment with ConsiliumAI.',
    type: 'website',
    url: 'https://consiliumai.co/book',
  },
};

export default function BookPage() {
  return (
    <>
      <NavUniversal />
      <main style={{ paddingTop: '67px' }}>
        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* HERO SECTION                                                    */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '24px' }}>
              Schedule Your Assessment
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 5vw, 52px)',
                fontWeight: 400,
                color: 'var(--text)',
                lineHeight: 1.1,
                marginBottom: '24px',
              }}
            >
              Book Your RiskIQ&trade; Readiness Assessment
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '18px',
                color: 'var(--muted)',
                lineHeight: 1.7,
                marginBottom: '24px',
                maxWidth: '600px',
                margin: '0 auto 24px',
              }}
            >
              Schedule a complimentary 15-minute RiskIQ debrief with our AI governance team. We&apos;ll walk through your scorecard results, review your regulatory exposure map, and outline the fastest path to audit-ready.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* CALENDAR EMBED SECTION                                          */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section
          style={{
            background: 'var(--navy2)',
            padding: '64px 24px',
          }}
        >
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '48px',
                alignItems: 'start',
              }}
              className="book-grid"
            >
              {/* Left: What to Expect */}
              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '24px',
                    fontWeight: 400,
                    color: 'var(--text)',
                    marginBottom: '24px',
                  }}
                >
                  What to Expect
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <ExpectationItem
                    number="1"
                    title="Current State Review"
                    description="We'll discuss your existing AI systems, governance practices, and regulatory exposure."
                  />
                  <ExpectationItem
                    number="2"
                    title="Risk Assessment"
                    description="Identify your highest-priority governance gaps and compliance vulnerabilities."
                  />
                  <ExpectationItem
                    number="3"
                    title="Roadmap Overview"
                    description="Outline the path from current state to audit-ready governance in 30 days."
                  />
                  <ExpectationItem
                    number="4"
                    title="Q&A"
                    description="Address your specific questions about AI governance and regulatory compliance."
                  />
                </div>

                <div
                  style={{
                    marginTop: '32px',
                    padding: '20px',
                    background: 'var(--navy)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: 'var(--muted)',
                      lineHeight: 1.6,
                    }}
                  >
                    <strong style={{ color: 'var(--text)' }}>No obligation.</strong> This assessment is complimentary. We&apos;ll provide actionable insights regardless of whether you engage our services.
                  </p>
                </div>

                <div
                  style={{
                    marginTop: '16px',
                    padding: '16px 20px',
                    background: 'var(--gold-d)',
                    border: '1px solid var(--gold)',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: 'var(--text)',
                      lineHeight: 1.5,
                    }}
                  >
                    <strong>Already took the RiskIQ Assessment?</strong> Your governance team contact already has your score and exposure map — we&apos;ll pick up right where you left off.
                  </p>
                </div>
              </div>

              {/* Right: GHL Calendar Embed */}
              <GHLCalendarEmbed />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* ALTERNATIVE PATHS                                               */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 400,
                color: 'var(--text)',
                marginBottom: '48px',
                textAlign: 'center',
              }}
            >
              Not Ready to Book? Start Here Instead
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              <AlternativeCard
                title="Free Scorecard Assessment"
                description="Get your AI governance score in 2 minutes. No call required."
                linkHref="/scorecard"
                linkLabel="Start Assessment"
              />
              <AlternativeCard
                title="Payer Compliance Checklist"
                description="34-item checklist for healthcare payer AI governance."
                linkHref="/payer-checklist"
                linkLabel="View Checklist"
              />
              <AlternativeCard
                title="EU AI Act Checklist"
                description="38-item checklist for EU AI Act compliance."
                linkHref="/eu-checklist"
                linkLabel="View Checklist"
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* CLOSING QUOTE                                                   */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section
          style={{
            borderTop: '1px solid var(--border)',
            padding: '80px 24px',
            textAlign: 'center',
          }}
        >
          <blockquote
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(24px, 3vw, 36px)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'var(--gold)',
              lineHeight: 1.4,
              maxWidth: '800px',
              margin: '0 auto 24px',
            }}
          >
            &ldquo;{MASTER_THESIS}&rdquo;
          </blockquote>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--muted)',
              letterSpacing: '0.02em',
            }}
          >
            {TAGLINE}
          </p>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .book-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* COMPONENT HELPERS                                                */
/* ═══════════════════════════════════════════════════════════════ */

function ExpectationItem({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '24px',
          color: 'var(--gold)',
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        {number}
      </span>
      <div>
        <h3
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '15px',
            color: 'var(--text)',
            marginBottom: '4px',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'var(--muted)',
            lineHeight: 1.5,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

function AlternativeCard({
  title,
  description,
  linkHref,
  linkLabel,
}: {
  title: string;
  description: string;
  linkHref: string;
  linkLabel: string;
}) {
  return (
    <div
      style={{
        background: 'var(--navy2)',
        border: '1px solid var(--border)',
        padding: '32px 24px',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '20px',
          fontWeight: 400,
          color: 'var(--text)',
          marginBottom: '12px',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--muted)',
          lineHeight: 1.6,
          marginBottom: '20px',
        }}
      >
        {description}
      </p>
      <Link
        href={linkHref}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          fontWeight: 700,
          color: 'var(--gold)',
          textDecoration: 'none',
        }}
      >
        {linkLabel} &rarr;
      </Link>
    </div>
  );
}

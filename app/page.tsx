import type { Metadata } from 'next';
import Link from 'next/link';
import NavUniversal from '@/components/layout/NavUniversal';
import Footer from '@/components/layout/Footer';
import RegulatoryTimeline from '@/components/homepage/RegulatoryTimeline';
import RoleTabs from '@/components/homepage/RoleTabs';
import FAQAccordion from '@/components/homepage/FAQAccordion';
import StickyCTA from '@/components/homepage/StickyCTA';

export const metadata: Metadata = {
  title: 'ConsiliumAI — Architects of the AI Governance Layer',
  description: 'AI governance made certifiable, insurable, and defendable. By design. Free Assessment in 2 minutes.',
  openGraph: {
    title: 'ConsiliumAI — Architects of the AI Governance Layer',
    description: 'AI governance made certifiable, insurable, and defendable. By design.',
    type: 'website',
    url: 'https://consiliumai.co',
  },
};

export default function HomePage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ConsiliumAI',
    url: 'https://consiliumai.co',
    description: 'Architects of the AI Governance Layer. Certifiable, insurable, and defendable AI governance by design.',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@consiliumai.co',
      contactType: 'sales',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <NavUniversal />
      <StickyCTA />
      <main style={{ paddingTop: '67px' }}>
        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* S1: HERO + STAT BAR                                            */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section
          id="hero-section"
          style={{
            padding: '100px 24px 80px',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            {/* Overline */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '13px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#2563EB',
                marginBottom: '24px',
              }}
            >
              AI Governance for Regulated Industries
            </p>

            {/* H1 */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 5vw, 52px)',
                fontWeight: 700,
                color: 'var(--text)',
                lineHeight: 1.15,
                marginBottom: '20px',
              }}
            >
              Your AI is Already Deployed. Your Governance Layer Isn&apos;t.
            </h1>

            {/* Sub-H1 (italic) */}
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '19px',
                fontStyle: 'italic',
                color: 'var(--muted)',
                marginBottom: '24px',
                maxWidth: '560px',
                margin: '0 auto 24px',
              }}
            >
              If regulators ask tomorrow, can you prove your AI is governed?
            </p>

            {/* Hero paragraph */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                color: 'var(--muted)',
                lineHeight: 1.6,
                maxWidth: '540px',
                margin: '0 auto 40px',
              }}
            >
              We architect the governance layer that makes your AI certifiable, insurable, and defendable before enforcement arrives.
            </p>

            {/* Primary CTA */}
            <Link
              href="/scorecard"
              className="cta-button-primary"
              style={{
                display: 'inline-block',
                padding: '16px 36px',
                background: '#2563EB',
                color: 'white',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                fontWeight: 600,
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
            >
              Get Your Free Assessment →
            </Link>
          </div>

          {/* Stat Bar */}
          <div
            style={{
              maxWidth: '720px',
              margin: '64px auto 0',
              borderTop: '1px solid var(--border)',
              paddingTop: '48px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '32px',
              textAlign: 'center',
            }}
          >
            <StatItem number="6" label="Regulatory frameworks with active enforcement power" />
            <StatItem number="$650M+" label="In active lawsuit damages from ungoverned AI" />
            <StatItem number="€35M" label="Maximum penalty per violation under EU AI Act" />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* S2: SOCIAL PROOF / LOGO BAR                                    */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section
          style={{
            background: 'var(--navy2)',
            padding: '32px 24px',
          }}
        >
          <div style={{ maxWidth: '1120px', margin: '0 auto', textAlign: 'center' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: '20px',
              }}
            >
              Built for compliance with
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              {['NIST AI RMF', 'EU AI Act', 'HIPAA', 'SOC 2', 'HITRUST', 'ISO 42001'].map((framework) => (
                <span
                  key={framework}
                  style={{
                    background: 'var(--navy)',
                    border: '1px solid var(--border)',
                    padding: '12px 24px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--muted)',
                  }}
                >
                  {framework}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* S3: REGULATORY TIMELINE WITH LIVE COUNTDOWNS                   */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <RegulatoryTimeline />

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* S4: LOGICAL CHAIN + GOVERNANCE FRAMEWORK CARDS                 */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '80px 24px', background: 'var(--navy2)' }}>
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
              The logical chain
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 400,
                color: 'var(--text)',
                lineHeight: 1.2,
                marginBottom: '64px',
              }}
            >
              Why AI Governance Is No Longer Optional
            </h2>

            {/* 3 Act Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
                marginBottom: '64px',
              }}
            >
              <ActCard
                act="I"
                ifText="If AI makes consequential decisions,"
                thenText="then AI must be governed."
              />
              <ActCard
                act="II"
                ifText="If AI must be governed,"
                thenText="then governance must be documented."
              />
              <ActCard
                act="III"
                ifText="If governance must be documented,"
                thenText="then it must be certifiable, insurable, and defendable."
              />
            </div>

            {/* Framework Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              <FrameworkCard
                title="Certifiable"
                description="Audit-ready documentation that satisfies regulatory requirements before the examiner arrives."
              />
              <FrameworkCard
                title="Insurable"
                description="Risk posture that qualifies for AI liability coverage and reduces D&O exposure."
              />
              <FrameworkCard
                title="Defendable"
                description="Evidence trail that demonstrates due diligence in any enforcement action or litigation."
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* S5: "WHAT YOU RECEIVE" — THE OFFER                             */}
        {/* ═══════════════════════════════════════════════════════════════ */}
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
              What you receive
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
              A Complete Governance Layer in 30 Days
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                color: 'var(--muted)',
                lineHeight: 1.6,
                marginBottom: '48px',
                maxWidth: '720px',
              }}
            >
              Not a gap analysis. Not a PowerPoint. A fully operational governance framework with every document, protocol, and evidence package your regulators require.
            </p>

            <div
              className="offer-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '48px',
              }}
            >
              {/* Left Column - Deliverable Checklist */}
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                  <DeliverableItem
                    name="AI Governance Policy Framework"
                    format="PDF / DOCX — Master governance policy"
                  />
                  <DeliverableItem
                    name="AI System Inventory & Risk Register"
                    format="Excel + PDF — Complete AI system catalog with risk classification"
                  />
                  <DeliverableItem
                    name="Human Oversight Protocol"
                    format="PDF / DOCX — Role-based escalation & override authority matrix"
                  />
                  <DeliverableItem
                    name="Regulatory Mapping Matrix"
                    format="PDF — Your AI systems mapped against all 6 frameworks"
                  />
                  <DeliverableItem
                    name="Incident Response Playbook"
                    format="PDF / DOCX — AI failure detection, containment & documentation"
                  />
                  <DeliverableItem
                    name="Board-Ready Governance Report"
                    format="PDF / PPTX — Executive summary for board presentation"
                  />
                  <DeliverableItem
                    name="Examiner Evidence Package"
                    format="Organized folder — Indexed, cross-referenced, with cover memo"
                  />
                </div>

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
                  }}
                >
                  Get Your Free Assessment →
                </Link>
              </div>

              {/* Right Column */}
              <div>
                {/* Sample artifact preview card */}
                <div
                  style={{
                    background: 'var(--navy2)',
                    border: '1px solid var(--border)',
                    padding: '32px',
                    marginBottom: '24px',
                  }}
                >
                  <div
                    style={{
                      background: 'var(--navy)',
                      border: '1px solid var(--border)',
                      padding: '24px',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--text)',
                        marginBottom: '4px',
                      }}
                    >
                      AI Governance Policy Framework
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '11px',
                        color: 'var(--muted)',
                        marginBottom: '16px',
                      }}
                    >
                      ConsiliumAI — Confidential
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[80, 65, 75, 45, 70, 55].map((width, i) => (
                        <div
                          key={i}
                          style={{
                            height: '8px',
                            background: 'var(--border)',
                            width: `${width}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4-week timeline bar */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '8px',
                    marginBottom: '24px',
                  }}
                >
                  <TimelineWeek week={1} activity="Assess & Inventory" color="#DBEAFE" />
                  <TimelineWeek week={2} activity="Draft & Map" color="#E0E7FF" />
                  <TimelineWeek week={3} activity="Produce & Build" color="#EDE9FE" />
                  <TimelineWeek week={4} activity="Certify & Handoff" color="#D1FAE5" />
                </div>

                {/* Testimonial */}
                <div
                  style={{
                    background: 'var(--navy2)',
                    borderLeft: '3px solid var(--gold)',
                    padding: '20px',
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
                    &ldquo;We went from zero governance documentation to fully audit-ready in 26 days. When the state examiner arrived, we had everything indexed and waiting.&rdquo;
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--gold)',
                    }}
                  >
                    CCO, Top-10 National Payer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Credential Strip */}
        <section style={{ padding: '32px 24px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div
            style={{
              maxWidth: '1120px',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            {[
              'Former Big 4 Compliance Leaders',
              'Healthcare Regulatory Veterans',
              '200+ AI Systems Audited',
              'CIPP/US Certified',
            ].map((cred) => (
              <span
                key={cred}
                style={{
                  background: 'var(--navy2)',
                  border: '1px solid var(--border)',
                  padding: '8px 18px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--muted)',
                }}
              >
                {cred}
              </span>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* S6: HOW IT WORKS                                               */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '80px 24px', background: 'var(--navy2)' }}>
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
              How it works
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 400,
                color: 'var(--text)',
                lineHeight: 1.2,
                marginBottom: '64px',
              }}
            >
              From Assessment to Audit-Ready in 30 Days
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '24px',
                marginBottom: '48px',
              }}
            >
              <StepCard
                step="01"
                title="Assess"
                description="5-question RiskIQ Assessment maps your governance posture against 6 regulatory frameworks."
                output="Governance Scorecard Report"
              />
              <StepCard
                step="02"
                title="Inventory"
                description="Comprehensive audit of every deployed AI system, decision point, and data flow."
                output="AI System Inventory & Risk Register"
              />
              <StepCard
                step="03"
                title="Document"
                description="Full governance framework production — policies, protocols, and evidence artifacts."
                output="5-document governance package"
              />
              <StepCard
                step="04"
                title="Certify"
                description="Board-presentable deliverables and examiner-ready documentation, indexed and handed off."
                output="Board Report + Examiner Package"
              />
            </div>

            <div style={{ textAlign: 'center' }}>
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
                }}
              >
                Get Your Free Assessment →
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* S7: ROLE SEGMENTATION — TABS / ACCORDION                       */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <RoleTabs />

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* S8: FAQ ACCORDION                                              */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <FAQAccordion />

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* S9+S10: RISK REVERSAL + FINAL CTA BLOCK                        */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section
          style={{
            background: 'var(--navy)',
            padding: '100px 24px',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '16px',
              }}
            >
              Start here
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 4vw, 40px)',
                fontWeight: 400,
                color: 'white',
                lineHeight: 1.2,
                marginBottom: '24px',
              }}
            >
              Ready to Close the Governance Gap?
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '17px',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.6,
                marginBottom: '40px',
                maxWidth: '560px',
                margin: '0 auto 40px',
              }}
            >
              Start with the free assessment. No commitment, no credit card, no sales call required. In 2 minutes, you&apos;ll know exactly where your governance gaps are — and what it takes to close them before enforcement arrives.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '64px' }}>
              <Link
                href="/scorecard"
                style={{
                  display: 'inline-block',
                  padding: '18px 40px',
                  background: 'white',
                  color: 'var(--navy)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: '17px',
                  fontWeight: 600,
                }}
              >
                Get Your Free Assessment →
              </Link>
              <Link
                href="/book"
                style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  background: 'transparent',
                  color: 'white',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  fontWeight: 600,
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                Book a Strategy Call
              </Link>
            </div>

            {/* Final Testimonial */}
            <div
              style={{
                borderTop: '1px solid rgba(255,255,255,0.1)',
                paddingTop: '40px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.6,
                  marginBottom: '12px',
                }}
              >
                &ldquo;When AI is governed, the desired outcome is magnified. ConsiliumAI made governance feel inevitable, not burdensome.&rdquo;
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                CAIO, Fortune 500 Healthcare Enterprise
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .offer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* COMPONENT HELPERS                                               */
/* ═══════════════════════════════════════════════════════════════ */

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '36px',
          fontWeight: 700,
          color: 'var(--text)',
          lineHeight: 1,
          marginBottom: '8px',
        }}
      >
        {number}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          color: 'var(--muted)',
          lineHeight: 1.4,
        }}
      >
        {label}
      </p>
    </div>
  );
}

function ActCard({ act, ifText, thenText }: { act: string; ifText: string; thenText: string }) {
  return (
    <div
      style={{
        background: 'var(--navy)',
        border: '1px solid var(--border)',
        padding: '32px',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: '12px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: '16px',
        }}
      >
        Act {act}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          fontStyle: 'italic',
          color: 'var(--muted)',
          marginBottom: '8px',
        }}
      >
        {ifText}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          fontWeight: 600,
          color: 'var(--text)',
        }}
      >
        {thenText}
      </p>
    </div>
  );
}

function FrameworkCard({ title, description }: { title: string; description: string }) {
  return (
    <div
      style={{
        background: 'var(--navy)',
        border: '1px solid var(--border)',
        padding: '28px',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '22px',
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
        }}
      >
        {description}
      </p>
    </div>
  );
}

function DeliverableItem({ name, format }: { name: string; format: string }) {
  return (
    <div style={{ display: 'flex', gap: '12px' }}>
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
      <div>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            fontWeight: 600,
            color: 'var(--text)',
            marginBottom: '2px',
          }}
        >
          {name}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            color: 'var(--muted)',
          }}
        >
          {format}
        </p>
      </div>
    </div>
  );
}

function TimelineWeek({ week, activity, color }: { week: number; activity: string; color: string }) {
  return (
    <div
      style={{
        background: color,
        padding: '12px 8px',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          fontWeight: 700,
          color: '#0F172A',
          marginBottom: '4px',
        }}
      >
        Week {week}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          color: '#475569',
        }}
      >
        {activity}
      </p>
    </div>
  );
}

function StepCard({ step, title, description, output }: { step: string; title: string; description: string; output: string }) {
  return (
    <div
      style={{
        background: 'var(--navy)',
        border: '1px solid var(--border)',
        padding: '28px',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          fontWeight: 700,
          color: 'var(--gold)',
          opacity: 0.5,
          marginBottom: '12px',
        }}
      >
        {step}
      </p>
      <h3
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '18px',
          fontWeight: 600,
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
          marginBottom: '16px',
        }}
      >
        {description}
      </p>
      <span
        style={{
          display: 'inline-block',
          padding: '6px 10px',
          background: '#D1FAE5',
          color: '#059669',
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          fontWeight: 600,
        }}
      >
        Output: {output}
      </span>
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import NavUniversal from '@/components/layout/NavUniversal';
import Footer from '@/components/layout/Footer';
import InlineScorecardWidget from '@/components/scorecard/InlineScorecardWidget';
import AssessmentForm from '@/components/forms/AssessmentForm';
import { MASTER_THESIS, TAGLINE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'ConsiliumAI — Architects of the AI Governance Layer',
  description: 'AI governance made certifiable, insurable, and defendable. By design. Free RiskIQ Assessment in 2 minutes.',
  openGraph: {
    title: 'ConsiliumAI — Architects of the AI Governance Layer',
    description: 'AI governance made certifiable, insurable, and defendable. By design.',
    type: 'website',
    url: 'https://consiliumai.co',
  },
};

export default function HomePage() {
  return (
    <>
      <NavUniversal />
      <main style={{ paddingTop: '67px' }}>
        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 1: HERO                                                 */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section
          style={{
            minHeight: 'calc(100vh - 67px)',
            padding: '80px 24px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '48px',
              width: '100%',
            }}
            className="hero-grid"
          >
            {/* Left Column - 60% */}
            <div style={{ maxWidth: '680px' }}>
              <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '24px' }}>
                AI Governance for Regulated Industries
              </p>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(32px, 5vw, 56px)',
                  fontWeight: 400,
                  color: 'var(--text)',
                  lineHeight: 1.1,
                  marginBottom: '24px',
                }}
              >
                Your AI is Already Deployed.{' '}
                <span style={{ color: 'var(--gold)' }}>Your Governance Layer Isn&apos;t.</span>
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '18px',
                  color: 'var(--muted)',
                  lineHeight: 1.7,
                  marginBottom: '32px',
                  maxWidth: '560px',
                }}
              >
                Six regulatory frameworks. Zero excuses. CMS, OCR, FTC, NYDFS, Colorado, and the EU AI Act are converging on the same question: Can you prove your AI is governed? ConsiliumAI architects the governance layer that makes your AI certifiable, insurable, and defendable.
              </p>

              {/* Proof Line */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '24px',
                  paddingTop: '24px',
                  borderTop: '1px solid var(--border)',
                }}
              >
                <ProofPoint number="6" label="Active regulatory frameworks targeting AI" />
                <ProofPoint number="$650M+" label="UHC lawsuit exposure" />
                <ProofPoint number="€35M" label="EU AI Act maximum penalty" />
              </div>
            </div>

            {/* Right Column - 40% - Inline Scorecard Widget (D-04) */}
            <div
              id="scorecard-widget-mount"
              style={{
                minHeight: '480px',
              }}
            >
              <InlineScorecardWidget />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 2: URGENCY TICKER                                       */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section
          style={{
            background: 'var(--navy2)',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            padding: '24px 0',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '48px',
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 24px',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <TickerItem
              status="active"
              date="NOW"
              label="UHC Federal Discovery"
              link={{ href: '/payer-cco', text: 'Payer page' }}
            />
            <TickerItem
              status="active"
              date="2026"
              label="CMS MA Prior Auth Rules"
            />
            <TickerItem
              status="active"
              date="Q2 2026"
              label="NYDFS 500.17 AI Mandate"
            />
            <TickerItem
              status="pending"
              date="Aug 2, 2026"
              label="EU AI Act High-Risk"
              link={{ href: '/eu-ai-act', text: 'EU page' }}
            />
            <TickerItem
              status="pending"
              date="Feb 1, 2026"
              label="Colorado AI Act"
            />
            <TickerItem
              status="active"
              date="NOW"
              label="FTC Section 5 Enforcement"
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 3: INTELLIGENCE - SORITES ARGUMENT                      */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '120px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '16px' }}>
              The Logical Chain
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 400,
                color: 'var(--text)',
                lineHeight: 1.2,
                marginBottom: '64px',
                maxWidth: '800px',
              }}
            >
              Why AI Governance Is No Longer Optional
            </h2>

            {/* Sorites Argument - 3 Acts */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '32px',
                marginBottom: '80px',
              }}
            >
              <SoritesCard
                act="I"
                premise="If AI makes consequential decisions,"
                conclusion="then AI must be governed."
              />
              <SoritesCard
                act="II"
                premise="If AI must be governed,"
                conclusion="then governance must be documented."
              />
              <SoritesCard
                act="III"
                premise="If governance must be documented,"
                conclusion="then it must be certifiable, insurable, and defendable."
              />
            </div>

            {/* Architecture Cards */}
            <h3
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
              The Governance Framework
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              <ArchCard
                title="Certifiable"
                description="Audit-ready documentation that satisfies regulatory requirements before the examiner arrives."
              />
              <ArchCard
                title="Insurable"
                description="Risk posture that qualifies for AI liability coverage and reduces D&O exposure."
              />
              <ArchCard
                title="Defendable"
                description="Evidence trail that demonstrates due diligence in any enforcement action or litigation."
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 4: GROUP SELECTOR (HP-07: 4-column desktop)             */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section
          id="group-selector"
          style={{
            background: 'var(--navy2)',
            padding: '120px 24px',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '16px' }}>
              Solutions by Role
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 400,
                color: 'var(--text)',
                lineHeight: 1.2,
                marginBottom: '64px',
                maxWidth: '700px',
              }}
            >
              Your AI Governance Challenge. Our Expertise.
            </h2>

            <div
              className="group-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '24px',
              }}
            >
              {/* Group A: Healthcare Payers */}
              <GroupCard
                group="A"
                title="Healthcare Payers & CCOs"
                challenges={[
                  'UHC lawsuit exposure',
                  'CMS MA prior auth compliance',
                  'OCR HIPAA AI guidance',
                  'State insurance AI laws',
                ]}
                dedicatedLink={{ href: '/payer-cco', label: 'Payer CCO' }}
                checklistLink={{ href: '/payer-checklist', label: '34-Item Checklist' }}
              />

              {/* Group B: Enterprise Leaders */}
              <GroupCard
                group="B"
                title="Enterprise CAIOs & CDOs"
                challenges={[
                  'Cross-functional AI inventory',
                  'Board reporting frameworks',
                  'Vendor AI risk assessment',
                  'Model documentation standards',
                ]}
                checklistLink={{ href: '/scorecard', label: 'Governance Scorecard' }}
              />

              {/* Group C: Legal & Risk */}
              <GroupCard
                group="C"
                title="Legal & Risk Officers"
                challenges={[
                  'D&O liability exposure',
                  'FTC Section 5 enforcement',
                  'Contract AI provisions',
                  'Litigation hold procedures',
                ]}
                checklistLink={{ href: '/scorecard', label: 'Governance Scorecard' }}
              />

              {/* Group D: EU Compliance */}
              <GroupCard
                group="D"
                title="Boards & C-Suite"
                challenges={[
                  'EU AI Act compliance',
                  'Extraterritorial applicability',
                  'Annex IV documentation',
                  'High-risk classification',
                ]}
                dedicatedLink={{ href: '/eu-ai-act', label: 'EU AI Act' }}
                checklistLink={{ href: '/eu-checklist', label: '38-Item Checklist' }}
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 5: PROBLEM - GOVERNANCE GAPS                            */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '120px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p className="eyebrow" style={{ color: 'var(--red)', marginBottom: '16px' }}>
              The Problem
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 400,
                color: 'var(--text)',
                lineHeight: 1.2,
                marginBottom: '64px',
                maxWidth: '700px',
              }}
            >
              Four Governance Gaps That Create Regulatory Exposure
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '24px',
              }}
            >
              <GapCard
                number="01"
                title="No AI Inventory"
                description="You can't govern what you can't see. Most organizations don't know how many AI systems they operate or where decisions are being automated."
              />
              <GapCard
                number="02"
                title="No Documentation Trail"
                description="When regulators ask 'show me your AI governance,' silence is the worst answer. Documentation is the evidence of due diligence."
              />
              <GapCard
                number="03"
                title="No Human Oversight Framework"
                description="Every AI regulation requires meaningful human review. 'The algorithm decided' is not a defense."
              />
              <GapCard
                number="04"
                title="No Incident Response Plan"
                description="When AI fails—and it will—you need a documented response protocol. Ad hoc reactions become exhibit A."
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 6: HOW IT WORKS - 4 STEPS                               */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section
          style={{
            background: 'var(--navy2)',
            padding: '120px 24px',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '16px' }}>
              How It Works
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 400,
                color: 'var(--text)',
                lineHeight: 1.2,
                marginBottom: '64px',
                maxWidth: '700px',
              }}
            >
              From Assessment to Audit-Ready in 30 Days
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '32px',
              }}
            >
              <StepCard
                step="01"
                verb="Assess"
                title="RiskIQ Scorecard"
                description="5-question assessment maps your current governance posture against 6 regulatory frameworks."
              />
              <StepCard
                step="02"
                verb="Inventory"
                title="AI System Catalog"
                description="Comprehensive audit of deployed AI systems, decision points, and data flows."
              />
              <StepCard
                step="03"
                verb="Document"
                title="Governance Layer"
                description="Policies, procedures, and evidence artifacts that satisfy regulatory requirements."
              />
              <StepCard
                step="04"
                verb="Certify"
                title="Audit-Ready Package"
                description="Board-presentable deliverables and examiner-ready documentation."
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 7: PROOF STATS BAND                                     */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section
          style={{
            borderTop: '1px solid var(--gold)',
            borderBottom: '1px solid var(--gold)',
            padding: '48px 24px',
          }}
        >
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '32px',
              textAlign: 'center',
            }}
          >
            <StatBlock number="6" label="Regulatory frameworks addressed" />
            <StatBlock number="30" label="Days to audit-ready" suffix=" days" />
            <StatBlock number="$650M+" label="Lawsuit exposure avoided" />
            <StatBlock number="100%" label="Documentation coverage" />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 8: SECONDARY SCORECARD (HP-09)                          */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section id="scorecard" style={{ padding: '120px 24px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '16px' }}>
              Free Assessment
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 400,
                color: 'var(--text)',
                lineHeight: 1.2,
                marginBottom: '24px',
              }}
            >
              AI Governance Scorecard&trade;
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '18px',
                color: 'var(--muted)',
                lineHeight: 1.7,
                marginBottom: '48px',
                maxWidth: '600px',
                margin: '0 auto 48px',
              }}
            >
              Answer 5 questions. Get your governance score across 4 dimensions. See your regulatory exposure map for OCR, TRAIGA, EU AI Act, NYDFS, CMS MA, and Colorado AI Act.
            </p>

            {/* Assessment Form (D-01: replaced placeholder text) */}
            <AssessmentForm
              sourcePage="homepage"
              sourceCampaign="Campaign-1"
              submitLabel="Start Assessment →"
              roleOptions={['CCO', 'CIO', 'CAIO', 'CDO', 'General Counsel', 'VP Compliance', 'CFO', 'Board Member', 'Other']}
              concernOptions={['Regulatory compliance', 'AI risk documentation', 'Board reporting', 'Litigation readiness', 'Vendor AI governance', 'EU AI Act', 'Bias/fairness testing', 'Other']}
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 9: STAGE 0-4 PRODUCT STACK (HP-08: 5-column desktop)    */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section
          style={{
            background: 'var(--navy2)',
            padding: '120px 24px',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '16px' }}>
              The Journey
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 400,
                color: 'var(--text)',
                lineHeight: 1.2,
                marginBottom: '64px',
                maxWidth: '700px',
              }}
            >
              Stage 0 to Stage 4: The Governance Maturity Path
            </h2>

            <div
              className="stage-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '16px',
              }}
            >
              <StageCard
                stage="0"
                title="Unaware"
                description="AI deployed without governance awareness"
                status="danger"
              />
              <StageCard
                stage="1"
                title="Reactive"
                description="Governance only after incidents"
                status="warning"
              />
              <StageCard
                stage="2"
                title="Defined"
                description="Policies documented but not enforced"
                status="warning"
              />
              <StageCard
                stage="3"
                title="Managed"
                description="Active governance with monitoring"
                status="good"
              />
              <StageCard
                stage="4"
                title="Optimized"
                description="Certifiable, insurable, defendable"
                status="excellent"
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 10: FINAL CTA                                           */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '120px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 400,
                color: 'var(--text)',
                lineHeight: 1.2,
                marginBottom: '24px',
              }}
            >
              Ready to Close the Governance Gap?
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '18px',
                color: 'var(--muted)',
                lineHeight: 1.7,
                marginBottom: '40px',
              }}
            >
              Start with the free RiskIQ Assessment. Get your governance score in 2 minutes. Or book a call to discuss your specific regulatory challenges.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link
                href="#scorecard"
                className="btn-gold"
                style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  background: 'var(--gold)',
                  color: 'var(--navy)',
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                Free RiskIQ Assessment &rarr;
              </Link>
              <Link
                href="/book"
                style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  background: 'transparent',
                  color: 'var(--text)',
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  border: '1px solid var(--border)',
                }}
              >
                Book a Call
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 11: CLOSING QUOTE (PR-11)                               */}
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
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 60% 40% !important;
          }
        }
        @media (max-width: 1023px) {
          .group-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stage-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .group-grid {
            grid-template-columns: 1fr !important;
          }
          .stage-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* COMPONENT HELPERS                                                */
/* ═══════════════════════════════════════════════════════════════ */

function ProofPoint({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '32px',
          fontWeight: 400,
          color: 'var(--gold)',
          lineHeight: 1,
          marginBottom: '4px',
        }}
      >
        {number}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          color: 'var(--muted)',
        }}
      >
        {label}
      </p>
    </div>
  );
}

function TickerItem({
  status,
  date,
  label,
  link,
}: {
  status: 'active' | 'pending';
  date: string;
  label: string;
  link?: { href: string; text: string };
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
      <span
        style={{
          width: '8px',
          height: '8px',
          background: status === 'active' ? 'var(--red)' : 'var(--amber)',
        }}
      />
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: '11px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: status === 'active' ? 'var(--red)' : 'var(--amber)',
        }}
      >
        {date}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--text)',
        }}
      >
        {label}
      </span>
      {link && (
        <Link
          href={link.href}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            color: 'var(--gold)',
            textDecoration: 'none',
          }}
        >
          {link.text} &rarr;
        </Link>
      )}
    </div>
  );
}

function SoritesCard({ act, premise, conclusion }: { act: string; premise: string; conclusion: string }) {
  return (
    <div
      style={{
        background: 'var(--navy2)',
        border: '1px solid var(--border)',
        padding: '32px',
      }}
    >
      <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '16px' }}>
        Act {act}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          color: 'var(--muted)',
          marginBottom: '8px',
        }}
      >
        {premise}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '20px',
          color: 'var(--text)',
          lineHeight: 1.3,
        }}
      >
        {conclusion}
      </p>
    </div>
  );
}

function ArchCard({ title, description }: { title: string; description: string }) {
  return (
    <div
      style={{
        borderLeft: '3px solid var(--gold)',
        paddingLeft: '24px',
        paddingTop: '8px',
        paddingBottom: '8px',
      }}
    >
      <h4
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '22px',
          fontWeight: 400,
          color: 'var(--text)',
          marginBottom: '8px',
        }}
      >
        {title}
      </h4>
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

function GroupCard({
  group,
  title,
  challenges,
  dedicatedLink,
  checklistLink,
}: {
  group: string;
  title: string;
  challenges: string[];
  dedicatedLink?: { href: string; label: string };
  checklistLink: { href: string; label: string };
}) {
  return (
    <div
      style={{
        background: 'var(--navy)',
        border: '1px solid var(--border)',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '12px' }}>
        Group {group}
      </p>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '20px',
          fontWeight: 400,
          color: 'var(--text)',
          marginBottom: '20px',
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          marginBottom: '24px',
          flexGrow: 1,
        }}
      >
        {challenges.map((c, i) => (
          <li
            key={i}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--muted)',
              padding: '6px 0',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ color: 'var(--gold)' }}>&bull;</span>
            {c}
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {dedicatedLink && (
          <Link
            href={dedicatedLink.href}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 700,
              color: 'var(--gold)',
              textDecoration: 'none',
            }}
          >
            {dedicatedLink.label} &mdash; Dedicated page &rarr;
          </Link>
        )}
        <Link
          href={checklistLink.href}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            color: 'var(--text)',
            textDecoration: 'none',
          }}
        >
          {checklistLink.label} &rarr;
        </Link>
      </div>
    </div>
  );
}

function GapCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div
      style={{
        background: 'var(--navy2)',
        border: '1px solid var(--border)',
        borderTop: '3px solid var(--red)',
        padding: '32px 24px',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: '11px',
          letterSpacing: '0.1em',
          color: 'var(--red)',
          marginBottom: '12px',
        }}
      >
        GAP {number}
      </p>
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
        }}
      >
        {description}
      </p>
    </div>
  );
}

function StepCard({
  step,
  verb,
  title,
  description,
}: {
  step: string;
  verb: string;
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        background: 'var(--navy)',
        border: '1px solid var(--border)',
        padding: '32px 24px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '36px',
            color: 'var(--gold)',
            lineHeight: 1,
          }}
        >
          {step}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
          }}
        >
          {verb}
        </span>
      </div>
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
        }}
      >
        {description}
      </p>
    </div>
  );
}

function StatBlock({ number, label, suffix = '' }: { number: string; label: string; suffix?: string }) {
  return (
    <div>
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
        {number}
        {suffix}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--muted)',
        }}
      >
        {label}
      </p>
    </div>
  );
}

function DimensionTag({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '12px',
        fontWeight: 500,
        color: 'var(--text)',
        background: 'var(--navy3)',
        padding: '6px 12px',
        border: '1px solid var(--border)',
      }}
    >
      {label}
    </span>
  );
}

function RegTag({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.06em',
        color: 'var(--amber)',
        background: 'rgba(240, 160, 48, 0.1)',
        padding: '4px 10px',
        border: '1px solid rgba(240, 160, 48, 0.3)',
      }}
    >
      {label}
    </span>
  );
}

function StageCard({
  stage,
  title,
  description,
  status,
}: {
  stage: string;
  title: string;
  description: string;
  status: 'danger' | 'warning' | 'good' | 'excellent';
}) {
  const statusColors = {
    danger: 'var(--red)',
    warning: 'var(--amber)',
    good: 'var(--green)',
    excellent: 'var(--gold)',
  };

  return (
    <div
      style={{
        background: 'var(--navy)',
        border: '1px solid var(--border)',
        borderTop: `3px solid ${statusColors[status]}`,
        padding: '24px 16px',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '32px',
          color: statusColors[status],
          lineHeight: 1,
          marginBottom: '8px',
        }}
      >
        {stage}
      </p>
      <h4
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: '13px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--text)',
          marginBottom: '8px',
        }}
      >
        {title}
      </h4>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          color: 'var(--muted)',
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>
    </div>
  );
}

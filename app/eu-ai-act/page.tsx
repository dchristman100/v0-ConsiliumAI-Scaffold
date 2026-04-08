import type { Metadata } from 'next';
import Link from 'next/link';
import NavICP from '@/components/layout/NavICP';
import Footer from '@/components/layout/Footer';
import DedicatedPageRelatedPosts from '@/components/blog/DedicatedPageRelatedPosts';
import AssessmentForm from '@/components/forms/AssessmentForm';
import { MASTER_THESIS, TAGLINE, EU_CHECKLIST_COUNT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'EU AI Act Compliance — August 2, 2026 Deadline, €35M Penalty | ConsiliumAI',
  description: 'Complete EU AI Act compliance framework with countdown to August 2, 2026 high-risk deadline. €35M maximum penalty. Annex IV documentation. Classification self-assessment.',
  openGraph: {
    title: 'EU AI Act Compliance — August 2, 2026 Deadline | ConsiliumAI',
    description: 'EU AI Act compliance framework. August 2, 2026 deadline. €35M maximum penalty exposure.',
    type: 'website',
    url: 'https://consiliumai.co/eu-ai-act',
  },
};

export default function EUAIActPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* COUNTDOWN BAR PLACEHOLDER (FD-05)                               */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div
        id="countdown-mount"
        style={{
          position: 'fixed',
          top: '3px',
          left: 0,
          right: 0,
          background: 'var(--amber)',
          padding: '12px 24px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '12px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--navy)',
          }}
        >
          August 2, 2026
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--navy)',
          }}
        >
          EU AI Act High-Risk Deadline
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '12px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--navy)',
            background: 'rgba(0,0,0,0.1)',
            padding: '4px 12px',
          }}
        >
          €35M Maximum Penalty
        </span>
      </div>

      <NavICP variant="eu" />
      <main style={{ paddingTop: '127px' }}>
        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 1: HERO (EU-03)                                         */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section
          style={{
            minHeight: 'calc(100vh - 127px)',
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
            {/* Left Column */}
            <div style={{ maxWidth: '680px' }}>
              <p className="eyebrow" style={{ color: 'var(--amber)', marginBottom: '24px' }}>
                EU AI Act Compliance
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
                August 2, 2026.{' '}
                <span style={{ color: 'var(--amber)' }}>€35M Maximum Penalty.</span>{' '}
                Is Your AI Compliant?
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '18px',
                  color: 'var(--muted)',
                  lineHeight: 1.7,
                  marginBottom: '24px',
                  maxWidth: '560px',
                }}
              >
                The EU AI Act is the world&apos;s first comprehensive AI regulation. High-risk AI systems must demonstrate full Annex IV compliance by August 2, 2026. The extraterritorial scope means this applies regardless of your headquarters location — if you serve EU markets, you&apos;re in scope.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  color: 'var(--amber)',
                  fontWeight: 500,
                  marginBottom: '32px',
                }}
              >
                EU AI Act applies regardless of headquarters location.
              </p>

              {/* Above-fold proof points */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '24px',
                  paddingTop: '24px',
                  borderTop: '1px solid var(--border)',
                }}
              >
                <ProofPoint
                  number="Aug 2, 2026"
                  label="High-risk deadline"
                  accent="var(--amber)"
                />
                <ProofPoint
                  number="€35M"
                  label="Maximum penalty"
                  accent="var(--amber)"
                />
                <ProofPoint
                  number="9"
                  label="Annex IV documentation elements"
                  accent="var(--amber)"
                />
              </div>
            </div>

            {/* Right Column - Deadline Card */}
            <div
              style={{
                background: 'var(--navy2)',
                border: '1px solid var(--amber)',
                borderLeft: '4px solid var(--amber)',
                padding: '32px',
              }}
            >
              <p className="eyebrow" style={{ color: 'var(--amber)', marginBottom: '16px' }}>
                Compliance Deadline
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  fontWeight: 400,
                  color: 'var(--text)',
                  marginBottom: '16px',
                }}
              >
                EU AI Act High-Risk Requirements
              </h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <DeadlineItem label="Effective Date" value="August 1, 2024" />
                <DeadlineItem label="Prohibited AI Ban" value="February 2, 2025" />
                <DeadlineItem label="General-Purpose AI" value="August 2, 2025" />
                <DeadlineItem label="High-Risk Deadline" value="August 2, 2026" status="critical" />
                <DeadlineItem label="Full Enforcement" value="August 2, 2027" />
              </ul>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--muted)',
                  marginTop: '24px',
                  fontStyle: 'italic',
                }}
              >
                Penalties: Up to €35M or 7% of global annual turnover for high-risk violations.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 2: REGULATION BAND - EU AI ACT MILESTONES               */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section
          style={{
            background: 'var(--navy2)',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            padding: '32px 24px',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p className="eyebrow" style={{ color: 'var(--amber)', marginBottom: '24px' }}>
              Compliance Timeline
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '24px',
              }}
            >
              <MilestoneCard
                status="complete"
                date="Aug 1, 2024"
                title="Entry Into Force"
                description="EU AI Act officially effective"
              />
              <MilestoneCard
                status="complete"
                date="Feb 2, 2025"
                title="Prohibited AI"
                description="Ban on unacceptable risk AI"
              />
              <MilestoneCard
                status="pending"
                date="Aug 2, 2025"
                title="GPAI Rules"
                description="General-purpose AI requirements"
              />
              <MilestoneCard
                status="critical"
                date="Aug 2, 2026"
                title="High-Risk Deadline"
                description="Full Annex IV compliance required"
              />
              <MilestoneCard
                status="pending"
                date="Aug 2, 2027"
                title="Full Enforcement"
                description="All provisions in effect"
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 3: CLASSIFICATION SELF-ASSESSMENT                       */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '120px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p className="eyebrow" style={{ color: 'var(--amber)', marginBottom: '16px' }}>
              Risk Classification
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 400,
                color: 'var(--text)',
                lineHeight: 1.2,
                marginBottom: '24px',
                maxWidth: '700px',
              }}
            >
              EU AI Act 4-Tier Risk Classification
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '18px',
                color: 'var(--muted)',
                lineHeight: 1.7,
                marginBottom: '64px',
                maxWidth: '600px',
              }}
            >
              The EU AI Act categorizes AI systems into four risk tiers. Your compliance obligations depend on your classification.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '24px',
              }}
            >
              <RiskTierCard
                tier="Unacceptable"
                color="var(--red)"
                description="Prohibited AI systems that pose unacceptable risks to fundamental rights."
                examples={[
                  'Social scoring systems',
                  'Real-time biometric surveillance',
                  'Manipulation of vulnerable groups',
                  'Emotion recognition in workplace/schools',
                ]}
                requirement="BANNED"
              />
              <RiskTierCard
                tier="High"
                color="var(--amber)"
                description="AI systems in critical areas requiring strict compliance and Annex IV documentation."
                examples={[
                  'Employment decisions',
                  'Credit scoring',
                  'Healthcare diagnostics',
                  'Insurance underwriting',
                ]}
                requirement="FULL ANNEX IV"
              />
              <RiskTierCard
                tier="Limited"
                color="var(--gold)"
                description="AI systems with transparency obligations for user awareness."
                examples={[
                  'Chatbots',
                  'Emotion recognition',
                  'Deepfake detection',
                  'Content recommendation',
                ]}
                requirement="TRANSPARENCY"
              />
              <RiskTierCard
                tier="Minimal"
                color="var(--green)"
                description="AI systems with minimal or no regulatory requirements."
                examples={[
                  'Spam filters',
                  'AI-enabled games',
                  'Inventory management',
                  'Basic automation',
                ]}
                requirement="VOLUNTARY"
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 4: ANNEX IV DOCUMENTATION                               */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section
          style={{
            background: 'var(--navy2)',
            padding: '120px 24px',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '48px',
              }}
              className="annex-grid"
            >
              {/* Left: Annex IV Breakdown */}
              <div>
                <p className="eyebrow" style={{ color: 'var(--amber)', marginBottom: '16px' }}>
                  Annex IV Requirements
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(28px, 4vw, 44px)',
                    fontWeight: 400,
                    color: 'var(--text)',
                    lineHeight: 1.2,
                    marginBottom: '24px',
                    maxWidth: '700px',
                  }}
                >
                  9 Elements of Technical Documentation
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    color: 'var(--muted)',
                    lineHeight: 1.7,
                    marginBottom: '48px',
                    maxWidth: '600px',
                  }}
                >
                  High-risk AI systems must maintain comprehensive technical documentation covering all 9 Annex IV elements. This is the core of EU AI Act compliance.
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '16px',
                  }}
                >
                  <AnnexElement number="1" title="General Description" description="System purpose, intended use, and deployer information" />
                  <AnnexElement number="2" title="Detailed Description" description="System architecture, algorithms, and data processing" />
                  <AnnexElement number="3" title="Monitoring & Logging" description="Human oversight capabilities and audit logging" />
                  <AnnexElement number="4" title="Risk Management" description="Identified risks and mitigation measures" />
                  <AnnexElement number="5" title="Data Governance" description="Training data, validation, and testing datasets" />
                  <AnnexElement number="6" title="Performance Metrics" description="Accuracy, robustness, and cybersecurity measures" />
                  <AnnexElement number="7" title="Fundamental Rights" description="Impact assessment on fundamental rights" />
                  <AnnexElement number="8" title="Design Choices" description="Development methodology and trade-offs" />
                  <AnnexElement number="9" title="Post-Market" description="Monitoring plan and change management" />
                </div>
              </div>

              {/* Right: Article Callouts */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                }}
              >
                <ArticleCallout
                  article="Art. 9"
                  title="Risk Management System"
                  description="Continuous, iterative process throughout the AI system lifecycle. Must identify, analyze, and mitigate risks."
                />
                <ArticleCallout
                  article="Art. 11"
                  title="Technical Documentation"
                  description="Documentation must be drawn up before the AI system is placed on the market and kept up to date."
                />
                <ArticleCallout
                  article="Art. 14"
                  title="Human Oversight"
                  description="High-risk AI must be designed to allow effective human oversight by natural persons."
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 5: RISKIQ EU SPRINT DELIVERABLES                        */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '120px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '16px' }}>
              Deliverables
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
              What RiskIQ&trade; EU Sprint Produces
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              <DeliverableCard
                number="01"
                title="Risk Classification Assessment"
                description="Determination of your AI systems' risk tier under EU AI Act with documentation trail."
              />
              <DeliverableCard
                number="02"
                title="Annex IV Documentation Package"
                description="Complete technical documentation covering all 9 required elements for high-risk systems."
              />
              <DeliverableCard
                number="03"
                title="Human Oversight Framework"
                description="Art. 14 compliant oversight procedures with documented human-in-the-loop controls."
              />
              <DeliverableCard
                number="04"
                title="Risk Management System"
                description="Art. 9 compliant continuous risk management process with mitigation measures."
              />
              <DeliverableCard
                number="05"
                title="NIST AI RMF Bridge"
                description="Mapping between EU AI Act requirements and NIST AI Risk Management Framework."
              />
              <DeliverableCard
                number="06"
                title="Conformity Assessment Prep"
                description="Documentation and process readiness for third-party conformity assessment."
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 6: PROOF QUOTE BLOCKS                                   */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section
          style={{
            background: 'var(--navy2)',
            padding: '80px 24px',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '32px',
              }}
            >
              <QuoteBlock
                quote="The EU AI Act represents the most comprehensive AI regulation in the world. Organizations that wait until 2026 to begin compliance will not be ready."
                source="EU Commission AI Office"
              />
              <QuoteBlock
                quote="Extraterritorial scope means any company serving EU markets must comply, regardless of where they are headquartered."
                source="EU AI Act Art. 2"
              />
              <QuoteBlock
                quote="If AI makes consequential decisions, then AI must be governed. If AI must be governed, then governance must be documented."
                source="ConsiliumAI Sorites"
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 7: ROI COMPARISON                                       */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '120px 24px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '16px' }}>
              The Math
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 400,
                color: 'var(--text)',
                lineHeight: 1.2,
                marginBottom: '64px',
              }}
            >
              $12K Investment vs. €35M Exposure
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '32px',
                marginBottom: '64px',
              }}
              className="roi-grid"
            >
              <div
                style={{
                  background: 'var(--navy2)',
                  border: '1px solid var(--gold)',
                  borderTop: '4px solid var(--gold)',
                  padding: '40px 32px',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '56px',
                    color: 'var(--gold)',
                    lineHeight: 1,
                    marginBottom: '16px',
                  }}
                >
                  $12K
                </p>
                <p
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
                  RiskIQ EU Sprint
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--muted)',
                  }}
                >
                  30-day engagement, full Annex IV
                </p>
              </div>

              <div
                style={{
                  background: 'var(--navy2)',
                  border: '1px solid var(--amber)',
                  borderTop: '4px solid var(--amber)',
                  padding: '40px 32px',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '56px',
                    color: 'var(--amber)',
                    lineHeight: 1,
                    marginBottom: '16px',
                  }}
                >
                  €35M
                </p>
                <p
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
                  Maximum Penalty
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--muted)',
                  }}
                >
                  Or 7% of global annual turnover
                </p>
              </div>
            </div>

            {/* Stage 0-4 Strip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '8px',
              }}
              className="stage-strip"
            >
              <StageStrip stage="0" label="Unaware" color="var(--red)" />
              <StageStrip stage="1" label="Reactive" color="var(--amber)" />
              <StageStrip stage="2" label="Defined" color="var(--amber)" />
              <StageStrip stage="3" label="Managed" color="var(--green)" />
              <StageStrip stage="4" label="Optimized" color="var(--gold)" />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 8: ASSESSMENT FORM SHELL (EU-04)                        */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section
          id="eu-assessment"
          style={{
            background: 'var(--navy2)',
            padding: '120px 24px',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <p className="eyebrow" style={{ color: 'var(--amber)', marginBottom: '16px' }}>
              Start Your Assessment
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 400,
                color: 'var(--text)',
                lineHeight: 1.2,
                marginBottom: '24px',
              }}
            >
              Request Your RiskIQ&trade; EU Assessment
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                color: 'var(--muted)',
                lineHeight: 1.7,
                marginBottom: '48px',
              }}
            >
              Complete this form to schedule your complimentary EU AI Act compliance assessment. We&apos;ll analyze your AI systems against Annex IV requirements and provide a preliminary risk classification.
            </p>

            {/* Assessment Form (D-03: replaced placeholder text) */}
            <AssessmentForm
              formId="eu-assessment"
              leadSource="EU AI Act Page"
              submitLabel="Request EU Assessment"
              roleOptions={['CAIO', 'CDO', 'General Counsel', 'CTO', 'VP Compliance', 'DPO', 'Other']}
              concernOptions={['High-risk classification', 'Annex IV documentation', 'Conformity assessment', 'GPAI obligations', 'Risk management', 'Extraterritorial scope', 'Other']}
              showJurisdiction={true}
              jurisdictionOptions={['EU member state', 'US with EU operations', 'United Kingdom', 'US no EU operations', 'Asia-Pacific with EU ops', 'Other']}
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 9: CHECKLIST DOWNLOAD                                   */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '120px 24px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '48px',
                alignItems: 'center',
              }}
              className="checklist-grid"
            >
              <div>
                <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '16px' }}>
                  Free Resource
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(24px, 3vw, 36px)',
                    fontWeight: 400,
                    color: 'var(--text)',
                    lineHeight: 1.2,
                    marginBottom: '24px',
                  }}
                >
                  EU AI Act Compliance Checklist
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    color: 'var(--muted)',
                    lineHeight: 1.7,
                    marginBottom: '32px',
                  }}
                >
                  {EU_CHECKLIST_COUNT} items covering risk classification, Annex IV documentation, human oversight requirements, and NIST AI RMF bridge mapping.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  <FeatureCallout label="Risk Classification Assessment" />
                  <FeatureCallout label="Annex IV Documentation" />
                  <FeatureCallout label="NIST AI RMF Bridge" />
                </div>

                {/* PDF Download placeholder - Phase 3 */}
                <Link
                  href="/eu-checklist"
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
                  View Full Checklist &rarr;
                </Link>
              </div>

              <div
                style={{
                  background: 'var(--navy2)',
                  border: '1px solid var(--border)',
                  padding: '32px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '64px',
                    color: 'var(--gold)',
                    lineHeight: 1,
                    marginBottom: '8px',
                  }}
                >
                  {EU_CHECKLIST_COUNT}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    fontSize: '13px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--text)',
                    marginBottom: '24px',
                  }}
                >
                  Compliance Items
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <ChecklistPreviewItem label="Risk Classification Determination" />
                  <ChecklistPreviewItem label="Annex IV Element 1: General Description" />
                  <ChecklistPreviewItem label="Art. 9 Risk Management System" />
                  <ChecklistPreviewItem label="Art. 14 Human Oversight" />
                  <ChecklistPreviewItem label="NIST AI RMF Mapping" />
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
                    + {EU_CHECKLIST_COUNT - 5} more items...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

{/* ═══════════════════════════════════════════════════════════════ */}
        {/* RELATED BLOG POSTS (BL-07)                                       */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <DedicatedPageRelatedPosts icpSlug="eu-ai-act" pageType="eu" />

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 10: CLOSING QUOTE + TAGLINE                             */}
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
            grid-template-columns: 55% 45% !important;
          }
          .annex-grid {
            grid-template-columns: 2fr 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .roi-grid {
            grid-template-columns: 1fr !important;
          }
          .checklist-grid {
            grid-template-columns: 1fr !important;
          }
          .stage-strip {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* COMPONENT HELPERS                                                */
/* ═══════════════════════════════════════════════════════════════ */

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-body)',
  fontWeight: 700,
  fontSize: '11px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
  marginBottom: '8px',
};

const placeholderStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
  color: 'var(--text)',
  background: 'var(--navy2)',
  padding: '12px 16px',
  border: '1px solid var(--border)',
};

function ProofPoint({ number, label, accent }: { number: string; label: string; accent: string }) {
  return (
    <div>
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '24px',
          fontWeight: 400,
          color: accent,
          lineHeight: 1,
          marginBottom: '4px',
        }}
      >
        {number}
      </p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
        {label}
      </p>
    </div>
  );
}

function DeadlineItem({ label, value, status }: { label: string; value: string; status?: 'critical' }) {
  return (
    <li
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '12px 0',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--muted)' }}>
        {label}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          fontWeight: status === 'critical' ? 700 : 500,
          color: status === 'critical' ? 'var(--amber)' : 'var(--text)',
        }}
      >
        {value}
      </span>
    </li>
  );
}

function MilestoneCard({
  status,
  date,
  title,
  description,
}: {
  status: 'complete' | 'pending' | 'critical';
  date: string;
  title: string;
  description: string;
}) {
  const statusColors = {
    complete: 'var(--green)',
    pending: 'var(--muted)',
    critical: 'var(--amber)',
  };

  return (
    <div
      style={{
        background: 'var(--navy)',
        border: '1px solid var(--border)',
        borderTop: status === 'critical' ? '3px solid var(--amber)' : '1px solid var(--border)',
        padding: '20px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span
          style={{
            width: '8px',
            height: '8px',
            background: statusColors[status],
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '11px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: statusColors[status],
          }}
        >
          {date}
        </span>
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: '14px',
          color: 'var(--text)',
          marginBottom: '4px',
        }}
      >
        {title}
      </h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
        {description}
      </p>
    </div>
  );
}

function RiskTierCard({
  tier,
  color,
  description,
  examples,
  requirement,
}: {
  tier: string;
  color: string;
  description: string;
  examples: string[];
  requirement: string;
}) {
  return (
    <div
      style={{
        background: 'var(--navy2)',
        border: '1px solid var(--border)',
        borderTop: `4px solid ${color}`,
        padding: '32px 24px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '22px',
            fontWeight: 400,
            color,
          }}
        >
          {tier}
        </h3>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '9px',
            letterSpacing: '0.1em',
            color,
            background: `${color}15`,
            padding: '4px 8px',
            border: `1px solid ${color}40`,
          }}
        >
          {requirement}
        </span>
      </div>
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
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {examples.map((example, i) => (
          <li
            key={i}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'var(--text)',
              padding: '4px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ color }}>&bull;</span>
            {example}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AnnexElement({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div
      style={{
        background: 'var(--navy)',
        border: '1px solid var(--border)',
        padding: '20px',
        display: 'flex',
        gap: '16px',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '24px',
          color: 'var(--amber)',
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        {number}
      </span>
      <div>
        <h4
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '14px',
            color: 'var(--text)',
            marginBottom: '4px',
          }}
        >
          {title}
        </h4>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--muted)' }}>
          {description}
        </p>
      </div>
    </div>
  );
}

function ArticleCallout({ article, title, description }: { article: string; title: string; description: string }) {
  return (
    <div
      style={{
        borderLeft: '3px solid var(--amber)',
        paddingLeft: '20px',
        paddingTop: '8px',
        paddingBottom: '8px',
      }}
    >
      <p className="eyebrow" style={{ color: 'var(--amber)', marginBottom: '8px' }}>
        {article}
      </p>
      <h4
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: '15px',
          color: 'var(--text)',
          marginBottom: '8px',
        }}
      >
        {title}
      </h4>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>
        {description}
      </p>
    </div>
  );
}

function DeliverableCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div
      style={{
        background: 'var(--navy2)',
        border: '1px solid var(--border)',
        padding: '28px 24px',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          color: 'var(--gold)',
          lineHeight: 1,
          display: 'block',
          marginBottom: '12px',
        }}
      >
        {number}
      </span>
      <h3
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: '15px',
          color: 'var(--text)',
          marginBottom: '8px',
        }}
      >
        {title}
      </h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>
        {description}
      </p>
    </div>
  );
}

function QuoteBlock({ quote, source }: { quote: string; source: string }) {
  return (
    <blockquote
      style={{
        borderLeft: '3px solid var(--gold)',
        paddingLeft: '24px',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '18px',
          fontStyle: 'italic',
          color: 'var(--text)',
          lineHeight: 1.5,
          marginBottom: '12px',
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <cite
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          fontStyle: 'normal',
          color: 'var(--muted)',
        }}
      >
        &mdash; {source}
      </cite>
    </blockquote>
  );
}

function StageStrip({ stage, label, color }: { stage: string; label: string; color: string }) {
  return (
    <div
      style={{
        background: 'var(--navy2)',
        borderTop: `3px solid ${color}`,
        padding: '16px 12px',
        textAlign: 'center',
      }}
    >
      <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color, lineHeight: 1, marginBottom: '4px' }}>
        {stage}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: '10px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--text)',
        }}
      >
        {label}
      </p>
    </div>
  );
}

function FeatureCallout({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span
        style={{
          width: '20px',
          height: '20px',
          background: 'var(--gold-d)',
          border: '1px solid var(--gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--gold)',
          fontSize: '12px',
        }}
      >
        &#10003;
      </span>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text)' }}>
        {label}
      </span>
    </div>
  );
}

function ChecklistPreviewItem({ label }: { label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 0',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <span
        style={{
          width: '16px',
          height: '16px',
          border: '1px solid var(--border)',
          flexShrink: 0,
        }}
      />
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text)' }}>
        {label}
      </span>
    </div>
  );
}

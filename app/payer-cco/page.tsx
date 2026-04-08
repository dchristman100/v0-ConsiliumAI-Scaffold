import type { Metadata } from 'next';
import Link from 'next/link';
import NavICP from '@/components/layout/NavICP';
import Footer from '@/components/layout/Footer';
import DedicatedPageRelatedPosts from '@/components/blog/DedicatedPageRelatedPosts';
import { MASTER_THESIS, TAGLINE, PAYER_CHECKLIST_COUNT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Payer CCO AI Governance — UHC Lawsuit, CMS MA Compliance | ConsiliumAI',
  description: 'AI governance for healthcare payers facing UHC lawsuit exposure, CMS MA prior authorization requirements, and federal discovery. RiskIQ Payer Sprint in 30 days.',
  openGraph: {
    title: 'Payer CCO AI Governance | ConsiliumAI',
    description: 'AI governance for healthcare payers facing UHC lawsuit exposure and CMS MA compliance.',
    type: 'website',
    url: 'https://consiliumai.co/payer-cco',
  },
};

export default function PayerCCOPage() {
  return (
    <>
      <NavICP variant="payer" />
      <main style={{ paddingTop: '67px' }}>
        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 1: HERO (PC-01, PC-02)                                  */}
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
            {/* Left Column */}
            <div style={{ maxWidth: '680px' }}>
              <p className="eyebrow" style={{ color: 'var(--red)', marginBottom: '24px' }}>
                Healthcare Payer AI Governance
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
                UHC nH Predict Changed Everything.{' '}
                <span style={{ color: 'var(--red)' }}>Is Your AI Governance Ready?</span>
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
                The federal class action against UnitedHealth Group exposed what regulators and plaintiffs already knew: AI-driven claim denials without meaningful human review create massive liability. Active federal discovery is underway. The 90% error rate allegation is now exhibit A in every AI governance audit.
              </p>

              {/* Above-fold proof points (PC-02) */}
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
                  number="Active"
                  label="Federal discovery underway"
                  accent="var(--red)"
                />
                <ProofPoint
                  number="90%"
                  label="Error rate alleged in UHC suit"
                  accent="var(--red)"
                />
                <ProofPoint
                  number="$650M+"
                  label="Exposure in UHC lawsuit"
                  accent="var(--red)"
                />
              </div>
            </div>

            {/* Right Column - UHC Exposure Card */}
            <div
              style={{
                background: 'var(--navy2)',
                border: '1px solid var(--red)',
                borderLeft: '4px solid var(--red)',
                padding: '32px',
              }}
            >
              <p className="eyebrow" style={{ color: 'var(--red)', marginBottom: '16px' }}>
                Federal Case Alert
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
                In re: UnitedHealth Group AI Denial Class Action
              </h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <ExposureItem label="nH Predict Algorithm" value="Named in complaint" />
                <ExposureItem label="Denial Override Rate" value="90% when reviewed by humans" />
                <ExposureItem label="Discovery Status" value="Active federal discovery" />
                <ExposureItem label="Class Size" value="Medicare Advantage beneficiaries" />
                <ExposureItem label="Claimed Damages" value="$650M+ and growing" />
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
                &quot;The algorithm recommended denial 90% of the time. When humans reviewed, 90% of those denials were overturned.&quot;
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 2: URGENCY BAND - PAYER DEADLINES                       */}
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
            <p className="eyebrow" style={{ color: 'var(--red)', marginBottom: '24px' }}>
              Regulatory Timeline
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '24px',
              }}
            >
              <DeadlineCard
                status="active"
                date="NOW"
                title="UHC Federal Discovery"
                description="Document holds and production demands"
              />
              <DeadlineCard
                status="active"
                date="2026"
                title="CMS MA Prior Auth"
                description="New coverage determination rules"
              />
              <DeadlineCard
                status="pending"
                date="Q2 2026"
                title="OCR HIPAA AI Guidance"
                description="AI-specific privacy requirements"
              />
              <DeadlineCard
                status="pending"
                date="2026"
                title="State AI Insurance Laws"
                description="Colorado, California, Connecticut"
              />
              <DeadlineCard
                status="active"
                date="NOW"
                title="FTC Section 5"
                description="Unfair/deceptive AI practices"
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 3: PROBLEM - PAYER GOVERNANCE GAPS                      */}
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
              Four Payer-Specific Governance Gaps That Create Liability
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
                title="Prior Auth Algorithm Opacity"
                description="Can you produce the decision logic your AI uses to recommend claim denials? Discovery requests will demand it."
                accent="var(--red)"
              />
              <GapCard
                number="02"
                title="Human Review Theater"
                description="Having a human in the loop isn't governance. Meaningful review with documented override authority is governance."
                accent="var(--red)"
              />
              <GapCard
                number="03"
                title="No Model Documentation"
                description="When CMS asks 'how does your AI work?' silence is not an option. Model cards and data lineage are baseline requirements."
                accent="var(--red)"
              />
              <GapCard
                number="04"
                title="Member Impact Blind Spots"
                description="Adverse determinations require documented rationale. 'The algorithm said no' creates FCA and bad faith exposure."
                accent="var(--red)"
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 4: PROOF QUOTE BLOCKS                                   */}
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
                quote="The algorithm was designed to predict length of stay, not to determine medical necessity. But that's exactly how it was used."
                source="Plaintiff Brief, In re: UHC"
              />
              <QuoteBlock
                quote="We found that in 90% of cases where the algorithm recommended denial, human reviewers overturned that recommendation."
                source="Expert Testimony Summary"
              />
              <QuoteBlock
                quote="If AI makes consequential decisions, then AI must be governed. If AI must be governed, then governance must be documented."
                source="ConsiliumAI Sorites"
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 5: YOUR PATH - RISKIQ PAYER SPRINT                      */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '120px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '16px' }}>
              Your Path Forward
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
              RiskIQ&trade; Payer Sprint: 30 Days to Audit-Ready
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
              A focused engagement that addresses payer-specific AI governance requirements and prepares you for regulatory examination and litigation discovery.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '32px',
              }}
            >
              <SprintStep
                week="Week 1"
                title="AI Inventory & Risk Assessment"
                tasks={[
                  'Prior authorization AI catalog',
                  'Decision point mapping',
                  'Regulatory exposure analysis',
                ]}
              />
              <SprintStep
                week="Week 2"
                title="Human Oversight Framework"
                tasks={[
                  'Override authority documentation',
                  'Meaningful review protocols',
                  'Appeal escalation procedures',
                ]}
              />
              <SprintStep
                week="Week 3"
                title="Model Documentation"
                tasks={[
                  'Model cards for each AI system',
                  'Training data lineage',
                  'Performance monitoring baselines',
                ]}
              />
              <SprintStep
                week="Week 4"
                title="Board & Audit Package"
                tasks={[
                  'Executive governance summary',
                  'Examiner-ready binder',
                  'Litigation hold playbook',
                ]}
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 6: DELIVERABLES                                         */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section
          style={{
            background: 'var(--navy2)',
            padding: '120px 24px',
          }}
        >
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
              What RiskIQ&trade; Payer Sprint Produces
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
                title="AI System Inventory"
                description="Comprehensive catalog of all AI systems involved in member-impacting decisions, with decision point mapping."
              />
              <DeliverableCard
                number="02"
                title="Human Oversight Protocol"
                description="Documented procedures for meaningful human review, override authority, and appeal escalation."
              />
              <DeliverableCard
                number="03"
                title="Model Documentation Package"
                description="Model cards, data lineage documentation, and performance baselines for each AI system."
              />
              <DeliverableCard
                number="04"
                title="Regulatory Crosswalk"
                description="Mapping of your governance to CMS, OCR, FTC, and state insurance AI requirements."
              />
              <DeliverableCard
                number="05"
                title="Board Governance Summary"
                description="Executive-level overview of AI governance posture, risk exposure, and remediation roadmap."
              />
              <DeliverableCard
                number="06"
                title="Litigation Readiness Playbook"
                description="Document hold procedures, discovery response protocols, and expert witness preparation guide."
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
              $13K Investment vs. $650M+ Exposure
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
                  $13K
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
                  RiskIQ Payer Sprint
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--muted)',
                  }}
                >
                  30-day engagement, full deliverables
                </p>
              </div>

              <div
                style={{
                  background: 'var(--navy2)',
                  border: '1px solid var(--red)',
                  borderTop: '4px solid var(--red)',
                  padding: '40px 32px',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '56px',
                    color: 'var(--red)',
                    lineHeight: 1,
                    marginBottom: '16px',
                  }}
                >
                  $650M+
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
                  UHC Lawsuit Exposure
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--muted)',
                  }}
                >
                  And growing with each class member
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
        {/* SECTION 8: ASSESSMENT FORM SHELL                                */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section
          id="payer-assessment"
          style={{
            background: 'var(--navy2)',
            padding: '120px 24px',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <p className="eyebrow" style={{ color: 'var(--red)', marginBottom: '16px' }}>
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
              Request Your RiskIQ&trade; Payer Assessment
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
              Complete this form to schedule your complimentary AI governance assessment. We&apos;ll analyze your current posture against payer-specific regulatory requirements and provide a preliminary risk score.
            </p>

            {/* Form Shell - Phase 3 adds interactivity */}
            <div
              id="payer-assessment-form"
              style={{
                background: 'var(--navy)',
                border: '1px solid var(--border)',
                padding: '40px 32px',
              }}
            >
              <div style={{ marginBottom: '24px' }}>
                <label style={labelStyle}>Your Role</label>
                <p style={placeholderStyle}>CCO, CMO, CRO, CFO, General Counsel, CIO, VP Compliance</p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={labelStyle}>Primary Concern</label>
                <p style={placeholderStyle}>UHC lawsuit, CMS MA, FCA, TRAIGA, Board reporting, D&amp;O, PA audit trail, Bias testing</p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={labelStyle}>Organization Size</label>
                <p style={placeholderStyle}>Member count / lives covered</p>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--muted)',
                  marginBottom: '24px',
                }}
              >
                The interactive assessment form will load here. Phase 3 hydrates this section with the full intake flow.
              </p>
              <Link
                href="/book"
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
                Book Assessment Call &rarr;
              </Link>
            </div>
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
                  Payer AI Governance Checklist
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
                  {PAYER_CHECKLIST_COUNT} items covering CMS MA compliance, prior authorization governance, human oversight requirements, and documentation standards.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  <FeatureCallout label="CMS MA Prior Auth Requirements" />
                  <FeatureCallout label="OCR HIPAA AI Guidance" />
                  <FeatureCallout label="Litigation Readiness Checklist" />
                </div>

                {/* PDF Download placeholder - Phase 3 */}
                <Link
                  href="/payer-checklist"
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
                  {PAYER_CHECKLIST_COUNT}
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
                  Governance Items
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <ChecklistPreviewItem label="Prior Auth AI Inventory" />
                  <ChecklistPreviewItem label="Human Override Documentation" />
                  <ChecklistPreviewItem label="Appeal Escalation Protocol" />
                  <ChecklistPreviewItem label="Model Card Requirements" />
                  <ChecklistPreviewItem label="CMS Audit Readiness" />
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)' }}>
                    + {PAYER_CHECKLIST_COUNT - 5} more items...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* RELATED BLOG POSTS (BL-07)                                       */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <DedicatedPageRelatedPosts icpSlug="payer-cco" pageType="payer" />

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
          fontSize: '28px',
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

function ExposureItem({ label, value }: { label: string; value: string }) {
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
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>
        {value}
      </span>
    </li>
  );
}

function DeadlineCard({
  status,
  date,
  title,
  description,
}: {
  status: 'active' | 'pending';
  date: string;
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        background: 'var(--navy)',
        border: '1px solid var(--border)',
        padding: '20px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
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

function GapCard({
  number,
  title,
  description,
  accent,
}: {
  number: string;
  title: string;
  description: string;
  accent: string;
}) {
  return (
    <div
      style={{
        background: 'var(--navy2)',
        border: '1px solid var(--border)',
        borderTop: `3px solid ${accent}`,
        padding: '32px 24px',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: '11px',
          letterSpacing: '0.1em',
          color: accent,
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
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6 }}>
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

function SprintStep({ week, title, tasks }: { week: string; title: string; tasks: string[] }) {
  return (
    <div
      style={{
        background: 'var(--navy2)',
        border: '1px solid var(--border)',
        padding: '32px 24px',
      }}
    >
      <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '12px' }}>
        {week}
      </p>
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '20px',
          fontWeight: 400,
          color: 'var(--text)',
          marginBottom: '16px',
        }}
      >
        {title}
      </h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task, i) => (
          <li
            key={i}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--muted)',
              padding: '6px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ color: 'var(--gold)' }}>&bull;</span>
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DeliverableCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div
      style={{
        background: 'var(--navy)',
        border: '1px solid var(--border)',
        padding: '28px 24px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '12px' }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            color: 'var(--gold)',
            lineHeight: 1,
          }}
        >
          {number}
        </span>
      </div>
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

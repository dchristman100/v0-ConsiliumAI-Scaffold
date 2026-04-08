import type { Metadata } from 'next';
import Link from 'next/link';
import NavUniversal from '@/components/layout/NavUniversal';
import Footer from '@/components/layout/Footer';
import { MASTER_THESIS, TAGLINE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'AI Governance Scorecard™ — 2-Minute Assessment | ConsiliumAI',
  description: 'Assess your AI governance posture in 2 minutes. Five questions across four governance dimensions. Instant regulatory exposure map for OCR, TRAIGA, EU AI Act, NYDFS, CMS MA, and Colorado AI Act.',
  openGraph: {
    title: 'AI Governance Scorecard™ — 2-Minute Assessment | ConsiliumAI',
    description: 'Assess your AI governance posture in 2 minutes. Instant regulatory exposure map.',
    type: 'website',
    url: 'https://consiliumai.co/scorecard',
  },
};

export default function ScorecardPage() {
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
              Free Assessment
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
              AI Governance Scorecard&trade;
            </h1>
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
              Answer 5 questions. Get your governance score across 4 dimensions. See your regulatory exposure map for 6 active frameworks. Takes 2 minutes.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* GOVERNANCE DIMENSIONS                                           */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section
          style={{
            background: 'var(--navy2)',
            padding: '64px 24px',
          }}
        >
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: '24px',
                textAlign: 'center',
              }}
            >
              4 Governance Dimensions Assessed
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
              }}
            >
              <DimensionCard
                title="AI Inventory"
                description="Do you know what AI systems are deployed in your organization?"
              />
              <DimensionCard
                title="Documentation"
                description="Are your AI systems documented with model cards and data lineage?"
              />
              <DimensionCard
                title="Human Oversight"
                description="Do you have meaningful human review for AI decisions?"
              />
              <DimensionCard
                title="Incident Response"
                description="Do you have a documented AI incident response plan?"
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* REGULATORY EXPOSURE MAP                                         */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '64px 24px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: '24px',
                textAlign: 'center',
              }}
            >
              Regulatory Exposure Map Includes
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                justifyContent: 'center',
              }}
            >
              <RegulationTag label="OCR" fullName="Office for Civil Rights HIPAA AI" />
              <RegulationTag label="TRAIGA" fullName="AI Accountability Act" />
              <RegulationTag label="EU AI Act" fullName="European Union AI Regulation" />
              <RegulationTag label="NYDFS" fullName="NY Dept Financial Services 500.17" />
              <RegulationTag label="CMS MA" fullName="Medicare Advantage Prior Auth" />
              <RegulationTag label="Colorado AI Act" fullName="Colorado AI Consumer Protection" />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SCORECARD FORM SHELL                                            */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section
          id="assessment"
          style={{
            background: 'var(--navy2)',
            padding: '80px 24px',
          }}
        >
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div
              style={{
                background: 'var(--navy)',
                border: '1px solid var(--border)',
                padding: '48px 40px',
              }}
            >
              <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '16px' }}>
                Question 1 of 5
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  fontWeight: 400,
                  color: 'var(--text)',
                  marginBottom: '32px',
                }}
              >
                Do you maintain a complete inventory of AI systems deployed in your organization?
              </h2>

              {/* Answer Options - SSR placeholder */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                <AnswerOption label="Yes, comprehensive and up-to-date" />
                <AnswerOption label="Partial inventory exists" />
                <AnswerOption label="Informal awareness only" />
                <AnswerOption label="No inventory" />
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--muted)',
                  marginBottom: '24px',
                  fontStyle: 'italic',
                }}
              >
                The interactive assessment flow will load here. Phase 3 hydrates this section with the full 5-question flow, progress tracking, and instant scoring.
              </p>

              {/* Progress indicator */}
              <div style={{ marginBottom: '24px' }}>
                <div
                  style={{
                    height: '4px',
                    background: 'var(--navy2)',
                    marginBottom: '8px',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: '20%',
                      background: 'var(--gold)',
                    }}
                  />
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    color: 'var(--muted)',
                  }}
                >
                  20% complete
                </p>
              </div>

              <button
                className="btn-gold"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '16px 32px',
                  background: 'var(--gold)',
                  color: 'var(--navy)',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Next Question &rarr;
              </button>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* WHAT YOU GET                                                    */}
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
              What You&apos;ll Receive
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              <ResultCard
                title="Governance Score"
                description="Numeric score from 0-100 with verdict: Strong, Moderate, Significant, or Critical exposure."
              />
              <ResultCard
                title="4-Dimension Gap Analysis"
                description="Breakdown of your posture across AI Inventory, Documentation, Human Oversight, and Incident Response."
              />
              <ResultCard
                title="Regulatory Exposure Map"
                description="Which regulations apply to your organization and where your gaps create compliance risk."
              />
              <ResultCard
                title="Recommended Next Steps"
                description="Prioritized actions based on your score and regulatory exposure profile."
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* CTA SECTION                                                     */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section
          style={{
            background: 'var(--navy2)',
            padding: '80px 24px',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 400,
                color: 'var(--text)',
                marginBottom: '24px',
              }}
            >
              Ready to Assess Your AI Governance?
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                color: 'var(--muted)',
                marginBottom: '32px',
              }}
            >
              Start the free 2-minute assessment or book a call to discuss your specific regulatory challenges.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="#assessment"
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
                Start Assessment &rarr;
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
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* COMPONENT HELPERS                                                */
/* ═══════════════════════════════════════════════════════════════ */

function DimensionCard({ title, description }: { title: string; description: string }) {
  return (
    <div
      style={{
        background: 'var(--navy)',
        border: '1px solid var(--border)',
        padding: '24px',
        textAlign: 'center',
      }}
    >
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
  );
}

function RegulationTag({ label, fullName }: { label: string; fullName: string }) {
  return (
    <div
      style={{
        background: 'var(--navy2)',
        border: '1px solid var(--border)',
        padding: '12px 20px',
        textAlign: 'center',
      }}
      title={fullName}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: '14px',
          color: 'var(--amber)',
          marginBottom: '4px',
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '10px',
          color: 'var(--muted)',
          maxWidth: '120px',
        }}
      >
        {fullName}
      </p>
    </div>
  );
}

function AnswerOption({ label }: { label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px 20px',
        background: 'var(--navy2)',
        border: '1px solid var(--border)',
        cursor: 'pointer',
      }}
    >
      <span
        style={{
          width: '20px',
          height: '20px',
          border: '2px solid var(--border)',
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--text)',
        }}
      >
        {label}
      </span>
    </div>
  );
}

function ResultCard({ title, description }: { title: string; description: string }) {
  return (
    <div
      style={{
        borderLeft: '3px solid var(--gold)',
        paddingLeft: '24px',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: '16px',
          color: 'var(--text)',
          marginBottom: '8px',
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

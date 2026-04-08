import type { Metadata } from 'next';
import Link from 'next/link';
import NavUniversal from '@/components/layout/NavUniversal';
import Footer from '@/components/layout/Footer';
import ChecklistInteractive from '@/components/checklist/ChecklistInteractive';
import PDFDownloadButton from '@/components/checklist/PDFDownloadButton';
import CountdownBar from '@/components/eu/CountdownBar';
import { EU_CHECKLIST_COUNT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'EU AI Act Compliance Checklist — 38 Items | ConsiliumAI',
  description: 'Interactive 38-item EU AI Act compliance checklist. Track progress toward August 2026 deadline, download PDF, and ensure complete regulatory coverage.',
  openGraph: {
    title: 'EU AI Act Compliance Checklist — 38 Items | ConsiliumAI',
    description: 'Interactive 38-item EU AI Act compliance checklist for August 2026 deadline.',
    type: 'website',
    url: 'https://consiliumai.co/eu-checklist',
  },
};

// SSR-rendered checklist items - all 38 items for SEO
const EU_CHECKLIST_ITEMS = [
  // Risk Classification (6 items)
  'Inventory all AI systems and classify by EU AI Act risk tier',
  'Document prohibited AI practices and verify none are in use',
  'Identify high-risk AI systems requiring conformity assessment',
  'Map AI systems to Annex III high-risk categories',
  'Assess general-purpose AI models for systemic risk',
  'Create risk assessment methodology aligned with Article 9',

  // Governance & Accountability (7 items)
  'Establish AI governance structure with clear accountability',
  'Appoint responsible persons for high-risk AI oversight',
  'Create quality management system for AI operations',
  'Document organizational measures for AI compliance',
  'Establish AI ethics board or equivalent oversight body',
  'Define escalation procedures for AI compliance issues',
  'Create training program for AI governance personnel',

  // Technical Documentation (8 items)
  'Create technical documentation per Annex IV requirements',
  'Document training data governance and data quality measures',
  'Establish model validation and testing procedures',
  'Document AI system accuracy, robustness, and cybersecurity measures',
  'Create human oversight documentation per Article 14',
  'Document transparency measures for AI system users',
  'Establish traceability through logging per Article 12',
  'Create instructions for use per Article 13 requirements',

  // Conformity Assessment (5 items)
  'Identify applicable conformity assessment procedures',
  'Engage notified body where third-party assessment required',
  'Create declaration of conformity documentation',
  'Establish CE marking procedures for AI systems',
  'Document conformity assessment results and evidence',

  // Post-Market Monitoring (5 items)
  'Establish post-market monitoring system per Article 72',
  'Create incident reporting procedures for serious incidents',
  'Document corrective action procedures for non-compliance',
  'Establish recall and withdrawal procedures',
  'Create regulatory reporting workflows for competent authorities',

  // Transparency & User Rights (4 items)
  'Document transparency obligations for AI system interactions',
  'Create user notification procedures for AI-generated content',
  'Establish mechanisms for user complaints and inquiries',
  'Document explainability measures for affected persons',

  // Vendor & Supply Chain (3 items)
  'Assess AI vendors against EU AI Act requirements',
  'Include EU AI Act compliance provisions in vendor contracts',
  'Document importer and distributor obligations where applicable',
];

// FAQ Schema for checklist pages (Section 5 - Structured Data)
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the EU AI Act compliance deadline?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The EU AI Act high-risk deadline is August 2, 2026. Organizations deploying high-risk AI systems in the EU must be fully compliant by this date or face penalties up to €35 million or 7% of global annual turnover.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does this EU AI Act checklist cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This 38-item checklist covers risk classification, governance, technical documentation (Annex IV), conformity assessment, post-market monitoring, transparency, and supply chain requirements under the EU AI Act.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the penalties for EU AI Act non-compliance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Maximum penalties under the EU AI Act are €35 million or 7% of global annual turnover for prohibited AI practices, €15 million or 3% for high-risk requirements violations, and €7.5 million or 1.5% for providing incorrect information.',
      },
    },
  ],
};

export default function EUChecklistPage() {
  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <NavUniversal />
      <CountdownBar />
      <main style={{ paddingTop: '140px' }}>
        {/* Hero Section */}
        <section
          style={{
            padding: '80px 24px',
            textAlign: 'center',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '24px' }}>
              EU AI ACT COMPLIANCE
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 400,
                color: 'var(--text)',
                lineHeight: 1.1,
                marginBottom: '24px',
              }}
            >
              {EU_CHECKLIST_COUNT}-Item EU AI Act Checklist
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                color: 'var(--muted)',
                lineHeight: 1.6,
                marginBottom: '32px',
              }}
            >
              Complete compliance checklist for the EU AI Act August 2026 high-risk deadline.
              Track your progress toward conformity, identify gaps, and ensure regulatory readiness
              before enforcement begins.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/eu-ai-act"
                style={{
                  padding: '12px 24px',
                  background: 'var(--navy2)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  textDecoration: 'none',
                }}
              >
                ← EU AI Act Solutions
              </Link>
              <Link
                href="/book"
                className="btn-gold"
                style={{
                  padding: '12px 24px',
                  background: 'var(--gold)',
                  color: 'var(--navy)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                Book Assessment →
              </Link>
            </div>
          </div>
        </section>

        {/* Deadline Banner */}
        <section
          style={{
            padding: '32px 24px',
            background: 'var(--gold-d)',
            borderBottom: '1px solid var(--gold-m)',
          }}
        >
          <div
            style={{
              maxWidth: '800px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--text)',
              }}
            >
              August 2, 2026 — High-Risk AI Deadline
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--amber)',
                fontWeight: 700,
              }}
            >
              €35M Maximum Penalty
            </span>
          </div>
        </section>

        {/* Checklist Section */}
        <section style={{ padding: '64px 24px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* PDF Download */}
            <div style={{ marginBottom: '32px' }}>
              <PDFDownloadButton type="eu-checklist" />
            </div>

            {/* Category Headers - SSR for SEO */}
            <div style={{ marginBottom: '32px' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  fontWeight: 400,
                  color: 'var(--text)',
                  marginBottom: '8px',
                }}
              >
                Risk Classification &amp; Assessment
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '16px' }}>
                6 items — Foundation for EU AI Act compliance
              </p>
            </div>

            {/* Interactive Checklist */}
            <ChecklistInteractive
              items={EU_CHECKLIST_ITEMS}
              checklistType="eu-ai-act"
              totalItems={EU_CHECKLIST_COUNT}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section
          style={{
            padding: '80px 24px',
            background: 'var(--navy2)',
            borderTop: '1px solid var(--border)',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '32px',
                fontWeight: 400,
                color: 'var(--text)',
                marginBottom: '16px',
              }}
            >
              Prepare Before the Deadline
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                color: 'var(--muted)',
                marginBottom: '32px',
                lineHeight: 1.6,
              }}
            >
              August 2026 approaches. Our team can help you achieve conformity, prepare documentation,
              and ensure your high-risk AI systems are ready for enforcement.
            </p>
            <Link
              href="/book"
              className="btn-gold"
              style={{
                display: 'inline-block',
                padding: '16px 32px',
                background: 'var(--gold)',
                color: 'var(--navy)',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Book RiskIQ™ Assessment →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

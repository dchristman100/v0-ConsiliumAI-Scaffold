import type { Metadata } from 'next';
import Link from 'next/link';
import NavUniversal from '@/components/layout/NavUniversal';
import Footer from '@/components/layout/Footer';
import ChecklistInteractive from '@/components/checklist/ChecklistInteractive';
import PDFDownloadButton from '@/components/checklist/PDFDownloadButton';
import { PAYER_CHECKLIST_COUNT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Payer CCO Compliance Checklist — 34 Items | ConsiliumAI',
  description: 'Interactive 34-item AI governance checklist for health plan Chief Compliance Officers. Track progress, download PDF, and ensure complete regulatory coverage.',
  openGraph: {
    title: 'Payer CCO Compliance Checklist — 34 Items | ConsiliumAI',
    description: 'Interactive 34-item AI governance checklist for health plan Chief Compliance Officers.',
    type: 'website',
    url: 'https://consiliumai.co/payer-checklist',
  },
};

// SSR-rendered checklist items - all 34 items for SEO
const PAYER_CHECKLIST_ITEMS = [
  // AI Policy & Governance Framework (8 items)
  'Establish board-approved AI governance policy with defined accountability structures',
  'Document AI ethics principles and responsible use guidelines',
  'Create AI inventory tracking all models in production and development',
  'Define risk classification framework for AI systems (high/medium/low)',
  'Establish AI governance committee with executive sponsorship',
  'Create escalation procedures for AI-related compliance issues',
  'Define roles and responsibilities for AI oversight across organization',
  'Document AI vendor governance requirements and assessment criteria',

  // Prior Authorization & Claims (6 items)
  'Audit all PA algorithms for compliance with CMS MA requirements',
  'Document human oversight procedures for AI-assisted PA decisions',
  'Establish appeal rights disclosure for AI-influenced denials',
  'Create audit trail for all AI-recommended coverage decisions',
  'Implement bias testing protocols for claims processing AI',
  'Document model validation procedures for utilization management',

  // Regulatory Compliance (7 items)
  'Map AI systems to applicable regulatory frameworks (OCR, CMS, state laws)',
  'Conduct TRAIGA compliance assessment for Tennessee operations',
  'Evaluate Colorado AI Act applicability and requirements',
  'Document NYDFS circular letter compliance for NY operations',
  'Create regulatory change monitoring process for AI requirements',
  'Establish state-by-state compliance matrix for AI regulations',
  'Document False Claims Act risk mitigation for AI-assisted billing',

  // Documentation & Audit (6 items)
  'Create model cards for all production AI systems',
  'Document training data sources and data quality procedures',
  'Establish model performance monitoring and drift detection',
  'Create incident response plan specific to AI failures',
  'Document explainability requirements for member-facing AI',
  'Establish regular audit schedule for AI systems',

  // Board & Executive Oversight (4 items)
  'Implement quarterly board AI governance reporting',
  'Create D&O liability assessment for AI-related decisions',
  'Document board AI education and training program',
  'Establish executive accountability for AI governance',

  // Vendor & Third-Party (3 items)
  'Assess vendor AI systems against governance requirements',
  'Include AI-specific provisions in vendor contracts',
  'Document vendor model validation and testing requirements',
];

// FAQ Schema for checklist pages (Section 5 - Structured Data)
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the Payer CCO AI Governance Checklist?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A comprehensive 34-item checklist designed for health plan Chief Compliance Officers to ensure complete AI governance coverage across CMS, OCR, and state regulations.',
      },
    },
    {
      '@type': 'Question',
      name: 'What regulations does this checklist cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The checklist covers CMS Medicare Advantage requirements, OCR guidance on AI in healthcare, TRAIGA (Tennessee), Colorado AI Act, NYDFS circular letters, and False Claims Act considerations.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I download this checklist as a PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, you can download a branded PDF version of this checklist for offline use and sharing with your compliance team.',
      },
    },
  ],
};

export default function PayerChecklistPage() {
  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <NavUniversal />
      <main style={{ paddingTop: '80px' }}>
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
              PAYER CCO COMPLIANCE
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
              {PAYER_CHECKLIST_COUNT}-Item AI Governance Checklist
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
              Comprehensive compliance checklist for health plan CCOs navigating AI governance requirements.
              Track your progress, identify gaps, and ensure complete regulatory coverage across CMS, OCR, and state regulations.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/payer-cco"
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
                ← Payer CCO Solutions
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

        {/* Checklist Section */}
        <section style={{ padding: '64px 24px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* PDF Download */}
            <div style={{ marginBottom: '32px' }}>
              <PDFDownloadButton type="payer-checklist" />
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
                AI Policy &amp; Governance Framework
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '16px' }}>
                8 items — Foundation for comprehensive AI oversight
              </p>
            </div>

            {/* Interactive Checklist */}
            <ChecklistInteractive
              items={PAYER_CHECKLIST_ITEMS}
              checklistType="payer-cco"
              totalItems={PAYER_CHECKLIST_COUNT}
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
              Need Help With Implementation?
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
              Our team can help you prioritize, implement, and document each checklist item
              with regulatory-grade precision.
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

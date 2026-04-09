'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'How much does this cost?',
    answer: 'Engagements typically range from $75K to $200K depending on the number of AI systems, regulatory scope, and organizational complexity. The free assessment gives us enough context to provide a specific estimate. No commitment required — the RiskIQ Scorecard is genuinely free.',
  },
  {
    question: "Can't we build governance internally?",
    answer: "Yes, but it typically takes 6-12 months with a dedicated internal team. Most clients come to us because enforcement timelines don't wait for internal buildout. We deliver in 30 days what takes most organizations a year — and we've done it across dozens of regulated environments.",
  },
  {
    question: 'We already have a compliance team. Why do we need this?',
    answer: "Compliance teams are built for HIPAA, SOX, PCI — not AI-specific governance. AI regulation requires specialized frameworks: model documentation, algorithmic impact assessments, human oversight protocols, and AI-specific incident response. Most compliance programs haven't built these capabilities yet.",
  },
  {
    question: 'How long does the engagement take?',
    answer: '30 days from kickoff to audit-ready. Week 1: assess and inventory. Week 2: draft policies and regulatory mapping. Week 3: produce governance documents and oversight protocols. Week 4: board report, examiner package assembly, and handoff with training.',
  },
  {
    question: 'Is our data safe?',
    answer: 'We never access, store, or process your production AI systems or PHI. Our engagement operates entirely on documentation and policy architecture, not your data infrastructure. BAA available upon request. All deliverables are transmitted via encrypted channels.',
  },
  {
    question: 'What if we have zero AI governance today?',
    answer: "That's where most of our clients start. The RiskIQ Assessment is designed for Stage 0 organizations. We meet you where you are and deliver a complete governance layer from scratch — not a gap analysis that tells you what you already know.",
  },
  {
    question: 'Which regulations does this cover?',
    answer: 'The governance framework addresses all 6 active regulatory frameworks: CMS MA, OCR HIPAA AI, FTC Section 5, NYDFS 500.17, Colorado AI Act, and EU AI Act. The Regulatory Mapping Matrix shows exactly which requirements apply to your organization and where your gaps are.',
  },
  {
    question: 'What happens after the 30 days?',
    answer: 'You own everything we produce. The governance framework is self-sustaining with built-in update triggers and annual review protocols. An optional retainer is available for ongoing regulatory monitoring, change management, and periodic re-certification as regulations evolve.',
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section style={{ padding: '80px 24px', background: 'var(--navy2)' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
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
          Common questions
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 400,
            color: 'var(--text)',
            lineHeight: 1.2,
            marginBottom: '48px',
          }}
        >
          Everything You Need to Know
        </h2>

        <div>
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <button
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={{
                  width: '100%',
                  padding: '20px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'var(--text)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  gap: '16px',
                }}
              >
                <span>{faq.question}</span>
                <span
                  style={{
                    transform: openIndex === index ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.3s ease',
                    flexShrink: 0,
                    color: 'var(--gold)',
                  }}
                >
                  ▼
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                style={{
                  maxHeight: openIndex === index ? '500px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease, opacity 0.2s ease',
                  opacity: openIndex === index ? 1 : 0,
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: 'var(--muted)',
                    lineHeight: 1.7,
                    paddingBottom: '20px',
                    maxWidth: '640px',
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

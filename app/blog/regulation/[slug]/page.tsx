import type { Metadata } from 'next';
import Link from 'next/link';
import NavUniversal from '@/components/layout/NavUniversal';
import Footer from '@/components/layout/Footer';
import PostCard from '@/components/blog/PostCard';
import SubscribeWidget from '@/components/forms/SubscribeWidget';
import { getSanityClient, isSanityConfigured } from '@/lib/sanity/client';
import { POSTS_BY_REGULATION_QUERY, ALL_REGULATION_SLUGS_QUERY } from '@/lib/sanity/queries';
import type { Post } from '@/types/blog';
import { MASTER_THESIS, TAGLINE } from '@/lib/constants';

// ISR 60 seconds (BL-03)
export const revalidate = 60;

interface BlogRegulationPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all regulation tags
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  if (!isSanityConfigured) return [];
  const client = getSanityClient();
  if (!client) return [];
  const slugs = await client.fetch<string[]>(ALL_REGULATION_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogRegulationPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Format slug for display
  const formattedName = slug
    .split('-')
    .map((word) => word.toUpperCase())
    .join(' ');
  
  return {
    title: `${formattedName} Regulatory Insights — AI Governance | ConsiliumAI`,
    description: `Expert analysis on ${formattedName} compliance, deadlines, and implementation strategies for AI governance.`,
    openGraph: {
      title: `${formattedName} Regulatory Insights — AI Governance | ConsiliumAI`,
      description: `Expert analysis on ${formattedName} compliance and implementation strategies.`,
      type: 'website',
      url: `https://consiliumai.co/blog/regulation/${slug}`,
    },
  };
}

export default async function BlogRegulationPage({ params }: BlogRegulationPageProps) {
  const { slug } = await params;
  
  let posts: Post[] = [];
  const client = getSanityClient();
  if (client && isSanityConfigured) {
    posts = await client.fetch<Post[]>(POSTS_BY_REGULATION_QUERY, { regulationSlug: slug });
  }
  
  // Format slug for display
  const formattedName = slug
    .split('-')
    .map((word) => word.toUpperCase())
    .join(' ');

  return (
    <>
      <NavUniversal />
      <main style={{ paddingTop: '67px' }}>
        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* HERO                                                            */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '80px 24px 48px', textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <p className="eyebrow" style={{ color: 'var(--amber)', marginBottom: '24px' }}>
              REGULATORY INSIGHTS
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
              {formattedName} Insights
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '18px',
                color: 'var(--muted)',
                lineHeight: 1.7,
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              Expert analysis on {formattedName} compliance requirements, implementation
              deadlines, and governance strategies.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* BREADCRUMB                                                      */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '0 24px 32px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <nav style={{ fontSize: '13px', color: 'var(--muted)' }}>
              <Link href="/blog" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
                All Insights
              </Link>
              <span style={{ margin: '0 8px' }}>/</span>
              <span>{formattedName}</span>
            </nav>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* POST GRID                                                       */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '0 24px 64px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {posts.length > 0 ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                  gap: '24px',
                }}
              >
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            ) : (
              <div
                style={{
                  padding: '64px',
                  textAlign: 'center',
                  background: 'var(--navy2)',
                  border: '1px solid var(--border)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '24px',
                    fontWeight: 400,
                    color: 'var(--text)',
                    marginBottom: '12px',
                  }}
                >
                  Insights on {formattedName} coming soon.
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6, marginBottom: '16px' }}>
                  Expert analysis on this regulation is being prepared.
                </p>
                <Link
                  href="/blog"
                  style={{
                    color: 'var(--gold)',
                    fontSize: '14px',
                    textDecoration: 'none',
                  }}
                >
                  Explore all insights &rarr;
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SUBSCRIBE WIDGET                                                */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section
          style={{
            padding: '64px 24px',
            background: 'var(--navy2)',
            borderTop: '1px solid var(--border)',
          }}
        >
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '28px',
                fontWeight: 400,
                color: 'var(--text)',
                marginBottom: '16px',
              }}
            >
              Stay Informed
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
              Get the latest regulatory updates and compliance insights.
            </p>
            <SubscribeWidget variant="inline" />
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

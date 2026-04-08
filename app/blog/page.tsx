import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import NavUniversal from '@/components/layout/NavUniversal';
import Footer from '@/components/layout/Footer';
import PostCard from '@/components/blog/PostCard';
import SubscribeWidget from '@/components/forms/SubscribeWidget';
import { getSanityClient, isSanityConfigured } from '@/lib/sanity/client';
import { ALL_POSTS_QUERY, FEATURED_POST_QUERY, ALL_TAGS_QUERY } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import type { Post, ICPTag, RegulatoryTag } from '@/types/blog';
import { MASTER_THESIS, TAGLINE } from '@/lib/constants';

// ISR 60 seconds (BL-01)
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Insights — AI Governance Blog | ConsiliumAI',
  description: 'Expert insights on AI governance, regulatory compliance, and enterprise AI risk management. Analysis for CCOs, compliance leaders, and EU AI Act stakeholders.',
  openGraph: {
    title: 'Insights — AI Governance Blog | ConsiliumAI',
    description: 'Expert insights on AI governance, regulatory compliance, and enterprise AI risk management.',
    type: 'website',
    url: 'https://consiliumai.co/blog',
  },
};

interface BlogPageProps {
  searchParams: Promise<{ icp?: string; regulation?: string; page?: string }>;
}

export default async function BlogIndexPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const postsPerPage = 9;

  // Fetch all data in parallel (if Sanity is configured)
  let allPosts: Post[] = [];
  let featuredPost: Post | null = null;
  let tags: { icpTags: ICPTag[]; regulatoryTags: RegulatoryTag[] } = { icpTags: [], regulatoryTags: [] };

  const client = getSanityClient();
  if (client && isSanityConfigured) {
    [allPosts, featuredPost, tags] = await Promise.all([
      client.fetch<Post[]>(ALL_POSTS_QUERY),
      client.fetch<Post | null>(FEATURED_POST_QUERY),
      client.fetch<{ icpTags: ICPTag[]; regulatoryTags: RegulatoryTag[] }>(ALL_TAGS_QUERY),
    ]);
  }

  // Filter posts by tags if specified
  let filteredPosts = allPosts;
  if (params.icp) {
    filteredPosts = filteredPosts.filter((post) =>
      post.icpTags?.some((tag) => tag.slug.current === params.icp)
    );
  }
  if (params.regulation) {
    filteredPosts = filteredPosts.filter((post) =>
      post.regulatoryTags?.some((tag) => tag.slug.current === params.regulation)
    );
  }

  // Remove featured post from grid if showing all posts
  const gridPosts = !params.icp && !params.regulation && featuredPost
    ? filteredPosts.filter((post) => post._id !== featuredPost._id)
    : filteredPosts;

  // Pagination
  const totalPages = Math.ceil(gridPosts.length / postsPerPage);
  const paginatedPosts = gridPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const activeIcp = params.icp;
  const activeRegulation = params.regulation;
  const hasFilters = activeIcp || activeRegulation;

  return (
    <>
      <NavUniversal />
      <main style={{ paddingTop: '67px' }}>
        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* HERO SECTION                                                    */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '80px 24px 48px', textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <p className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '24px' }}>
              INSIGHTS
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
              AI Governance Insights
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
              Expert analysis on regulatory compliance, risk management, and building
              governance frameworks that are certifiable, insurable, and defendable.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* FILTER TAGS (BL-01)                                             */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '0 24px 48px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Link
                href="/blog"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  padding: '8px 16px',
                  textDecoration: 'none',
                  background: !hasFilters ? 'var(--gold)' : 'transparent',
                  color: !hasFilters ? 'var(--navy)' : 'var(--muted)',
                  border: `1px solid ${!hasFilters ? 'var(--gold)' : 'var(--border)'}`,
                }}
              >
                All Posts
              </Link>

              {tags.icpTags?.map((tag) => (
                <Link
                  key={tag._id}
                  href={`/blog?icp=${tag.slug.current}`}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    padding: '8px 16px',
                    textDecoration: 'none',
                    background: activeIcp === tag.slug.current ? 'var(--gold)' : 'transparent',
                    color: activeIcp === tag.slug.current ? 'var(--navy)' : 'var(--muted)',
                    border: `1px solid ${activeIcp === tag.slug.current ? 'var(--gold)' : 'var(--border)'}`,
                  }}
                >
                  {tag.name}
                </Link>
              ))}

              {tags.regulatoryTags?.map((tag) => (
                <Link
                  key={tag._id}
                  href={`/blog?regulation=${tag.slug.current}`}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    padding: '8px 16px',
                    textDecoration: 'none',
                    background: activeRegulation === tag.slug.current ? 'var(--gold)' : 'transparent',
                    color: activeRegulation === tag.slug.current ? 'var(--navy)' : 'var(--muted)',
                    border: `1px solid ${activeRegulation === tag.slug.current ? 'var(--gold)' : 'var(--border)'}`,
                  }}
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* FEATURED POST (BL-15) — full-width above grid                   */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {!hasFilters && featuredPost && (
          <section style={{ padding: '0 24px 64px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <Link
                href={`/blog/${featuredPost.slug.current}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <article
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '48px',
                    background: 'var(--navy2)',
                    border: '1px solid var(--border)',
                    overflow: 'hidden',
                  }}
                  className="featured-post"
                >
                  {/* Image */}
                  <div
                    style={{
                      aspectRatio: '16/10',
                      background: 'var(--navy3)',
                      position: 'relative',
                    }}
                  >
                    {featuredPost.mainImage && (
                      <Image
                        src={urlFor(featuredPost.mainImage).width(800).height(500).url()}
                        alt={featuredPost.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      padding: '48px 48px 48px 0',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <p
                      className="eyebrow"
                      style={{ color: 'var(--gold)', marginBottom: '16px' }}
                    >
                      FEATURED
                    </p>
                    <h2
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(24px, 3vw, 36px)',
                        fontWeight: 400,
                        color: 'var(--text)',
                        lineHeight: 1.2,
                        marginBottom: '16px',
                      }}
                    >
                      {featuredPost.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '16px',
                        color: 'var(--muted)',
                        lineHeight: 1.7,
                        marginBottom: '24px',
                      }}
                    >
                      {featuredPost.excerpt}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        fontSize: '13px',
                        color: 'var(--muted)',
                      }}
                    >
                      <span>{featuredPost.author?.name}</span>
                      <span>&middot;</span>
                      <span>
                        {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* POST GRID                                                       */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '0 24px 64px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {paginatedPosts.length > 0 ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                  gap: '24px',
                }}
              >
                {paginatedPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            ) : (
              <div
                style={{
                  padding: '64px 32px',
                  textAlign: 'center',
                  background: 'var(--navy2)',
                  border: '1px solid var(--border)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '28px',
                    fontWeight: 400,
                    color: 'var(--text)',
                    marginBottom: '16px',
                  }}
                >
                  Insights coming soon.
                </h3>
                <p
                  style={{
                    color: 'var(--muted)',
                    fontSize: '16px',
                    lineHeight: 1.7,
                    maxWidth: '520px',
                    margin: '0 auto',
                  }}
                >
                  We&apos;re preparing expert analysis on AI governance, regulatory compliance, and building frameworks that are certifiable, insurable, and defendable. Subscribe below to be notified when our first posts go live.
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '48px',
                }}
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Link
                    key={page}
                    href={`/blog?${new URLSearchParams({
                      ...(params.icp && { icp: params.icp }),
                      ...(params.regulation && { regulation: params.regulation }),
                      page: page.toString(),
                    }).toString()}`}
                    style={{
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      background: page === currentPage ? 'var(--gold)' : 'transparent',
                      color: page === currentPage ? 'var(--navy)' : 'var(--muted)',
                      border: `1px solid ${page === currentPage ? 'var(--gold)' : 'var(--border)'}`,
                    }}
                  >
                    {page}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SUBSCRIBE WIDGET (BL-09)                                        */}
        {/* ════════════════════════════��══════════════════════════════════ */}
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
              Get the latest AI governance insights delivered to your inbox.
              No spam. Unsubscribe anytime.
            </p>
            <SubscribeWidget variant="inline" />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* CLOSING QUOTE (PR-11)                                           */}
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
          .featured-post {
            grid-template-columns: 1fr !important;
          }
          .featured-post > div:last-child {
            padding: 24px !important;
          }
        }
      `}</style>
    </>
  );
}

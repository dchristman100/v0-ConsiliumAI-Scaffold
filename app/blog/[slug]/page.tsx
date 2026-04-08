import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import NavUniversal from '@/components/layout/NavUniversal';
import Footer from '@/components/layout/Footer';
import SidebarCTA from '@/components/blog/SidebarCTA';
import SubscribeWidget from '@/components/forms/SubscribeWidget';
import { sanityClient } from '@/lib/sanity/client';
import {
  POST_BY_SLUG_QUERY,
  ALL_POST_SLUGS_QUERY,
  RELATED_POSTS_QUERY,
} from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import { portableTextComponents } from '@/components/blog/PortableTextComponents';
import type { Post } from '@/types/blog';
import { MASTER_THESIS, TAGLINE } from '@/lib/constants';

// ISR 60 seconds (BL-02)
export const revalidate = 60;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all published posts (BL-14)
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await sanityClient.fetch<string[]>(ALL_POST_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

// Dynamic metadata from Sanity fields (BL-12, BL-13)
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityClient.fetch<Post | null>(POST_BY_SLUG_QUERY, { slug });

  if (!post) {
    return {
      title: 'Post Not Found | ConsiliumAI',
    };
  }

  const ogImageUrl = post.ogImage
    ? urlFor(post.ogImage).width(1200).height(630).url()
    : post.mainImage
      ? urlFor(post.mainImage).width(1200).height(630).url()
      : undefined;

  return {
    title: post.metaTitle || `${post.title} | ConsiliumAI`,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: 'article',
      url: `https://consiliumai.co/blog/${slug}`,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : undefined,
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await sanityClient.fetch<Post | null>(POST_BY_SLUG_QUERY, { slug });

  if (!post) {
    notFound();
  }

  // Fetch related posts by shared tags (BL-02)
  const icpSlugs = post.icpTags?.map((tag) => tag.slug.current) || [];
  const regulationSlugs = post.regulatoryTags?.map((tag) => tag.slug.current) || [];

  const relatedPosts = await sanityClient.fetch<Post[]>(RELATED_POSTS_QUERY, {
    currentSlug: slug,
    icpSlugs,
    regulationSlugs,
  });

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Structured data — Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: post.author
      ? {
          '@type': 'Person',
          name: post.author.name,
          jobTitle: post.author.title,
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'ConsiliumAI',
      url: 'https://consiliumai.co',
    },
    image: post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://consiliumai.co/blog/${slug}`,
    },
  };

  return (
    <>
      <NavUniversal />
      <main style={{ paddingTop: '67px' }}>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* HERO                                                            */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '80px 24px 48px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Tags */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                marginBottom: '24px',
                justifyContent: 'center',
              }}
            >
              {post.icpTags?.map((tag) => (
                <Link
                  key={tag._id}
                  href={`/blog?icp=${tag.slug.current}`}
                  style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    background: 'var(--gold-d)',
                    padding: '4px 10px',
                    textDecoration: 'none',
                  }}
                >
                  {tag.name}
                </Link>
              ))}
              {post.regulatoryTags?.map((tag) => (
                <Link
                  key={tag._id}
                  href={`/blog?regulation=${tag.slug.current}`}
                  style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--amber)',
                    background: 'rgba(240, 160, 48, 0.10)',
                    padding: '4px 10px',
                    textDecoration: 'none',
                  }}
                >
                  {tag.name}
                </Link>
              ))}
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 400,
                color: 'var(--text)',
                lineHeight: 1.15,
                marginBottom: '24px',
                textAlign: 'center',
              }}
            >
              {post.title}
            </h1>

            {/* Meta */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                fontSize: '14px',
                color: 'var(--muted)',
              }}
            >
              {post.author && (
                <>
                  <span style={{ fontWeight: 500, color: 'var(--text)' }}>
                    {post.author.name}
                  </span>
                  <span>&middot;</span>
                </>
              )}
              <span>{formattedDate}</span>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* FEATURED IMAGE                                                  */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {post.mainImage && (
          <section style={{ padding: '0 24px 48px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <div
                style={{
                  aspectRatio: '16/9',
                  position: 'relative',
                  background: 'var(--navy3)',
                }}
              >
                <Image
                  src={urlFor(post.mainImage).width(1200).height(675).url()}
                  alt={post.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                  sizes="(max-width: 1000px) 100vw, 1000px"
                />
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* TWO-COLUMN LAYOUT: CONTENT + STICKY SIDEBAR (BL-02)             */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '0 24px 80px' }}>
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1fr 320px',
              gap: '64px',
              alignItems: 'start',
            }}
            className="blog-layout"
          >
            {/* Content Column */}
            <article style={{ maxWidth: '720px' }}>
              <PortableText
                value={post.body}
                components={portableTextComponents}
              />

              {/* Author Bio */}
              {post.author && (
                <div
                  style={{
                    marginTop: '64px',
                    paddingTop: '32px',
                    borderTop: '1px solid var(--border)',
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'flex-start',
                  }}
                >
                  {post.author.photo && (
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        position: 'relative',
                        flexShrink: 0,
                        background: 'var(--navy3)',
                      }}
                    >
                      <Image
                        src={urlFor(post.author.photo).width(128).height(128).url()}
                        alt={post.author.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  )}
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 700,
                        fontSize: '16px',
                        color: 'var(--text)',
                        marginBottom: '4px',
                      }}
                    >
                      {post.author.name}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        color: 'var(--gold)',
                        marginBottom: '8px',
                      }}
                    >
                      {post.author.title}
                    </p>
                    {post.author.bio && (
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '14px',
                          color: 'var(--muted)',
                          lineHeight: 1.6,
                        }}
                      >
                        {post.author.bio}
                      </p>
                    )}
                    {post.author.linkedIn && (
                      <a
                        href={post.author.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-block',
                          marginTop: '8px',
                          fontSize: '13px',
                          color: 'var(--gold)',
                          textDecoration: 'none',
                        }}
                      >
                        LinkedIn &rarr;
                      </a>
                    )}
                  </div>
                </div>
              )}
            </article>

            {/* Sticky Sidebar (BL-08) */}
            <aside
              style={{
                position: 'sticky',
                top: '100px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              {/* Sidebar CTA based on post's ctaType */}
              <SidebarCTA type={post.ctaType || 'scorecard'} />

              {/* Subscribe Widget */}
              <div
                style={{
                  background: 'var(--navy2)',
                  border: '1px solid var(--border)',
                  padding: '24px',
                }}
              >
                <p
                  className="eyebrow"
                  style={{ color: 'var(--gold)', marginBottom: '12px' }}
                >
                  NEWSLETTER
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'var(--text)',
                    marginBottom: '16px',
                    lineHeight: 1.5,
                  }}
                >
                  Get governance insights delivered weekly.
                </p>
                <SubscribeWidget variant="stacked" />
              </div>
            </aside>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* RELATED POSTS (BL-02)                                           */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {relatedPosts.length > 0 && (
          <section
            style={{
              padding: '64px 24px',
              background: 'var(--navy2)',
              borderTop: '1px solid var(--border)',
            }}
          >
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px',
                  fontWeight: 400,
                  color: 'var(--text)',
                  marginBottom: '32px',
                  textAlign: 'center',
                }}
              >
                Related Insights
              </h2>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '24px',
                }}
              >
                {relatedPosts.map((relatedPost) => (
                  <article
                    key={relatedPost._id}
                    style={{
                      background: 'var(--navy)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {relatedPost.mainImage && (
                      <div
                        style={{
                          aspectRatio: '16/9',
                          position: 'relative',
                          background: 'var(--navy3)',
                        }}
                      >
                        <Image
                          src={urlFor(relatedPost.mainImage).width(400).height(225).url()}
                          alt={relatedPost.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    )}
                    <div style={{ padding: '24px' }}>
                      <p
                        style={{
                          fontSize: '12px',
                          color: 'var(--muted)',
                          marginBottom: '8px',
                        }}
                      >
                        {new Date(relatedPost.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '18px',
                          fontWeight: 400,
                          color: 'var(--text)',
                          lineHeight: 1.3,
                        }}
                      >
                        <Link
                          href={`/blog/${relatedPost.slug.current}`}
                          style={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          {relatedPost.title}
                        </Link>
                      </h3>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

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
        @media (max-width: 900px) {
          .blog-layout {
            grid-template-columns: 1fr !important;
          }
          .blog-layout aside {
            position: static !important;
            order: -1;
          }
        }
      `}</style>
    </>
  );
}

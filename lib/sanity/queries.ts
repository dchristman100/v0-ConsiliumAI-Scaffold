// Sanity GROQ Queries — 8 named exports per spec (BL-01 through BL-14)

// 1. ALL_POSTS_QUERY — all published posts, ordered by publishedAt desc
export const ALL_POSTS_QUERY = `
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    author->{name, title, photo},
    icpTags[]->{_id, name, slug, accentColor},
    regulatoryTags[]->{_id, name, slug, deadline, urgencyLevel},
    ctaType,
    featured,
    mainImage
  }
`;

// 2. POST_BY_SLUG_QUERY — single post by slug with full body
export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    author->{name, title, bio, photo, linkedIn},
    icpTags[]->{_id, name, slug, accentColor, dedicatedPageLink},
    regulatoryTags[]->{_id, name, slug, deadline, urgencyLevel, maxPenalty},
    ctaType,
    featured,
    metaTitle,
    metaDescription,
    ogImage,
    mainImage,
    newsletterInclude
  }
`;

// 3. POSTS_BY_ICP_QUERY — posts filtered by ICP tag slug
export const POSTS_BY_ICP_QUERY = `
  *[_type == "post" && defined(publishedAt) && $icpSlug in icpTags[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    author->{name, title, photo},
    icpTags[]->{_id, name, slug, accentColor},
    regulatoryTags[]->{_id, name, slug, deadline, urgencyLevel},
    ctaType,
    mainImage
  }
`;

// 4. POSTS_BY_REGULATION_QUERY — posts filtered by regulatory tag slug
export const POSTS_BY_REGULATION_QUERY = `
  *[_type == "post" && defined(publishedAt) && $regulationSlug in regulatoryTags[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    author->{name, title, photo},
    icpTags[]->{_id, name, slug, accentColor},
    regulatoryTags[]->{_id, name, slug, deadline, urgencyLevel},
    ctaType,
    mainImage
  }
`;

// 5. RELATED_POSTS_QUERY — 3 posts sharing ICP or regulatory tags, excluding current
export const RELATED_POSTS_QUERY = `
  *[_type == "post" && defined(publishedAt) && slug.current != $currentSlug && (
    count((icpTags[]->slug.current)[@ in $icpSlugs]) > 0 ||
    count((regulatoryTags[]->slug.current)[@ in $regulationSlugs]) > 0
  )] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage
  }
`;

// 6. FEATURED_POST_QUERY — single post where featured == true
export const FEATURED_POST_QUERY = `
  *[_type == "post" && defined(publishedAt) && featured == true] | order(publishedAt desc)[0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    author->{name, title, photo},
    icpTags[]->{_id, name, slug, accentColor},
    regulatoryTags[]->{_id, name, slug, deadline, urgencyLevel},
    mainImage
  }
`;

// 7. ALL_TAGS_QUERY — all ICP tags + regulatory tags for filter UI
export const ALL_TAGS_QUERY = `
  {
    "icpTags": *[_type == "icpTag"] | order(name asc) {
      _id,
      name,
      slug,
      accentColor,
      dedicatedPageLink
    },
    "regulatoryTags": *[_type == "regulatoryTag"] | order(deadline asc) {
      _id,
      name,
      slug,
      deadline,
      urgencyLevel,
      maxPenalty
    }
  }
`;

// 8. POST_COUNT_QUERY — total published post count for pagination
export const POST_COUNT_QUERY = `
  count(*[_type == "post" && defined(publishedAt)])
`;

// Additional helper queries

// All post slugs for generateStaticParams (BL-14)
export const ALL_POST_SLUGS_QUERY = `
  *[_type == "post" && defined(publishedAt)].slug.current
`;

// All ICP tag slugs for generateStaticParams
export const ALL_ICP_SLUGS_QUERY = `
  *[_type == "icpTag"].slug.current
`;

// All regulatory tag slugs for generateStaticParams
export const ALL_REGULATION_SLUGS_QUERY = `
  *[_type == "regulatoryTag"].slug.current
`;

// Posts for dedicated page related posts (BL-07)
export const POSTS_BY_ICP_RECENT_QUERY = `
  *[_type == "post" && defined(publishedAt) && $icpSlug in icpTags[]->slug.current] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage
  }
`;

// All posts for sitemap
export const SITEMAP_POSTS_QUERY = `
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
    slug,
    publishedAt,
    _updatedAt
  }
`;

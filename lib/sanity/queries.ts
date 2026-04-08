// Sanity GROQ queries
// Phase 2: All named exports for blog functionality

// Get all posts
export const allPostsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
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

// Get single post by slug
export const postBySlugQuery = `
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

// Get posts by ICP tag
export const postsByICPQuery = `
  *[_type == "post" && $icpSlug in icpTags[]->slug.current] | order(publishedAt desc) {
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

// Get posts by regulatory tag
export const postsByRegulationQuery = `
  *[_type == "post" && $regulationSlug in regulatoryTags[]->slug.current] | order(publishedAt desc) {
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

// Get featured posts
export const featuredPostsQuery = `
  *[_type == "post" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    author->{name, title, photo},
    icpTags[]->{_id, name, slug, accentColor},
    mainImage
  }
`;

// Get recent posts (excluding current)
export const recentPostsQuery = `
  *[_type == "post" && slug.current != $currentSlug] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage
  }
`;

// Get all ICP tags
export const allICPTagsQuery = `
  *[_type == "icpTag"] | order(name asc) {
    _id,
    name,
    slug,
    accentColor,
    dedicatedPageLink
  }
`;

// Get all regulatory tags
export const allRegulatoryTagsQuery = `
  *[_type == "regulatoryTag"] | order(deadline asc) {
    _id,
    name,
    slug,
    deadline,
    urgencyLevel,
    maxPenalty
  }
`;

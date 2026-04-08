export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  body: any[]; // Portable Text
  author: Author;
  icpTags: ICPTag[];
  regulatoryTags: RegulatoryTag[];
  ctaType: 'scorecard' | 'payer' | 'eu' | 'checklists';
  featured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: any;
  mainImage?: any;
  newsletterInclude: boolean;
}

export interface Author {
  name: string;
  title: string;
  bio?: string;
  photo?: any;
  linkedIn?: string;
}

export interface ICPTag {
  _id: string;
  name: string;
  slug: { current: string };
  accentColor: string;
  dedicatedPageLink?: string;
}

export interface RegulatoryTag {
  _id: string;
  name: string;
  slug: { current: string };
  deadline?: string;
  urgencyLevel: 'critical' | 'high' | 'medium' | 'low';
  maxPenalty?: string;
}

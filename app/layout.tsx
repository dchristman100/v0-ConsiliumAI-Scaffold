import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'ConsiliumAI — Architects of the AI Governance Layer',
  description: 'AI governance made certifiable, insurable, and defendable. By design.',
  metadataBase: new URL('https://consiliumai.co'),
  openGraph: {
    title: 'ConsiliumAI — Architects of the AI Governance Layer',
    description: 'AI governance made certifiable, insurable, and defendable. By design.',
    type: 'website',
    url: 'https://consiliumai.co',
    siteName: 'ConsiliumAI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ConsiliumAI — Architects of the AI Governance Layer',
    description: 'AI governance made certifiable, insurable, and defendable. By design.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0D1B2A',
};

// Organization schema for homepage
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ConsiliumAI',
  url: 'https://consiliumai.co',
  logo: 'https://consiliumai.co/logo.png',
  description: 'AI governance made certifiable, insurable, and defendable. By design.',
  sameAs: [
    'https://www.linkedin.com/company/consiliumai',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'info@consiliumai.co',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Font preloading for performance (Section 5.1) */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap"
          as="style"
        />
        
        {/* Organization schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          style={{
            position: 'absolute',
            left: '-9999px',
            top: 'auto',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
          }}
          className="skip-link"
        >
          Skip to main content
        </a>

        {/* 3px solid gold top bar — PR-02: every page, no gradient, single color, full width */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: '#C9A84C',
            zIndex: 9999,
          }}
          aria-hidden="true"
        />
        
        <div id="main-content">
          {children}
        </div>

        {/* Focus visible styles for accessibility */}
        <style>{`
          .skip-link:focus {
            position: fixed !important;
            left: 16px !important;
            top: 16px !important;
            width: auto !important;
            height: auto !important;
            overflow: visible !important;
            background: var(--gold);
            color: var(--navy);
            padding: 12px 24px;
            z-index: 99999;
            font-family: var(--font-body);
            font-weight: 700;
            font-size: 14px;
            text-decoration: none;
          }

          /* Global focus visible indicator (Section 5.3) */
          *:focus-visible {
            outline: 2px solid var(--gold) !important;
            outline-offset: 2px !important;
          }

          /* Remove outline for mouse users */
          *:focus:not(:focus-visible) {
            outline: none !important;
          }
        `}</style>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'ConsiliumAI — Architects of the AI Governance Layer',
  description: 'AI governance made certifiable, insurable, and defendable. By design.',
  openGraph: {
    title: 'ConsiliumAI — Architects of the AI Governance Layer',
    description: 'AI governance made certifiable, insurable, and defendable. By design.',
    type: 'website',
    url: 'https://consiliumai.co',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
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
        {children}
      </body>
    </html>
  );
}

'use client';

// components/layout/NavWrapper.tsx
// Client wrapper for nav scroll behavior
// FN-06: Nav background darkens with backdrop-filter on scroll

import { useState, useEffect } from 'react';
import MobileDrawer from './MobileDrawer';

interface NavWrapperProps {
  children: React.ReactNode;
}

export default function NavWrapper({ children }: NavWrapperProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: '3px', // Below 3px top bar
        left: 0,
        right: 0,
        background: isScrolled ? 'rgba(10, 15, 28, 0.95)' : 'var(--navy)',
        borderBottom: '1px solid var(--border)',
        zIndex: 9998,
        backdropFilter: isScrolled ? 'blur(8px)' : 'none',
        transition: 'background 0.2s ease, backdrop-filter 0.2s ease',
      }}
    >
      <nav
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {children}
        <MobileDrawer />
      </nav>
    </header>
  );
}

// components/layout/TopBar.tsx
// Server component — no 'use client'
export default function TopBar() {
  return (
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
  );
}

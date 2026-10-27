import React from 'react';

export default function Backdrop() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Soft Vintage Cyanotype Ambient Wash */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[520px] bg-[radial-gradient(ellipse_65%_45%_at_50%_-10%,rgba(49,120,198,0.09),transparent_70%)]" />

      {/* Blueprint Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* Natural Dark Indigo Surface Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a1222]/40 to-[#0a1222]" />
    </div>
  );
}

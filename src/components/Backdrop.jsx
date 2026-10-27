import React from 'react';

export default function Backdrop() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* Soft Cyanotype Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[560px] bg-[radial-gradient(ellipse_60%_40%_at_50%_-5%,rgba(59,130,246,0.08),transparent_70%)]" />

      {/* Subtle Architectural Grid */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Smooth Dark Vignette for maximum text readability and eye comfort */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a1222]/40 to-[#0a1222]" />
    </div>
  );
}

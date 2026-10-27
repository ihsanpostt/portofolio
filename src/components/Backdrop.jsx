import React from 'react';

export default function Backdrop() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* Subtle Cyanotype Ambient Wash (No AI purple/blue neon) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_60%_40%_at_50%_-5%,rgba(49,120,198,0.08),transparent_70%)]" />

      {/* Architectural Blueprint Grid */}
      <div className="absolute inset-0 bg-grid opacity-65" />

      {/* Natural Dark Indigo Vignette to ensure maximum content contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a1222]/50 to-[#0a1222]" />

      {/* Architectural Framing Crosshairs & Technical Drafting Legends */}
      <div className="hidden xl:block absolute top-6 left-6 text-[10px] font-mono text-[#3178c6]/40 tracking-widest uppercase">
        <span className="block">+ [DWG NO: BI-2025-FOLIO]</span>
        <span className="block text-[#1e355b]">POLINEMA • D4 TEKNIK INFORMATIKA</span>
      </div>

      <div className="hidden xl:block absolute top-6 right-6 text-[10px] font-mono text-[#3178c6]/40 tracking-widest uppercase text-right">
        <span className="block">[COORDS: 07°56&apos;S 112°37&apos;E] +</span>
        <span className="block text-[#1e355b]">MALANG / BLITAR, JAWA TIMUR</span>
      </div>

      <div className="hidden xl:block absolute bottom-6 left-6 text-[10px] font-mono text-[#1e355b] tracking-widest uppercase">
        <span>+ [SYSTEM: REACT 19 • TAILWIND • ZERO AI TEMPLATE]</span>
      </div>

      <div className="hidden xl:block absolute bottom-6 right-6 text-[10px] font-mono text-[#1e355b] tracking-widest uppercase text-right">
        <span>[STATUS: VERIFIED & ACCREDITED] +</span>
      </div>

      {/* Corner Registration Crosshairs */}
      <div className="hidden md:block absolute top-4 left-4 w-3 h-3 border-t border-l border-[#3178c6]/30" />
      <div className="hidden md:block absolute top-4 right-4 w-3 h-3 border-t border-r border-[#3178c6]/30" />
      <div className="hidden md:block absolute bottom-4 left-4 w-3 h-3 border-b border-l border-[#3178c6]/30" />
      <div className="hidden md:block absolute bottom-4 right-4 w-3 h-3 border-b border-r border-[#3178c6]/30" />
    </div>
  );
}

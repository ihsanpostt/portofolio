import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#1e355b]/80 bg-[#0a1222] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Brand & Identity */}
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-heading font-bold text-[#f5f0e6] text-sm">
                {personalInfo.name}
              </span>
              <span className="text-[#1e355b]">•</span>
              <span className="text-xs font-mono text-[#4b92e6]">
                POLINEMA Malang
              </span>
            </div>
            <p className="text-xs text-[#9db2d4] font-mono">
              © {CURRENT_YEAR} {personalInfo.name}. D4 Teknik Informatika.
            </p>
          </div>

          {/* Navigation Quicklinks */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-xs font-medium text-[#9db2d4]">
            <button
              onClick={() => scrollTo('hero')}
              className="hover:text-[#f5f0e6] transition-colors py-2 px-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6] rounded-lg cursor-pointer"
            >
              Beranda
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="hover:text-[#f5f0e6] transition-colors py-2 px-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6] rounded-lg cursor-pointer"
            >
              Tentang
            </button>
            <button
              onClick={() => scrollTo('portfolio')}
              className="hover:text-[#f5f0e6] transition-colors py-2 px-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6] rounded-lg cursor-pointer"
            >
              Portofolio
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="hover:text-[#f5f0e6] transition-colors py-2 px-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6] rounded-lg cursor-pointer"
            >
              Kontak
            </button>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-[#0f1a30] hover:bg-[#162544] text-[#9db2d4] hover:text-[#f5f0e6] border border-[#1e355b] hover:border-[#4b92e6]/50 transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6] cursor-pointer shadow-sm"
            aria-label="Kembali ke atas halaman"
            title="Kembali ke atas"
          >
            <ArrowUp className="w-4 h-4" />
          </button>

        </div>

        {/* Architectural Blueprint Colophon */}
        <div className="pt-6 border-t border-[#1e355b]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-[#6780a4]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38a98c]"></span>
            <span>SPEC: REACT 19 • TAILWIND • ARCHITECTURAL VINTAGE BLUE</span>
          </div>
          <div>
            <span>LAT: 07°56&apos;S • LNG: 112°37&apos;E • MALANG, ID</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

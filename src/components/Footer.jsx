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
    <footer className="border-t border-[#1e293b] bg-[#0b0f17] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">

        {/* Brand & Identity */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="font-heading font-bold text-white text-sm">
              {personalInfo.name}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs font-mono text-slate-400">
              POLINEMA Malang
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            © {CURRENT_YEAR} {personalInfo.name}. Politeknik Negeri Malang.
          </p>
        </div>

        {/* Navigation Quicklinks */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-xs font-medium text-slate-400">
          <button
            onClick={() => scrollTo('hero')}
            className="hover:text-white transition-colors py-2 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded cursor-pointer"
          >
            Beranda
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="hover:text-white transition-colors py-2 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded cursor-pointer"
          >
            Tentang
          </button>
          <button
            onClick={() => scrollTo('portfolio')}
            className="hover:text-white transition-colors py-2 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded cursor-pointer"
          >
            Portofolio
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="hover:text-white transition-colors py-2 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded cursor-pointer"
          >
            Kontak
          </button>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-[#0f172a] hover:bg-[#151f32] text-slate-300 hover:text-white border border-[#1e293b] transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Kembali ke atas halaman"
          title="Kembali ke atas"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

      </div>
    </footer>
  );
}

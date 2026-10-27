import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const navItems = [
  { id: 'hero', label: 'Beranda' },
  { id: 'about', label: 'Tentang' },
  { id: 'portfolio', label: 'Portofolio' },
  { id: 'contact', label: 'Kontak' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 py-4 pointer-events-none">
      <nav
        aria-label="Navigasi Utama"
        className={`pointer-events-auto w-full max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-5 py-2.5 rounded-2xl backdrop-blur-xl transition-all duration-200 border ${
          isScrolled
            ? 'bg-[#0f1a30]/90 border-[#1e355b] shadow-lg shadow-black/30'
            : 'bg-[#0f1a30]/75 border-[#1e355b]/70'
        }`}
      >
        {/* Monogram / Brand */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2.5 text-left group min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6] rounded-lg px-1.5"
          aria-label="Kembali ke atas"
        >
          <div className="w-8 h-8 rounded-lg bg-[#3178c6] text-white flex items-center justify-center font-heading font-bold text-sm tracking-tight shadow-sm border border-[#4b92e6]/30">
            BI
          </div>
          <div className="hidden sm:block">
            <span className="font-heading font-bold text-sm text-[#f5f0e6] tracking-tight group-hover:text-[#4b92e6] transition-colors">
              {personalInfo.name}
            </span>
            <span className="block text-[11px] font-mono text-[#9db2d4] leading-none">
              Junior Developer
            </span>
          </div>
        </button>

        {/* Desktop Links with Sliding Active Pill */}
        <div className="hidden md:flex items-center gap-1 bg-[#0a1222]/80 p-1.5 rounded-xl border border-[#1e355b]/80 relative">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative min-h-[38px] px-4 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6] cursor-pointer ${
                  isActive
                    ? 'text-[#f5f0e6] font-semibold'
                    : 'text-[#9db2d4] hover:text-[#f5f0e6]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-[#162544] border border-[#2c4d82] rounded-lg -z-10 shadow-sm"
                  />
                )}
                <span className="font-mono text-[10px] text-[#4b92e6] mr-1.5 opacity-80">0{index + 1}.</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* CTA & Mobile Hamburger */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollTo('contact')}
            className="hidden sm:inline-flex items-center gap-1.5 min-h-[42px] px-4 py-2 rounded-xl text-xs font-semibold bg-[#3178c6] hover:bg-[#2664a7] text-white transition-colors duration-150 shadow-sm border border-[#4b92e6]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6] cursor-pointer"
          >
            <span>Hubungi</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </button>

          {/* Hamburger button for mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-[#9db2d4] hover:text-white bg-[#162544]/70 hover:bg-[#162544] border border-[#1e355b] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6] cursor-pointer"
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Dropdown & Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="pointer-events-auto fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="pointer-events-auto absolute top-20 left-4 right-4 z-50 max-w-md mx-auto bg-[#0f1a30] border border-[#1e355b] rounded-2xl p-3 shadow-2xl space-y-1 md:hidden"
            >
              <div className="px-3 py-1.5 text-[10px] font-mono text-[#6780a4] uppercase tracking-widest border-b border-[#1e355b]/60 mb-1">
                Navigasi Dokumen
              </div>
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                  className={`w-full min-h-[44px] text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                    activeSection === item.id
                      ? 'bg-[#162544] text-[#f5f0e6] font-semibold border border-[#2c4d82]'
                      : 'text-[#9db2d4] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-[#4b92e6]">0{index + 1}</span>
                </button>
              ))}
              <div className="pt-2 border-t border-[#1e355b]">
                <button
                  onClick={() => scrollTo('contact')}
                  className="w-full min-h-[44px] flex items-center justify-center gap-1.5 rounded-xl bg-[#3178c6] text-white text-sm font-semibold hover:bg-[#2664a7] transition-colors cursor-pointer"
                >
                  <span>Mulai Percakapan</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

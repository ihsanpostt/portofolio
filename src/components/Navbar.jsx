import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { useSound } from './SoundContext';

const NAV_ITEMS = [
  { name: 'Beranda', href: '#Home', section: 'Home' },
  { name: 'Tentang', href: '#About', section: 'About' },
  { name: 'Portofolio', href: '#Portofolio', section: 'Portofolio' },
  { name: 'Kontak', href: '#Contact', section: 'Contact' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { soundEnabled, toggleSound } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sectionIds = ['Home', 'About', 'Portofolio', 'Contact'];
      const triggerY = window.innerHeight * 0.38;
      let current = sectionIds[0];

      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= triggerY) {
          current = id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-root ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container glass-surface">
        <nav className="navbar-links">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.section;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`navbar-link-item ${isActive ? 'is-active' : ''}`}
              >
                <span>{item.name}</span>
                {isActive && <span className="navbar-active-pill" />}
              </a>
            );
          })}
        </nav>

        <span className="navbar-mobile-brand" aria-label="IhsanDev.">
          IhsanDev.
        </span>

        <div className="navbar-actions">
          <span className="navbar-actions-divider" aria-hidden="true" />
          <button
            type="button"
            onClick={toggleSound}
            className="navbar-icon-btn"
            title={soundEnabled ? 'Matikan Suara SFX' : 'Nyalakan Suara SFX'}
            aria-label={soundEnabled ? 'Matikan suara' : 'Nyalakan suara'}
            aria-pressed={soundEnabled}
          >
            {soundEnabled ? (
              <Volume2 size={16} className="text-blue-400" />
            ) : (
              <VolumeX size={16} className="text-slate-400" />
            )}
          </button>

          <button
            type="button"
            className="navbar-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Buka menu navigasi"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`navbar-mobile-menu ${mobileMenuOpen ? 'is-open' : ''}`}>
        <div className="navbar-mobile-glass glass-surface">
          <div className="navbar-mobile-inner">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.section;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`navbar-mobile-link ${isActive ? 'is-active' : ''}`}
                >
                  <span>{item.name}</span>
                  {isActive && <span className="navbar-mobile-indicator" />}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}

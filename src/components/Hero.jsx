import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { ArrowRight, Send } from 'lucide-react';
import { personalInfo } from '../data/portofolioData';

// Lazy load Lanyard for performance
const Lanyard = lazy(() => import('./Lanyard'));

const ROLES = personalInfo.roles || [
  "3D Creative Developer",
  "React & Three.js Enthusiast",
  "Junior Developer",
  "Web Development"
];

function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function LinkedinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

export default function Hero({ lanyardIntroStarted = true }) {
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 767px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleType = useCallback(() => {
    const currentRole = ROLES[roleIndex];
    if (isTyping) {
      if (charIndex < currentRole.length) {
        setTypedText(prev => prev + currentRole[charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (charIndex > 0) {
        setTypedText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setRoleIndex(prev => (prev + 1) % ROLES.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, roleIndex]);

  useEffect(() => {
    const timer = setTimeout(handleType, isTyping ? 90 : 45);
    return () => clearTimeout(timer);
  }, [handleType, isTyping]);

  return (
    <section className="hero-root-section" id="Home">
      {/* 3D Lanyard Card hanging */}
      <section className={`lanyard-card-container ${isMobile ? 'is-mobile' : ''}`} aria-label="Interactive 3D Lanyard">
        <div className="lanyard-viewport">
          <Suspense fallback={null}>
            <Lanyard
              frontImage="/assets/frontCard-ihsan.png"
              backImage="/assets/backCard-ihsan.png"
              strapImage="/assets/bandd-ihsan.png"
              cardColor="#04010e09"
              imagePadding={0.035}
              strapColor="#111827"
              finish="glossy"
              anchor={isMobile ? 'center' : 'right'}
              orientation="portrait"
              size={0.62}
              cornerRadius={0.25}
              strapLength={0.59}
              strapWidth={0.62}
              gravity={1.2}
              damping={0.35}
              elasticity={0.7}
              breeze={0.1}
              interactive={true}
              autoFlip={true}
              metal="silver"
              intro={lanyardIntroStarted}
            />
          </Suspense>
        </div>
      </section>

      {/* Hero Text Column */}
      <div className="hero-container-inner">
        <div className="hero-text-col">
          <div className="hero-status-pill">
            <span className="hero-status-ping-wrap">
              <span className="hero-status-ping" />
              <span className="hero-status-dot" />
            </span>
            <span className="hero-status-text">Mahasiswa D4 TI POLINEMA &bull; Junior Web Developer</span>
          </div>

          <div className="hero-heading-group">
            <h1 className="hero-h1-primary">Selamat Datang di</h1>
            <h1 className="hero-h1-accent">
              <span className="hero-gradient-text">Portofolio</span> <span className="hero-white-text">Saya</span>
            </h1>
          </div>

          <div className="hero-typewriter-row">
            <span className="hero-typewriter-text">{typedText}</span>
            <span className="hero-typewriter-cursor" />
          </div>

          <p className="hero-description-copy">
            {personalInfo.bio}
          </p>

          <div className="hero-action-row">
            <a href="#Portofolio" className="hero-btn-primary">
              <span>Lihat Proyek</span>
              <ArrowRight size={16} />
            </a>
            <a href="#Contact" className="hero-btn-secondary">
              <span>Hubungi Saya</span>
              <Send size={15} />
            </a>
          </div>

          <div className="hero-find-me-wrap">
            <span className="hero-find-me-label">Terhubung</span>
            <div className="hero-social-buttons">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-icon-btn"
                aria-label="Profil GitHub"
                title="Profil GitHub"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-icon-btn"
                aria-label="Profil LinkedIn"
                title="Profil LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href={personalInfo.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-icon-btn"
                aria-label="Profil Instagram"
                title="Profil Instagram"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

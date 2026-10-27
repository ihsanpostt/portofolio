import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  FileText, 
  MapPin, 
  FolderGit2, 
  GitBranch, 
  GraduationCap, 
  Code2, 
  Mail 
} from 'lucide-react';
import { Github, Linkedin, Instagram } from './Icons';
import { personalInfo, statsData } from '../data/portfolioData';
import CvModal from './CvModal';

const iconMap = {
  FolderGit2: FolderGit2,
  GitBranch: GitBranch,
  GraduationCap: GraduationCap,
  Code2: Code2
};

export default function Hero() {
  const [cvModalOpen, setCvModalOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStatClick = (id) => {
    if (id === 'stats-projects') {
      window.dispatchEvent(new CustomEvent('switchPortfolioTab', { detail: 'projects' }));
      scrollTo('portfolio');
    } else if (id === 'stats-focus') {
      window.dispatchEvent(new CustomEvent('switchPortfolioTab', { detail: 'tech' }));
      scrollTo('portfolio');
    } else if (id === 'stats-commits') {
      window.open(personalInfo.socials.github, '_blank', 'noreferrer');
    } else if (id === 'stats-edu') {
      scrollTo('about');
    }
  };

  return (
    <section id="hero" className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Bio, Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Status Pill Badge with Direct Contact Shortcut */}
            <button
              onClick={() => scrollTo('contact')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0f1a30] hover:bg-[#162544] border border-[#1e355b] hover:border-[#d4a359]/60 text-xs font-mono text-[#9db2d4] transition-colors cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6]"
              title="Klik untuk membuka formulir diskusi atau tawaran proyek"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38a98c] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38a98c]"></span>
              </span>
              <span className="group-hover:text-[#f5f0e6] transition-colors">{personalInfo.status}</span>
            </button>

            {/* Main Headline with Vintage Editorial Serif Accent */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#f5f0e6] tracking-tight leading-[1.18] font-heading">
              Membangun antarmuka web yang{' '}
              <span className="text-[#4b92e6] italic font-normal">
                terstruktur, cepat, dan presisi.
              </span>
            </h1>

            {/* Natural Human Subtitle */}
            <p className="text-[#9db2d4] text-sm sm:text-base leading-relaxed max-w-xl">
              Halo, saya <strong className="text-[#f5f0e6] font-semibold">{personalInfo.name}</strong>. Mahasiswa D4 Teknik Informatika Politeknik Negeri Malang (POLINEMA) dan pengembang web junior yang berfokus pada ekosistem React, arsitektur antarmuka modern, dan penyelesaian solusi nyata.
            </p>

            {/* CTA Buttons: Responsive on 360px with full touch targets */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => scrollTo('portfolio')}
                className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-xl font-medium text-sm text-white bg-[#3178c6] hover:bg-[#2664a7] transition-colors duration-150 shadow-sm border border-[#4b92e6]/30 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6] cursor-pointer"
              >
                <span>Jelajahi Proyek</span>
                <ArrowRight className="w-4 h-4 opacity-80" />
              </button>

              <button
                onClick={() => setCvModalOpen(true)}
                className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl font-medium text-sm text-[#f5f0e6] bg-[#0f1a30] hover:bg-[#162544] border border-[#1e355b] hover:border-[#2c4d82] transition-colors duration-150 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6] cursor-pointer"
                title="Buka pratinjau CV, cetak PDF, atau unduh ringkasan"
              >
                <FileText className="w-4 h-4 text-[#9db2d4]" />
                <span>Lihat & Unduh CV</span>
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl font-medium text-sm text-[#9db2d4] hover:text-[#f5f0e6] bg-transparent hover:bg-white/5 border border-transparent hover:border-[#1e355b] transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#9db2d4]" />
                <span>Kontak</span>
              </button>
            </div>

            {/* Social Links Row */}
            <div className="flex items-center gap-4 pt-4 border-t border-[#1e355b]/70">
              <span className="text-xs font-mono text-[#6780a4] uppercase tracking-wider">
                Profil:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-[#9db2d4] hover:text-[#f5f0e6] hover:bg-[#0f1a30] border border-transparent hover:border-[#1e355b] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6]"
                  aria-label="Profil GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-[#9db2d4] hover:text-[#f5f0e6] hover:bg-[#0f1a30] border border-transparent hover:border-[#1e355b] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6]"
                  aria-label="Profil LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-[#9db2d4] hover:text-[#f5f0e6] hover:bg-[#0f1a30] border border-transparent hover:border-[#1e355b] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6]"
                  aria-label="Profil Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Clean Professional Developer Portrait */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-sm rounded-2xl bg-[#0f1a30] border border-[#1e355b] p-3 shadow-xl">
              {/* Photo Frame */}
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-[#0a1222] border border-[#1e355b]/60">
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  width="400"
                  height="500"
                  className="w-full h-full object-cover object-[center_60%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a30] via-transparent to-transparent opacity-60" />
              </div>

              {/* Bottom Details Card */}
              <div className="p-3 pt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-[#f5f0e6] font-heading">
                      {personalInfo.name}
                    </h2>
                    <p className="text-xs font-mono text-[#9db2d4]">
                      D4 Teknik Informatika
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#38a98c]/15 text-[#38a98c] text-xs font-mono border border-[#38a98c]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38a98c]"></span>
                    POLINEMA
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#1e355b] text-xs text-[#9db2d4] font-mono">
                  <MapPin className="w-3.5 h-3.5 text-[#4b92e6] shrink-0" />
                  <span>{personalInfo.location}</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Metrics Strip (Interactive Shortcuts) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-[#0f1a30] border border-[#1e355b]">
          {statsData.map((stat, idx) => {
            const Icon = iconMap[stat.icon] || Code2;
            return (
              <div 
                key={stat.id}
                onClick={() => handleStatClick(stat.id)}
                className={`space-y-1 cursor-pointer group p-2 rounded-xl hover:bg-white/[0.04] transition-colors ${idx !== 0 ? 'md:border-l md:border-[#1e355b] md:pl-6' : ''}`}
                title="Klik untuk melihat rincian terkait"
              >
                <div className="flex items-center gap-2 text-[#9db2d4] mb-1 group-hover:text-[#4b92e6] transition-colors">
                  <Icon className="w-4 h-4 text-[#3178c6]" />
                  <span className="text-xs font-mono font-medium">{stat.label}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-[#f5f0e6] font-heading tracking-tight group-hover:text-[#4b92e6] transition-colors">
                  {stat.value}
                </div>
                <p className="text-xs text-[#6780a4] leading-normal">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>

      </div>

      {/* Interactive CV Modal with Print-to-PDF & Text Download */}
      <CvModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Calendar,
  Layers,
  Award,
  Cpu,
  CheckCircle2,
  X,
  Eye,
  ShieldCheck,
  ArrowRight,
  FileText
} from 'lucide-react';
import { Github } from './Icons';
import { projectsData, certificatesData, techStackCategories } from '../data/portfolioData';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'certificates' | 'tech'
  const [projectFilter, setProjectFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const categories = ['All', 'Web App', 'AI / Computer Vision'];

  useEffect(() => {
    if (selectedProject || selectedCertificate) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setSelectedProject(null);
          setSelectedCertificate(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedProject, selectedCertificate]);

  useEffect(() => {
    const handleSwitchTab = (e) => {
      if (e.detail) {
        setActiveTab(e.detail);
      }
    };
    window.addEventListener('switchPortfolioTab', handleSwitchTab);
    return () => window.removeEventListener('switchPortfolioTab', handleSwitchTab);
  }, []);

  const filteredProjects = projectsData.filter((item) => {
    if (projectFilter === 'All') return true;
    return item.category.toLowerCase().includes(projectFilter.toLowerCase());
  });

  return (
    <section id="portfolio" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#1e355b]/70">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Section Header */}
        <div className="space-y-3 max-w-2xl text-left">
          <span className="text-xs font-medium text-[#4b92e6] uppercase tracking-wider block">
            Karya & Kualifikasi
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#f5f0e6] font-heading tracking-tight">
            Portofolio & Kemampuan
          </h2>
          <p className="text-[#cbd5e1] text-sm sm:text-base leading-relaxed">
            Daftar aplikasi web yang pernah saya rancang, sertifikat resmi kepanitiaan di POLINEMA, serta susunan teknologi yang saya gunakan.
          </p>
        </div>

        {/* Main Tab Switcher: Full responsive grid with Fluid Sliding Pill */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 rounded-2xl bg-[#0a1222] border border-[#1e355b] relative">
          <button
            onClick={() => setActiveTab('projects')}
            className={`relative min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer z-10 ${
              activeTab === 'projects'
                ? 'text-white'
                : 'text-[#cbd5e1] hover:text-[#f5f0e6]'
            }`}
          >
            {activeTab === 'projects' && (
              <motion.div
                layoutId="portfolioActiveTab"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className="absolute inset-0 bg-[#3178c6] rounded-xl -z-10 shadow-sm border border-[#4b92e6]/30"
              />
            )}
            <Layers className="w-4 h-4 shrink-0" />
            <span>Proyek Unggulan ({projectsData.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`relative min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer z-10 ${
              activeTab === 'certificates'
                ? 'text-white'
                : 'text-[#cbd5e1] hover:text-[#f5f0e6]'
            }`}
          >
            {activeTab === 'certificates' && (
              <motion.div
                layoutId="portfolioActiveTab"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className="absolute inset-0 bg-[#3178c6] rounded-xl -z-10 shadow-sm border border-[#4b92e6]/30"
              />
            )}
            <Award className="w-4 h-4 shrink-0" />
            <span>Sertifikat Resmi ({certificatesData.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('tech')}
            className={`relative min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer z-10 ${
              activeTab === 'tech'
                ? 'text-white'
                : 'text-[#cbd5e1] hover:text-[#f5f0e6]'
            }`}
          >
            {activeTab === 'tech' && (
              <motion.div
                layoutId="portfolioActiveTab"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className="absolute inset-0 bg-[#3178c6] rounded-xl -z-10 shadow-sm border border-[#4b92e6]/30"
              />
            )}
            <Cpu className="w-4 h-4 shrink-0" />
            <span>Keahlian & Teknologi</span>
          </button>
        </div>

        {/* ================= TAB 1: PROJECTS ================= */}
        {activeTab === 'projects' && (
          <div className="space-y-8">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-[#6780a4] mr-2">Filter Kategori:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProjectFilter(cat)}
                  className={`min-h-[36px] px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                    projectFilter === cat
                      ? 'bg-[#3178c6]/20 text-[#63a3ed] border border-[#3178c6]/40 font-semibold'
                      : 'text-[#9db2d4] hover:text-[#f5f0e6] bg-[#0f1a30] border border-[#1e355b]'
                  }`}
                >
                  {cat === 'All' ? 'Semua Kategori' : cat}
                </button>
              ))}
            </div>

            {/* Projects Grid with Blueprint Crosshair */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="blueprint-crosshair rounded-2xl card-premium overflow-hidden flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    {/* Consistent 16:9 Image Frame */}
                    <div 
                      onClick={() => setSelectedProject(project)}
                      className="relative aspect-[16/9] w-full overflow-hidden bg-[#0a1222] border-b border-[#1e355b]/60 cursor-pointer"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        width="600"
                        height="338"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0a1222]/90 border border-[#1e355b] text-[11px] font-mono text-[#4b92e6] font-medium shadow-sm">
                        {project.category}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <h3 
                        onClick={() => setSelectedProject(project)}
                        className="text-lg font-bold text-[#f5f0e6] font-heading group-hover:text-[#4b92e6] transition-colors cursor-pointer leading-snug"
                      >
                        {project.title}
                      </h3>

                      <p className="text-[#9db2d4] text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tags.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md bg-[#162544] border border-[#1e355b] text-[11px] font-mono text-[#9db2d4]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="p-5 sm:p-6 pt-0 border-t border-[#1e355b]/60 mt-4 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-semibold text-[#4b92e6] hover:text-[#7bb3f4] flex items-center gap-1.5 py-2 cursor-pointer"
                    >
                      <span>Lihat Rincian</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-[#9db2d4] hover:text-white bg-[#162544] hover:bg-[#1e355b] border border-[#1e355b] transition-colors"
                        aria-label={`Buka repositori GitHub untuk ${project.title}`}
                        title="Buka Repositori GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      {project.liveUrl && project.liveUrl !== 'https://github.com/ihsanpostt' && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-[#9db2d4] hover:text-white bg-[#162544] hover:bg-[#1e355b] border border-[#1e355b] transition-colors"
                          aria-label={`Buka demo langsung ${project.title}`}
                          title="Buka Demo Langsung"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 2: CERTIFICATES ================= */}
        {activeTab === 'certificates' && (
          <div className="max-w-2xl mx-auto">
            {certificatesData.map((cert) => (
              <div
                key={cert.id}
                className="blueprint-crosshair rounded-2xl bg-[#0f1a30] border border-[#1e355b] hover:border-[#2c4d82] transition-all overflow-hidden flex flex-col group shadow-xl"
              >
                {/* Certificate Preview Frame */}
                <div 
                  onClick={() => setSelectedCertificate(cert)}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-[#0a1222] border-b border-[#1e355b]/60 cursor-pointer"
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="500"
                    className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0a1222]/90 border border-[#38a98c]/40 flex items-center gap-1.5 text-xs font-mono text-[#38a98c]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Terverifikasi POLINEMA</span>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono text-[#9db2d4]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#3178c6]" />
                        <span>{cert.date}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-[#3178c6]/15 text-[#8ec0f9] border border-[#3178c6]/30">
                        {cert.role}
                      </span>
                    </div>

                    <h3 
                      onClick={() => setSelectedCertificate(cert)}
                      className="text-lg sm:text-xl font-bold text-[#f5f0e6] font-heading group-hover:text-[#4b92e6] transition-colors cursor-pointer leading-snug"
                    >
                      {cert.title}
                    </h3>

                    <p className="text-xs font-medium text-[#9db2d4]">
                      {cert.issuer}
                    </p>

                    <p className="text-xs text-[#6780a4] font-mono pt-1">
                      Diberikan Kepada: <strong className="text-[#f5f0e6]">{cert.recipient}</strong>
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#162544] border border-[#1e355b] text-xs font-mono text-[#9db2d4]">
                    Nomor Sertifikat: <span className="text-[#4b92e6] font-semibold">{cert.credentialId}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((s, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-[#162544] border border-[#1e355b] text-[11px] font-mono text-[#9db2d4]">
                        {s}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedCertificate(cert)}
                    className="w-full min-h-[44px] py-2.5 rounded-xl bg-[#3178c6] hover:bg-[#2664a7] text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 border border-[#4b92e6]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6] cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Buka Rincian & Gambar Utuh</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= TAB 3: TECH STACK ================= */}
        {activeTab === 'tech' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techStackCategories.map((cat) => (
              <div
                key={cat.id}
                className="p-6 sm:p-7 rounded-2xl bg-[#0f1a30] border border-[#1e355b] space-y-4 shadow-lg"
              >
                <div>
                  <h3 className="text-lg font-bold text-[#f5f0e6] font-heading">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#9db2d4] leading-relaxed mt-1">
                    {cat.description}
                  </p>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-[#1e355b]">
                  {cat.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="p-3 rounded-xl bg-[#162544] border border-[#1e355b]/70 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="text-sm font-semibold text-[#f5f0e6]">
                          {item.name}
                        </div>
                        <div className="text-xs text-[#9db2d4] leading-snug">
                          {item.note}
                        </div>
                      </div>
                      <span className="shrink-0 text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-[#3178c6]/15 text-[#8ec0f9] border border-[#3178c6]/30">
                        {item.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= MODAL: DETAIL PROJECT ================= */}
        <AnimatePresence>
          {selectedProject && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={(e) => {
                if (e.target === e.currentTarget) setSelectedProject(null);
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-[#0f1a30] p-6 sm:p-8 rounded-2xl border border-[#1e355b] shadow-2xl space-y-6 relative"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-5 right-5 p-2 rounded-xl text-[#9db2d4] hover:text-white bg-[#162544] hover:bg-[#1e355b] border border-[#1e355b] transition-colors"
                  aria-label="Tutup jendela rincian"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#3178c6]/15 text-[#8ec0f9] text-xs font-mono font-medium border border-[#3178c6]/30">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl font-bold text-[#f5f0e6] font-heading">
                    {selectedProject.title}
                  </h3>
                </div>

                <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#0a1222] border border-[#1e355b]">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    decoding="async"
                    width="800"
                    height="450"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4 text-sm text-[#9db2d4] leading-relaxed">
                  <p className="text-[#f5f0e6]/90">{selectedProject.longDescription}</p>

                  <div className="p-4 rounded-xl bg-[#162544] border border-[#1e355b] space-y-2">
                    <span className="text-xs font-mono text-[#6780a4] uppercase tracking-wider block">
                      Sorotan Fitur:
                    </span>
                    {selectedProject.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[#f5f0e6]">
                        <CheckCircle2 className="w-4 h-4 text-[#38a98c] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2.5 py-1 rounded-md bg-[#162544] border border-[#1e355b] text-xs font-mono text-[#9db2d4]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#1e355b]">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:flex-1 min-h-[44px] py-2.5 rounded-xl bg-[#3178c6] hover:bg-[#2664a7] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border border-[#4b92e6]/30 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Lihat Repositori & Kode di GitHub</span>
                  </a>
                  {selectedProject.liveUrl && selectedProject.liveUrl !== 'https://github.com/ihsanpostt' && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl bg-[#162544] hover:bg-[#1e355b] text-[#f5f0e6] border border-[#1e355b] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Demo Langsung</span>
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ================= MODAL: DETAIL CERTIFICATE ================= */}
        <AnimatePresence>
          {selectedCertificate && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={(e) => {
                if (e.target === e.currentTarget) setSelectedCertificate(null);
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-[#0f1a30] p-6 sm:p-8 rounded-2xl border border-[#1e355b] shadow-2xl space-y-6 relative"
              >
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="absolute top-5 right-5 p-2 rounded-xl text-[#9db2d4] hover:text-white bg-[#162544] hover:bg-[#1e355b] border border-[#1e355b] transition-colors"
                  aria-label="Tutup jendela rincian sertifikat"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="rounded-xl overflow-hidden bg-[#0a1222] border border-[#1e355b]">
                  <img
                    src={selectedCertificate.image}
                    alt={selectedCertificate.title}
                    decoding="async"
                    width="1200"
                    height="765"
                    className="w-full h-auto object-contain max-h-[50vh] mx-auto"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-md bg-[#3178c6]/15 text-[#8ec0f9] text-xs font-mono border border-[#3178c6]/30">
                      {selectedCertificate.date}
                    </span>
                    <span className="text-xs font-mono text-[#9db2d4]">
                      No: <strong className="text-[#f5f0e6]">{selectedCertificate.credentialId}</strong>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-[#38a98c]/15 text-[#38a98c] text-xs font-mono border border-[#38a98c]/30">
                      {selectedCertificate.role}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#f5f0e6] font-heading">
                    {selectedCertificate.title}
                  </h3>

                  <div className="p-4 rounded-xl bg-[#162544] border border-[#1e355b] space-y-2 text-xs sm:text-sm">
                    <p className="text-[#f5f0e6]/90">
                      <span className="text-[#6780a4] font-mono block text-xs">Lembaga Penerbit:</span>
                      <strong className="text-[#f5f0e6]">{selectedCertificate.issuer}</strong>
                    </p>
                    <p className="text-[#f5f0e6]/90">
                      <span className="text-[#6780a4] font-mono block text-xs">Diberikan Kepada:</span>
                      <strong className="text-[#4b92e6]">{selectedCertificate.recipient}</strong>
                    </p>
                    <p className="text-[#9db2d4] text-xs pt-1 border-t border-[#1e355b]">
                      <span className="font-mono">Mengetahui:</span> {selectedCertificate.signatories}
                    </p>
                  </div>

                  <p className="text-[#f5f0e6]/90 text-sm leading-relaxed">
                    {selectedCertificate.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#1e355b]">
                  <a
                    href={selectedCertificate.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:flex-1 min-h-[44px] py-2.5 rounded-xl bg-[#3178c6] hover:bg-[#2664a7] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border border-[#4b92e6]/30 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#38a98c]" />
                    <span>Laman Resmi POLINEMA</span>
                  </a>
                  {selectedCertificate.pdfUrl && (
                    <a
                      href={selectedCertificate.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl bg-[#3178c6]/15 hover:bg-[#3178c6]/25 text-[#8ec0f9] border border-[#3178c6]/35 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Dokumen PDF</span>
                    </a>
                  )}
                  <a
                    href={selectedCertificate.image}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl bg-[#162544] hover:bg-[#1e355b] text-[#f5f0e6] border border-[#1e355b] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Eye className="w-4 h-4 text-[#9db2d4]" />
                    <span>Buka Gambar Asli</span>
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

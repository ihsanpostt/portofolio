import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Award
} from 'lucide-react';
import { personalInfo, educationHistory, experienceHistory } from '../data/portfolioData';

export default function About() {
  const [activeTab, setActiveTab] = useState('education'); // 'education' | 'experience'

  return (
    <section id="about" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#1e355b]/70">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Section Header */}
        <div className="space-y-3 max-w-2xl text-left">
          <span className="text-xs font-mono font-medium text-[#4b92e6] uppercase tracking-wider">
            Tentang & Perjalanan
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#f5f0e6] font-heading tracking-tight">
            Latar Belakang & Pengalaman
          </h2>
          <p className="text-[#9db2d4] text-sm sm:text-base leading-relaxed">
            Kombinasi antara studi ilmu komputer di POLINEMA, latihan mandiri membangun aplikasi web, dan pengalaman kepanitiaan nyata di lapangan.
          </p>
        </div>

        {/* Overview Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Bio Card */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-[#0f1a30] border border-[#1e355b] space-y-4 flex flex-col justify-between shadow-lg">
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#6780a4] uppercase tracking-wider">
                Profil Ringkas
              </span>
              <p className="text-[#f5f0e6] text-sm sm:text-base leading-relaxed">
                {personalInfo.bio}
              </p>
              <p className="text-[#9db2d4] text-sm leading-relaxed">
                Saya meyakini bahwa kemampuan koding teknis harus diimbangi dengan komunikasi yang jelas, kemampuan bekerja sama dalam tim, dan pemahaman kebutuhan pengguna yang sesungguhnya.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#1e355b] text-xs font-mono text-[#9db2d4]">
              <div className="p-3 rounded-xl bg-[#162544] border border-[#1e355b]/70">
                <span className="text-[#6780a4] block text-[11px] mb-1">Status Akademis</span>
                <span className="text-[#f5f0e6] font-semibold">D4 Teknik Informatika</span>
              </div>
              <div className="p-3 rounded-xl bg-[#162544] border border-[#1e355b]/70">
                <span className="text-[#6780a4] block text-[11px] mb-1">Fokus Utama</span>
                <span className="text-[#f5f0e6] font-semibold">Frontend Web & React</span>
              </div>
              <div className="p-3 rounded-xl bg-[#162544] border border-[#1e355b]/70">
                <span className="text-[#6780a4] block text-[11px] mb-1">Domisili</span>
                <span className="text-[#f5f0e6] font-semibold">Malang & Blitar, ID</span>
              </div>
            </div>
          </div>

          {/* Quick Facts Card */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-[#0f1a30] border border-[#1e355b] flex flex-col justify-between space-y-4 shadow-lg">
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#6780a4] uppercase tracking-wider">
                Prinsip Bekerja
              </span>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#f5f0e6]/90">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#38a98c] shrink-0 mt-0.5" />
                  <span><strong>Clean & Reusable:</strong> Struktur kode modular dan mudah dirawat.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#38a98c] shrink-0 mt-0.5" />
                  <span><strong>Responsif & Aksesibel:</strong> Tampilan konsisten di segala ukuran layar.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#38a98c] shrink-0 mt-0.5" />
                  <span><strong>Team-Oriented:</strong> Pengalaman nyata berkoordinasi dalam event besar.</span>
                </li>
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-[#3178c6]/15 border border-[#3178c6]/30 text-xs text-[#8ec0f9]">
              Siap berkontribusi dalam posisi magang atau proyek web modern.
            </div>
          </div>

        </div>

        {/* Timeline Section: Pendidikan vs Pengalaman */}
        <div className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1e355b] pb-4">
            <h3 className="text-xl font-bold text-[#f5f0e6] font-heading">
              Riwayat Pendidikan & Aktivitas
            </h3>

            {/* Tab Switcher: Full width grid on 360px mobile */}
            <div className="w-full sm:w-auto grid grid-cols-2 p-1 rounded-xl bg-[#0f1a30] border border-[#1e355b]">
              <button
                onClick={() => setActiveTab('education')}
                className={`min-h-[40px] px-3 sm:px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5 sm:gap-2 ${
                  activeTab === 'education'
                    ? 'bg-[#3178c6] text-white font-semibold shadow-sm border border-[#4b92e6]/30'
                    : 'text-[#9db2d4] hover:text-[#f5f0e6]'
                }`}
              >
                <GraduationCap className="w-4 h-4 shrink-0" />
                <span>Pendidikan</span>
              </button>
              <button
                onClick={() => setActiveTab('experience')}
                className={`min-h-[40px] px-3 sm:px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5 sm:gap-2 ${
                  activeTab === 'experience'
                    ? 'bg-[#3178c6] text-white font-semibold shadow-sm border border-[#4b92e6]/30'
                    : 'text-[#9db2d4] hover:text-[#f5f0e6]'
                }`}
              >
                <Briefcase className="w-4 h-4 shrink-0" />
                <span>Kepanitiaan</span>
              </button>
            </div>
          </div>

          {/* Timeline Cards */}
          <AnimatePresence mode="wait">
            {activeTab === 'education' ? (
              <motion.div
                key="education-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {educationHistory.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-6 rounded-2xl bg-[#0f1a30] border border-[#1e355b] hover:border-[#2c4d82] transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-[#4b92e6] font-medium">
                            {edu.period}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-[#162544] border border-[#1e355b] text-[11px] font-mono text-[#9db2d4]">
                            {edu.statusBadge}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-[#f5f0e6] font-heading">
                          {edu.degree}
                        </h4>
                        <p className="text-xs font-medium text-[#9db2d4]">
                          {edu.institution} • <span className="text-[#6780a4]">{edu.location}</span>
                        </p>
                      </div>
                    </div>

                    <p className="text-[#f5f0e6]/90 text-sm leading-relaxed">
                      {edu.description}
                    </p>

                    {edu.achievements && (
                      <div className="pt-2 border-t border-[#1e355b]/70 space-y-1.5">
                        <span className="text-xs font-mono text-[#6780a4] uppercase tracking-wider block mb-1">
                          Fokus & Pencapaian:
                        </span>
                        {edu.achievements.map((ach, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#9db2d4]">
                            <ArrowRight className="w-3.5 h-3.5 text-[#4b92e6] shrink-0 mt-1" />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="experience-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {experienceHistory.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-6 rounded-2xl bg-[#0f1a30] border border-[#1e355b] hover:border-[#2c4d82] transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-[#4b92e6] font-medium">
                            {exp.period}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-[#3178c6]/15 border border-[#3178c6]/30 text-[11px] font-mono text-[#8ec0f9]">
                            {exp.badge}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-[#f5f0e6] font-heading">
                          {exp.role}
                        </h4>
                        <p className="text-xs font-medium text-[#9db2d4]">
                          {exp.company} • <span className="text-[#6780a4]">{exp.location}</span>
                        </p>
                      </div>
                    </div>

                    <p className="text-[#f5f0e6]/90 text-sm leading-relaxed">
                      {exp.description}
                    </p>

                    {exp.keyPoints && (
                      <div className="pt-2 border-t border-[#1e355b]/70 space-y-1.5">
                        <span className="text-xs font-mono text-[#6780a4] uppercase tracking-wider block mb-1">
                          Tanggung Jawab & Kontribusi:
                        </span>
                        {exp.keyPoints.map((pt, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#9db2d4]">
                            <ArrowRight className="w-3.5 h-3.5 text-[#4b92e6] shrink-0 mt-1" />
                            <span>{pt}</span>
                          </div>
                        ))}
                        {exp.id === 'exp-prastudi' && (
                          <div className="pt-2">
                            <button
                              onClick={() => {
                                window.dispatchEvent(new CustomEvent('switchPortfolioTab', { detail: 'certificates' }));
                                const el = document.getElementById('portfolio');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#3178c6]/15 hover:bg-[#3178c6]/25 text-[#8ec0f9] text-xs font-semibold border border-[#3178c6]/35 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6] cursor-pointer"
                            >
                              <Award className="w-3.5 h-3.5" />
                              <span>Lihat Sertifikat Resmi Prastudi 2025</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

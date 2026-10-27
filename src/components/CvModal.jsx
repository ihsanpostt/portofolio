import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Printer, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  GraduationCap,
  Briefcase,
  Code2
} from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { personalInfo, educationHistory, experienceHistory } from '../data/portfolioData';

export default function CvModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTxt = () => {
    const textContent = `CURRICULUM VITAE
==================================================
${personalInfo.name.toUpperCase()}
${personalInfo.tagline}
Lokasi   : ${personalInfo.location}
Surel    : ${personalInfo.email}
Telepon  : ${personalInfo.phone}
WhatsApp : ${personalInfo.whatsapp}
GitHub   : ${personalInfo.socials.github}
LinkedIn : ${personalInfo.socials.linkedin}

--------------------------------------------------
RINGKASAN PROFIL
--------------------------------------------------
${personalInfo.bio}

--------------------------------------------------
PENDIDIKAN
--------------------------------------------------
* Politeknik Negeri Malang (POLINEMA) (2024 - Sekarang)
  D4 Teknik Informatika - Mahasiswa Aktif
  Fokus: Pemrograman Web, Struktur Data & Algoritma, Basis Data, AI Terapan.

* SMA Negeri 1 Blitar (SMASA) (2021 - 2024)
  MIPA (Matematika & IPA)

--------------------------------------------------
PROYEK UNGGULAN
--------------------------------------------------
1. Astra Realty — Portal Perumahan & Simulasi KPR
   Teknologi: React, Tailwind CSS, JavaScript
   Rincian  : Katalog interaktif terintegrasi simulasi angsuran KPR real-time.
   Repositori: https://github.com/ihsanpostt/web-perumahan

2. SPK Analytics — Sistem Pendukung Keputusan
   Teknologi: React, Tailwind CSS, Algoritma SPK (AHP/SAW/TOPSIS), Chart.js
   Rincian  : Pengambilan keputusan multi-kriteria untuk analisis alternatif objektif.
   Repositori: https://github.com/ihsanpostt/sistem-pendukung-keputusan

3. HerbScan — Deteksi Daun Herbal Berbasis AI
   Teknologi: Python, Convolutional Neural Network (CNN), React, Tailwind
   Rincian  : Klasifikasi citra daun tanaman obat dengan rekomendasi khasiat medis.
   Repositori: https://github.com/ihsanpostt/herbscan-ai-detection

--------------------------------------------------
PENGALAMAN & KEPANITIAAN
--------------------------------------------------
* Panitia Pelaksana Prastudi Maba JTI POLINEMA 2025 (Agustus 2025)
  Himpunan Mahasiswa Teknologi Informasi (HMTI) POLINEMA
  Sertifikat Resmi No: 21069/PL2.3/KM/2025
* Panitia Pelaksana SMASA Championship (SCHAMP) (2023 - 2024)
  SMAN 1 Blitar - Manajemen alur turnamen olahraga & seni regional.
* Pengurus & Panitia Kontingen DBL (2023 - 2024)
  Honda DBL Jawa Timur

--------------------------------------------------
KEAHLIAN TEKNIS
--------------------------------------------------
* Bahasa Pemrograman : JavaScript (ES6+), HTML5, CSS3, SQL, Python Dasar
* Framework & Libs   : React, Tailwind CSS, Framer Motion, Vite
* Backend & Database : REST API, Node.js dasar, PostgreSQL, MySQL
* Alat Kolaborasi    : Git, GitHub, VS Code, Postman
==================================================
`;
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CV_${personalInfo.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.15 }}
        className="w-full max-w-3xl my-8 bg-[#0f1a30] rounded-2xl border border-[#1e355b] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header Bar (no-print) */}
        <div className="no-print p-3 sm:p-5 border-b border-[#1e355b] bg-[#162544] flex items-center justify-between gap-2 sm:gap-3 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#38a98c] shrink-0" />
            <h3 className="text-xs sm:text-base font-bold text-[#f5f0e6] font-heading truncate">
              <span className="hidden sm:inline">Curriculum Vitae — {personalInfo.name}</span>
              <span className="sm:hidden">CV — {personalInfo.name}</span>
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="min-h-[38px] px-3.5 py-1.5 rounded-lg bg-[#3178c6] hover:bg-[#2664a7] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm border border-[#4b92e6]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6] cursor-pointer"
              title="Cetak atau simpan sebagai PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cetak / Simpan PDF</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              className="min-h-[38px] px-3 py-1.5 rounded-lg bg-[#0f1a30] hover:bg-[#162544] text-[#9db2d4] hover:text-[#f5f0e6] border border-[#1e355b] text-xs font-medium flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6] cursor-pointer"
              title="Unduh salinan teks biasa"
            >
              <Download className="w-3.5 h-3.5 text-[#9db2d4]" />
              <span className="hidden sm:inline">Unduh .TXT</span>
            </button>

            <button
              onClick={onClose}
              className="min-h-[38px] min-w-[38px] p-2 rounded-lg text-[#9db2d4] hover:text-white bg-[#0f1a30] hover:bg-[#162544] border border-[#1e355b] transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6]"
              aria-label="Tutup jendela CV"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable & Scrollable Content */}
        <div 
          id="cv-printable-area" 
          className="p-6 sm:p-10 overflow-y-auto space-y-8 text-[#f5f0e6] bg-[#0f1a30] print:bg-white print:text-slate-900"
        >
          {/* Identity Header */}
          <div className="border-b border-[#1e355b] print:border-slate-300 pb-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#f5f0e6] print:text-slate-900 font-heading">
                  {personalInfo.name}
                </h1>
                <p className="text-sm sm:text-base font-semibold text-[#4b92e6] print:text-blue-700">
                  {personalInfo.tagline}
                </p>
              </div>
              <div className="text-xs font-mono text-[#9db2d4] print:text-slate-600 space-y-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#4b92e6] print:text-slate-600 shrink-0" />
                  <span>{personalInfo.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#4b92e6] print:text-slate-600 shrink-0" />
                  <span>{personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#4b92e6] print:text-slate-600 shrink-0" />
                  <span>{personalInfo.phone}</span>
                </div>
              </div>
            </div>

            <div className="no-print flex flex-wrap gap-3 pt-2 text-xs">
              <a 
                href={personalInfo.socials.github} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#162544] text-[#9db2d4] hover:text-[#f5f0e6] border border-[#1e355b] transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <a 
                href={personalInfo.socials.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#162544] text-[#9db2d4] hover:text-[#f5f0e6] border border-[#1e355b] transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </div>

          {/* Profil Singkat */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#4b92e6] print:text-blue-800 font-bold">
              Profil Ringkas
            </h4>
            <p className="text-xs sm:text-sm text-[#f5f0e6]/90 print:text-slate-700 leading-relaxed">
              {personalInfo.bio}
            </p>
          </div>

          {/* Pendidikan */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#4b92e6] print:text-blue-800 font-bold flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>Riwayat Pendidikan</span>
            </h4>
            <div className="space-y-3">
              {educationHistory.map((edu) => (
                <div key={edu.id} className="text-xs sm:text-sm space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#f5f0e6] print:text-slate-900">{edu.degree}</span>
                    <span className="font-mono text-xs text-[#9db2d4] print:text-slate-600">{edu.period}</span>
                  </div>
                  <p className="text-[#9db2d4] print:text-slate-600 font-medium">
                    {edu.institution} — {edu.location}
                  </p>
                  <p className="text-xs text-[#f5f0e6]/90 print:text-slate-700 leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Proyek */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#4b92e6] print:text-blue-800 font-bold flex items-center gap-1.5">
              <Code2 className="w-4 h-4" />
              <span>Proyek Unggulan</span>
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-[#f5f0e6] print:text-slate-900">Astra Realty — Portal Perumahan & Simulasi KPR</strong>
                  <span className="text-[11px] font-mono text-[#4b92e6] print:text-blue-700">React • Tailwind CSS</span>
                </div>
                <p className="text-xs text-[#9db2d4] print:text-slate-700">
                  Aplikasi web katalog properti modern dengan kalkulator simulasi angsuran KPR interaktif berdasarkan plafon, bunga, dan tenor.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-[#f5f0e6] print:text-slate-900">SPK Analytics — Sistem Pendukung Keputusan</strong>
                  <span className="text-[11px] font-mono text-[#4b92e6] print:text-blue-700">React • Multi-Kriteria</span>
                </div>
                <p className="text-xs text-[#9db2d4] print:text-slate-700">
                  Sistem pengambil keputusan terstruktur berbasis komparasi matriks kriteria untuk perangkingan rekomendasi keputusan objektif.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-[#f5f0e6] print:text-slate-900">HerbScan — Deteksi Daun Herbal AI</strong>
                  <span className="text-[11px] font-mono text-[#4b92e6] print:text-blue-700">Python CNN • React</span>
                </div>
                <p className="text-xs text-[#9db2d4] print:text-slate-700">
                  Klasifikasi citra tanaman herbal terintegrasi antarmuka web interaktif beserta informasi indikasi khasiat kesehatan.
                </p>
              </div>
            </div>
          </div>

          {/* Pengalaman & Kepanitiaan */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#4b92e6] print:text-blue-800 font-bold flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" />
              <span>Pengalaman & Kepanitiaan</span>
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              {experienceHistory.slice(0, 3).map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-[#f5f0e6] print:text-slate-900">{exp.role}</strong>
                    <span className="font-mono text-xs text-[#9db2d4] print:text-slate-600">{exp.period}</span>
                  </div>
                  <p className="text-xs text-[#9db2d4] print:text-slate-600 font-medium">
                    {exp.company} — {exp.location}
                  </p>
                  <p className="text-xs text-[#f5f0e6]/90 print:text-slate-700">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Keahlian Teknis */}
          <div className="pt-2 border-t border-[#1e355b] print:border-slate-300 space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#4b92e6] print:text-blue-800 font-bold">
              Keahlian Teknis
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-[#162544] print:bg-slate-100 border border-[#1e355b] print:border-slate-300">
                <span className="font-semibold block text-[#f5f0e6] print:text-slate-900">Frontend:</span>
                <span className="text-[#9db2d4] print:text-slate-700">React 19, Tailwind CSS, JavaScript ES6+, HTML5/CSS3</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#162544] print:bg-slate-100 border border-[#1e355b] print:border-slate-300">
                <span className="font-semibold block text-[#f5f0e6] print:text-slate-900">Backend & Tools:</span>
                <span className="text-[#9db2d4] print:text-slate-700">REST API, PostgreSQL, Git & GitHub, Vite, VS Code</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info (no-print) */}
        <div className="no-print p-4 bg-[#162544] border-t border-[#1e355b] flex items-center justify-between text-xs text-[#9db2d4] shrink-0">
          <span>Gunakan tombol <strong>Cetak / Simpan PDF</strong> untuk menyimpan sebagai dokumen resmi.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#0f1a30] hover:bg-[#162544] text-[#f5f0e6] border border-[#1e355b] font-medium transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </motion.div>
    </div>
  );
}

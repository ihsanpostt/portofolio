import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Send,
  Copy,
  Check,
  ArrowUpRight,
  MessageCircle,
  Loader2,
  AlertCircle,
  Mail
} from 'lucide-react';
import { Github, Linkedin, Instagram } from './Icons';
import { personalInfo } from '../data/portfolioData';

// Ganti endpoint ini dengan VITE_FORMSPREE_ENDPOINT di file .env atau environment variable hosting
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/mqkenvqo';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [successChannel, setSuccessChannel] = useState('email'); // 'email' | 'whatsapp' | 'gmail'
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nama minimal 2 karakter.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Alamat email wajib diisi.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Format email tidak valid (contoh: nama@perusahaan.com).';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subjek atau keperluan wajib diisi.';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subjek minimal 3 karakter.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Isi pesan wajib diisi.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Pesan minimal 10 karakter agar maksud tersampaikan dengan jelas.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (submitStatus === 'error') {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // 1. Pengiriman Nyata via API Formspree (Email Langsung)
  const handleEmailSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          _replyto: formData.email.trim()
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSuccessChannel('email');
        try {
          confetti({
            particleCount: 75,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch {
          // fallback jika canvas tidak tersedia
        }
      } else {
        const data = await response.json().catch(() => ({}));
        const message = data?.errors?.map((err) => err.message).join(', ') ||
          'Pengiriman email langsung sedang mengalami kendala. Anda dapat langsung mengirim pesan ini via WhatsApp atau Gmail di bawah.';
        setErrorMessage(message);
        setSubmitStatus('error');
      }
    } catch {
      setErrorMessage(
        'Terjadi kendala koneksi internet saat mengirim. Gunakan opsi pengiriman langsung via WhatsApp atau Gmail agar pesan Anda tetap terkirim.'
      );
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2. Pengiriman Nyata via WhatsApp (Pesan Instan Terformat)
  const handleWhatsAppSubmit = (e) => {
    if (e) e.preventDefault();
    if (!validate()) return;

    const text = `Halo Kak ${personalInfo.name},\n\nPerkenalkan saya *${formData.name.trim()}* (${formData.email.trim()}).\n\n*Keperluan:* ${formData.subject.trim()}\n\n*Pesan:*\n${formData.message.trim()}`;
    const cleanPhone = personalInfo.phone.replace(/[^0-9]/g, '');
    const waUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(text)}`;

    window.open(waUrl, '_blank', 'noreferrer');

    setSuccessChannel('whatsapp');
    setSubmitStatus('success');
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }
  };

  // 3. Fallback Gmail
  const handleGmailFallback = () => {
    const subject = encodeURIComponent(formData.subject || `Pesan Portofolio - ${formData.name}`);
    const body = encodeURIComponent(
      `Halo ${personalInfo.name},\n\nNama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank', 'noreferrer');
  };

  const resetForm = () => {
    setSubmitStatus('idle');
    setErrorMessage('');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
  };

  const QUICK_TEMPLATES = [
    {
      label: '💼 Tawaran Magang / Kerja',
      subject: 'Penawaran Magang / Posisi Frontend Developer',
      message: 'Halo Ihsan, kami tertarik dengan portofolio Anda dan ingin mendiskusikan peluang magang atau posisi pengembang web di tim kami.'
    },
    {
      label: '🚀 Diskusi Proyek Web',
      subject: 'Konsultasi & Diskusi Proyek Pengembangan Web',
      message: 'Halo Ihsan, saya memiliki kebutuhan pengembangan website/antarmuka web dan ingin berkonsultasi mengenai estimasi pengerjaan serta solusinya.'
    },
    {
      label: '🤝 Kolaborasi Kampus / Teknis',
      subject: 'Ajakan Kolaborasi Proyek & Riset Teknis',
      message: 'Halo Ihsan, salam kenal sesama penggiat teknologi. Mari berdiskusi tentang peluang kolaborasi proyek atau eksplorasi teknologi web modern.'
    },
    {
      label: '☕ Networking Santai',
      subject: 'Networking & Berbagi Wawasan Seputar Web Dev',
      message: 'Halo Ihsan, saya melihat proyek-proyek Anda di portofolio dan ingin terhubung untuk saling bertukar wawasan seputar ekosistem React dan teknologi.'
    }
  ];

  const applyTemplate = (tpl) => {
    setFormData((prev) => ({
      ...prev,
      subject: tpl.subject,
      message: tpl.message
    }));
    setErrors((prev) => ({ ...prev, subject: '', message: '' }));
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#1e355b]/80">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Section Header */}
        <div className="space-y-3 max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f1a30] border border-[#1e355b] text-xs font-mono text-[#4b92e6]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38a98c]"></span>
            <span>Respon Cepat: Rata-rata &lt; 12 Jam</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#f5f0e6] font-heading tracking-tight">
            Mari Terhubung & Berdiskusi
          </h2>
          <p className="text-[#9db2d4] text-sm sm:text-base leading-relaxed">
            Terbuka untuk peluang magang, proyek lepas (freelance), kerja sama kampus, atau sekadar bertukar wawasan seputar arsitektur web modern.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Direct Info & Social Channels */}
          <div className="lg:col-span-5 space-y-4">

            {/* Email Card with Copy Feature */}
            <div className="p-6 rounded-2xl bg-[#0f1a30] border border-[#1e355b] space-y-3 shadow-lg">
              <span className="text-xs font-mono text-[#9db2d4] uppercase tracking-wider block">
                Surel / Email Resmi
              </span>
              <div className="text-base font-semibold text-[#f5f0e6] break-all">
                {personalInfo.email}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="min-h-[40px] px-3.5 py-1.5 rounded-lg bg-[#162544] hover:bg-[#1e355b] text-xs font-medium text-[#f5f0e6] border border-[#1e355b] transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6] cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#38a98c]" />
                      <span className="text-[#38a98c]">Tersalin ke Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#9db2d4]" />
                      <span>Salin Alamat Email</span>
                    </>
                  )}
                </button>
                <a
                  href={personalInfo.socials.gmail}
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-[40px] px-3.5 py-1.5 rounded-lg bg-[#3178c6]/15 hover:bg-[#3178c6]/25 text-[#4b92e6] text-xs font-medium border border-[#3178c6]/30 transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Buka di Gmail</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* WhatsApp Direct Card */}
            <a
              href={personalInfo.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="p-6 rounded-2xl bg-[#0f1a30] border border-[#1e355b] hover:border-[#38a98c]/50 transition-colors block group space-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6] shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#9db2d4] uppercase tracking-wider">
                  WhatsApp Direct
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#9db2d4] group-hover:text-[#f5f0e6] transition-colors" />
              </div>
              <div className="text-base font-semibold text-[#f5f0e6] group-hover:text-[#38a98c] transition-colors flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#38a98c]" />
                <span>{personalInfo.phone}</span>
              </div>
              <p className="text-xs text-[#9db2d4]">
                Pesan terenkripsi langsung untuk diskusi mendesak atau respon seketika.
              </p>
            </a>

            {/* Social Channels List */}
            <div className="p-6 rounded-2xl bg-[#0f1a30] border border-[#1e355b] space-y-3 shadow-lg">
              <span className="text-xs font-mono text-[#9db2d4] uppercase tracking-wider block">
                Saluran Portofolio & Kode
              </span>
              <div className="space-y-2">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 min-h-[44px] rounded-xl bg-[#162544] hover:bg-[#1e355b] border border-[#1e355b]/80 flex items-center justify-between text-xs text-[#9db2d4] hover:text-[#f5f0e6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6]"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-[#4b92e6]" />
                    <span>GitHub (@ihsanpostt)</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#6780a4]" />
                </a>

                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 min-h-[44px] rounded-xl bg-[#162544] hover:bg-[#1e355b] border border-[#1e355b]/80 flex items-center justify-between text-xs text-[#9db2d4] hover:text-[#f5f0e6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6]"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-[#4b92e6]" />
                    <span>LinkedIn (Burhanuddin Ihsan)</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#6780a4]" />
                </a>

                <a
                  href={personalInfo.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 min-h-[44px] rounded-xl bg-[#162544] hover:bg-[#1e355b] border border-[#1e355b]/80 flex items-center justify-between text-xs text-[#9db2d4] hover:text-[#f5f0e6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6]"
                >
                  <div className="flex items-center gap-2.5">
                    <Instagram className="w-4 h-4 text-[#4b92e6]" />
                    <span>Instagram (@burhanuddin_ihsan)</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#6780a4]" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Real Working Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#0f1a30] border border-[#1e355b] shadow-xl">
            {submitStatus === 'success' ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#38a98c]/15 border border-[#38a98c]/30 text-[#38a98c] flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#f5f0e6] font-heading">
                  Pesan Berhasil Terkirim!
                </h3>
                <p className="text-[#9db2d4] text-sm max-w-md mx-auto leading-relaxed">
                  {successChannel === 'whatsapp'
                    ? 'Pesan Anda telah diteruskan ke WhatsApp Burhanuddin Ihsan untuk respon instan.'
                    : `Terima kasih atas pesannya, ${formData.name || 'Rekan'}. Notifikasi telah masuk dan balasan akan segera dikirimkan ke ${formData.email || 'surel Anda'}.`}
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#162544] hover:bg-[#1e355b] text-[#f5f0e6] border border-[#1e355b] text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6] cursor-pointer"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} noValidate className="space-y-4">
                {/* Quick Topic / Template Selector Chips */}
                <div className="space-y-2 pb-2 border-b border-[#1e355b]">
                  <label className="text-xs font-mono text-[#9db2d4] block">
                    Pilih Keperluan Cepat (1-Klik):
                  </label>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {QUICK_TEMPLATES.map((tpl, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => applyTemplate(tpl)}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all text-left ${
                          formData.subject === tpl.subject
                            ? 'bg-[#3178c6] text-white border-[#4b92e6]'
                            : 'bg-[#162544] text-[#9db2d4] hover:text-[#f5f0e6] border-[#1e355b] hover:border-[#2c4d82]'
                        }`}
                      >
                        {tpl.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Error Banner with Resilient Fallback */}
                {submitStatus === 'error' && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs sm:text-sm text-red-300 space-y-3">
                    <div className="flex items-start gap-2.5">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-red-200 font-semibold mb-0.5">Pengiriman Langsung Membutuhkan Jalur Alternatif</strong>
                        <span>{errorMessage}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1 border-t border-red-500/20">
                      <button
                        type="button"
                        onClick={handleWhatsAppSubmit}
                        className="px-3.5 py-1.5 rounded-lg bg-[#38a98c] hover:bg-[#2d8d74] text-white font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Kirim via WhatsApp Sekarang</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleGmailFallback}
                        className="px-3.5 py-1.5 rounded-lg bg-[#162544] hover:bg-[#1e355b] text-[#f5f0e6] border border-[#1e355b] text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#4b92e6]" />
                        <span>Kirim via Gmail</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Field Nama */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-mono text-[#9db2d4] font-medium block">
                      Nama Lengkap <span className="text-[#4b92e6]">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="cth. Budi Santoso"
                      className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#162544] border text-[#f5f0e6] text-sm placeholder:text-[#6780a4] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6] ${
                        errors.name ? 'border-red-500/80 bg-red-500/5' : 'border-[#1e355b]'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] font-mono text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Field Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-mono text-[#9db2d4] font-medium block">
                      Alamat Email <span className="text-[#4b92e6]">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="cth. budi@perusahaan.com"
                      className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#162544] border text-[#f5f0e6] text-sm placeholder:text-[#6780a4] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6] ${
                        errors.email ? 'border-red-500/80 bg-red-500/5' : 'border-[#1e355b]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] font-mono text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Field Subjek */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-mono text-[#9db2d4] font-medium block">
                    Subjek / Keperluan <span className="text-[#4b92e6]">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="cth. Penawaran Magang Frontend / Diskusi Proyek Web"
                    className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#162544] border text-[#f5f0e6] text-sm placeholder:text-[#6780a4] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6] ${
                      errors.subject ? 'border-red-500/80 bg-red-500/5' : 'border-[#1e355b]'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-[11px] font-mono text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>

                {/* Field Pesan */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-mono text-[#9db2d4] font-medium block">
                    Isi Pesan <span className="text-[#4b92e6]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tuliskan pesan, rincian tawaran, atau pertanyaan Anda di sini (minimal 10 karakter)..."
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#162544] border text-[#f5f0e6] text-sm placeholder:text-[#6780a4] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6] resize-none ${
                      errors.message ? 'border-red-500/80 bg-red-500/5' : 'border-[#1e355b]'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] font-mono text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Tombol Aksi Nyata */}
                <div className="pt-2 space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Tombol Kirim Email Formspree */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="min-h-[46px] w-full px-4 py-2.5 rounded-xl bg-[#3178c6] hover:bg-[#2664a7] disabled:bg-[#3178c6]/50 text-white font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm border border-[#4b92e6]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3178c6] cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Mengirimkan Pesan...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Kirim Pesan (Email)</span>
                        </>
                      )}
                    </button>

                    {/* Tombol Kirim Instan via WhatsApp */}
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleWhatsAppSubmit}
                      className="min-h-[46px] w-full px-4 py-2.5 rounded-xl bg-[#38a98c] hover:bg-[#2d8d74] disabled:opacity-50 text-white font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm border border-[#38a98c]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38a98c] cursor-pointer"
                      title="Kirim pesan ini langsung ke nomor WhatsApp Burhanuddin Ihsan"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Kirim Cepat via WhatsApp</span>
                    </button>
                  </div>

                  <p className="text-[11px] font-mono text-[#6780a4] text-center">
                    Data pesan langsung diteruskan ke inbox resmi & WhatsApp pribadi Burhanuddin Ihsan secara aman tanpa pihak ketiga.
                  </p>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

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

  return (
    <section id="contact" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#1e293b]/70">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Section Header */}
        <div className="space-y-3 max-w-2xl text-left">
          <span className="text-xs font-mono font-medium text-blue-500 uppercase tracking-wider">
            Hubungi Saya
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white font-heading tracking-tight">
            Mari Terhubung & Berdiskusi
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Terbuka untuk peluang magang, proyek lepas (freelance), kerja sama kampus, atau sekadar bertukar wawasan seputar teknologi web.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Direct Info & Social Channels */}
          <div className="lg:col-span-5 space-y-4">

            {/* Email Card with Copy Feature */}
            <div className="p-6 rounded-2xl bg-[#0f172a] border border-[#1e293b] space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Surel / Email
              </span>
              <div className="text-base font-semibold text-white break-all">
                {personalInfo.email}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="min-h-[40px] px-3.5 py-1.5 rounded-lg bg-[#151f32] hover:bg-[#1e293b] text-xs font-medium text-slate-200 border border-[#1e293b] transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Tersalin ke Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Salin Alamat Email</span>
                    </>
                  )}
                </button>
                <a
                  href={personalInfo.socials.gmail}
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-[40px] px-3.5 py-1.5 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-xs font-medium border border-blue-500/20 transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Buka Gmail</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* WhatsApp Direct Card */}
            <a
              href={personalInfo.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="p-6 rounded-2xl bg-[#0f172a] border border-[#1e293b] hover:border-[#334155] transition-colors block group space-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  WhatsApp
                </span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
              </div>
              <div className="text-base font-semibold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{personalInfo.phone}</span>
              </div>
              <p className="text-xs text-slate-400">
                Pesan langsung untuk respon cepat.
              </p>
            </a>

            {/* Social Channels List */}
            <div className="p-6 rounded-2xl bg-[#0f172a] border border-[#1e293b] space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Saluran Profesional
              </span>
              <div className="space-y-2">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 min-h-[44px] rounded-xl bg-[#151f32] hover:bg-[#1e293b] border border-[#1e293b]/60 flex items-center justify-between text-xs text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-slate-400" />
                    <span>GitHub (@ihsanpostt)</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </a>

                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 min-h-[44px] rounded-xl bg-[#151f32] hover:bg-[#1e293b] border border-[#1e293b]/60 flex items-center justify-between text-xs text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-slate-400" />
                    <span>LinkedIn (Burhanuddin Ihsan)</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </a>

                <a
                  href={personalInfo.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 min-h-[44px] rounded-xl bg-[#151f32] hover:bg-[#1e293b] border border-[#1e293b]/60 flex items-center justify-between text-xs text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <div className="flex items-center gap-2.5">
                    <Instagram className="w-4 h-4 text-slate-400" />
                    <span>Instagram (@burhanuddin_ihsan)</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Real Working Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#0f172a] border border-[#1e293b]">
            {submitStatus === 'success' ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                  Pesan Berhasil Terkirim!
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                  {successChannel === 'whatsapp'
                    ? 'Pesan Anda telah diteruskan ke WhatsApp Burhanuddin Ihsan untuk respon instan.'
                    : `Terima kasih atas pesannya, ${formData.name || 'Rekan'}. Notifikasi telah masuk dan balasan akan segera dikirimkan ke ${formData.email || 'surel Anda'}.`}
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#151f32] hover:bg-[#1e293b] text-slate-200 border border-[#1e293b] text-xs sm:text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} noValidate className="space-y-4">
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
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Kirim via WhatsApp Sekarang</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleGmailFallback}
                        className="px-3.5 py-1.5 rounded-lg bg-[#151f32] hover:bg-[#1e293b] text-slate-200 border border-[#1e293b] text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-blue-400" />
                        <span>Kirim via Gmail</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Field Nama */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-mono text-slate-300 font-medium block">
                      Nama Lengkap <span className="text-blue-400">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="cth. Budi Santoso"
                      className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#151f32] border text-white text-sm placeholder:text-slate-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${errors.name ? 'border-red-500/80 bg-red-500/5' : 'border-[#1e293b]'
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
                    <label htmlFor="email" className="text-xs font-mono text-slate-300 font-medium block">
                      Alamat Email <span className="text-blue-400">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="cth. budi@perusahaan.com"
                      className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#151f32] border text-white text-sm placeholder:text-slate-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${errors.email ? 'border-red-500/80 bg-red-500/5' : 'border-[#1e293b]'
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
                  <label htmlFor="subject" className="text-xs font-mono text-slate-300 font-medium block">
                    Subjek / Keperluan <span className="text-blue-400">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="cth. Penawaran Magang Frontend / Diskusi Proyek Web"
                    className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#151f32] border text-white text-sm placeholder:text-slate-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${errors.subject ? 'border-red-500/80 bg-red-500/5' : 'border-[#1e293b]'
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
                  <label htmlFor="message" className="text-xs font-mono text-slate-300 font-medium block">
                    Isi Pesan <span className="text-blue-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tuliskan pesan, rincian tawaran, atau pertanyaan Anda di sini (minimal 10 karakter)..."
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#151f32] border text-white text-sm placeholder:text-slate-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 resize-none ${errors.message ? 'border-red-500/80 bg-red-500/5' : 'border-[#1e293b]'
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
                      className="min-h-[46px] w-full px-4 py-2.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] disabled:bg-blue-600/50 text-white font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer disabled:cursor-not-allowed"
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
                      className="min-h-[46px] w-full px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
                      title="Kirim pesan ini langsung ke nomor WhatsApp Burhanuddin Ihsan"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Kirim Cepat via WhatsApp</span>
                    </button>
                  </div>

                  <p className="text-[11px] font-mono text-slate-400 text-center">
                    Data pesan Anda aman dan langsung diteruskan ke inbox / WhatsApp pribadi tanpa pihak ketiga tak dikenal.
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

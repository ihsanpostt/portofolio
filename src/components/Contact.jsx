import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { User, Mail, MessageSquare, Send, Image as ImageIcon, Check, ExternalLink } from 'lucide-react';
import { defaultComments, personalInfo } from '../data/portofolioData';
import { useSound } from './SoundContext';

function formatRelativeTime(dateString) {
  const time = new Date(dateString).getTime();
  if (!Number.isFinite(time)) return 'Waktu tidak diketahui';
  const seconds = Math.max(0, Math.floor((Date.now() - time) / 1000));
  if (seconds < 60) return 'Baru saja';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  return `${Math.floor(hours / 24)} hari lalu`;
}

function processImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const size = Math.min(img.naturalWidth, img.naturalHeight);
        if (ctx) {
          canvas.width = 128;
          canvas.height = 128;
          ctx.drawImage(
            img,
            (img.naturalWidth - size) / 2,
            (img.naturalHeight - size) / 2,
            size,
            size,
            0,
            0,
            128,
            128
          );
          resolve(canvas.toDataURL('image/jpeg', 0.78));
        } else {
          reject(new Error('Canvas tidak tersedia'));
        }
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

export default function Contact() {
  const { playSfx } = useSound();

  // Contact Message State
  const [msgForm, setMsgForm] = useState({ name: '', email: '', message: '' });
  const [sendingMsg, setSendingMsg] = useState(false);
  const [msgSuccess, setMsgSuccess] = useState(false);
  const [msgError, setMsgError] = useState('');

  // Comments State
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentForm, setCommentForm] = useState({
    name: '',
    message: '',
    photo: '',
    photoName: ''
  });
  const [commentError, setCommentError] = useState('');

  // Load comments from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('portfolio-contact-comments');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Filter out legacy dummy comments (c-1, c-2, c-3) to ensure only real comments from real users are kept
          const realComments = parsed.filter(
            (c) => c && typeof c === 'object' && !['c-1', 'c-2', 'c-3'].includes(c.id)
          );
          if (realComments.length !== parsed.length) {
            localStorage.setItem('portfolio-contact-comments', JSON.stringify(realComments));
          }
          setComments(realComments);
          setLoadingComments(false);
          return;
        }
      }
    } catch {
      // Fallback
    }
    setComments(defaultComments || []);
    setLoadingComments(false);
  }, []);

  const handlePhotoSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setCommentError('Pilih file gambar yang valid.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setCommentError('Ukuran foto maksimal 5 MB.');
      e.target.value = '';
      return;
    }

    try {
      const dataUrl = await processImage(file);
      setCommentForm((prev) => ({
        ...prev,
        photo: dataUrl,
        photoName: file.name
      }));
      setCommentError('');
    } catch {
      setCommentError('Foto tidak dapat dibaca. Coba pilih gambar lain.');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setMsgError('');
    setSendingMsg(true);

    try {
      // Simulates or posts to endpoint
      await new Promise((r) => setTimeout(r, 600));
      setMsgSuccess(true);
      setMsgForm({ name: '', email: '', message: '' });
      playSfx('success');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
      setTimeout(() => setMsgSuccess(false), 5000);
    } catch {
      setMsgError('Gagal mengirim pesan. Silakan coba lagi.');
    } finally {
      setSendingMsg(false);
    }
  };

  const handleSendComment = (e) => {
    e.preventDefault();
    setCommentError('');

    const name = commentForm.name.trim();
    const message = commentForm.message.trim();

    if (!name || !message) {
      setCommentError('Nama dan komentar wajib diisi.');
      return;
    }

    setSubmittingComment(true);

    setTimeout(() => {
      const newComment = {
        id: 'comment-' + Date.now(),
        name,
        message,
        photo: commentForm.photo || null,
        createdAt: new Date().toISOString()
      };

      const updated = [newComment, ...comments].slice(0, 50);
      setComments(updated);
      try {
        localStorage.setItem('portfolio-contact-comments', JSON.stringify(updated));
      } catch {
        // Storage limit
      }

      setCommentForm({ name: '', message: '', photo: '', photoName: '' });
      setSubmittingComment(false);
      playSfx('success');

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.85 }
      });
    }, 400);
  };

  return (
    <section className="contact-root-section" id="Contact" aria-labelledby="contact-section-heading">
      <div className="contact-container-inner">
        <h2 className="section-display-title" id="contact-section-heading">
          Hubungi Saya
        </h2>

        <div className="contact-main-grid contact-layout">
          {/* Left Panel: Contact Message & FIND ME */}
          <div className="contact-panel contact-message-panel">
            <h2 className="contact-section-title">Kirim Pesan</h2>
            <p className="contact-panel-intro">
              Tertarik berkolaborasi, berdiskusi seputar proyek web, atau memiliki pertanyaan? Kirimkan pesan Anda melalui formulir di bawah ini.
            </p>

            <form onSubmit={handleSendMessage} className="contact-actual-form">
              <div className="contact-form-field">
                <label htmlFor="user-name">Nama Lengkap</label>
                <div className="contact-input-wrap">
                  <User size={17} aria-hidden="true" />
                  <input
                    id="user-name"
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    placeholder="Nama lengkap Anda"
                    value={msgForm.name}
                    onChange={(e) => setMsgForm({ ...msgForm, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="contact-form-field">
                <label htmlFor="user-email">Alamat Email</label>
                <div className="contact-input-wrap">
                  <Mail size={17} aria-hidden="true" />
                  <input
                    id="user-email"
                    name="email"
                    type="email"
                    required
                    maxLength={320}
                    placeholder="nama@email.com"
                    value={msgForm.email}
                    onChange={(e) => setMsgForm({ ...msgForm, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="contact-form-field">
                <label htmlFor="user-msg">Pesan Anda</label>
                <div className="contact-input-wrap contact-textarea-wrap">
                  <MessageSquare size={17} aria-hidden="true" />
                  <textarea
                    id="user-msg"
                    name="message"
                    rows={4}
                    required
                    maxLength={5000}
                    placeholder="Tuliskan pesan atau penawaran kerja sama Anda di sini..."
                    value={msgForm.message}
                    onChange={(e) => setMsgForm({ ...msgForm, message: e.target.value })}
                  />
                </div>
              </div>

              <button type="submit" disabled={sendingMsg} className="contact-submit-btn">
                <Send size={16} aria-hidden="true" />
                <span>{sendingMsg ? 'Mengirim...' : 'Kirim Pesan'}</span>
              </button>

              {msgError && (
                <p className="contact-comment-error" role="alert">
                  {msgError}
                </p>
              )}

              {msgSuccess && (
                <div className="contact-success-toast" role="status">
                  <Check size={18} />
                  <span>Pesan berhasil dikirim. Terima kasih!</span>
                </div>
              )}
            </form>

            {/* FIND ME Cards */}
            <div className="contact-find-me">
              <h3>MEDIA SOSIAL</h3>
              <div className="contact-social-grid">
                <a
                  href={personalInfo.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-card contact-social-card--instagram"
                >
                  <span className="contact-social-icon-box">
                    <svg className="contact-social-logo" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </span>
                  <div className="contact-social-text">
                    <span className="contact-social-label">Instagram</span>
                    <span className="contact-social-sub">@burhanuddin_ihsan</span>
                  </div>
                  <ExternalLink size={16} className="contact-social-arrow" />
                </a>

                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-card contact-social-card--linkedin"
                >
                  <span className="contact-social-icon-box">
                    <svg className="contact-social-logo" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </span>
                  <div className="contact-social-text">
                    <span className="contact-social-label">LinkedIn</span>
                    <span className="contact-social-sub">burhanuddin-ihsan</span>
                  </div>
                  <ExternalLink size={16} className="contact-social-arrow" />
                </a>

                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-card contact-social-card--github"
                >
                  <span className="contact-social-icon-box">
                    <svg className="contact-social-logo" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </span>
                  <div className="contact-social-text">
                    <span className="contact-social-label">GitHub</span>
                    <span className="contact-social-sub">@ihsanpostt</span>
                  </div>
                  <ExternalLink size={16} className="contact-social-arrow" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Panel: Comments & Guestbook */}
          <div className="contact-panel contact-comments-panel">
            <div className="contact-comments-header">
              <span className="contact-comments-icon">
                <MessageSquare size={19} />
              </span>
              <h2>
                Komentar &amp; Pesan Masuk <span>({comments.length})</span>
              </h2>
            </div>

            <form onSubmit={handleSendComment} className="contact-comment-form">
              <div className="contact-form-field">
                <label htmlFor="comment-name">Nama Anda</label>
                <input
                  id="comment-name"
                  type="text"
                  required
                  maxLength={50}
                  placeholder="Masukkan nama Anda"
                  value={commentForm.name}
                  onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                />
              </div>

              <div className="contact-form-field">
                <label htmlFor="comment-message">Pesan / Komentar</label>
                <textarea
                  id="comment-message"
                  required
                  maxLength={500}
                  rows={4}
                  placeholder="Tulis pesan atau komentar Anda di sini..."
                  value={commentForm.message}
                  onChange={(e) => setCommentForm({ ...commentForm, message: e.target.value })}
                />
              </div>

              <div className="contact-form-field">
                <label htmlFor="comment-photo">Foto Profil (opsional)</label>
                <label className="contact-photo-picker" htmlFor="comment-photo">
                  <ImageIcon size={17} aria-hidden="true" />
                  <span>{commentForm.photoName || 'Pilih Foto Profil'}</span>
                </label>
                <input
                  className="contact-photo-input"
                  id="comment-photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoSelect}
                />
                <span className="contact-photo-hint">Ukuran file maksimal 5 MB</span>
              </div>

              {commentError && (
                <p className="contact-comment-error" role="alert">
                  {commentError}
                </p>
              )}

              <button type="submit" className="contact-submit-btn" disabled={submittingComment}>
                <Send size={15} aria-hidden="true" />
                <span>{submittingComment ? 'Mengirim...' : 'Kirim Komentar'}</span>
              </button>
            </form>

            {/* Comments Stream */}
            <div className="contact-comments-list" aria-live="polite" aria-busy={loadingComments}>
              {loadingComments ? (
                <div className="contact-comment-skeleton-list" role="status" aria-label="Memuat komentar">
                  {[0, 1, 2].map((idx) => (
                    <div key={idx} className="contact-comment-skeleton" aria-hidden="true">
                      <span className="skeleton-block contact-comment-skeleton-avatar" />
                      <span className="contact-comment-skeleton-copy">
                        <span className="skeleton-block contact-comment-skeleton-name" />
                        <span className="skeleton-block contact-comment-skeleton-line" />
                      </span>
                    </div>
                  ))}
                </div>
              ) : comments.length > 0 ? (
                comments.map((comment) => (
                  <article key={comment.id} className="contact-comment-item">
                    {comment.photo ? (
                      <img className="contact-comment-avatar" src={comment.photo} alt={comment.name} />
                    ) : (
                      <span className="contact-comment-avatar contact-comment-avatar-fallback">
                        <User size={17} aria-hidden="true" />
                      </span>
                    )}
                    <div className="contact-comment-content">
                      <div className="contact-comment-meta">
                        <strong>{comment.name}</strong>
                        <time dateTime={comment.createdAt}>{formatRelativeTime(comment.createdAt)}</time>
                      </div>
                      <p>{comment.message}</p>
                    </div>
                  </article>
                ))
              ) : (
                <p className="contact-comments-empty">Belum ada komentar. Jadilah yang pertama memberikan pesan!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

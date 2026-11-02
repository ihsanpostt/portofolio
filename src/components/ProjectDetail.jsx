import React, { useEffect } from 'react';
import { ArrowLeft, ChevronRight, Code2 } from 'lucide-react';
import { TechIcon } from './TechLogos';

export default function ProjectDetail({ project, onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);

    const handlePointerMove = (e) => {
      const x = e.clientX.toFixed(2);
      const y = e.clientY.toFixed(2);
      const ratio = e.clientX / window.innerWidth;
      document.documentElement.style.setProperty('--tech-glow-x', `${x}px`);
      document.documentElement.style.setProperty('--tech-glow-y', `${y}px`);
      document.documentElement.style.setProperty('--tech-glow-hue', `${210 + ratio * 100}`);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.style.removeProperty('--tech-glow-x');
      document.documentElement.style.removeProperty('--tech-glow-y');
      document.documentElement.style.removeProperty('--tech-glow-hue');
    };
  }, []);

  return (
    <main className="project-detail-page">
      <div className="project-detail-inner">
        {/* Breadcrumbs */}
        <div className="project-detail-breadcrumbs">
          <button type="button" className="project-detail-back" onClick={onBack}>
            <ArrowLeft size={20} aria-hidden="true" />
            <span>Kembali</span>
          </button>
          <span className="project-detail-crumb-muted" onClick={onBack} style={{ cursor: 'pointer' }}>
            Portofolio
          </span>
          <ChevronRight size={18} aria-hidden="true" className="project-detail-crumb-chevron" />
          <span className="project-detail-crumb-current">{project.title}</span>
        </div>

        {/* Content Layout */}
        <div className="project-detail-layout">
          {/* Left Column: Info */}
          <div className="project-detail-info">
            <h1 className="project-detail-title">{project.title}</h1>
            <p className="project-detail-desc">{project.longDesc || project.description}</p>

            <div className="project-detail-tech-section">
              <h3 className="project-detail-tech-heading">
                <Code2 size={18} aria-hidden="true" />
                <span>Teknologi yang Digunakan</span>
              </h3>
              <div className="project-detail-tech-list">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-detail-tech-chip" data-glow="true">
                    <TechIcon name={tag} size={18} className="project-detail-chip-icon" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {(project.githubUrl || project.liveUrl) && (
              <div style={{ display: 'flex', gap: '12px', marginTop: '28px', flexWrap: 'wrap' }}>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-btn-primary"
                    style={{ textDecoration: 'none' }}
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <span>Lihat Kode Sumber (GitHub)</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-btn-secondary"
                    style={{ textDecoration: 'none' }}
                  >
                    <span>Buka Demo Langsung</span>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Preview Showcase */}
          <div className="project-detail-preview-glow">
            <div className="project-detail-preview has-image" style={{ background: project.gradient }}>
              {project.image && (
                <img
                  src={project.image}
                  alt={`Tampilan ${project.title}`}
                  className="project-detail-preview-img"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


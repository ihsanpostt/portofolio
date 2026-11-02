import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Code2, Award, Trophy, Cpu, ArrowRight, Eye, X } from 'lucide-react';
import { projectsData, certificatesData, achievementsData, techStackData } from '../data/portofolioData';
import { TechIcon } from './TechLogos';

const TABS = [
  { id: 'projects', label: 'Proyek', icon: Code2 },
  { id: 'certificates', label: 'Sertifikat', icon: Award },
  { id: 'awards', label: 'Pencapaian', icon: Trophy },
  { id: 'skills', label: 'Keahlian Teknologi', icon: Cpu }
];

export default function Portofolio({ onOpenProject }) {
  const [activeTab, setActiveTab] = useState('projects');
  const [selectedCert, setSelectedCert] = useState(null);

  // Lock scroll when cert modal is open
  useEffect(() => {
    if (!selectedCert) return;
    const origBody = document.body.style.overflow;
    const origHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleKey = (e) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = origBody;
      document.documentElement.style.overflow = origHtml;
    };
  }, [selectedCert]);

  return (
    <section className="portfolio-root-section" id="Portofolio" aria-labelledby="portfolio-section-heading">
      <div className="portfolio-container-inner">
        <h2 className="section-display-title" id="portfolio-section-heading">
          Portofolio
        </h2>

        {/* Tab Bar */}
        <div className="portfolio-tab-bar">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`portfolio-tab-btn ${isActive ? 'is-active' : ''}`}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 1. Projects View */}
        {activeTab === 'projects' && (
          <div className="portfolio-projects-view">
            <div className="portfolio-cards-grid">
              {projectsData.map((project) => (
                <article key={project.id} className="portfolio-project-card">
                  <div className="liquid-metal-border portfolio-project-metal-border" aria-hidden="true" />
                  <div className="portfolio-project-card-content">
                    <div
                      className="portfolio-card-thumbnail"
                      style={{ background: project.image ? '#000' : project.gradient }}
                    >
                      {project.image && (
                        <img
                          className="portfolio-card-thumbnail-image"
                          src={project.image}
                          alt={`Thumbnail ${project.title}`}
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="portfolio-card-body">
                      <h3 className="portfolio-card-title">{project.title}</h3>
                      <p className="portfolio-card-desc">{project.description}</p>
                      <button
                        type="button"
                        className="portfolio-details-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenProject) onOpenProject(project.id);
                        }}
                      >
                        <span>Lihat Detail</span>
                        <ArrowRight size={18} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* 2. Certificates View */}
        {activeTab === 'certificates' && (
          <div className="portfolio-certificates-view">
            <div className="portfolio-certificates-grid">
              {certificatesData.map((cert) => (
                <article
                  key={cert.id}
                  className="portfolio-cert-card"
                  role="button"
                  tabIndex={0}
                  aria-label={`Lihat sertifikat ${cert.title}`}
                  onClick={() => setSelectedCert(cert)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedCert(cert);
                    }
                  }}
                >
                  <div className="portfolio-cert-preview">
                    <img
                      className="portfolio-cert-preview-image"
                      src={cert.image}
                      alt={`Preview ${cert.title}`}
                      loading="lazy"
                    />
                    <span className="portfolio-cert-preview-overlay">
                      <span>Lihat Sertifikat</span>
                      <Eye size={18} aria-hidden="true" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* 3. Achievements View */}
        {activeTab === 'awards' && (
          <div className="portfolio-awards-view">
            <div className="portfolio-certificates-grid">
              {achievementsData.map((award) => (
                <article
                  key={award.id}
                  className="portfolio-cert-card"
                  role="button"
                  tabIndex={0}
                  aria-label={`Lihat piagam ${award.title}`}
                  onClick={() => setSelectedCert(award)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedCert(award);
                    }
                  }}
                >
                  <div className="portfolio-cert-preview">
                    <img
                      className="portfolio-cert-preview-image"
                      src={award.image}
                      alt={`Piagam ${award.title}`}
                      loading="lazy"
                    />
                    <span className="portfolio-cert-preview-overlay">
                      <span>Lihat Piagam</span>
                      <Eye size={18} aria-hidden="true" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* 4. Tech Stack View */}
        {activeTab === 'skills' && (
          <div className="portfolio-skills-view">
            <div className="portfolio-skills-grid">
              {techStackData
                .flatMap((cat) => cat.skills)
                .map((skill) => (
                  <article key={skill.name} className="portfolio-skill-card" data-glow="true">
                    <div className="portfolio-skill-icon-wrap">
                      <TechIcon name={skill.name} size={38} className={`portfolio-skill-logo ${skill.isLight ? 'is-light' : ''}`} />
                    </div>
                    <h3 className="portfolio-skill-name">{skill.name}</h3>
                  </article>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal for Certificate / Award */}
      {selectedCert &&
        createPortal(
          <div className="portfolio-cert-viewer-backdrop" onClick={() => setSelectedCert(null)}>
            <button
              type="button"
              className="portfolio-cert-viewer-close"
              onClick={() => setSelectedCert(null)}
              aria-label="Tutup pratinjau"
            >
              <X size={28} />
            </button>
            <div
              className="portfolio-cert-viewer"
              role="dialog"
              aria-modal="true"
              aria-label={selectedCert.title}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                className="portfolio-cert-viewer-image"
                src={selectedCert.image}
                alt={selectedCert.title}
              />
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}


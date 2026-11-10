import React, { useRef, useEffect } from 'react';
import { Mail, Code2, ArrowUpRight } from 'lucide-react';

export default function About() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        stage.classList.toggle('is-in-view', entry.isIntersecting);
        if (!entry.isIntersecting) {
          clearTimeout(hoverTimeoutRef.current);
          stage.classList.remove('spider-hovered');
          delete stage.dataset.spiderVisible;
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const handlePointerMove = (e) => {
    if (e.pointerType === 'touch') return;
    const stage = stageRef.current;
    const portrait = stage?.querySelector('.about-portrait');
    if (!stage || !portrait) return;

    clearTimeout(hoverTimeoutRef.current);
    const rect = portrait.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100));

    stage.style.setProperty('--hover-x', `${x.toFixed(2)}%`);
    stage.style.setProperty('--hover-y', `${y.toFixed(2)}%`);
    stage.classList.add('spider-hovered');
    stage.dataset.spiderVisible = 'true';
  };

  const handlePointerLeave = (e) => {
    if (e.pointerType === 'touch') return;
    const stage = stageRef.current;
    if (stage) {
      delete stage.dataset.spiderVisible;
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = setTimeout(() => {
        stage.classList.remove('spider-hovered');
      }, 3200);
    }
  };

  const handlePointerDown = (e) => {
    if (e.pointerType !== 'touch') return;
    const stage = stageRef.current;
    if (!stage) return;

    clearTimeout(hoverTimeoutRef.current);
    const isVisible = stage.dataset.spiderVisible === 'true';
    if (isVisible) {
      delete stage.dataset.spiderVisible;
      stage.classList.remove('spider-hovered');
    } else {
      stage.style.setProperty('--hover-x', '50%');
      stage.style.setProperty('--hover-y', '42%');
      stage.classList.add('spider-hovered');
      stage.dataset.spiderVisible = 'true';
      hoverTimeoutRef.current = setTimeout(() => {
        delete stage.dataset.spiderVisible;
        stage.classList.remove('spider-hovered');
      }, 4000);
    }
  };

  return (
    <section ref={sectionRef} className="about-root-section" id="About" aria-labelledby="about-section-heading">
      <h2 className="section-display-title" id="about-section-heading">
        Tentang Saya
      </h2>

      <div className="about-container-inner">
        {/* Left Column: Greeting & Action */}
        <div className="about-intro">
          <h2 className="about-title" id="about-title">
            <span className="about-title-greeting">Halo, Saya</span>
            <span>
              Burhanuddin
              <br />
              Ihsan
            </span>
          </h2>

          <a href="#Contact" className="about-action about-action-primary">
            <Mail size={17} />
            <span>Hubungi Saya</span>
          </a>
        </div>

        {/* Center: Interactive Portrait */}
        <div
          ref={stageRef}
          className="about-portrait-stage"
          aria-label="Potret Burhanuddin Ihsan"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onPointerDown={handlePointerDown}
        >
          <div className="about-portrait">
            <img
              className="about-person-image"
              src="/assets/me-ihsan.png"
              alt="Burhanuddin Ihsan - Mahasiswa D4 TI POLINEMA"
            />
            <img
              className="about-spider-image"
              src="/assets/spiderman-suit-v2.png"
              alt="Spider-Man Easter Egg"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Right Column: Bio & Action */}
        <div className="about-bio">
          <p>
            Saya adalah <strong>Junior Web Developer & Mahasiswa TI POLINEMA</strong> yang berfokus pada pengembangan antarmuka web modern, terstruktur, dan responsif menggunakan React dan Tailwind CSS.
          </p>
          <p>
            Berpengalaman merancang web portal properti Hunian Lestari, kalkulator instan SPK (SWARA & WASPAS), sistem informasi Laboratorium Business Analytics, hingga implementasi model visi komputer HerbScan.
          </p>

          <a href="#Portofolio" className="about-action about-action-secondary">
            <Code2 size={17} />
            <span>Lihat Proyek</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

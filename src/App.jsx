import React, { useState, useEffect } from 'react';
import { SoundProvider } from './components/SoundContext';
import ParticlesBackground from './components/ParticlesBackground';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import EducationExperience from './components/EducationExperience';
import SpotifyWidget from './components/SpotifyWidget';
import Portofolio from './components/Portofolio';
import ProjectDetail from './components/ProjectDetail';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GlitchFilters from './components/GlitchFilters';
import { projectsData } from './data/portofolioData';

export default function App() {
  const [currentPath, setCurrentPath] = useState(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  const [introFinished, setIntroFinished] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('portfolio-intro-finished') === 'true';
  });

  const [lanyardIntroStarted, setLanyardIntroStarted] = useState(introFinished);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenProject = (id) => {
    window.history.pushState({ fromPortofolio: true }, '', `/project/${encodeURIComponent(id)}`);
    setCurrentPath(window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBack = () => {
    if (window.history.state?.fromPortofolio || window.history.state?.fromPortfolio) {
      window.history.back();
    } else {
      window.history.pushState({}, '', '/#Portofolio');
      setCurrentPath('/');
      requestAnimationFrame(() => {
        document.getElementById('Portofolio')?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  };

  // Check if viewing project detail
  const projectMatch = currentPath.match(/^\/project\/([^/]+)\/?$/);
  const currentProjectId = projectMatch ? decodeURIComponent(projectMatch[1]) : null;
  const currentProject = projectsData.find(
    (p) => p.id.toLowerCase() === currentProjectId?.toLowerCase()
  );

  return (
    <SoundProvider>
      <div className="home-page-container">
        {/* Background Particles & Meteors */}
        <ParticlesBackground />

        {/* Loading Screen */}
        {!introFinished && (
          <LoadingScreen
            onComplete={() => {
              sessionStorage.setItem('portfolio-intro-finished', 'true');
              setIntroFinished(true);
            }}
            onExitAnimationStart={() => setLanyardIntroStarted(true)}
          />
        )}

        <div className="home-ui-scale">
          {currentProject ? (
            <ProjectDetail project={currentProject} onBack={handleBack} />
          ) : (
            <>
              {/* Floating Pill Navbar */}
              <Navbar />

              {/* Main Content */}
              <main>
                <Hero lanyardIntroStarted={lanyardIntroStarted} />
                <About />
                <EducationExperience />
                <SpotifyWidget />
                <Portofolio onOpenProject={handleOpenProject} />
                <Contact />
              </main>

              {/* Footer */}
              <Footer />
            </>
          )}

          {/* SVG Glitch Displacement Filters */}
          <GlitchFilters />
        </div>
      </div>
    </SoundProvider>
  );
}

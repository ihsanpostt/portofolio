import React from 'react';
import Backdrop from './components/Backdrop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#0a1222] text-[#f5f0e6] selection:bg-[#3178c6] selection:text-white antialiased">
      {/* Subtle Architectural Backdrop */}
      <Backdrop />

      {/* Clean Floating Navbar */}
      <Navbar />

      {/* Main Content Sections with Consistent Spacing */}
      <main className="relative z-10 flex flex-col">
        <Hero />
        <About />
        <Portfolio />
        <Contact />
      </main>

      {/* Clean Minimalist Footer */}
      <Footer />
    </div>
  );
}

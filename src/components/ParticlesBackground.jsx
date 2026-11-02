import React, { useEffect, useRef, useState } from 'react';

const METEORS = [
  { top: '-8%', left: '8%', duration: '9s', delay: '-3s' },
  { top: '-12%', left: '35%', duration: '11s', delay: '-9s' },
  { top: '12%', left: '-10%', duration: '10s', delay: '-6s' },
  { top: '28%', left: '4%', duration: '12s', delay: '-10s' },
  { top: '-14%', left: '54%', duration: '10s', delay: '-2s' },
  { top: '-6%', left: '78%', duration: '12s', delay: '-7s' },
  { top: '8%', left: '18%', duration: '11s', delay: '-5s' },
  { top: '22%', left: '-8%', duration: '9s', delay: '-8s' },
  { top: '-10%', left: '92%', duration: '13s', delay: '-11s' },
  { top: '36%', left: '-12%', duration: '11s', delay: '-4s' },
  { top: '-18%', left: '43%', duration: '8s', delay: '-6s' },
  { top: '4%', left: '3%', duration: '12s', delay: '-1s' },
  { top: '16%', left: '30%', duration: '10s', delay: '-9s' },
  { top: '30%', left: '-6%', duration: '13s', delay: '-12s' },
  { top: '-5%', left: '65%', duration: '9s', delay: '-4s' }
];

export default function ParticlesBackground() {
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 767px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const count = isMobile ? 50 : 100;
    const particles = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.4 + 0.4,
        speedY: Math.random() * 0.2 + 0.05,
        speedX: (Math.random() - 0.5) * 0.08,
        opacity: Math.random() * 0.4 + 0.1,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: i % 4 === 0 ? 'rgba(191, 219, 254, ' : 'rgba(255, 255, 255, '
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handlePointerMove = (e) => {
      targetMouseX = (e.clientX / width - 0.5) * 20;
      targetMouseY = (e.clientY / height - 0.5) * 20;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    let clock = 0;

    const render = () => {
      clock += 0.016;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < count; i++) {
        const p = particles[i];
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < 0) {
          p.y = height + 5;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(clock * 3 + p.twinkleOffset));
        const px = p.x + mouseX * (p.size * 0.5);
        const py = p.y + mouseY * (p.size * 0.5);

        ctx.fillStyle = p.color + Math.max(0, Math.min(1, currentOpacity)) + ')';
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [isMobile]);

  return (
    <div className="particles-container" style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
      <canvas ref={canvasRef} className="particles-canvas" aria-hidden="true" />
    </div>
  );
}


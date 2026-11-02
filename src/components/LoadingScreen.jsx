import React, { useEffect, useState, useRef } from 'react';

export default function LoadingScreen({ onComplete, onExitAnimationStart }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    // Lock scroll during loading
    const originalOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const duration = 1400; // ms

    const step = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const rawProgress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const easedProgress = Math.round((1 - Math.pow(1 - rawProgress, 3)) * 100);
      setProgress(easedProgress);

      if (rawProgress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setProgress(100);
        if (onExitAnimationStart) onExitAnimationStart();
        setIsFading(true);
        setTimeout(() => {
          document.documentElement.style.overflow = originalOverflow;
          document.body.style.overflow = originalBodyOverflow;
          if (onComplete) onComplete();
        }, 600);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      document.documentElement.style.overflow = originalOverflow;
      document.body.style.overflow = originalBodyOverflow;
    };
  }, [onComplete, onExitAnimationStart]);

  return (
    <div
      className={`welcome-loader ${isFading ? 'is-fading' : ''}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#050510',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s',
        opacity: isFading ? 0 : 1,
        pointerEvents: isFading ? 'none' : 'auto'
      }}
    >
      <span
        className="welcome-loader-number"
        role="status"
        aria-live="polite"
        aria-label={`Memuat aset portofolio ${progress}%`}
      >
        {progress}
        <span>%</span>
      </span>

      <div className="welcome-progress-track" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress / 100})` }} />
      </div>

      <span className="welcome-loader-count">Memuat assets...</span>
    </div>
  );
}


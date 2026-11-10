import React from 'react';

export function TechIcon({ name, size = 28, className = "" }) {
  switch (name) {
    case "Java":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <path d="M12.2 21.8s-1.3.8.9 1c2.7.3 4.1.3 7.1-.3 0 0 .8.5 1.9.9-6.7 2.9-15.2-.2-9.9-1.6zm-.8-3.6s-1.5 1.1.8 1.3c2.9.3 5.2.3 9.2-.4 0 0 .6.6 1.4.9-8.1 2.4-17.1.2-11.4-1.8z" fill="#5382A1"/>
          <path d="M17.2 12.6c1.7 1.9-.4 3.6-.4 3.6s4.2-2.2 2.3-4.9c-1.8-2.5-3.2-3.8 4.3-8.1 0 0-11.8 3-6.2 9.4z" fill="#EA2D2E"/>
          <path d="M25.6 24.7s1 .8-1.1 1.4c-3.9 1.2-16.3 1.5-19.7.1-1.2-.5 1.1-1.3 1.8-1.4.8-.2 1.2-.1 1.2-.1-1.4-1-8.9 1.9-3.8 2.7 13.8 2.2 25.1-1 21.6-2.7z" fill="#5382A1"/>
          <path d="M12.9 14.5s-6.1 1.4-2.2 2c1.7.2 5 .2 8.1-.1 2.5-.2 5.1-.7 5.1-.7s-.9.4-1.5.8c-6.2 1.6-18.3.9-14.8-.8 2.9-1.4 5.3-1.2 5.3-1.2zm11.2 6c6.3-3.3 3.4-6.4 1.4-6-.5.1-.7.2-.7.2s.2-.3.5-.4c3.9-1.4 6.9 4-1.3 6.2 0 .1.1 0 .1 0z" fill="#5382A1"/>
          <path d="M19.3 2s3.5 3.5-3.3 8.9c-5.5 4.3-1.2 6.8 0 9.6-3.2-2.9-5.5-5.4-4-7.8 2.3-3.5 8.7-5.2 7.3-10.7z" fill="#EA2D2E"/>
          <path d="M13.6 28.4c6 .4 15.2-.2 15.4-3.1 0 0-.4 1.1-5 2-5.1 1-11.4.9-15.1.2 0 0 .8.6 4.7.9z" fill="#5382A1"/>
        </svg>
      );
    case "JavaScript":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
          <rect width="32" height="32" rx="4" fill="#F7DF1E"/>
          <path d="M17.4 24.7c0 2.7-1.6 4.2-4.2 4.2-1.8 0-3.1-.7-3.9-1.8l2-1.3c.5.8 1 1.2 1.8 1.2.9 0 1.5-.4 1.5-2V14.2h2.8v10.5zm3.2 2c.9.6 2 1 3.3 1 1.4 0 2.2-.6 2.2-1.4 0-1-.7-1.4-2.1-2l-.8-.3c-2.2-.9-3.6-2-3.6-4.2 0-2.1 1.7-3.8 4.4-3.8 1.9 0 3.2.5 4.2 1.6l-1.9 1.3c-.6-.6-1.3-.9-2.2-.9-1 0-1.6.5-1.6 1.2 0 .8.6 1.2 1.9 1.7l.8.3c2.5 1 3.9 2.1 3.9 4.4 0 2.5-2 4.1-4.9 4.1-2.1 0-3.8-.7-4.8-1.9l1.2-1.1z" fill="#111827"/>
        </svg>
      );
    case "TypeScript":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
          <rect width="32" height="32" rx="4" fill="#3178C6"/>
          <path d="M19.2 15.2h-3.6v11.6h-2.8V15.2H9.2v-2.4h10v2.4zm2.1 10.6v-2.6c.8.5 1.8.9 2.9.9 1.2 0 1.8-.4 1.8-1.1 0-.7-.5-1.1-2-1.6-2-.7-3-1.7-3-3.5 0-2.2 1.7-3.6 4.4-3.6 1.2 0 2.3.2 3.1.6v2.5c-.8-.5-1.7-.8-2.7-.8-1 0-1.6.4-1.6 1 0 .7.5 1 2 1.6 2.1.8 3.1 1.7 3.1 3.6 0 2.3-1.7 3.7-4.6 3.7-1.4 0-2.7-.3-3.4-.7z" fill="#FFFFFF"/>
        </svg>
      );
    case "PHP":
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className} aria-hidden="true">
          <ellipse cx="64" cy="64" rx="60" ry="40" fill="#777BB4"/>
          <text x="64" y="75" fill="#fff" fontSize="36" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">php</text>
        </svg>
      );
    case "SQL":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <ellipse cx="16" cy="7.5" rx="10.5" ry="4" fill="#38BDF8" fillOpacity="0.2" stroke="#38BDF8" strokeWidth="1.8"/>
          <path d="M5.5 7.5v6c0 2.2 4.7 4 10.5 4s10.5-1.8 10.5-4v-6" stroke="#38BDF8" strokeWidth="1.8"/>
          <path d="M5.5 13.5v6c0 2.2 4.7 4 10.5 4s10.5-1.8 10.5-4v-6" stroke="#38BDF8" strokeWidth="1.8"/>
          <path d="M5.5 19.5v5c0 2.2 4.7 4 10.5 4s10.5-1.8 10.5-4v-5" stroke="#60A5FA" strokeWidth="1.8"/>
        </svg>
      );
    case "React":
    case "React.js":
      return (
        <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" className={className} aria-hidden="true">
          <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
          <g stroke="#61dafb" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      );
    case "Bootstrap":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
          <rect x="2" y="3" width="28" height="26" rx="6" fill="#7952B3"/>
          <path d="M11.5 9.2h5.9c2.8 0 4.6 1.3 4.6 3.5 0 1.6-.9 2.7-2.4 3.1v.1c1.9.3 3 1.6 3 3.5 0 2.5-1.9 4-5.1 4h-6v-14.2zm2.8 5.8h2.6c1.5 0 2.3-.7 2.3-1.8s-.8-1.7-2.2-1.7h-2.7V15zm0 6.1h3c1.6 0 2.5-.7 2.5-2s-.9-1.9-2.5-1.9h-3v3.9z" fill="#FFFFFF"/>
        </svg>
      );
    case "Tailwind CSS":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#38bdf8" className={className} aria-hidden="true">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
        </svg>
      );
    case "MUI":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <path d="M2 7.5l8 4.6v9.2l-2.6-1.5v-6.1L2 10.6V7.5z" fill="#00B0FF"/>
          <path d="M10 12.1l6 3.5 6-3.5v4.6l-6 3.5-6-3.5v-4.6z" fill="#0081CB"/>
          <path d="M22 7.5l8 4.6v9.2l-2.6 1.5v-6.1l-5.4-3.1V7.5z" fill="#00B0FF"/>
          <path d="M16 20.2l6-3.5v4.6l-6 3.5v-4.6z" fill="#0081CB"/>
          <path d="M16 20.2l-6-3.5v4.6l6 3.5v-4.6z" fill="#00B0FF"/>
          <path d="M30 21.3l-8 4.6-6-3.5 2.6-1.5 3.4 2 5.4-3.1v1.5z" fill="#0081CB"/>
        </svg>
      );
    case "Flutter":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <path d="M18.3 3L5.6 15.7l3.9 3.9L26.1 3h-7.8z" fill="#54C5F8"/>
          <path d="M18.3 14.9L11.5 21.7l3.9 3.9 10.7-10.7h-7.8z" fill="#54C5F8"/>
          <path d="M15.4 25.6l3 3h7.7l-6.8-6.9-3.9 3.9z" fill="#01579B"/>
          <path d="M11.5 21.7l3.9-3.9 3.9 3.9-3.9 3.9-3.9-3.9z" fill="#29B6F6"/>
        </svg>
      );
    case "MySQL":
      return <img src="/assets/mysql-logo-svgrepo-com-BQqVCOl5.svg" width={size} height={size} alt="" className={className} aria-hidden="true" />;
    case "PostgreSQL":
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="#336791" className={className} aria-hidden="true">
          <path d="M23.9 4C12.9 4 4 12.9 4 23.9s8.9 19.9 19.9 19.9 19.9-8.9 19.9-19.9S34.9 4 23.9 4zm2.1 33.5c-4.9 0-8.9-3.1-8.9-6.9 0-2.8 2.1-5.1 5.2-6.1-2.1-1.3-3.4-3.3-3.4-5.6 0-3.9 3.9-7.1 8.8-7.1 4.9 0 8.8 3.2 8.8 7.1 0 2.3-1.4 4.3-3.5 5.6 3.1 1 5.3 3.3 5.3 6.1 0 3.8-4 6.9-8.9 6.9z"/>
        </svg>
      );
    case "Vercel":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#ffffff" className={className} aria-hidden="true">
          <path d="M12 1L24 22H0L12 1Z"/>
        </svg>
      );
    case "Git":
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className} aria-hidden="true">
          <path fill="#F05032" d="M125.7 57.7L70.3 2.3c-3-3-8-3-11 0L45.8 15.9l14 14c3.2-1.1 7-.3 9.4 2.2 2.5 2.5 3.3 6.2 2.2 9.4l13.5 13.5c3.2-1.1 7-.3 9.4 2.2 3.6 3.6 3.6 9.4 0 13s-9.4 3.6-13 0c-2.5-2.5-3.3-6.2-2.2-9.4L66.3 47.4v35.3c1.1.5 2.1 1.2 2.9 2 3.6 3.6 3.6 9.4 0 13s-9.4 3.6-13 0c-3.6-3.6-3.6-9.4 0-13 .8-.8 1.8-1.5 2.9-2V46.6c-1.1-.5-2.1-1.2-2.9-2-2.5-2.5-3.3-6.2-2.2-9.4L40.2 21.4 2.3 59.3c-3 3-3 8 0 11l55.4 55.4c3 3 8 3 11 0l57-57c3.1-3 3.1-8 0-11z"/>
        </svg>
      );
    case "GitHub":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#ffffff" className={className} aria-hidden="true">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      );
    case "REST API":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <circle cx="8" cy="16" r="3.2" stroke="#38BDF8" strokeWidth="2"/>
          <circle cx="24" cy="8.5" r="3.2" stroke="#60A5FA" strokeWidth="2"/>
          <circle cx="24" cy="23.5" r="3.2" stroke="#818CF8" strokeWidth="2"/>
          <path d="M11 14.6l10.2-4.8M11 17.4l10.2 4.8" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round"/>
          <path d="M24 11.8v8.4" stroke="#38BDF8" strokeWidth="1.6" strokeDasharray="2 2"/>
        </svg>
      );
    case "Machine Learning":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
          <circle cx="7" cy="9" r="2.6" fill="#38BDF8"/>
          <circle cx="7" cy="23" r="2.6" fill="#38BDF8"/>
          <circle cx="16" cy="6.5" r="2.6" fill="#818CF8"/>
          <circle cx="16" cy="16" r="3" fill="#A855F7"/>
          <circle cx="16" cy="25.5" r="2.6" fill="#818CF8"/>
          <circle cx="25" cy="16" r="2.8" fill="#38BDF8"/>
          <path d="M9.4 8.3l4.2-1.2M9.2 10.4l4.5 4.1M9.2 21.6l4.5-4.1M9.4 23.7l4.2 1.2M18.4 7.7l4.7 6.3M19 16h3.2M18.4 24.3l4.7-6.3" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
      );
  }
}

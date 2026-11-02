import React from 'react';

export function TechIcon({ name, size = 40, className = "" }) {
  switch (name) {
    case "Tailwind CSS":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#38bdf8" className={className}>
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
        </svg>
      );
    case "Node.js":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="#539e43" className={className}>
          <path d="M16 2.5l12.5 7.2v14.6L16 31.5 3.5 24.3V9.7L16 2.5zm0 3.2L6.3 11.3v11.4L16 28.3l9.7-5.6V11.3L16 5.7z"/>
        </svg>
      );
    case "PostgreSQL":
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="#336791" className={className}>
          <path d="M23.9 4C12.9 4 4 12.9 4 23.9s8.9 19.9 19.9 19.9 19.9-8.9 19.9-19.9S34.9 4 23.9 4zm2.1 33.5c-4.9 0-8.9-3.1-8.9-6.9 0-2.8 2.1-5.1 5.2-6.1-2.1-1.3-3.4-3.3-3.4-5.6 0-3.9 3.9-7.1 8.8-7.1 4.9 0 8.8 3.2 8.8 7.1 0 2.3-1.4 4.3-3.5 5.6 3.1 1 5.3 3.3 5.3 6.1 0 3.8-4 6.9-8.9 6.9z"/>
        </svg>
      );
    case "VS Code":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#007ACC" className={className}>
          <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .32 8.68l3.6 3.32-3.6 3.32a1 1 0 0 0 .007 1.42l1.322 1.202c.38.347.954.37 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.94-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352z"/>
        </svg>
      );
    case "React":
      return (
        <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" className={className}>
          <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
          <g stroke="#61dafb" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      );
    case "JavaScript":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
          <rect width="32" height="32" rx="4" fill="#F7DF1E"/>
          <path d="M19.5 24.5c.8.5 1.7.8 2.7.8 1.4 0 2.3-.7 2.3-1.8v-8h3.3v8.1c0 3.3-2 4.9-5.3 4.9-1.9 0-3.4-.6-4.4-1.4l1.4-2.6zm-8.8-.2c.7.4 1.5.7 2.3.7 1.2 0 1.9-.5 1.9-1.3 0-.8-.6-1.2-1.8-1.7l-.9-.4c-2.3-.9-3.7-2.3-3.7-4.4 0-2.6 2-4.4 5.3-4.4 1.6 0 2.8.4 3.6.9l-1.1 2.6c-.6-.4-1.4-.7-2.3-.7-1.1 0-1.7.5-1.7 1.2 0 .8.6 1.1 1.7 1.6l.9.4c2.6 1.1 3.9 2.4 3.9 4.6 0 2.7-2.1 4.6-5.8 4.6-1.8 0-3.3-.4-4.3-1.1l1.6-2.5z" fill="#000"/>
        </svg>
      );
    case "HTML5":
      return (
        <svg width={size} height={size} viewBox="0 0 512 512" className={className}>
          <path fill="#E44D26" d="M107.6 441.6L67.1 0h377.8l-40.5 441.6L256 480"/>
          <path fill="#F16529" d="M256 445.6l116.8-31.9 33.7-372.9H256v404.8z"/>
          <path fill="#EBEBEB" d="M256 195.9h-60.6l-4.2-46.6H256v-47H139.7l1.1 12.3 11.2 128.3H256v-47zm0 134.8l-.3.1-51.2-13.8-3.3-36.9h-47.2l6.5 72.8 95.2 26.4.3-.1.3.1 95.2-26.4 13.1-147h-47.2l-3.3 36.9-51.2 13.8-.3-.1z"/>
          <path fill="#fff" d="M256 195.9h60.6l-5.7 64.2-54.9 14.8v48.6l97.6-26.4.7-8.1 11.2-125.1 1.1-12.3H256v44.3zm0-93.6h116.3l-1.1 12.3-2.9 32.4H256v-44.7z"/>
        </svg>
      );
    case "CSS3":
      return (
        <svg width={size} height={size} viewBox="0 0 512 512" className={className}>
          <path fill="#1572B6" d="M107.6 441.6L67.1 0h377.8l-40.5 441.6L256 480"/>
          <path fill="#33A9DC" d="M256 445.6l116.8-31.9 33.7-372.9H256v404.8z"/>
          <path fill="#fff" d="M256 195.9h-60.6l-4.2-46.6H256v-47H139.7l1.1 12.3 11.2 128.3H256v-47zm0 134.8l-.3.1-51.2-13.8-3.3-36.9h-47.2l6.5 72.8 95.2 26.4.3-.1.3.1 95.2-26.4 13.1-147h-47.2l-3.3 36.9-51.2 13.8-.3-.1z"/>
          <path fill="#EBEBEB" d="M256 195.9h60.6l-5.7 64.2-54.9 14.8v48.6l97.6-26.4.7-8.1 11.2-125.1 1.1-12.3H256v44.3zm0-93.6h116.3l-1.1 12.3-2.9 32.4H256v-44.7z"/>
        </svg>
      );
    case "Font Awesome":
      return (
        <svg width={size} height={size} viewBox="0 0 512 512" fill="#528DD7" className={className}>
          <path d="M473.6 128c-17.7 0-32 14.3-32 32v192c0 17.7 14.3 32 32 32s32-14.3 32-32V160c0-17.7-14.3-32-32-32zM38.4 128c-17.7 0-32 14.3-32 32v192c0 17.7 14.3 32 32 32s32-14.3 32-32V160c0-17.7-14.3-32-32-32zm160 0c-17.7 0-32 14.3-32 32v192c0 17.7 14.3 32 32 32s32-14.3 32-32V160c0-17.7-14.3-32-32-32zm115.2 0c-17.7 0-32 14.3-32 32v192c0 17.7 14.3 32 32 32s32-14.3 32-32V160c0-17.7-14.3-32-32-32z"/>
        </svg>
      );
    case "Python":
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <path fill="#3776AB" d="M63.3 2c-15.6 0-25 6.7-25 19.8v14.5h25.4v3.6H28.4C13.2 39.9 0 51.5 0 66.7c0 14.9 11.2 26.2 26 26.2h9.7v-13c0-14.9 12.8-27.4 28-27.4h25.3V38.1C89 23.3 78.9 2 63.3 2zm-12.7 8.3c3.6 0 6.6 3 6.6 6.6 0 3.6-3 6.6-6.6 6.6-3.6 0-6.6-3-6.6-6.6 0-3.6 3-6.6 6.6-6.6z"/>
          <path fill="#FFD43B" d="M64.7 126c15.6 0 25-6.7 25-19.8V91.7H64.3v-3.6h35.3c15.2 0 28.4-11.6 28.4-26.8 0-14.9-11.2-26.2-26-26.2h-9.7v13c0 14.9-12.8 27.4-28 27.4H39v14.4c0 14.8 10.1 36.1 25.7 36.1zm12.7-8.3c-3.6 0-6.6-3-6.6-6.6 0-3.6 3-6.6 6.6-6.6 3.6 0 6.6 3 6.6 6.6 0 3.6-3 6.6-6.6 6.6z"/>
        </svg>
      );
    case "PHP":
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <ellipse cx="64" cy="64" rx="60" ry="40" fill="#777BB4"/>
          <text x="64" y="75" fill="#fff" fontSize="36" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">php</text>
        </svg>
      );
    case "MySQL":
      return <img src="/assets/mysql-logo-svgrepo-com-BQqVCOl5.svg" width={size} height={size} alt="MySQL" className={className} />;
    case "Supabase":
      return (
        <svg width={size} height={size} viewBox="0 0 109 113" fill="none" className={className}>
          <path d="M63.7 110.3c-2.3 3.1-7.4 1.7-7.7-2.2L52.5 58h43.1c5.5 0 8.5 6.5 4.9 10.7L63.7 110.3z" fill="#3ECF8E"/>
          <path d="M45.3 2.7c2.3-3.1 7.4-1.7 7.7 2.2L56.5 55H13.4c-5.5 0-8.5-6.5-4.9-10.7L45.3 2.7z" fill="#3ECF8E" fillOpacity=".5"/>
        </svg>
      );
    case "Firebase":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
          <path fill="#FFA000" d="M5.4 24.6L14.7 3.2c.4-.9 1.7-.8 1.9.1l3.5 12.3-14.7 9z"/>
          <path fill="#F57C00" d="M26.6 24.6l-4.1-16.1c-.2-.9-1.5-1.1-1.9-.3L5.4 24.6h21.2z"/>
          <path fill="#FFCA28" d="M16 28.5l10.6-3.9-6.5-16.4L16 28.5z"/>
        </svg>
      );
    case "XAMPP":
      return <img src="/assets/xampp-svgrepo-com-CyJx88TA.svg" width={size} height={size} alt="XAMPP" className={className} />;
    case "Git":
      return (
        <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
          <path fill="#F05032" d="M125.7 57.7L70.3 2.3c-3-3-8-3-11 0L45.8 15.9l14 14c3.2-1.1 7-.3 9.4 2.2 2.5 2.5 3.3 6.2 2.2 9.4l13.5 13.5c3.2-1.1 7-.3 9.4 2.2 3.6 3.6 3.6 9.4 0 13s-9.4 3.6-13 0c-2.5-2.5-3.3-6.2-2.2-9.4L66.3 47.4v35.3c1.1.5 2.1 1.2 2.9 2 3.6 3.6 3.6 9.4 0 13s-9.4 3.6-13 0c-3.6-3.6-3.6-9.4 0-13 .8-.8 1.8-1.5 2.9-2V46.6c-1.1-.5-2.1-1.2-2.9-2-2.5-2.5-3.3-6.2-2.2-9.4L40.2 21.4 2.3 59.3c-3 3-3 8 0 11l55.4 55.4c3 3 8 3 11 0l57-57c3.1-3 3.1-8 0-11z"/>
        </svg>
      );
    case "GitHub":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#ffffff" className={className}>
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      );
    case "Vite":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
          <path d="M29.9 6.1L16.7 29.6c-.3.5-1 .5-1.2 0L2.1 6.1c-.3-.5.1-1.2.7-1l13.2 2.4c.2 0 .5 0 .8 0L29.2 5.1c.6-.1 1 .5.7 1z" fill="url(#viteGradient)"/>
          <path d="M22.3 2l-9.7 1.9a.4.4 0 00-.3.3L11.7 14c0 .2.2.4.4.4l2.7-.6c.3-.1.5.2.4.4l-.8 3.9c-.1.3.2.5.5.4l1.7-.5c.3-.1.5.1.5.4l-1.3 6.2c-.1.4.4.6.6.3L16.5 25 24.4 9.2c.1-.3-.1-.6-.4-.5l-2.8.5c-.3.1-.5-.2-.4-.4l1.8-6.3c.1-.3-.1-.5-.4-.5z" fill="#FFD43B"/>
          <defs>
            <linearGradient id="viteGradient" x1="6" y1="33" x2="235" y2="344" gradientUnits="userSpaceOnUse">
              <stop stopColor="#41D1FF"/>
              <stop offset="1" stopColor="#BD34FE"/>
            </linearGradient>
          </defs>
        </svg>
      );
    case "Vercel":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="#ffffff" className={className}>
          <path d="M12 1L24 22H0L12 1Z"/>
        </svg>
      );
    case "Android Studio":
      return <img src="/assets/android-studio-icon-7CEbVhV6.svg" width={size} height={size} alt="Android Studio" className={className} />;
    case "Capacitor":
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" className={className}>
          <path d="M16 2L3 9.5v13L16 30l13-7.5v-13L16 2z" fill="#119EFF"/>
        </svg>
      );
    case "Gemini":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" fill="url(#geminiGradient)"/>
          <defs>
            <linearGradient id="geminiGradient" x1="2" y1="2" x2="22" y2="22">
              <stop stopColor="#4E82EE"/>
              <stop offset="0.5" stopColor="#9B72CB"/>
              <stop offset="1" stopColor="#D96570"/>
            </linearGradient>
          </defs>
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
      );
  }
}


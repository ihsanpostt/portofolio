/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2563eb', // Primary Blue
          hover: '#1d4ed8',
          subtle: 'rgba(37, 99, 235, 0.1)',
        },
        accent: {
          DEFAULT: '#10b981', // Emerald Mint Accent
          hover: '#059669',
          subtle: 'rgba(16, 185, 129, 0.1)',
        },
        surface: {
          page: '#090d16',       // Deep obsidian dark page background
          DEFAULT: '#0f172a',    // Card / Section surface
          elevated: '#151f32',   // Elevated card or hover
          muted: '#1e293b',
          border: '#1e293b',     // Crisp subtle borders
          borderHover: '#334155',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}

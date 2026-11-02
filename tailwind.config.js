/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0284c7', // Sky-600
          hover: '#0369a1',
          subtle: 'rgba(2, 132, 199, 0.08)',
        },
        accent: {
          DEFAULT: '#0d9488', // Teal-600
          hover: '#0f766e',
          subtle: 'rgba(13, 148, 136, 0.08)',
        },
        canvas: {
          bg: '#f8fafc',
          card: '#ffffff',
          border: '#e2e8f0',
          dark: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        handwriting: ['"Caveat"', 'cursive', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 12px 24px -6px rgba(15, 23, 42, 0.08), 0 4px 8px -4px rgba(15, 23, 42, 0.04)',
        'polaroid': '0 20px 35px -10px rgba(15, 23, 42, 0.12), 0 8px 16px -6px rgba(15, 23, 42, 0.06)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}

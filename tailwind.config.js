/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette principale
        background: '#0A1828', // Bleu foncé professionnel
        surface: '#0F2438', // Plus clair que le background
        primary: '#E4E8EF', // Texte principal clair
        secondary: '#64748B', // Gris acier
        accent: {
          DEFAULT: '#178582', // Turquoise
          hover: '#126E6B',
          light: '#1E9E9A',
        },
        gold: {
          DEFAULT: '#BFA181', // Or
          hover: '#A88B6C',
          light: '#D4B696',
        },
        // Couleurs sémantiques
        success: {
          DEFAULT: '#10B981',
          hover: '#059669',
        },
        warning: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
        },
        danger: {
          DEFAULT: '#EF4444',
          hover: '#DC2626',
        },
      },
      fontFamily: {
        sans: ['Roboto Mono', 'monospace'], // Police technique
        mono: ['Share Tech Mono', 'monospace'], // Police HUD
        display: ['Orbitron', 'sans-serif'], // Police titres
      },
      boxShadow: {
        'glow': '0 0 15px rgba(23, 133, 130, 0.3)', // Lueur turquoise
        'gold': '0 0 15px rgba(191, 161, 129, 0.3)', // Lueur dorée
      },
    },
  },
  plugins: [],
}
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
        navy: {
          950: '#020617',
          900: '#070f26',
          850: '#0A1128',
          800: '#0f1c3f',
          700: '#162854',
          600: '#1e3875',
        },
        acm: {
          blue: '#0085CA',
          light: '#0ea5e9',
          electric: '#38BDF8',
          cyan: '#22D3EE',
          dark: '#005f94',
          accent: '#6366F1',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', '"Orbitron"', 'sans-serif'],
        orbitron: ['"Orbitron"', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(0, 133, 202, 0.35)',
        'glow-md': '0 0 25px rgba(56, 189, 248, 0.4)',
        'glow-lg': '0 0 40px rgba(34, 211, 238, 0.45)',
        'glow-cyan': '0 0 25px rgba(34, 211, 238, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 133, 202, 0.15)',
        'inner-glow': 'inset 0 0 20px rgba(56, 189, 248, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'glow-line': 'glowLine 3s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(12px)' },
        },
        glowLine: {
          '0%, 100%': { opacity: '0.3', transform: 'scaleX(0.8)' },
          '50%': { opacity: '1', transform: 'scaleX(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

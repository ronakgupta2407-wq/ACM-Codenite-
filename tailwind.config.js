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
          950: '#050B1E', // Primary Background
          900: '#0A1530', // Secondary Background
          850: '#0F1A3B',
          800: '#101D3D', // Card Background
          750: '#15244C',
          700: '#1A2E60',
          600: '#233C7B',
        },
        tech: {
          bg: '#050B1E',
          surface: '#0A1530',
          card: '#101D3D',
          cardHover: '#14254D',
          border: 'rgba(96, 165, 250, 0.25)',
          borderHover: 'rgba(56, 189, 248, 0.55)',
          blue: '#2563EB',
          electric: '#3B82F6',
          cyan: '#38BDF8',
          violet: '#6366F1',
          purple: '#8B5CF6',
          muted: '#AAB7D0',
          subtext: '#8E9EB8',
          text: '#F8FAFC',
        },
        acm: {
          blue: '#2563EB',
          light: '#3B82F6',
          electric: '#38BDF8',
          cyan: '#22D3EE',
          dark: '#1D4ED8',
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
        'glow-sm': '0 0 15px rgba(59, 130, 246, 0.35)',
        'glow-md': '0 0 25px rgba(56, 189, 248, 0.4)',
        'glow-lg': '0 0 40px rgba(37, 99, 235, 0.45)',
        'glow-cyan': '0 0 25px rgba(56, 189, 248, 0.5)',
        'glow-violet': '0 0 30px rgba(99, 102, 241, 0.45)',
        'tech-card': '0 10px 30px -5px rgba(5, 11, 30, 0.8), 0 0 1px 1px rgba(96, 165, 250, 0.2)',
        'tech-hover': '0 20px 40px -10px rgba(5, 11, 30, 0.9), 0 0 25px rgba(56, 189, 248, 0.35)',
        'glass': '0 8px 32px 0 rgba(5, 11, 30, 0.65)',
        'inner-glow': 'inset 0 0 20px rgba(56, 189, 248, 0.15)',
      },
      backgroundImage: {
        'tech-gradient': 'linear-gradient(135deg, #050B1E 0%, #0A1530 50%, #050B1E 100%)',
        'tech-radial': 'radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.18) 0%, rgba(5, 11, 30, 0) 70%)',
        'gradient-cyan-blue': 'linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)',
        'gradient-blue-violet': 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
        'gradient-text': 'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 50%, #38BDF8 100%)',
        'gradient-glow': 'linear-gradient(180deg, rgba(56, 189, 248, 0.15) 0%, rgba(37, 99, 235, 0.05) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'glow-line': 'glowLine 3s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 14s linear infinite',
        'gradient-x': 'gradientX 10s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        glowLine: {
          '0%, 100%': { opacity: '0.3', transform: 'scaleX(0.85)' },
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
        gradientX: {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

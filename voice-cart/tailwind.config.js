/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: {
          50:  '#f0fdf8',
          100: '#ccfbec',
          200: '#99f6d8',
          300: '#5eebbe',
          400: '#25d4a0',
          500: '#00C896',   // Primary accent — matches design reference
          600: '#00a87e',
          700: '#008863',
          800: '#006b4e',
          900: '#005840',
        },
        charcoal: {
          900: '#121212',
          800: '#1C1C1C',   // App background
          700: '#242424',
          600: '#2E2E2E',
          500: '#3A3A3A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'pulse-ring': 'pulse-ring 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'waveform':   'waveform 1.2s ease-in-out infinite alternate',
        'slide-up':   'slide-up 0.3s ease-out',
        'fade-in':    'fade-in 0.2s ease-out',
        'bounce-in':  'bounce-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'shimmer':    'shimmer 1.5s infinite',
      },
      keyframes: {
        'pulse-ring': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%':       { transform: 'scale(1.15)', opacity: '0.4' },
        },
        'waveform': {
          '0%':   { transform: 'scaleY(0.3)' },
          '100%': { transform: 'scaleY(1)' },
        },
        'slide-up': {
          '0%':   { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'bounce-in': {
          '0%':   { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)',   opacity: '1' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
      },
      boxShadow: {
        'mint':    '0 4px 20px rgba(0, 200, 150, 0.35)',
        'mint-lg': '0 8px 40px rgba(0, 200, 150, 0.45)',
        'card':    '0 2px 12px rgba(0, 0, 0, 0.08)',
        'card-md': '0 4px 24px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};

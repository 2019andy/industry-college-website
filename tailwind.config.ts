import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#c7d9fe',
          300: '#a4beff',
          400: '#7b9aff',
          500: '#5575f5',
          600: '#3d55e8',
          700: '#3041d0',
          800: '#2b37a9',
          900: '#2a3586',
          950: '#161d4f',
        },
        gold: {
          50: '#fffbf0',
          100: '#fff4d9',
          200: '#ffe6b2',
          300: '#ffd180',
          400: '#ffb34d',
          500: '#ff971f',
          600: '#f07a05',
          700: '#c75c06',
          800: '#9e470c',
          900: '#7f3b0d',
          950: '#451c04',
        },
        dark: {
          50: '#f6f6f7',
          100: '#e1e2e6',
          200: '#c3c5ce',
          300: '#9da0b0',
          400: '#777a8e',
          500: '#5c5f73',
          600: '#484a5c',
          700: '#3a3c4a',
          800: '#323340',
          900: '#1a1b25',
          950: '#0d0d14',
        },
      },
      fontFamily: {
        sans: ['PingFang SC', 'Microsoft YaHei', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Noto Serif SC', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #161d4f 0%, #2a3586 50%, #3041d0 100%)',
        'gold-gradient': 'linear-gradient(135deg, #ff971f 0%, #ffb34d 50%, #ffd180 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 12px 40px rgba(0, 0, 0, 0.12)',
        'gold': '0 4px 20px rgba(255, 151, 31, 0.25)',
        'nav': '0 1px 20px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

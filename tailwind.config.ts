import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'noto-serif': ["'Noto Serif KR'", 'serif'],
        'nanum-myeongjo': ["'Nanum Myeongjo'", 'serif'],
        'noto-sans': ["'Noto Sans KR'", 'sans-serif'],
        'gowun-dodum': ["'Gowun Dodum'", 'sans-serif'],
      },
      colors: {
        canvas: {
          bg: 'var(--canvas-bg)',
          surface: 'var(--canvas-surface)',
          border: 'var(--canvas-border)',
          accent: 'var(--canvas-accent)',
          'accent-light': 'var(--canvas-accent-light)',
          muted: 'var(--canvas-muted)',
          text: 'var(--canvas-text)',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(124, 106, 239, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(124, 106, 239, 0.4)' },
        },
      },
    },
  },
  plugins: [],
}
export default config

import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./pages/**/*.{ts,tsx}','./components/**/*.{ts,tsx}','./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)','serif'],
        body:    ['var(--font-body)','sans-serif'],
        mono:    ['var(--font-mono)','monospace'],
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'ticker':     'ticker 35s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'fade-up':    'fadeUp 0.5s ease forwards',
      },
      keyframes: {
        float:   { '0%,100%': { transform:'translateY(0)' }, '50%': { transform:'translateY(-8px)' } },
        ticker:  { '0%': { transform:'translateX(0)' }, '100%': { transform:'translateX(-50%)' } },
        fadeUp:  { from: { opacity:'0', transform:'translateY(16px)' }, to: { opacity:'1', transform:'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
export default config

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Theme-aware tokens — RGB triplets in CSS vars (index.css), wrapped so
        // Tailwind opacity modifiers work and light/dark is a token swap.
        paper: 'rgb(var(--paper) / <alpha-value>)',
        'paper-2': 'rgb(var(--paper-2) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        'card-2': 'rgb(var(--card-2) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-soft': 'rgb(var(--ink-soft) / <alpha-value>)',
        'ink-faint': 'rgb(var(--ink-faint) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        'line-soft': 'rgb(var(--line-soft) / <alpha-value>)',
        blue: 'rgb(var(--blue) / <alpha-value>)',
        'blue-2': 'rgb(var(--blue-2) / <alpha-value>)',
        'on-blue': 'rgb(var(--on-blue) / <alpha-value>)',
        rust: 'rgb(var(--rust) / <alpha-value>)',
        wa: 'rgb(var(--wa) / <alpha-value>)',
        'wa-2': 'rgb(var(--wa-2) / <alpha-value>)',
        // Refrigerant cylinder colour-codes (fixed, read on both themes)
        r410: '#C67DA0',
        r32: '#7E9CB6',
        r134: '#5C9DD0',
        r22: '#9AA3B2',
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        page: '1140px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        ring: {
          '0%': { transform: 'scale(1)', opacity: '0.45' },
          '70%': { transform: 'scale(1.5)', opacity: '0' },
          '100%': { opacity: '0' },
        },
        gauge: {
          '0%, 100%': { transform: 'rotate(-14deg)' },
          '50%': { transform: 'rotate(16deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        marquee: 'marquee 34s linear infinite',
        ring: 'ring 2.8s cubic-bezier(0.4,0,0.6,1) infinite',
        gauge: 'gauge 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

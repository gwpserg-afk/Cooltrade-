/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Refrigeration cool blues / teals — the core brand identity
        frost: {
          50: '#eefcfd',
          100: '#d4f6f9',
          200: '#aeecf2',
          300: '#75dce8',
          400: '#35c2d5',
          500: '#19a5bb',
          600: '#17849e',
          700: '#1a6b81',
          800: '#1f586a',
          900: '#1e495a',
          950: '#0e303d',
        },
        // Deep navy for the industrial / technical base
        steel: {
          50: '#f4f7fa',
          100: '#e6edf3',
          200: '#c9d8e5',
          300: '#9cb7ce',
          400: '#6890b2',
          500: '#467298',
          600: '#375a7e',
          700: '#2e4a66',
          800: '#2a3f56',
          900: '#182739',
          950: '#0d1826',
        },
        // Senegal sun — warm ochre/orange accent, reserved for CTAs
        sun: {
          50: '#fef8ec',
          100: '#fbebc8',
          200: '#f7d68d',
          300: '#f3bb52',
          400: '#f0a32c',
          500: '#e9831a',
          600: '#ce6113',
          700: '#ab4414',
          800: '#8b3616',
          900: '#722d15',
          950: '#411506',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Barlow Semi Condensed"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(13, 24, 38, 0.06), 0 8px 24px -12px rgba(13, 24, 38, 0.18)',
        'card-hover': '0 4px 12px rgba(13, 24, 38, 0.10), 0 16px 40px -16px rgba(13, 24, 38, 0.28)',
      },
      backgroundImage: {
        'grid-steel':
          "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 .5H40M.5 0V40' stroke='%23ffffff' stroke-opacity='0.05'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.4)', opacity: '0' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

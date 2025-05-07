/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      animation: {
        'dash': 'dash 1.5s ease-in-out forwards',
      },
      keyframes: {
        dash: {
          '0%': { 'stroke-dasharray': '0, 100' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
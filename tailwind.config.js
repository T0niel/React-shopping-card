/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        mobile: '380px',
        tablet: '668px',
        laptop: '824px',
        desktop: '1180px',
      },
      keyframes: {
        popBounce: {
          '0%': {
            transform: 'scale(0)',
          },
          '50%': {
            transform: 'scale(1.1)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        pop: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
      },
      animation: {
        popBounce: 'popBounce 1s ease-in-out',
        pop: 'pop 400ms ease-in-out',
      },
    },
  },
  plugins: [],
};

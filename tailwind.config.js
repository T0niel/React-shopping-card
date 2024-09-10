/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      
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
      },
      animation: {
        popBounce: 'popBounce 1s ease-in-out',
      },
    },
  },
  plugins: [],
};

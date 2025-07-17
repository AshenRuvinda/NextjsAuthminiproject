/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          inter: ['Inter', 'sans-serif'],
        },
        colors: {
          'primary-purple': '#8E44AD',
          'secondary-yellow': '#F1C40F',
          'bg-cream': '#FCFBF7',
          'accent-orange': '#D35400',
          'text-navy': '#2C3E50',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          glow: {
            '0%': { boxShadow: '0 0 0 0 rgba(241, 196, 15, 0.4)' },
            '50%': { boxShadow: '0 0 15px 5px rgba(241, 196, 15, 0.6)' },
            '100%': { boxShadow: '0 0 0 0 rgba(241, 196, 15, 0.4)' },
          },
          pulse: {
            '0%': { transform: 'scale(1)', opacity: '0.2' },
            '50%': { transform: 'scale(1.2)', opacity: '0.4' },
            '100%': { transform: 'scale(1)', opacity: '0.2' },
          },
        },
        animation: {
          fadeIn: 'fadeIn 0.5s ease-in-out',
          slideUp: 'slideUp 0.5s ease-in-out',
          glow: 'glow 2s ease-in-out infinite',
          pulse: 'pulse 3s ease-in-out infinite',
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  };
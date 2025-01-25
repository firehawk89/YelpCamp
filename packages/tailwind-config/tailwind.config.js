/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'src/**/*.{js,ts,jsx,tsx}',
    'app/**/*.{js,ts,jsx,tsx}',
    'components/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-primary)']
      },
      colors: {
        accent: '#f97316',
        info: '#3b82f6',
        warning: '#f4bb1b',
        danger: '#f13637',
        success: '#3dc13c'
      }
    },
    container: { center: true, padding: { DEFAULT: '1.25rem', md: '2rem' } }
  }
};

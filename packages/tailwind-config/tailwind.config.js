/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'src/**/*.{js,ts,jsx,tsx}',
    'app/**/*.{js,ts,jsx,tsx}',
    'components/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
    container: { center: true, padding: { DEFAULT: '1.25rem', md: '2rem' } }
  }
};

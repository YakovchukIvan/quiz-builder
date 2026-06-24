/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        'bg-light': '#f0f2f8',
        'bg-dark': '#171825',
        'card-light': '#ffffff',
        'card-dark': '#1e2030',
        'text-main-light': '#141628',
        'text-main-dark': '#f7f8fc',
        'text-muted-light': '#6b7280',
        'text-muted-dark': '#9ca3af',
        'border-light': '#e4e7f0',
        'border-dark': '#2a2d3e',
        'primary': '#6b5ce7',
        'destructive': '#ef4444',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          brown: '#8B4513',
          'dark-brown': '#654321',
          'light-brown': '#A0522D',
        },
        dark: '#1a1a1a',
        'dark-gray': '#2a2a2a',
        light: '#ffffff',
      },
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
        'sans': ['DM Sans', 'sans-serif'],
        'arabic': ['DM Sans', 'sans-serif'],
        'english': ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        bg: '#0C0C0C',
        'bg-deep': '#050505',
        surface: '#111111',
        'surface-2': '#181818',
        text: '#D7E2EA',
        'text-muted': 'rgba(215,226,234,0.65)',
        purple: '#7621B0',
        magenta: '#B600A8',
        cyan: '#00DBFB',
        blue: '#264B9C',
        orange: '#BE4C00',
        white: '#FFFFFF',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
    },
  },
  plugins: [],
}

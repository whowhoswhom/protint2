/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0a0a0a',
        'bg-secondary': '#111111',
        'accent-primary': '#00ff88',
        'accent-secondary': '#00d4ff',
        'text-primary': '#ffffff',
        'text-secondary': '#a0a0a0',
        'text-muted': '#666666',
        'border-subtle': '#1a1a1a',
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'display': 'clamp(2.5rem, 8vw, 6rem)',
        'heading': 'clamp(1.5rem, 4vw, 2.5rem)',
        'subheading': 'clamp(1rem, 2.5vw, 1.25rem)',
        'body': 'clamp(0.875rem, 2vw, 1rem)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      maxWidth: {
        '8xl': '1400px',
      },
    },
  },
  plugins: [],
} 
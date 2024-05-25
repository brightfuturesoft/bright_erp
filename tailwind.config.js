/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        'primary': '#3498db',
        'secondary': '#2ecc71',
        'black': '#111827',
        'dark': '#1F2937',
        'light-dark': '#374151',
        'light': '#fff',
        'danger': '#EF4444',
        // You can define as many custom colors as you need
      },
    },
  },
  plugins: [],
}

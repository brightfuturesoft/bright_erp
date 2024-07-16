/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class', // Enable dark mode using the class strategy
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        'node_modules/preline/dist/*.js',
    ],
    theme: {
        extend: {
            colors: {
                // Add your custom colors here
                primary: '#0A65B4',
                white: '#F9FAFB',
                secondary: '#2ecc71',
                black: '#040C1F',
                'light-dark': '#1F2937',
                'dark-gray': '#2f3744d5',
                dark: '#111827',
                light: '#fff',
                danger: '#f60360',
                success: '#22c55e',
                warning: '#eab308',
                info: '#06b6d4',
                // You can define as many custom colors as you need
            },
        },
    },
    plugins: [require('preline/plugin')],
};

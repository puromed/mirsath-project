import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.jsx',
        './resources/**/*.vue',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'primary-dark': '#2a4a3d',
                'primary-green': '#6d7b3c',
                'accent-gold': '#b8a275',
                'text-dark': '#252525',
                'text-muted': '#60594b',
                'accent-light-green': '#b6c58c',
                'background-off-white': '#b5bbad',
                'neutral-gray': '#8a8a8a',
                'page-bg': '#f8f9fa',
                'gradient-green-to': '#6e7848',
                'sidebar-bg': '#252525',
                'navbar-bg': '#60594b',
                'card-bg': '#2a4a3d',
                'card-gradient-to': '#6e7848',
              },
        },
    },
    plugins: [],
};

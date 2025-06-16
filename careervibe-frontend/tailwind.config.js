/** @type {import('tailwindcss').Config} */
     export default {
      darkMode: 'class', // Enable dark mode support
       content: [
         "./index.html",
         "./src/**/*.{js,ts,jsx,tsx}",
       ],
       theme: {
         extend: {
           colors: {
             'rgb-primary': 'rgb(34, 197, 94)', // Green for buttons
             'rgb-accent': 'rgb(59, 130, 246)', // Blue for navbar
             'rgb-secondary': 'rgb(245, 101, 101)', // Coral fo highlights
           },
           backgroundImage: {
             'rgb-gradient': 'linear-gradient(135deg, rgb(34, 197, 94), rgb(59, 130, 246))',
             'rgb-alt-gradient': 'linear-gradient(135deg, rgb(245, 101, 101), rgb(59, 130, 246))',
           },
         },
       },
       plugins: [],
     }
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // important for class-based dark mode
  theme: {
    extend: {
      colors: {
        customColor: '#123456', // Replace with your desired hex code
        secondaryColor: '#abcdef', // Add another custom color if needed
        darkPrimary: '#050816',
        lightPrimary: "#F5F9FD",
        black200: "#090325",
      },
    },
  },
  plugins: [],
};

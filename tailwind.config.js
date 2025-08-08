// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // if you're using /src
    "./pages/**/*.{js,ts,jsx,tsx}", // fallback if not
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

// // tailwind.config.js
// module.exports = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//     "./app/**/*.{js,ts,jsx,tsx}", // if you're using the app directory
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

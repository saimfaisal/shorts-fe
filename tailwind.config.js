/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#f97316",
          dark: "#ea580c",
          light: "#fb923c"
        }
      },
      boxShadow: {
        card: "0 25px 50px -12px rgb(15 23 42 / 0.45)"
      }
    }
  },
  plugins: []
};

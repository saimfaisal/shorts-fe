/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["'Poppins'", "sans-serif"],
        montserrat: ["'Montserrat'", "sans-serif"]
      },
      colors: {
        brand: {
          DEFAULT: "#6366f1",
          dark: "#4f46e5",
          light: "#818cf8"
        },
        accent: {
          DEFAULT: "#ec4899",
          dark: "#db2777",
          light: "#f472b6"
        }
      },
      boxShadow: {
        card: "0 25px 50px -12px rgba(99, 102, 241, 0.2)"
      }
    }
  },
  plugins: []
};

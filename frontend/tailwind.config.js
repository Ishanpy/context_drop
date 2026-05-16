/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        navy: "#0B1020",
        blue: "#2563EB",
        teal: "#14B8A6",
        amber: "#F59E0B",
        panel: "#111827",
        border: "#1F2937",
      },
    },
  },

  plugins: [],
}
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
      boxShadow: {
      glow: "0 0 40px rgba(59,130,246,0.15)",
      },
    },
  },

  plugins: [],
}
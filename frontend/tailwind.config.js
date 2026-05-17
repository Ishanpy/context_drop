/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
  background: "#111F22",

  panel: "#1A2B2F",

  primary: "#394E6A",

  accent: "#2F6F67",

  cream: "#EBE9DB",

  ice: "#E3EFF2",

  border: "rgba(227,239,242,0.08)",
},
      boxShadow: {
      glow: "0 0 40px rgba(59,130,246,0.15)",
      },
    },
  },

  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "placeholder":"#00000040",
        "text" : "#575757",
         "Text-dark":"#25252F",
         "Text-light":"#77777E",
         "Text-disabled":"#CACACD"
      },
      fontFamily:{
        "Lato" : "Lato, sans-serif"
      }
    },
  },
  plugins: [],
}


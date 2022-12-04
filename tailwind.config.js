/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage : {
        "login" : "url('https://i.ibb.co/7zxLx9Y/Foto-15.png')"
      },
      fontFamily: {
        Montserrat: ['Montserrat', 'sans-serif'],
        Raleway: ['Raleway', 'sans-serif'],

      }
    },
  },
  plugins: [require("daisyui")],
}

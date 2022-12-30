/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", './src/*.{js}'],
  theme: {
    extend: {
      colors: {
       blue47: '#0A2647',
       blue72: '#144272',
       blue95: '#205295',
       blueB3: '#2C74B3'
      },
    },
  },
  plugins: [],
}

// module.exports = {
//   theme: {
//     screens: {
//       sm: '640px',
//       md: '768px',
//       lg: '1024px',
//       xl: '1280px',
//     },
//     container: {
//       padding: {
//         default: '1rem',
//         sm: '2rem',
//         lg: '4rem',
//         xl: '5rem',
//       },
//     },
//     fontFamily: {
//       // display: ['Montserrat', 'sans-serif'],
//       body: ['Gilroy', 'sans-serif'],
//       heading: ['Gilroy-bold'],
//     },
//     borderWidth: {
//       default: '1px',
//       '0': '0',
//       '2': '2px',
//       '4': '4px',
//     },
//     extend: {
//       animation: {
//         'spin-slow': 'spin 3s linear infinite',
//       },
//       colors: {
//         cyan: '#9cdbff',
//       },
//       spacing: {
//         '96': '24rem',
//         '128': '32rem',
//         fw: '1440px',
//       },
//       height: {
//         '72': '18rem',
//         '112': '28rem',
//       },
//       maxHeight: {
//         '96': '24rem',
//       },
//       backgroundImage: theme => ({
//                  'login': "url('https://images.unsplash.com/flagged/photo-1569118311341-145748f3f338')",
//                 })
//     },
//     variants: {},
//     plugins: [],
//   }
// }

const defaultTheme = require('tailwindcss/defaultTheme')
const windmill = require('@windmill/react-ui/config')

module.exports = windmill({
  purge: ['src/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      boxShadow: {
        bottom: '0 5px 6px -7px rgba(0, 0, 0, 0.6), 0 2px 4px -5px rgba(0, 0, 0, 0.06)',
      },
    },
  },
})

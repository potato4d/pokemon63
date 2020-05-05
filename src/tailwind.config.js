/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  purge: {
    content: ['./**/*.html', './**/*.vue', './**/*.tsx'],
  },
  theme: {
    extend: {
      width: {
        '9': '1.5rem',
        '12': '2rem',
        '15': '2.5rem',
        '18': '3rem',
        '21': '3.5rem',
        '24': '4rem',
        '27': '4.5rem',
        '30': '5rem',
      },
      height: {
        '9': '1.5rem',
        '12': '2rem',
        '15': '2.5rem',
        '18': '3rem',
        '21': '3.5rem',
        '24': '4rem',
        '27': '4.5rem',
        '30': '5rem',
      },
      margin: {
        '9': '1.5rem',
        '12': '2rem',
        '15': '2.5rem',
        '18': '3rem',
        '21': '3.5rem',
        '24': '4rem',
        '27': '4.5rem',
        '30': '5rem',
      },
      padding: {
        '9': '1.5rem',
        '12': '2rem',
        '15': '2.5rem',
        '18': '3rem',
        '21': '3.5rem',
        '24': '4rem',
        '27': '4.5rem',
        '30': '5rem',
      },
    },
  },
  variants: {},
  plugins: [],
}

/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    enabled: false,
  },
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      blue: colors.blue,
    },
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
  corePlugins: {
    accessibility: false,
    alignContent: false,
    fill: false,
    fontFamily: false,
    fontSmoothing: false,
    placeholderColor: false,
    placeholderOpacity: false,
    rotate: false,
    scale: false,
    skew: false,
    space: false,
    stroke: false,
    strokeWidth: false,
    tableLayout: false,
    textOpacity: false,
    textTransform: false,
    userSelect: false,
    verticalAlign: false,
    visibility: false,
    whitespace: false,
    wordBreak: false,
  },
}

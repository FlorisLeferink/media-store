module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: theme => ({

        ...theme('colors'),
 
        'Black': '#1A1A1D',
        'LightBlack': '#3a3a45',
        'Orange': '#e2402b',
       }),
       textColor: theme => ({
        ...theme('colors'),
        'DullWhite' : '#f4e2df',
        'SubText' : '#cbc3db',
       }),
       borderColor: theme => ({
        ...theme('colors'),
        'BrightOrange' : '#f84022',
       })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

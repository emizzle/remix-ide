var Storage = require('remix-lib').Storage
var EventEmitter = require('events')

// Boostrap themes
// TODO : Put it somewhere else
const themes = [
  {name: 'basic', quality: 'light', url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/basic/bootstrap.min.css'},
  {name: 'cerulean', quality: 'light', url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/darkly/bootstrap.min.css'},
  {name: 'materia', quality: 'light', url: 'https://bootswatch.com/4/materia/bootstrap.min.css'},
  {name: 'slate', quality: 'dark', url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/slate/bootstrap.min.css'}
]

// Used for the scroll color
// const themeVariable = {
//   dark: 'dark',
//   light: 'light',
//   clean: 'light'
// }

module.exports = {
  event: new EventEmitter(),
  chooser: function () {
    const themeStorage = new Storage('style:')
    if (themeStorage.exists('theme')) {
      let themeObj = this.isThere(theme)
      debugger
      if (themeObj) {
      // check if it exists in the list if so load that theme
      // Q: what is the --theme doing?  Its the --theme property - what does that mean?
      // P: what is the default theme that is loading ( well it is not loading)
      document.getElementById('theme-link').setAttribute('href', themeObj.url)
      document.documentElement.style.setProperty('--theme', themeObj.quality)
      } else {
        
        // the theme exists in storage but it is not in the array themes
        document.getElementById('theme-link').setAttribute('href', themes[0].url)
        document.documentElement.style.setProperty('--theme', 'light')
        debugger
        // and set the theme in local storage?
      }
    } else {
      // no theme is in Storage
      document.getElementById('theme-link').setAttribute('href', themes[0].url)
      document.documentElement.style.setProperty('--theme', 'light')
      // and set the theme in local storage?
    }
  },
  isThere: function (name) {
    return themes.find(obj => {
      return obj.name === name
    })
  },
  getThemes: function () {
    return this.themes
  },
  switchTheme: function (theme) {
    let themeStorage = new Storage('style:')
    if (theme) themeStorage.set('theme', theme)
    else {
      // theme = themeStorage.get('theme')
      theme = 'cerulean'
      themeStorage.set('theme', 'cerulean')
    }
    // if (!theme) theme = 'cerulean'
    let themeObj = this.isThere(theme)
    if (themeObj) {
      document.getElementById('theme-link').setAttribute('href', themeObj.url)
      document.documentElement.style.setProperty('--theme', themeObj.quality)
      this.event.emit('switchTheme', themeObj.name)
    }
  }
}

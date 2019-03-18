var Storage = require('remix-lib').Storage
var EventEmitter = require('events')

// Boostrap themes
// TODO : Put it somewhere else
const themes = [
  {name: 'basic', quality: 'light', url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/basic/bootstrap.min.css'},
  {name: 'cerulean', quality: 'light', url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/cerulean/bootstrap.min.css'},
  {name: 'darkly', quality: 'dark', url: 'https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/darkly/bootstrap.min.css'},
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
  currentTheme: function () {
    const themeStorage = new Storage('style:')
    if (themeStorage.exists('theme')) {
      return this.isThere(themeStorage.get('theme'))
    } else {
      return themes[0]
    }
  },
  isThere: function (name) {
    return themes.find(obj => {
      return obj.name === name
    })
  },
  getThemes: function () {
    return themes
  },
  switchTheme: function (theme) {
    let themeStorage = new Storage('style:')
    if (theme) themeStorage.set('theme', theme)
    else {
      // theme = themeStorage.get('theme')
      theme = 'cerulean'
      themeStorage.set('theme', theme)
    }
    // if (!theme) theme = 'cerulean'
    let themeObj = this.isThere(theme)
    if (themeObj) {
      document.getElementById('theme-link').setAttribute('href', themeObj.url)
      document.documentElement.style.setProperty('--theme', themeObj.quality)
      this.event.emit('switchTheme', themeObj.quality)
    }
  }
}

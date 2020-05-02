const { compileCss } = require('../../_helper/compileCss')

const partials = {
  home: 'home.css',
  main: 'main.css'
}

module.exports = compileCss(partials)

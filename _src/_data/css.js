const { compileCss } = require('../../_helper/compileCss')

const partials = {
  code: 'code.css',
  home: 'home.css',
  main: 'main.css',
  text: 'text.css'
}

module.exports = compileCss(partials)

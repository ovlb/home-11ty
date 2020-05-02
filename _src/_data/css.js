const { compileCss } = require('../../_helper/compileCss')

const partials = {
  code: 'code.css',
  home: 'home.css',
  main: 'main.css'
}

module.exports = compileCss(partials)

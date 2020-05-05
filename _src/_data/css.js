const { compileCss } = require('../../_helper/compileCss')

const partials = {
  code: 'code.css',
  footer: 'footer.css',
  home: 'home.css',
  main: 'main.css',
  text: 'text.css',
  textDetail: 'text-detail.css'
}

module.exports = compileCss(partials)

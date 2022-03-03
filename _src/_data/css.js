const { compileCss } = require('../../_helper/compile-css')

const partials = {
  aroundTheWeb: 'around-the-web.css',
  code: 'code.css',
  customProperties: 'custom-properties.css',
  footer: 'footer.css',
  home: 'home.css',
  main: 'main.css',
  text: 'text.css',
  textDetail: 'text-detail.css'
}

module.exports = compileCss(partials)

require('dotenv').config()
const { version } = require('../../package.json')

module.exports = {
  locale: 'en',
  title: 'ovl',
  description: 'code & design',
  version,
  buildTime: new Date(),
  baseUrl: process.env.BASE_URL || 'https://11ty.owlish.dev',
  navItems: [
    { url: '/', text: 'Home', exact: true },
    { url: '/code/', text: 'Code' },
    { url: '/text/', text: 'Text' },
    { url: 'https://talks.ovl.design/', text: 'Talks' }
  ],
  socialNavItems: [
    { title: 'GitHub', url: 'https://github.com/ovlb' },
    { title: 'Twitter', url: 'https://twitter.com/_ovlb' }
  ],
  metaImage:
    'https://images.ctfassets.net/0qq78o7muy2j/41AVLQd3q0oEaQKwcW0Ck2/1adc1e0fc0c7525b4f25b45570847396/ovl-og-image-generic.png',
  strings: {
    skip_to_content: 'Skip to main content'
  }
}

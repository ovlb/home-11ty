require('dotenv').config()
const { version } = require('../../package.json')

module.exports = {
  locale: 'en',
  version,
  buildTime: new Date(),
  baseUrl: process.env.BASE_URL || 'https://11ty.ovl.design',
  navItems: [
    { url: '/code/', text: 'Code' },
    { url: '/text/', text: 'Text' },
    { url: 'https://talks.ovl.design/', text: 'Talks' }
  ],
  metaImage:
    'https://images.ctfassets.net/geeqsxh5by4r/lo2pS2xflaqywEoMdnMOG/e705b18fa856ab43789dd3c2f1ba80f9/ctc-og-image-001.png',
  en: {
    translations: {
      skip_to_content: 'Jump to main content',
      activate_map: 'Activate map'
    },
    meta: {
      title: 'COVID-19 Test Centre | University of Zurich',
      description:
        'Information regarding the corona test centre at the University of Zurich'
    },
    contact: {
      slug: 'contact',
      title: 'Contact'
    },
    langSwitcherNavName: 'Change language',
    siteFooter: {
      legal: [
        {
          url: 'https://www.ebpi.uzh.ch/en/impressum.html',
          text: 'Imprint'
        },
        {
          url: 'https://www.uzh.ch/cmsssl/en/privacy.html',
          text: 'Privacy declaration'
        }
      ],
      meta: [
        {
          text: 'Page created with',
          link: { text: '11ty', url: 'https://www.11ty.dev' }
        },
        {
          text: 'Content Management',
          link: { text: 'Contentful', url: 'https://www.contentful.com' }
        },
        {
          text: 'Design & Development',
          link: { text: 'ovl', url: 'https://www.ovl.design' }
        }
      ]
    }
  },
  strings: {
    skip_to_content: 'Skip to main content'
  },
  de: {
    translations: {
      skip_to_content: 'Zum Hauptinhalt springen',
      activate_map: 'Karte aktivieren'
    },
    meta: {
      title: 'COVID-19 Testzentrum | Universität Zürich',
      description:
        'Informationen zum Corona-Testzentrum an der Universität Zürich'
    },
    contact: {
      slug: 'kontakt',
      title: 'Kontakt'
    },
    langSwitcherNavName: 'Sprache wechseln',
    siteFooter: {
      legal: [
        {
          url: 'https://www.ebpi.uzh.ch/de/impressum.html',
          text: 'Impressum'
        },
        {
          url: 'https://www.uzh.ch/de/privacy',
          text: 'Datenschutzerklärung'
        }
      ],
      meta: [
        {
          text: 'Seite erstellt mit',
          link: { text: '11ty', url: 'https://www.11ty.dev' }
        },
        {
          text: 'Content Management',
          link: { text: 'Contentful', url: 'https://www.contentful.com' }
        },
        {
          text: 'Design & Development',
          link: { text: 'ovl', url: 'https://www.ovl.design' }
        }
      ]
    }
  },
  supportedLanguages: [
    {
      label: 'Deutsch',
      code: 'de'
    },
    {
      label: 'English',
      code: 'en'
    }
  ]
}

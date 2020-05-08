require('dotenv').config()
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const anchor = require('markdown-it-anchor')
const prism = require('markdown-it-prism')
const STATIC_FOLDERS = require('./_helper/paths')
const fs = require('fs')
const path = require('path')

const mdIt = require('markdown-it')({
  html: true
})
mdIt.use(anchor)
mdIt.use(prism)

const CleanCSS = require('clean-css')

const cCSS = new CleanCSS()

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 *
 *
 * @param {String} url
 * @param {Number} { width, height }
 * @returns
 */
function makeImageString(url, { width, height }, options) {
  const defaults = new Map([
    ['fm', 'jpg'],
    ['q', 65],
    ['w', width],
    ['h', height],
    ['fit', 'fill'],
    ['f', 'center']
  ])

  const merged = new Map([...defaults, ...options])

  const u = new URL(`https://${url}`)

  for (const [key, value] of merged) {
    u.searchParams.append(key, value)
  }

  return u.toString()
}

module.exports = function (config) {
  config.addPassthroughCopy('assets/img')
  config.addPassthroughCopy('assets/sitemap.xml')

  config.addPlugin(syntaxHighlight)

  config.addFilter('debug', (val) => {
    console.log(val)
  })

  config.addFilter('displayDate', function (date) {
    return new Date(date).toLocaleDateString('en-UK', {
      month: 'long',
      year: 'numeric'
    })
  })

  config.addFilter('terminalLogin', function (rawDate) {
    const dateOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }
    const timeOptions = {
      hour12: false
    }

    const date = rawDate.toLocaleDateString('en-UK', dateOptions)
    const time = rawDate.toLocaleTimeString('en-UK', timeOptions)

    return `Last login: ${date} ${time} on ovl.design`
  })

  config.addFilter('md', (raw) => {
    return mdIt.render(raw)

    // return `<div class="parsed">${result}</div>`
  })

  config.addFilter('randomNumber', ({ min, max }) => getRandomInt(min, max))
  config.addFilter('alwaysEndWithFullStop', function (str) {
    if (str.endsWith('.')) return str

    return `${str}<span class="sr-only">.</span>`
  })

  config.addShortcode('articleImage', (img) => {
    if (!img) return '<div class="text__hero-image"></div>'

    const { url } = img.fields.file
    const sizes = [
      { width: 205, height: 720 },
      { width: 260, height: 820 },
      { width: 310, height: 520 },
      { width: 360, height: 920 },
      { width: 410, height: 1020 },
      { width: 510, height: 1220 },
      { width: 610, height: 1420 },
      { width: 710, height: 1620 },
      { width: 910, height: 1820 },
      { width: 1110, height: 2020 }
    ]

    const webpOptions = new Map([
      ['fm', 'webp'],
      ['q', 80]
    ])
    const jpgOptions = new Map([
      ['fl', 'progressive'],
      ['q', 50]
    ])

    const webP = sizes
      .map((size) => makeImageString(url, size, webpOptions))
      .join(', ')
    const jpg = sizes
      .map((size) => makeImageString(url, size, jpgOptions))
      .join(', ')
    const imgSizes = '(min-width: 1500px) 33vw, 25vw'

    return `
      <picture class="text__hero-image">
        <source srcset="${webP}" sizes="${imgSizes}" />
        <source srcset="${jpg}" sizes="${imgSizes}" />
        <img src="${makeImageString(
          url,
          { width: 420, height: 1024 },
          jpgOptions
        )}" alt="${img.fields.description}" />
      </picture>
    `
  })

  config.addShortcode('metaRobots', function () {
    if (process.env.BUILD_ENV === 'preview') {
      return '<meta name="robots" content="noindex,nofollow" />'
    }

    return ''
  })

  config.addShortcode('socialNavIcons', function (items) {
    return `<ul class="icon-nav__list" role="list">
      ${items
        .map(({ url, title }) => {
          return `<li><a href="${url}" class="icon-nav__link -is-${title.toLowerCase()}">${title}</a>`
        })
        .join('')}
    </ul>`
  })

  config.addShortcode('inlineLogo', function (clsName) {
    const logo = fs.readFileSync(
      path.resolve(
        __dirname,
        '_src/static/img/logo',
        'ovl-logo-bridge-main.svg'
      ),
      { encoding: 'utf-8' }
    )

    return `<div class="${clsName}">${logo.toString()}</div>`
  })

  config.addShortcode('inlineScript', function (name) {
    const content = fs.readFileSync(
      path.resolve(__dirname, '_helper', `${name}.js`)
    )

    return `<script>${content.toString()}</script>`
  })

  config.addShortcode('baseIcon', function (name, { size = 24 } = {}) {
    const iconContent = fs.readFileSync(
      path.resolve(__dirname, '_src/static/img/icons/', `${name}.svg`)
    )

    return `<svg xmlns="http://www.w3.org/2000/svg" class="base-icon" width="${size}" height="${size}" viewBox="0 0 24 24">${iconContent}</svg>`
  })

  config.addShortcode('navLink', function (menuItem, page) {
    let ariaCurrent = page.url === menuItem.url ? 'aria-current="page"' : ''
    let itemClasses = 'site-nav__item type-small-caps'

    if (page.url.includes(menuItem.url) && !menuItem.exact) {
      itemClasses += ' -is-active'
    }

    if (page.url === menuItem.url && menuItem.exact) {
      itemClasses += ' -is-active'
    }

    return `<a href="${menuItem.url}" class="${itemClasses}" ${ariaCurrent}>${menuItem.text}</a>`
  })

  config.addShortcode('paginationItem', function (
    direction,
    paginationLink,
    allItems
  ) {
    if (!paginationLink) return ''

    const infos = new Map([
      ['next', { headline: 'Next post', class: '-next' }],
      ['previous', { headline: 'Previous post', class: '-previous' }]
    ]).get(direction)

    const fullItemInformation = allItems.find(
      (article) => article.permalink === paginationLink
    )

    if (!fullItemInformation) return ''

    return `<div class="pagination-navigation__section">
        <h3 class="pagination-navigation__sub-headline type-small-caps">${infos.headline}</h3>
        <a class="pagination-navigation__link ${infos.class}" href="${paginationLink}">${fullItemInformation.title}</a>
      </div>`
  })

  config.addWatchTarget(`./${STATIC_FOLDERS.css}**/*`)
  config.addWatchTarget('./_helper/**/*')

  config.addPassthroughCopy({ [`./${STATIC_FOLDERS.img}`]: '/img' })

  return {
    templateFormats: ['liquid', 'md', 'njk', 'js'],
    // dataTemplateEngine: false,
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'liquid',
    dir: {
      input: '_src',
      output: 'dist'
    }
  }
}

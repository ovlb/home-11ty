require('dotenv').config()
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const anchor = require('markdown-it-anchor')
const prism = require('markdown-it-prism')

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
function makeImageString(url, { width, height, fit, f }) {
  const params = new Map([
    ['fm', 'jpg'],
    ['fl', 'progressive'],
    ['q', 65],
    ['w', width],
    ['h', height],
    ['fit', fit || 'fill'],
    ['f', f || 'center']
  ])

  // const merged = new Map([...defaults, ...options])

  const u = new URL(`https://${url}`)

  for (const [key, value] of params) {
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

  config.addFilter('md', (raw) => {
    const result = mdIt.render(raw)

    return `<div class="parsed">${result}</div>`
  })

  config.addFilter('randomNumber', ({ min, max }) => getRandomInt(min, max))

  config.addFilter('bgImageFullWidth', (url) => {
    const parsed = makeImageString(url, { width: 320, height: 520, f: 'left' })
    const sizes = [
      { width: 410, height: 720, f: 'left' },
      { width: 520, height: 820, f: 'left' },
      { width: 620, height: 520 },
      { width: 720, height: 620 },
      { width: 820, height: 720 },
      { width: 1020, height: 820 },
      { width: 1220, height: 1020 },
      { width: 1420, height: 1220 },
      { width: 1820, height: 1620 },
      { width: 2220, height: 1620 }
    ]

    let stl = `.site-header {
          background-image: url(${parsed});
        }`

    sizes.forEach((size) => {
      let img = makeImageString(url, size)

      stl += `@media (min-width: ${size.width}px) { .site-header { background-image: url(${img}); } }`
    })

    const { styles } = cCSS.minify(stl)

    return `<style>${styles}</style>`
  })

  config.addShortcode('bgImgBlob', (url, index) => {
    const initial = makeImageString(url, { width: 550, height: 250 })

    const sizes = [600, 650, 750, 900, 1200, 1400, 1800, 2200]

    let stl = `.background-holder.-is-${index} {
      background-image: url(${initial});
    } `

    sizes.forEach((size) => {
      const imgSize = Math.round(size / 3)
      let img = makeImageString(url, {
        width: imgSize,
        height: imgSize,
        fit: 'fill'
      })

      stl += `@media (min-width: ${size}px) { .background-holder.-is-${index} {
        background-image: url(${img});
      } }`
    })

    const { styles } = cCSS.minify(stl)

    return `<style>${styles}</style>`
  })

  config.addShortcode('metaRobots', function () {
    if (process.env.BUILD_ENV === 'preview') {
      return '<meta name="robots" content="noindex,nofollow" />'
    }

    return ''
  })

  config.addShortcode(
    'paginationItem',
    (direction, paginationLink, allItems) => {
      if (!paginationLink) return ''

      const infos = new Map([
        ['next', { headline: 'Next post', class: '-next' }],
        ['previous', { headline: 'Previous post', class: '-previous' }]
      ]).get(direction)

      const fullItemInformation = allItems.find(
        (article) => article.permalink === paginationLink
      )

      if (!fullItemInformation) return ''

      return `
      <div class="pagination-navigation__section">
        <h3 class="pagination-navigation__sub-headline">${infos.headline}</h3>
        <a class="pagination-navigation__link ${infos.class}" href="${paginationLink}">${fullItemInformation.title}</a>
      </div>`
    }
  )

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

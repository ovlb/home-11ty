const { meta: SITE_DEFAULTS } = require('../_src/_data/site')

const tags = [
  { attrName: 'name', attrValue: 'description', key: 'description' },
  { attrName: 'name', attrValue: 'twitter:description', key: 'description' },
  { attrName: 'property', attrValue: 'og:description', key: 'description' },
  { attrName: 'name', attrValue: 'twitter:card', value: 'summary_large_image' },
  { attrName: 'name', attrValue: 'twitter:site', value: '@_ovlb' },
  { attrName: 'name', attrValue: 'twitter:creator', value: '@_ovlb' },
  { attrName: 'property', attrValue: 'og:type', key: 'ogType' },
  { attrName: 'property', attrValue: 'og:image:type', value: 'image/png' },
  { attrName: 'property', attrValue: 'og:image:width', value: '1478' },
  { attrName: 'property', attrValue: 'og:image:height', value: '831' },
  { attrName: 'property', attrValue: 'og:site_name', key: 'site_name' }
]

module.exports = function (meta = {}, post) {
  if (post) {
    if (post.openGraphImage) {
      meta.image = {
        src: post.openGraphImage?.fields.file,
        alt: post.image?.fields.description
      }
    }
    meta.description = post.intro
    meta.ogType = 'article'
  }

  const values = { ...SITE_DEFAULTS, ...meta }

  const img = `
    <meta property="og:image" content="${values.image.src}?w=1478&h=831">
    <meta name="twitter:image" content="${values.image.src}?w=1478&h=831">
    <meta name="twitter:image:alt" content="${values.image.alt}">
  `

  const rendered = tags
    .map(({ attrName, attrValue, key, value }) => {
      return `<meta ${attrName}="${attrValue}" content="${
        value ?? values[key]
      }">`
    })
    .join('')

  return `
    ${rendered}
    ${img}
  `
}

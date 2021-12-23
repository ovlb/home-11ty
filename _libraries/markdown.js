const md = require('markdown-it')({
  html: true,
  breaks: true,
  linkify: true
})

const anchor = require('markdown-it-anchor')
const prism = require('markdown-it-prism')
const footnotes = require('markdown-it-footnote')
const abbr = require('markdown-it-abbr')

md.use(anchor)
md.use(prism)
md.use(footnotes)
md.use(abbr)

md.renderer.rules.footnote_block_open = () =>
  '<section class="footnotes">\n' +
  '<h2 class="small-headline">Footnotes</h4>\n' +
  '<ol class="footnotes-list">\n'

module.exports = md

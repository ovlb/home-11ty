const path = require('path')
const fs = require('fs')
const postcss = require('postcss')
const postcssImport = require('postcss-import')
const precss = require('precss')
const autoprefixer = require('autoprefixer')
const CleanCSS = require('clean-css')

const STATIC_FOLDERS = require('./paths')

const compiler = postcss([postcssImport, precss, autoprefixer])
const cCSS = new CleanCSS()

const IS_PROD = process.env.ELEVENTY_ENV === 'production'

const compile = async function (cssFileName) {
  try {
    const cssPath = path.join(
      __dirname,
      `../${STATIC_FOLDERS.css}`,
      cssFileName
    )
    const cssContent = fs.readFileSync(cssPath, { encoding: 'utf-8' })

    const { css } = await compiler.process(cssContent, {
      from: cssPath,
      to: path.join(__dirname, 'dist/css', cssFileName)
    })

    if (IS_PROD) {
      const { errors, styles } = cCSS.minify(css)

      if (errors.length) {
        throw new Error(errors.join(', '))
      }

      return styles
    }

    return css
  } catch (e) {
    console.error(e)

    throw new Error(e.message)
  }
}

module.exports = {
  compileCss: async (sources) => {
    const results = {}

    await Promise.all(
      Object.keys(sources).map(async (source) => {
        const parsed = await compile(sources[source])

        results[source] = parsed
      })
    )

    return results
  }
}

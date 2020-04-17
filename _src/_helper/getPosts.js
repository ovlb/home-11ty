require('dotenv').config()

const contentful = require('contentful')
const host =
  process.env.STAGE === 'preview'
    ? 'preview.contentful.com'
    : 'https://cdn.contentful.com'

const clt = contentful.createClient({
  space: process.env.CF_SPACE,
  accessToken: process.env.CF_TOKEN,
  host
})

module.exports = async function ({ type, order = '-sys.createdAt' }) {
  try {
    const { items } = await clt.getEntries({
      content_type: type,
      order,
      include: 4
    })

    return items.map((item) => {
      return item.fields
    })
  } catch (e) {
    throw new Error(e.message)
  }

  // console.log(includes)

  /* const content = items[0].fields
  const blocks = content.blocks.map((block) => {
    return block.fields
  })

  return {
    content,
    blocks
  } */
}

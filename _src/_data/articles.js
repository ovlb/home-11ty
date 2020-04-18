const getPosts = require('../../_helper/getPosts')

module.exports = async function () {
  return {
    posts: await getPosts({ type: 'article', order: '-fields.date' })
  }
}

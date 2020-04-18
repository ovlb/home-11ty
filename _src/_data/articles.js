const getPosts = require('../../_helper/getPosts')

module.exports = async function () {
  const all = await getPosts({ type: 'article', order: '-fields.date' })
  const ownPosts = all.filter((post) => post.isInternal)
  return {
    posts: await getPosts({ type: 'article', order: '-fields.date' }),
    ownPosts
  }
}

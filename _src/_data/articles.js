const getPosts = require('../../_helper/getPosts')

module.exports = async function () {
  const all = await getPosts({ type: 'article', order: '-fields.date' })

  const posts = all.map((article) => {
    const isInternal = article.isInternal || !article.externalPost

    article.permalink = isInternal
      ? `/text/${article.slug}/`
      : article.externalPost.fields.link

    return article
  })
  const ownPosts = posts.filter((post) => post.isInternal)

  return {
    posts,
    ownPosts
  }
}

module.exports = {
  layout: 'digest',
  tags: ['aroundTheWeb'],
  pageCSS: 'aroundTheWeb',
  eleventyComputed: {
    dateRange: function (data) {
      const parsedStart = new Date(data.dates.start)
      const parsedPublish = new Date(data.dates.publish)

      return {
        start: parsedStart.toLocaleDateString('de'),
        end: parsedPublish.toLocaleDateString('de')
      }
    },
    title: function (data) {
      const { start, end } = data.dateRange

      return `Around the Web (${start}–${end})`
    },
    permalink: function (data) {
      return `/around-the-web/${data.page.fileSlug}/`
    }
  }
}

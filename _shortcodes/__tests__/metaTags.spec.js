const metaTags = require('../metaTags')
const test = require('ava')

const findMetaValue = require('../../_helper/findMetaValue')
const { meta } = require('../../_src/_data/site')

test('sets default description if none is given', (t) => {
  const result = metaTags({ some: 'thing' })
  const description = findMetaValue('name="description"', result)

  t.is(description, meta.description)
})

test('sets the given description, if passed via meta', (t) => {
  const result = metaTags({ description: 'thing' })
  const description = findMetaValue('name="description"', result)

  t.is(description, 'thing')
})

test('sets description if passed via post intro', (t) => {
  const result = metaTags({}, { intro: 'hello' })
  const description = findMetaValue('name="description"', result)

  t.is(description, 'hello')
})

test('sets og:description', (t) => {
  const result = metaTags({ description: 'thing' })
  const description = findMetaValue('property="og:description"', result)

  t.is(description, 'thing')
})

test('sets twitter:description', (t) => {
  const result = metaTags({ description: 'thing' })
  const description = findMetaValue('name="twitter:description"', result)

  t.is(description, 'thing')
})

test('sets twitter defaults', (t) => {
  const result = metaTags({ description: 'thing' })
  const cardType = findMetaValue('name="twitter:card"', result)
  const cardSite = findMetaValue('name="twitter:site"', result)
  const cardCreator = findMetaValue('name="twitter:creator"', result)

  t.plan(3)

  t.is(cardType, 'summary_large_image')
  t.is(cardSite, '@_ovlb')
  t.is(cardCreator, '@_ovlb')
})

test('sets og:type', (t) => {
  const result = metaTags()
  const type = findMetaValue('property="og:type"', result)

  t.is(type, 'blog')
})

test('overwrites og:type if post is given', (t) => {
  const result = metaTags({}, {})
  const type = findMetaValue('property="og:type"', result)

  t.is(type, 'article')
})

const test = require('ava')

const alwaysEndWithFullStop = require('../alwaysEndWithFullStop')

test('returns the unchanged string, if ends with `.`', (t) => {
  t.is(alwaysEndWithFullStop('String.'), 'String.')
})

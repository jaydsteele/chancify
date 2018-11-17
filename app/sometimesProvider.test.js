const { assert } = require('chai')
const Chance = require('chance')
const sometimesProvider = require('./sometimesProvider')

describe('sometimesProvider', () => {
  it('generates values properly', () => {
    const chance = new Chance()
    const sometimes = sometimesProvider(chance)
    chance.bool = () => true
    assert.equal(sometimes(25, 'hello'), 'hello')
    chance.bool = () => false
    assert.isUndefined(sometimes(25, 'hello'))
  })
})

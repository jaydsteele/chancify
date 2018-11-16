const { assert } = require('chai')
const Chance = require('chance')
const sampleEmail = require('./sample_email')
const { generateResource } = require('../generate')

const chance = new Chance(1234)

describe('sample_email', () => {
  it('should generate a sample_email', () => {
    const user = generateResource(sampleEmail(chance))
    assert.isString(user)
  })
})

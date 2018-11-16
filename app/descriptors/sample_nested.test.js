const { assert } = require('chai')
const Chance = require('chance')
const sampleNested = require('./sample_nested')
const { generateResource } = require('../generate')

const chance = new Chance(1234)

describe('sample_nested', () => {
  it('should generate a sample_email', () => {
    const result = generateResource(sampleNested(chance))
    assert.isObject(result)
    assert.isObject(result.details)
  })
})

const { assert } = require('chai')
const Chance = require('chance')
const sampleUser = require('./sample_user')
const { generateResource } = require('../generate')

const chance = new Chance(1234)

describe('sample_user', () => {
  it('should generate a user', () => {
    const user = generateResource(sampleUser(chance))
    assert.exists(user)
  })
})

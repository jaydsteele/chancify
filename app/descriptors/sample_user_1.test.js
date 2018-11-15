const { assert } = require('chai')
const Chance = require('chance')
const sampleUser1 = require('./sample_user_1')
const { generateResource } = require('../generate')

const chance = new Chance()

describe('sample_user_1', () => {
  it('should generate a user', () => {
    const user = generateResource(sampleUser1(chance))
    assert.exists(user)
  })
})

const { assert } = require('chai')
const loadDescriptors = require('./load_descriptors')

describe('loadDescriptors', () => {
  it('should load all descriptors', () => {
    const descriptors = loadDescriptors()
    assert.exists(descriptors)
    assert.exists(descriptors.sample_user_1)
  })
})

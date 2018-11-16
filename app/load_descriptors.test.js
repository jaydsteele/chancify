const { assert } = require('chai')
const path = require('path')
const loadDescriptors = require('./load_descriptors')

describe('loadDescriptors', () => {
  it('should load all descriptors', () => {
    const descriptors = loadDescriptors(path.join(__dirname, './descriptors'))
    assert.exists(descriptors)
    assert.exists(descriptors.sample_user)
  })
})

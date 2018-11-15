const _ = require('lodash')

// Set an upper bound on the size of a list resource
const MAX_LIST_RESOURCE_SIZE = 10000

function generateResource(template) {
  function valueCloner(value) {
    if (_.isFunction(value)) {
      return value()
    }
    return undefined
  }
  if (!template) {
    return undefined
  }
  return _.cloneDeepWith(template, valueCloner)
}

function generateListResource(template, options) {
  if (!template) {
    return []
  }
  if (_.get(options, 'max') > MAX_LIST_RESOURCE_SIZE) {
    throw new Error(`options.max cannot be larger than ${MAX_LIST_RESOURCE_SIZE}`)
  }
  _.defaults(options, {
    skip: 0,
    limit: 10,
    max: 10,
  })
  // to ensure seeded random resource generators will always return the same
  // set of values, we will actually generate our entire resource (max items)
  // and return the array representing our paging window
  const entireResource = _.times(options.max, () => generateResource(template))
  // now discard any items outside of the page range
  const result = entireResource.slice(options.skip, options.skip + options.limit)
  return result
}

module.exports.generateResource = generateResource
module.exports.generateListResource = generateListResource

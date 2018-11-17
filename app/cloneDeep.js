const _ = require('lodash')

/**
 * A specialized deep clone for a java object that converts functions to their
 * called value and strips out undefined values.
 * @param {*} object the object to clone
 * @return the clone
 */
function cloneDeep(object) {
  if (_.isFunction(object)) return object()
  if (!_.isPlainObject(object)) return object
  const result = {}
  _.each(object, (value, key) => {
    const clonedValue = cloneDeep(value)
    if (!_.isUndefined(clonedValue) && !_.isFunction(clonedValue)) {
      result[key] = clonedValue
    }
  })
  return result
}

module.exports = cloneDeep

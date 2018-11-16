const fs = require('fs')
const _ = require('lodash')
const path = require('path')

// returns true if filename is a file (and not a directory)
function isFile(directory, filename) {
  return fs.lstatSync(path.join(directory, filename)).isFile()
}

// returns true if filename is a test file
function isTestFile(filename) {
  return _.endsWith(filename, '.test.js')
}

/**
 * Load all of the descriptor functions in app/descriptors into a hashmap
 * for lookup, in the following format:
 * descriptors = {
 *   sample_user_1: function() {...}
 * }
 * @param directory the directory to fetch descriptors from
 * @returns A hashmap of the resource descriptors
 */
function loadDescriptors(directory) {
  const allFiles = fs.readdirSync(directory)
  const descriptors = _.chain(allFiles)
    .filter(file => (isFile(directory, file) && !isTestFile(file)))
    .map(file => ({
      name: path.basename(file, '.js'),
      func: require(path.join(directory, file)) // eslint-disable-line
    }))
    .keyBy('name')
    .mapValues(object => object.func)
    .value()
  return descriptors
}

module.exports = loadDescriptors
